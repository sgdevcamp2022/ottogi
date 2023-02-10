package com.example.chatservice.controller;

import com.example.chatservice.domain.*;
import com.example.chatservice.response.CommonResponse;
import com.example.chatservice.service.ChatRedisService;
import com.example.chatservice.service.ResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.example.chatservice.domain.TextMessages.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
@CrossOrigin
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatRedisService chatRedisService;
    private final ResponseService responseService;

    /**
     *
     * - queue 1:1
     * - topic 1:N
     *
     * - Subscribe
     *   /topic/channelId
     *
     * - Controller (Message Handling)
     *   /pub/chat_topic
     *    -> Message Handling & publish message /topic/channelId
     */

    // Stomp를 활용하면 message broker 를 거치는 Handler 를 Controller 로 쉽게 구현할 수 있다.
    @MessageMapping("/add_topic")
    public void message_topic(@Payload MessageRequestDto messageRequestDto) {
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장

        chatRedisService.addChat(messageRequestDto);
        log.info("채널명 : {}, 발신자 : {}",messageRequestDto.getChannelId(), messageRequestDto.getName());
        log.info("채팅 데이터 저장 완료");


        simpMessageSendingOperations.convertAndSend("/topic/"
                + messageRequestDto.getChannelId(), messageRequestDto);
        log.info("채팅 데이터 전송 완료");
    }

    @MessageMapping("/add_queue")
    public void message_queue(@Payload MessageRequestDto messageRequestDto) {
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장
        chatRedisService.addChat(messageRequestDto);
        log.info("채널명 : {}, 발신자 : {}",messageRequestDto.getChannelId(), messageRequestDto.getName());
        log.info("채팅 데이터 저장 완료");

        simpMessageSendingOperations.convertAndSend("/queue/"
                + messageRequestDto.getChannelId(), messageRequestDto.getMessage());
    }

    // 커뮤니티에 가입했을 때 발생되어야 할 메세지
    @PostMapping("/community_enter")
    public CommonResponse<Object> communityEnter(@RequestBody ChatEnterDto chatEnterDto){
        MessageRequestDto messageRequestDto = new MessageRequestDto().convertToMessageRequestDto(chatEnterDto);
        message_topic(messageRequestDto);
        return responseService.getSuccessResponse(WELCOME_MSG_SUCCESS, null);
    }

    @GetMapping("/test")
    public String test(){
        return "채팅 서버 테스트 성공";
    }

    @PostMapping("/channel_enter")
    public CommonResponse<Object> channelEnter() {
        return responseService.getSuccessResponse(CHANNEL_JOIN_SUCCESS, null);
    }

    @GetMapping("/chats")
    public CommonResponse<Object> chats(@RequestBody ChatViewDto chatViewDto){
        // 해당방의 joined_at 뒤의 데이터들을 모두 가져온다.
        return responseService.getSuccessResponse(CHAT_VIEW_SUCCESS, chatRedisService.chats(chatViewDto));
    }


}
