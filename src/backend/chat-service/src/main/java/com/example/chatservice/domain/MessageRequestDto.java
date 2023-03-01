package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;

import static com.example.chatservice.domain.ChatType.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequestDto {

    private String channelId;
    private String userId;
    private String name;
    private String message;
    private ChatType type;
    private String imagePath;
    private LocalDateTime createdAt;

    public MessageRequestDto convertEnterDto(ChatEnterDto chatEnterDto){
        return MessageRequestDto.builder()
                .channelId(chatEnterDto.getChannelId())
                .name(chatEnterDto.getName())
                .type(ENTER)
                .message(chatEnterDto.getName() + " 님이 커뮤니티에 함께 합니다!")
                .build();
    }

    public MessageRequestDto convertInviteDto(InviteRequestDto inviteRequestDto) {
        return MessageRequestDto.builder()
                .channelId(inviteRequestDto.getChannelId())
                .name("OTTOGI")
                .type(INVITE)
                .message(inviteRequestDto.getLinkMessage() + " ," + inviteRequestDto.getSender() +" 님이 " +
                        " 커뮤니티로의 초대장을 보내셨습니다")
                .build();
    }

    public void setCreatedAt(){
        this.createdAt = LocalDateTime.now();
    }

    public void modifyImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
