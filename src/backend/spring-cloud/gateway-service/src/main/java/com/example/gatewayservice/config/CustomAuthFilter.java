package com.example.gatewayservice.config;

import com.example.gatewayservice.exception.ApiException;
import com.example.gatewayservice.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;

import static com.example.gatewayservice.exception.ErrorCode.*;

@Slf4j
@Component
public class CustomAuthFilter extends AbstractGatewayFilterFactory<CustomAuthFilter.Config> {

    @Value("${jwt.secret}")
    private String secretKey;
    private Key key;

    public CustomAuthFilter(){
        super(Config.class);

    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            setKey();
            ServerHttpRequest request = exchange.getRequest();

            // Request Header 에 token 이 존재하지 않을때
            if(!request.getHeaders().containsKey("Authorization")){
                try {
                    return handleUnAuthorize(exchange, NO_TOKEN_HEADER);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }

            log.info(request.getHeaders().get("Authorization").toString());
            log.info(request.getHeaders().get("Authorization").toString().substring(7));


            String jwt = request.getHeaders().get("Authorization").get(0).substring(7);

            ErrorCode errorCode = validateToken(jwt);

            if(errorCode != null){
                try {
                    log.info("에러 발생!");
                    log.info(errorCode.getMessage());
                    return handleUnAuthorize(exchange, errorCode);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }

            //토큰 정보 가져옴.
            String id = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody().getSubject();

            //옳게된 토큰이라면 header에 정보를 추가해줌
            ServerHttpRequest req = exchange.getRequest().mutate().header("id", String.valueOf(id)).build();

            return chain.filter(exchange.mutate().request(req).build());
        });

    }

    public ErrorCode validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return null;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info(e.getMessage());
            return JWT_INVALID;
        } catch (ExpiredJwtException e) {
            return JWT_EXPIRED;
        } catch (UnsupportedJwtException e) {
            return JWT_NOT_SUPPORT;
        } catch (IllegalArgumentException e) {
            return JWT_ERROR;
        }
    }

    private void setKey(){
        key = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretKey));
    }

    private Mono<Void> handleUnAuthorize(ServerWebExchange exchange, ErrorCode errorCode) throws JsonProcessingException {
        ServerHttpResponse response = exchange.getResponse();

        ObjectMapper objectMapper = new ObjectMapper();

        response.setStatusCode(errorCode.getStatus());
        DataBuffer dataBuffer = response.bufferFactory().
                wrap(objectMapper.writeValueAsBytes(new ApiException(errorCode.getCode(), errorCode.getMessage())));

        return response.writeWith(Mono.just(dataBuffer));
    }

    public static class Config{

    }
}
