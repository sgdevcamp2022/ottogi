package com.example.gatewayservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    NO_TOKEN_HEADER(HttpStatus.BAD_REQUEST, "AUTH010", "토큰이 존재하지 않습니다."),
    JWT_INVALID(HttpStatus.BAD_REQUEST, "AUTH011", "잘못된 JWT 서명입니다."),
    JWT_EXPIRED(HttpStatus.BAD_REQUEST, "AUTH012", "만료된 JWT 토큰입니다."),
    JWT_NOT_SUPPORT(HttpStatus.BAD_REQUEST, "AUTH013", "지원되지 않는 JWT 토큰입니다."),
    JWT_ERROR(HttpStatus.BAD_REQUEST, "AUTH014", "JWT 토큰이 잘못되었습니다.");

    private HttpStatus status;
    private String code;
    private final String message;
}
