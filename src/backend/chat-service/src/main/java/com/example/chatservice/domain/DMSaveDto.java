package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class DMSaveDto {
    private String channelId;
    private String userId;
    private String name;
    private String message;
    private LocalDateTime created_at = LocalDateTime.now();

}
