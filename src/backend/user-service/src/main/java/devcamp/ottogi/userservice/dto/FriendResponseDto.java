package devcamp.ottogi.userservice.dto;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FriendResponseDto {
    private String receiver;
    private FriendState friendState;
}
