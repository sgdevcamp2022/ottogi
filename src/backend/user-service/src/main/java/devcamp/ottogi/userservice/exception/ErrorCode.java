package devcamp.ottogi.userservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    // Authentication Part
    REGISTER_PW_LEN_ERROR(HttpStatus.BAD_REQUEST, "AUTH001", "비밀번호는 8자 이상이어야 합니다."),
    EMAIL_INPUT_ERROR(HttpStatus.BAD_REQUEST, "AUTH002", "이메일 인증 번호가 잘못되었습니다."),
    REGISTER_DUPLICATED_EMAIL(HttpStatus.BAD_REQUEST, "AUTH003", "이미 가입되어 있는 유저입니다."),
    LOGIN_INFO_ERROR(HttpStatus.BAD_REQUEST, "AUTH004", "로그인 정보가 일치하지 않습니다."),
    NO_MEMBER_ERROR(HttpStatus.BAD_REQUEST, "AUTH005", "유저 정보가 없습니다."),


    NO_TOKEN_HEADER(HttpStatus.BAD_REQUEST, "AUTH010", "토큰이 존재하지 않습니다."),
    JWT_INVALID(HttpStatus.BAD_REQUEST, "AUTH011", "잘못된 JWT 서명입니다."),
    JWT_EXPIRED(HttpStatus.BAD_REQUEST, "AUTH012", "만료된 JWT 토큰입니다."),
    JWT_NOT_SUPPORT(HttpStatus.BAD_REQUEST, "AUTH013", "지원되지 않는 JWT 토큰입니다."),
    JWT_ERROR(HttpStatus.BAD_REQUEST, "AUTH014", "JWT 토큰이 잘못되었습니다."),
    NO_AUTHORIZE(HttpStatus.BAD_REQUEST, "AUTH015", "권한 정보가 없는 토큰입니다."),
    NO_RT_IN_DB(HttpStatus.BAD_REQUEST, "AUTH016", "해당 리프레쉬 토큰이 DB에 존재하지 않습니다."),


    // Member Part
    PW_MATCH_ERROR(HttpStatus.BAD_REQUEST, "MEMBER001", "비밀번호가 일치하지 않습니다."),
    DUPLICATED_FRIEND(HttpStatus.BAD_REQUEST, "MEMBER002", "이미 친구 요청이 된 관계거나, 친구 사이입니다."),
    NO_SHOW_FRIENDS(HttpStatus.BAD_REQUEST, "MEMBER003", "친구 목록이 존재하지 않습니다."),
    NO_FRIEND_REQUEST(HttpStatus.BAD_REQUEST, "MEMBER004", "친구 요청이 존재하지 않습니다"),
    FILE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "MEMBER005", "파일 업로드에 실패하였습니다."),
    FILE_TYPE_ERROR(HttpStatus.BAD_REQUEST, "MEMBER006", "잘못된 형식의 파일입니다."),
    NO_INVITATION_LINK(HttpStatus.BAD_REQUEST, "MEMBER007","커뮤니티 초대 링크가 없습니다");

    private HttpStatus status;
    private String code;
    private final String message;
}
