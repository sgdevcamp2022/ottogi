package com.example.chatservice.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatViewDto {
    private String channelId;
    private String communityUserId;
    private LocalDateTime joined_at;
}
