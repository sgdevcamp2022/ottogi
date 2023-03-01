package devcamp.ottogi.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberModifyRequestDto {
    private String name;
    private String password;
    private String introduction;
    private String originalPassword;
}
