package devcamp.ottogi.userservice.service;

import lombok.RequiredArgsConstructor;
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
public class StateManagementService {

    @Value("${state-management-url}")
    private String STATE_MANAGEMENT_URI;

    public void sendLoginState(String userId){
        sendStatus(userId, "", "1");
    }

    public void sendLogoutState(String userId){
        sendStatus(userId, "", "0");
    }

    public void sendStatus(String userId, String channelId, String status){
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
                STATE_MANAGEMENT_URI,
                HttpMethod.POST,
                entity,
                String.class
        );
    }


}
