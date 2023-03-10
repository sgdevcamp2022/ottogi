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
        log.info("????????? ?????? [IN] email : {}", memberLoginDto.getEmail());

        // 1. Login ID/PW ??? ???????????? AuthenticationToken ??????
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginDto.toAuthentication();

        // 2. ????????? ?????? (????????? ???????????? ??????) ??? ??????????????? ??????
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. ?????? ????????? ???????????? JWT ?????? ??????
            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);


            // 4. RefreshToken ?????? (key, value, timout, time ??????(ms))
            redisTemplate.opsForValue()
                    .set("RT:" + authentication.getName(), tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);

            Member member = memberRepository.findByEmail(memberLoginDto.getEmail())
                    .orElseThrow(()-> new ApiException(NO_MEMBER_ERROR));

            stateManagementService.sendLoginState(member.getId().toString());

            log.info("????????? ?????? [DONE] email : {}", memberLoginDto.getEmail());

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
        log.info("Token ????????? [IN]");
        // 1. Refresh Token ??????
        tokenProvider.validateToken(tokenRequestDto.getRefreshToken());

        // 2. Access Token ?????? Member ID ????????????
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. ??????????????? Member ID??? ???????????? Refresh Token ??? ?????????
        String refreshToken = redisTemplate.opsForValue().get("RT:" + authentication.getName());

        // 4. ???????????? ??????
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new ApiException(NO_RT_IN_DB);
        }

        // 5. ????????? ?????? ??????
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. ????????? ?????? ????????????
        redisTemplate.opsForValue().set("RT:" + authentication.getName(), tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpiresIn(), TimeUnit.MILLISECONDS);
        //?????? ??????
        log.info("Token ????????? [DONE]");

        return tokenDto;
    }
}
