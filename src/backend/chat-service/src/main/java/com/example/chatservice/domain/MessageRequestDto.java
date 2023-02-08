package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequestDto {
    private String channelId;
    private Long Id;
    private String name;
    private String message;
}
