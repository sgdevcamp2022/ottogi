package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageSaveDto {

    private String channelId;
    private ChatType type;
    private String userId;
    private String name;
    private String message;
    private LocalDateTime created_at = LocalDateTime.now();


    public MessageSaveDto convertDto(MessageRequestDto messageRequestDto){
        return MessageSaveDto.builder()
                .type(messageRequestDto.getType())
                .channelId(messageRequestDto.getChannelId())
                .userId(messageRequestDto.getUserId())
                .name(messageRequestDto.getName())
                .message(messageRequestDto.getMessage())
                .build();
    }

    public String print(){
        return ("[channelId : " + channelId + "], [ChatType : "  + type + "], [communityUserId : " + userId +
                "], [name : " + name + "], [message : " + message + "], [created_at : " + created_at + "]");
    }


}
