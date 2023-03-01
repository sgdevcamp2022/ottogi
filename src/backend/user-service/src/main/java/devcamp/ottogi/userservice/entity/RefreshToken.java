package devcamp.ottogi.userservice.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@RedisHash("refresh_token")
public class RefreshToken {

    @Id
    private String key; // member Id 값이 들어감
    private String value; // Refresh Token String 들어감

    @Builder
    public RefreshToken(String key, String value) {
        this.key = key;
        this.value = value;
    }
}
