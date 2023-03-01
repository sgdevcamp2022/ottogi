package devcamp.ottogi.userservice.service;

import com.netflix.discovery.converters.Auto;
import devcamp.ottogi.userservice.dto.request.MemberLoginRequestDto;
import devcamp.ottogi.userservice.dto.request.MemberRegisterRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@RequiredArgsConstructor
@Slf4j
@SpringBootTest
public class MemberServiceTest {

    @Autowired
    private AuthService authService;
    @Autowired
    private MemberService memberService;

    private MemberRegisterRequestDto member1;
    private MemberRegisterRequestDto member2;

    @BeforeEach
    void 데이터_초기화() {
        member1 = new MemberRegisterRequestDto("test@test.com", "12345678", "테스터");

        member2 = new MemberRegisterRequestDto("whipbaek@gmail.com", "12345678", "종인");

        authService.register(member1);
        authService.register(member2);

        authService.login(new MemberLoginRequestDto("whipbaek@gmail.com", "12345678"));

    }

    @AfterEach
    void 데이터_삭제() {
        memberService.userDelete(1L);
        memberService.userDelete(2L);
    }


    @DisplayName("회원 정보 조회")
    @Test
    void 회원정보조회_테스트 (){

    }
}
