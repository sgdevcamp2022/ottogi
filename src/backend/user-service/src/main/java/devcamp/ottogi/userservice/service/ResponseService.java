package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.domain.TextMessages;
import devcamp.ottogi.userservice.response.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class ResponseService {
    public <T> CommonResponse<Object> getSuccessResponse(TextMessages msg, T data){
        return CommonResponse.builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message(msg.getMessage())
                .data(data)
                .build();
    }
}
