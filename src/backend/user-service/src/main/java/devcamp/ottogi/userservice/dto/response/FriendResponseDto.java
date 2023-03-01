package devcamp.ottogi.userservice.dto.response;

import devcamp.ottogi.userservice.domain.FriendState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FriendResponseDto {
    private Long userId;
    private String name;
    private String email;
    private FriendState friendState;
    private String channelId;
    private String profileImagePath;
    private LocalDateTime createdAt;
}
