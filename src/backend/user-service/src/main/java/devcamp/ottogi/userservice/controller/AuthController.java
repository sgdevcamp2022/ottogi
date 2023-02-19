package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberRegisterRequestDto;
import devcamp.ottogi.userservice.dto.request.TokenRequestDto;
import devcamp.ottogi.userservice.dto.request.EmailCodeRequestDto;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static devcamp.ottogi.userservice.domain.SuccessMessages.*;
import static devcamp.ottogi.userservice.exception.ErrorCode.*;

@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;
    private final ResponseService responseService;
    private String userEmail;
    private MemberRegisterRequestDto userMemberRequestDto;
    private final FileUploadService fileUploadService;
    private final StateManagementService stateManagementService;

    @GetMapping("/test")
    public String test(){
        return "유저 서버 테스트 성공!";
    }


    @PostMapping("/register")
    public CommonResponse<Object> register(@RequestBody MemberRegisterRequestDto memberRequestDto) {
        log.info("회원가입 요청 : {}",memberRequestDto.getEmail());

        userMemberRequestDto = new MemberRegisterRequestDto(memberRequestDto);
        userEmail = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();

        // 로직 검사
        if(password.length() < 8){
            throw new ApiException(REGISTER_PW_LEN_ERROR);
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
            throw new ApiException(REGISTER_PW_LEN_ERROR);
        }

        authService.register(userMemberRequestDto);
        return responseService.getSuccessResponse(SIGNUP_SUCCESS, null);
    }

    @PostMapping("/email")
    public CommonResponse<Object> emailConfirm(@RequestBody EmailCodeRequestDto emailCodeRequestDto) {

        String userCode = emailCodeRequestDto.getUserCode();

        if(!emailService.validateCodeNumber(userCode)){
            throw new ApiException(EMAIL_INPUT_ERROR);
        }

        authService.register(userMemberRequestDto);
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

    @PatchMapping("/modifyimage")
    public CommonResponse<Object> modifyProfileImage(HttpServletRequest request, @RequestPart MultipartFile file) throws Exception{
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FILE_UPLOAD_SUCCESS, fileUploadService.uploadFile(userId, file));
    }
}
