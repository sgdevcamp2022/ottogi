package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.domain.SuccessMessages;
import devcamp.ottogi.userservice.response.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ResponseService {
    public <T> CommonResponse<Object> getSuccessResponse(SuccessMessages msg, T data){
        return CommonResponse.builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message(msg.getMessage())
                .data(data)
                .build();
    }
}
