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
    private String email;
    private String name;
    private String introduction;
    private String profileImagePath;
    private String profileImageName;
    private LocalDateTime createdAt;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .name(member.getName())
                .introduction(member.getIntroduction())
                .profileImagePath(member.getProfileImagePath())
                .profileImageName(member.getProfileImageName())
                .createdAt(member.getCreatedAt())
                .build();
    }
}