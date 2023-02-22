package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InviteRequestDto {
    private String sender;
    private String channelId;
    private String linkMessage;
}
