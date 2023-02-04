package devcamp.ottogi.userservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private ErrorCode error;

    public ApiException(ErrorCode error) {
        super(error.getMessage());
        this.error = error;
    }

}
