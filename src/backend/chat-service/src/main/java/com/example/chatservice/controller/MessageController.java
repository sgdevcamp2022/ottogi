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
     * - queue : Direct Message (1:1)
     * - topic : Chat Rooms
     *
     * - Subscribe
     *   /topic/channelId
     *
     * - Controller (Message Handling)
     *   /pub/chat_topic
     *    -> Message Handling & publish message /topic/channelId
     */

    @MessageMapping("/add_topic")
    public void message_topic(@Payload MessageRequestDto messageRequestDto) {
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장

        chatRedisService.addChat(messageRequestDto);

        simpMessageSendingOperations.convertAndSend("/topic/"
                + messageRequestDto.getChannelId(), messageRequestDto);
    }

    @MessageMapping("/add_queue")
    public void message_queue(@Payload MessageRequestDto messageRequestDto) {
        // Client 에게 채팅을 수신 -> redis 에 데이터 저장
        chatRedisService.addChat(messageRequestDto);

        simpMessageSendingOperations.convertAndSend("/queue/"
                + messageRequestDto.getChannelId(), messageRequestDto);
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

    @GetMapping("/chats")
    public CommonResponse<Object> chats(@RequestBody ChatViewDto chatViewDto){
        return responseService.getSuccessResponse(CHAT_VIEW_SUCCESS, chatRedisService.chats(chatViewDto));
    }

}
