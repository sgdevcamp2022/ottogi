package devcamp.ottogi.userservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    SIGNUP_PW_ERROR(HttpStatus.BAD_REQUEST, "AUTH001", "비밀번호가 잘못 되었습니다."),
    EMAIL_INPUT_ERROR(HttpStatus.BAD_REQUEST, "AUTH002", "이메일 인증 번호가 잘못되었습니다.");

    private HttpStatus status;
    private String code;
    private final String message;
}
