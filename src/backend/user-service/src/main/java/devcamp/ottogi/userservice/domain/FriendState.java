package devcamp.ottogi.userservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FriendState {

    REQUEST("친구 신청 보냄"),
    WAIT("친구 승인 기다림"),
    ACCEPTED("친구 승인됨"),
    BAN("친구 차단됨");

    private String state;
}
