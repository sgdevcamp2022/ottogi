package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

import static com.example.chatservice.domain.ChatType.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageSaveDto {

    private String channelId;
    private ChatType type;
    private Long Id;
    private String name;
    private String message;
    private LocalDateTime created_at = LocalDateTime.now();


    public MessageSaveDto convertDto(MessageRequestDto messageRequestDto){
        return MessageSaveDto.builder()
                .type(TALK)
                .channelId(messageRequestDto.getChannelId())
                .Id(messageRequestDto.getId())
                .name(messageRequestDto.getName())
                .message(messageRequestDto.getMessage())
                .build();
    }

    public void print(){
        System.out.println("[channelId : " + channelId + "], [ChatType : "  + type + "], [Id : " + Id +
                "], [name : " + name + "], [message : " + message + "], [created_at : " + created_at + "]");
    }


}
