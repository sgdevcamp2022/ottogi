package devcamp.ottogi.userservice.dto.request;

import devcamp.ottogi.userservice.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static devcamp.ottogi.userservice.entity.Member.Authority.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRegisterRequestDto {

    private String email;
    private String password;
    private String name;

    public MemberRegisterRequestDto(MemberRegisterRequestDto memberRequestDto) {
        this.email = memberRequestDto.getEmail();
        this.password = memberRequestDto.getPassword();
        this.name = memberRequestDto.getName();
    }

    public Member toMember(PasswordEncoder passwordEncoder, String imagePath) {

        System.out.println("imagePath = " + imagePath);

        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .status(1)
                .introduction("")
                .profileImagePath(imagePath)
                .authority(ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
