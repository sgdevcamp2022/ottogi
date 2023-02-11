package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.exception.ErrorCode;
import devcamp.ottogi.userservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

import static devcamp.ottogi.userservice.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;
    private String authCode;

    public String makeAuthCode(){
        Random random = new Random();
        StringBuffer tempCode = new StringBuffer();
        for(int i=0; i<7; i++){
            tempCode.append(random.nextInt(10));
        }
        authCode = tempCode.toString();
        return authCode;
    }

    public void sendSimpleMessage(String email) {
        System.out.println("email = " + email);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("whipbaek@gmail.com");
        message.setTo(email);
        message.setSubject("Ottogi 회원가입 인증 메일입니다.");
        message.setText("❄⛄ 인증코드는 " + makeAuthCode() + " 입니다. ");
        javaMailSender.send(message);
    }

    public boolean validateCodeNumber(String emailNumber) {
        log.info("emailNumber = {}", emailNumber);
        log.info("authcode : = {}", authCode);
        if(emailNumber.equals(authCode)){
            return true;
        }
        return false;
    }

    public void emailConfirmSuccess(String userEmail) {
        Member member = memberRepository.findByEmail(userEmail)
                        .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
        member.setStatus(1);
        memberRepository.save(member);
    }
}
