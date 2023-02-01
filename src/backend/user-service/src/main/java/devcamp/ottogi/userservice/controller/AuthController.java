package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.MemberLoginDto;
import devcamp.ottogi.userservice.dto.MemberRequestDto;
import devcamp.ottogi.userservice.dto.TokenDto;
import devcamp.ottogi.userservice.dto.TokenRequestDto;
import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.repository.FriendRepository;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.AuthService;
import devcamp.ottogi.userservice.service.EmailService;
import devcamp.ottogi.userservice.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

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
    private MemberRequestDto userMemberRequestDto;

    @PostMapping("/signup")
    public CommonResponse<Object> signup(@RequestBody MemberRequestDto memberRequestDto) {

        userMemberRequestDto = new MemberRequestDto(memberRequestDto);
        userEmail = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();

        // 로직 검사
        if(password.length() < 8){
            throw new ApiException(SIGNUP_PW_ERROR);
        }

        emailService.sendSimpleMessage(memberRequestDto.getEmail());

        return responseService.getSuccessResponse(SEND_EMAIL, null);
    }

    @PostMapping("/signup_simple")
    public CommonResponse<Object> signupSimple(@RequestBody MemberRequestDto memberRequestDto) {

        userMemberRequestDto = new MemberRequestDto(memberRequestDto);
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
    public CommonResponse<Object> emailConfirm(@RequestBody String userCode) {
        userCode = userCode.substring(21,28);

//        if(!emailService.validateCodeNumber(userCode)){
//            throw new ApiException(EMAIL_INPUT_ERROR);
//        }
//
//        authService.signup(userMemberRequestDto);
        return responseService.getSuccessResponse(SIGNUP_SUCCESS, userEmail);
    }

    @PostMapping("/login")
    public CommonResponse<Object> login(@RequestBody MemberLoginDto memberLoginDto) {
        return responseService.getSuccessResponse(LOGIN_SUCCESS, authService.login(memberLoginDto));
    }

    @PostMapping("/reissue") //재발급
    public CommonResponse<Object> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return responseService.getSuccessResponse(REISSUE_SUCCESS, authService.reissue(tokenRequestDto));
    }

    @GetMapping("/testfriend")
    public String test(){
        List<Friend> friendsById = friendRepository.findFriends(1L);
        for (Friend friend : friendsById) {
            log.info("sender : {}", friend.getSender().getEmail());
            log.info("receiver : {}", friend.getReceiver().getEmail());
            log.info("state : {}", friend.getState());
        }
        return "테스트 종료";
    }
}
