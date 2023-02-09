package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.example.chatservice.domain.ChatType.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequestDto {

    private String channelId;
    private String communityUserId;
    private String name;
    private String message;
    private ChatType type;


    public MessageRequestDto convertToMessageRequestDto(ChatEnterDto chatEnterDto){
        return MessageRequestDto.builder()
                .channelId(chatEnterDto.getChannelId())
                .communityUserId(chatEnterDto.getCommunityUserId())
                .name(chatEnterDto.getName())
                .type(ENTER)
                .message(chatEnterDto.getName() + " 님이 커뮤니티에 함께 합니다!")
                .build();
    }
}
