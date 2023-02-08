package com.example.chatservice.controller;

import com.example.chatservice.domain.ChatEnterDto;
import com.example.chatservice.domain.MessageRequestDto;
import com.example.chatservice.domain.MessageSaveDto;
import com.example.chatservice.service.ChatRedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final ChatRedisService chatRedisService;

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
    public void message_topic(@Payload MessageRequestDto messageRequestDto, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("messageRequestDto = " + messageRequestDto.getName());
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장
        chatRedisService.addChat(messageRequestDto);
        System.out.println("저장 통과");

        simpMessageSendingOperations.convertAndSend("/topic/"
                + messageRequestDto.getChannelId(), messageRequestDto.getMessage());
    }

    @MessageMapping("/chat_queue")
    public void message_queue(@Payload MessageSaveDto message, SimpMessageHeaderAccessor headerAccessor) {
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장

        simpMessageSendingOperations.convertAndSend("/queue/"
         + message.getChannelId(), message);
    }

    // 커뮤니티에 가입했을 때 발생되어야 할 메세지
    @PostMapping("/chat_enter")
    public void chat_enter(@RequestBody ChatEnterDto chatEnterDto){
        chatRedisService.enterChat(chatEnterDto);

        simpMessageSendingOperations.convertAndSend("/topic/"
                        + chatEnterDto.getChannelId(), chatEnterDto.getName() + " 님이 커뮤니티에 함께합니다!");
    }



    @GetMapping("/chats")
    public void chats(HttpServletRequest request, String channelId, LocalDateTime joined_at){
        // 해당방의 joined_at 뒤의 데이터들을 모두 가져온다.
    }


}
