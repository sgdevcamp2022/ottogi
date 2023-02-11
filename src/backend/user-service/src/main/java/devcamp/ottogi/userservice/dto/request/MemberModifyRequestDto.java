package devcamp.ottogi.userservice.dto.request;

import lombok.Getter;

@Getter
public class MemberModifyRequestDto {
    private String name;
    private String password;
    private String introduction;
}
