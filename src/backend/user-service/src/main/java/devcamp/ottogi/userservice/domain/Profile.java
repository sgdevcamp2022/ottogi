package devcamp.ottogi.userservice.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Profile {
    private String introduction;
    private String profileImage;
}
