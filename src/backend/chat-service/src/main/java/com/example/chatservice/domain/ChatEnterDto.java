package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
public class ChatEnterDto {
    private Long userId;
    private String name;
    private String channelId;
}
