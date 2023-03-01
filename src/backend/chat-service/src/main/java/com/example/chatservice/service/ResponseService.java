package com.example.chatservice.service;

import com.example.chatservice.domain.TextMessages;
import com.example.chatservice.response.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

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
