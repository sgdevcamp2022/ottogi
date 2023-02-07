package com.example.chatservice.controller;

import com.example.chatservice.domain.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    /**
     * - Subscribe
     *   /topic/channelId
     *
     * - Controller (Message Handling)
     *   /pub/hello_topic
     *    -> Message Handling & publish message /topic/channelId
     */

    // Stomp를 활용하면 message broker 를 거치는 Handler 를 Controller 로 쉽게 구현할 수 있다.
    @MessageMapping("/hello_queue")
    public void message_queue(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {

        // 유저의 정보를 세션에 저장해준다.
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        simpMessageSendingOperations.convertAndSend("/queue/"
         + message.getChannelId(), message);
    }

    @MessageMapping("/hello_topic")
    public void message_topic(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        simpMessageSendingOperations.convertAndSend("/topic/"
                + message.getChannelId(), message);
    }
}
