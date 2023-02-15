package devcamp.ottogi.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberModifyRequestDto {
    private String email;
    private String name;
    private String password;
    private String introduction;
    private String originalPassword;
}
