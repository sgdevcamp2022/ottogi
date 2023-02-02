package devcamp.ottogi.userservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TextMessages {

    SEND_EMAIL("이메일을 전송하였습니다."),
    SIGNUP_SUCCESS("회원가입이 정상적으로 완료되었습니다."),
    LOGIN_SUCCESS("로그인이 완료되었습니다."),
    VIEW_SUCCESS("조회 완료!"),
    REISSUE_SUCCESS("토큰 재발급 완료"),

    FRIEND_ADD_SUCCESS("친구 요청 완료"),
    FRIEND_SHOW_SUCCESS("친구 조회 완료"),
    FRIEND_ACCEPT_SUCCESS("친구 승인 완료"),
    FRIEND_REJECT_SUCCESS("친구 거절 완료");

    private String message;
}
