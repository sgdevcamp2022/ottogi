package com.example.chatservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TextMessages {

    CHAT_VIEW_SUCCESS("채팅 조회 완료."),
    CHAT_EMPTY_VIEW_SUCCESS("채팅 조회 완료, 데이터가 없습니다."),
    WELCOME_MSG_SUCCESS("웰컴 메세지 전송 완료"),
    CHAT_SEND_SUCCESS("채팅 전송 완료"),
    INVITE_MSG_SUCCESS("초대장 메세지 전송 완료"),
    CHANNEL_JOIN_SUCCESS("채널 이동 완료");

    private String message;
}
