package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.request.FriendRequestDto;
import devcamp.ottogi.userservice.dto.request.InvitationProcessDto;
import devcamp.ottogi.userservice.dto.request.MemberModifyRequestDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.*;
//import devcamp.ottogi.userservice.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static devcamp.ottogi.userservice.domain.SuccessMessages.*;
import static devcamp.ottogi.userservice.exception.ErrorCode.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/member")
public class MemberController {
    private final MemberService memberService;
    private final ResponseService responseService;
    private final AuthService authService;
    private final FileUploadService fileUploadService;
    private final StateManagementService stateManagementService;

    @GetMapping("/info")
    public CommonResponse<Object> findMemberInfoById(HttpServletRequest request) {
        Long userId = Long.parseLong(request.getHeader("id"));
        log.info("유저 정보 불러오기 [IN] : {}", userId);
        CommonResponse<Object> response = responseService.getSuccessResponse(VIEW_SUCCESS, memberService.findMemberInfoById(userId));
        log.info("유저 정보 불러오기 [DONE] : {}", userId);
        return response;
    }

    @GetMapping("/{email}")
    public ResponseEntity<MemberResponseDto> findMemberInfoByEmail(@PathVariable String email) {
        return ResponseEntity.ok(memberService.findMemberInfoByEmail(email));
    }

    @PostMapping("/logout")
    public CommonResponse<Object> logout(HttpServletRequest request){
        stateManagementService.sendLogoutState(request.getHeader("id"));
        return responseService.getSuccessResponse(LOGOUT_SUCCESS, null);
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

    @PatchMapping("/modify/image")
    public CommonResponse<Object> modifyProfileImage(HttpServletRequest request, @RequestPart MultipartFile file) throws Exception{
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(FILE_UPLOAD_SUCCESS, fileUploadService.uploadFile(userId, file));
    }

    @PatchMapping("/modify/introduction")
    public CommonResponse<Object> modifyIntroduction(HttpServletRequest request, @RequestBody MemberModifyRequestDto memberModifyRequestDto) {


        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(USER_INTRO_MODIFY_SUCCESS, memberService.userIntroModify(userId, memberModifyRequestDto.getIntroduction()));

    }

    @PatchMapping("/modify/name")
    public CommonResponse<Object> modifyUserName(HttpServletRequest request, @RequestBody MemberModifyRequestDto memberModifyRequestDto){
        Long userId = Long.parseLong(request.getHeader("id"));

        //비밀번호 검증
        authService.checkPW(userId, memberModifyRequestDto.getOriginalPassword());

        String newName = memberModifyRequestDto.getName();

        return responseService.getSuccessResponse(USER_NAME_MODIFY_SUCCESS, memberService.userNameModify(userId, newName));
    }

    @PatchMapping("/modify/password")
    public CommonResponse<Object> modifyUserPassword(HttpServletRequest request, @RequestBody MemberModifyRequestDto memberModifyRequestDto){

        Long userId = Long.parseLong(request.getHeader("id"));

        // 비밀번호 검증
        authService.checkPW(userId, memberModifyRequestDto.getOriginalPassword());

        String newPassword = memberModifyRequestDto.getPassword();

        if (newPassword.length() < 8) {
            throw new ApiException(REGISTER_PW_LEN_ERROR);
        }

        return responseService.getSuccessResponse(USER_PW_MODIFY_SUCCESS, memberService.userPasswordModify(userId, newPassword));
    }

    @DeleteMapping("/userdelete")
    public CommonResponse<Object> deleteUser(HttpServletRequest request){
        Long userId = Long.parseLong(request.getHeader("id"));
        return responseService.getSuccessResponse(USER_DELETE_SUCCESS, memberService.userDelete(userId));
    }

}
