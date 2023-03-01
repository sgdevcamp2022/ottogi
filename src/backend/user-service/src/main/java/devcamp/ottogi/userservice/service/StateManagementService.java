package devcamp.ottogi.userservice.service;

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

    public void sendLoginState(String userId){
        log.info("로그인 state 날리기 [IN] userId : {}", userId);
        sendStatus(userId, "", "1", "login", HttpMethod.POST);
        log.info("로그인 state 날리기 [DONE] userId : {}", userId);
    }

    public void sendLogoutState(String userId){
        log.info("로그아웃 state 날리기 [IN] userId : {}", userId);
        sendStatus(userId, "", "0", "logout", HttpMethod.POST);
        log.info("로그아웃 state 날리기 [DONE] userId : {}", userId);
    }

    public void sendStatus(String userId, String channelId, String status, String path, HttpMethod method){
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("userId", userId);
        params.add("channelId", channelId);
        params.add("status", status);

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
