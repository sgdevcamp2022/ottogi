package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberRegisterRequestDto;
import devcamp.ottogi.userservice.dto.request.TokenRequestDto;
import devcamp.ottogi.userservice.dto.request.EmailCodeRequestDto;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.repository.FriendRepository;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.AuthService;
import devcamp.ottogi.userservice.service.EmailService;
import devcamp.ottogi.userservice.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static devcamp.ottogi.userservice.domain.TextMessages.*;
import static devcamp.ottogi.userservice.exception.ErrorCode.*;

@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;
    private final ResponseService responseService;
    private final FriendRepository friendRepository;
    private String userEmail;
    private MemberRegisterRequestDto userMemberRequestDto;

    @PostMapping("/register")
    public CommonResponse<Object> register(@RequestBody MemberRegisterRequestDto memberRequestDto) {

        userMemberRequestDto = new MemberRegisterRequestDto(memberRequestDto);
        userEmail = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();

        // 로직 검사
        if(password.length() < 8){
            throw new ApiException(SIGNUP_PW_ERROR);
        }

        emailService.sendSimpleMessage(memberRequestDto.getEmail());

        return responseService.getSuccessResponse(SEND_EMAIL, null);
    }

    @PostMapping("/register_simple")
    public CommonResponse<Object> registerSimple(@RequestBody MemberRegisterRequestDto memberRequestDto) {

        userMemberRequestDto = new MemberRegisterRequestDto(memberRequestDto);
        userEmail = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();

        // 로직 검사
        if(password.length() < 8){
            throw new ApiException(SIGNUP_PW_ERROR);
        }

        authService.signup(userMemberRequestDto);
        return responseService.getSuccessResponse(SIGNUP_SUCCESS, null);
    }

    @PostMapping("/email")
    public CommonResponse<Object> emailConfirm(@RequestBody EmailCodeRequestDto emailCodeRequestDto) {

        String userCode = emailCodeRequestDto.getUserCode();

        if(!emailService.validateCodeNumber(userCode)){
            throw new ApiException(EMAIL_INPUT_ERROR);
        }

        authService.signup(userMemberRequestDto);
        return responseService.getSuccessResponse(SIGNUP_SUCCESS, userEmail);
    }

    @PostMapping("/login")
    public CommonResponse<Object> login(@RequestBody MemberLoginRequestDto memberLoginDto) {
        return responseService.getSuccessResponse(LOGIN_SUCCESS, authService.login(memberLoginDto));
    }

    @PostMapping("/reissue") //재발급
    public CommonResponse<Object> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return responseService.getSuccessResponse(REISSUE_SUCCESS, authService.reissue(tokenRequestDto));
    }
}