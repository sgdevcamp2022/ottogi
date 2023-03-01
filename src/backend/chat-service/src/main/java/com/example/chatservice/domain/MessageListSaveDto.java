package com.example.chatservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "channelId")
public class MessageListSaveDto {

    @Id
    private String channelId;
    private List<MessageSaveDto> messageSaveDtoList;

    public void saveNewMessage(MessageSaveDto messageSaveDto) {
        messageSaveDtoList.add(messageSaveDto);
    }

    public MessageListSaveDto(MessageSaveDto messageSaveDto) {
        channelId = messageSaveDto.getChannelId();
        messageSaveDtoList = new ArrayList<>();
        messageSaveDtoList.add(messageSaveDto);
    }
}
