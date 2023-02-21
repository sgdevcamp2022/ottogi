package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.dto.*;
import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberRegisterRequestDto;
import devcamp.ottogi.userservice.dto.request.TokenRequestDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.jwt.TokenProvider;
import devcamp.ottogi.userservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.concurrent.TimeUnit;

import static devcamp.ottogi.userservice.exception.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${default_image}")
    private String imagePath;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final StateManagementService stateManagementService;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public MemberResponseDto register(MemberRegisterRequestDto memberRequestDto) {
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())){
            throw new ApiException(REGISTER_DUPLICATED_EMAIL);
        }

        Member member = memberRequestDto.toMember(passwordEncoder, imagePath);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDto login(MemberLoginRequestDto memberLoginDto) {
        log.info("로그인 요청 [IN] email : {}", memberLoginDto.getEmail());

        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 토큰 생성
            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);


            // 4. RefreshToken 저장 (key, value, timout, time 단위(ms))
            redisTemplate.opsForValue()
                    .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

            Member member = memberRepository.findByEmail(memberLoginDto.getEmail())
                    .orElseThrow(()-> new ApiException(NO_MEMBER_ERROR));

            stateManagementService.sendLoginState(member.getId().toString());

            log.info("로그인 요청 [DONE] email : {}", memberLoginDto.getEmail());

            return tokenDto;

        } catch (Exception e){
            throw new ApiException(LOGIN_INFO_ERROR);
        }


    }

    @Transactional
    public void checkPW(Long userId, String password) {
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new ApiException(PW_MATCH_ERROR);
        }
    }


    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        log.info("Token 재발행 [IN]");
        // 1. Refresh Token 검증
        tokenProvider.validateToken(tokenRequestDto.getRefreshToken());

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID를 기반으로 Refresh Token 값 가져옴
        String refreshToken = redisTemplate.opsForValue().get("RT:" + authentication.getName());

        // 4. 유효한지 검사
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new ApiException(NO_RT_IN_DB);
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        redisTemplate.opsForValue().set("RT:" + authentication.getName(), tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);
        //토큰 발급
        log.info("Token 재발행 [DONE]");

        return tokenDto;
    }
}
