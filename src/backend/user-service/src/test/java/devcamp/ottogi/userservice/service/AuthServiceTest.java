package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.dto.TokenDto;
import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberRegisterRequestDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@RequiredArgsConstructor
@Slf4j
@SpringBootTest
public class AuthServiceTest {

    @Autowired
    private AuthService authService;
    @Autowired
    private MemberService memberService;

    @BeforeEach
    void 데이터_초기화(){

        MemberRegisterRequestDto member1 =
                new MemberRegisterRequestDto("test@test.com", "12345678", "테스터");

        MemberRegisterRequestDto member2 =
                new MemberRegisterRequestDto("whipbaek@gmail.com", "12345678", "종인");

        authService.register(member1);
        authService.register(member2);
    }

    @AfterEach
    void 데이터_삭제(){
        memberService.userDelete(1L);
        memberService.userDelete(2L);
    }


    @DisplayName("회원가입 테스트")
    @Test
    void 회원가입_테스트(){
        MemberResponseDto memberInfoByEmail = memberService.findMemberInfoByEmail("whipbaek@gmail.com");
        assertThat("종인").isEqualTo(memberInfoByEmail.getName());

        assertThatThrownBy(() -> memberService.findMemberInfoByEmail("liarData@gmail.com"))
                .isInstanceOf(ApiException.class);

    }

    @DisplayName("로그인 테스트")
    @Test
    void 로그인_테스트(){
        MemberLoginRequestDto memberLoginRequestDto = new MemberLoginRequestDto("whipbaek@gmail.com", "12345678");
        TokenDto login = authService.login(memberLoginRequestDto);

        MemberLoginRequestDto memberLoginRequestDtoWrong = new MemberLoginRequestDto("whipbaek@gmail.com", "88888888");

        assertThatThrownBy(() -> authService.login(memberLoginRequestDtoWrong))
                .isInstanceOf(ApiException.class);
    }
}
