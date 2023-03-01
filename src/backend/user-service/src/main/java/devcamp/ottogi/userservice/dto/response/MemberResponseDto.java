package devcamp.ottogi.userservice.dto.response;

import devcamp.ottogi.userservice.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private Long id;
    private String email;
    private String name;
    private String introduction;
    private String profileImagePath;
    private LocalDateTime createdAt;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .introduction(member.getIntroduction())
                .profileImagePath(member.getProfileImagePath())
                .createdAt(member.getCreatedAt())
                .build();
    }
}
