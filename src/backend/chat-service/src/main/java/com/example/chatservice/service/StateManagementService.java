package com.example.chatservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class StateManagementService {

    @Value("${state-management-url}")
    private String STATE_MANAGEMENT_URI;

    public void sendChannelInState(String userId, String channelId, String sessionId){

        log.info("Channel CONNECT [IN] userId : {}, channelId : {}, sessionId : {}",
                userId, channelId, sessionId);

        sendStatus(userId, channelId, sessionId, "connect", HttpMethod.POST);


        log.info("Channel CONNECT [DONE] userId : {}, channelId : {}, sessionId : {}",
                userId, channelId, sessionId);
    }

    public void sendChannelOutState(String userId, String channelId, String sessionId){

        log.info("Channel DISCONNECT [IN] sessionId : {}", sessionId);

        sendStatus(userId, channelId, sessionId, "disconnect",HttpMethod.DELETE);

        log.info("Channel DISCONNECT [DONE] sessionId : {}", sessionId);
    }

    public void sendStatus(String userId, String channelId, String sessionId, String path, HttpMethod method){
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("userId", userId);
        params.add("channelId", channelId);
        params.add("sessionId", sessionId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        //RestTemplate 초기화
        RestTemplate rt = new RestTemplate();

        //전송 및 결과 처리
        ResponseEntity<String> response = rt.exchange(
                STATE_MANAGEMENT_URI + path,
                method,
                entity,
                String.class
        );
    }


}
