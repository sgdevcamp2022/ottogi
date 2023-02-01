package devcamp.ottogi.userservice.controller;

import devcamp.ottogi.userservice.dto.FriendRequestDto;
import devcamp.ottogi.userservice.dto.MemberResponseDto;
import devcamp.ottogi.userservice.response.CommonResponse;
import devcamp.ottogi.userservice.service.MemberService;
//import devcamp.ottogi.userservice.util.SecurityUtil;
import devcamp.ottogi.userservice.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static devcamp.ottogi.userservice.domain.TextMessages.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/member")
public class MemberController {
    private final MemberService memberService;
    private final ResponseService responseService;

    @GetMapping("/info")
    public ResponseEntity<MemberResponseDto> findMemberInfoById(HttpServletRequest request) {
        Long id = Long.parseLong(request.getHeader("id"));
        return ResponseEntity.ok(memberService.findMemberInfoById(id));
    }

    @GetMapping("/{email}")
    public ResponseEntity<MemberResponseDto> findMemberInfoByEmail(@PathVariable String email) {
        log.info("/email 호출");
        return ResponseEntity.ok(memberService.findMemberInfoByEmail(email));
    }

    @PostMapping("/friend")
    public CommonResponse<Object> addFriend(HttpServletRequest request, @RequestBody FriendRequestDto friendRequestDto){
        Long id = Long.parseLong(request.getHeader("id"));
        log.info("email : {}",friendRequestDto.getEmail());
        return responseService.getSuccessResponse(FRIEND_ADD_SUCCESS, memberService.addFriend(id, friendRequestDto.getEmail()));
    }
}
