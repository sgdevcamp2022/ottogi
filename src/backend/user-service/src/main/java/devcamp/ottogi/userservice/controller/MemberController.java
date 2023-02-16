package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.request.FriendRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberModifyRequestDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.exception.ErrorCode;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.AuthService;
import devcamp.ottogi.userservice.service.MemberService;
//import devcamp.ottogi.userservice.util.SecurityUtil;
import devcamp.ottogi.userservice.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import java.io.File;

import static devcamp.ottogi.userservice.domain.TextMessages.*;
import static devcamp.ottogi.userservice.exception.ErrorCode.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/member")
public class MemberController {
    private final MemberService memberService;
    private final ResponseService responseService;
    private final AuthService authService;

    @GetMapping("/info")
    public CommonResponse<Object> findMemberInfoById(HttpServletRequest request) {
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(VIEW_SUCCESS, memberService.findMemberInfoById(userId));
    }

    @GetMapping("/{email}")
    public ResponseEntity<MemberResponseDto> findMemberInfoByEmail(@PathVariable String email) {
        log.info("/email 호출");
        return ResponseEntity.ok(memberService.findMemberInfoByEmail(email));
    }

    @PostMapping("/addfriend")
    public CommonResponse<Object> addFriend(HttpServletRequest request, @RequestBody FriendRequestDto friendRequestDto){
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FRIEND_ADD_SUCCESS, memberService.addFriend(userId, friendRequestDto.getEmail()));
    }

    @GetMapping("/showfriend")
    public CommonResponse<Object> showFriend(HttpServletRequest request){
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FRIEND_SHOW_SUCCESS, memberService.showFriend(userId));
    }

    @PostMapping("/acceptfriend")
    public CommonResponse<Object> acceptFriend(HttpServletRequest request, @RequestBody FriendRequestDto friendRequestDto) {
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FRIEND_ACCEPT_SUCCESS, memberService.acceptFriend(userId, friendRequestDto.getEmail()));
    }

    @DeleteMapping("/rejectfriend")
    public CommonResponse<Object> rejectFriend(HttpServletRequest request, @RequestBody FriendRequestDto friendRequestDto) {
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FRIEND_REJECT_SUCCESS, memberService.rejectFriend(userId, friendRequestDto.getEmail()));
    }

    @PatchMapping("/modifyimage")
    public CommonResponse<Object> modifyProfileImage(HttpServletRequest request, @RequestParam MultipartFile file) throws Exception{

        String FILE_SAVE_DIR ="/C:/Users/whipbaek/Projects/ottogi/images/";
        String userId = (request.getHeader("id"));

        if(file.isEmpty()){
            String fullPath = FILE_SAVE_DIR + "filename" + userId + ".png";
            log.info("파일 저장 fullPath={}", fullPath);
            file.transferTo(new File(fullPath));
        }

        return null;
    }

    @PostMapping("/passwordcheck")
    public CommonResponse<Object> passwordCheck(MemberLoginRequestDto memberLoginRequestDto){
        if(!authService.checkPW(memberLoginRequestDto)){
            throw new ApiException(PW_MATCH_ERROR);
        }
        return responseService.getSuccessResponse(PW_MATCH_SUCCESS, null);
    }

    @PatchMapping("/modify/name")
    public CommonResponse<Object> userNameModify(HttpServletRequest request, MemberModifyRequestDto memberModifyRequestDto){
        Long userId = Long.parseLong(request.getHeader("id"));
        String newName = memberModifyRequestDto.getPassword();

        return responseService.getSuccessResponse(USER_NAME_MODIFY_SUCCESS, memberService.userNameModify(userId, newName));
    }

    @PatchMapping("/modify/password")
    public CommonResponse<Object> userPasswordModify(HttpServletRequest request, MemberModifyRequestDto memberModifyRequestDto){
        Long userId = Long.parseLong(request.getHeader("id"));
        String newPassword = memberModifyRequestDto.getPassword();

        if (newPassword.length() < 8) {
            throw new ApiException(SIGNUP_PW_ERROR);
        }

        return responseService.getSuccessResponse(USER_PW_MODIFY_SUCCESS, memberService.userPasswordModify(userId, newPassword));
    }

    @DeleteMapping("/userDelete")
    public CommonResponse<Object> userDelete(HttpServletRequest request){
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(USER_DELETE_SUCCESS, memberService.userDelete(userId));
    }


}
