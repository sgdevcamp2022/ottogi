package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.domain.FriendState;
import devcamp.ottogi.userservice.dto.MemberResponseDto;
import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.repository.FriendRepository;
import devcamp.ottogi.userservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static devcamp.ottogi.userservice.domain.FriendState.*;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final FriendRepository friendRepository;

    public MemberResponseDto findMemberInfoById(Long memberId){
        return memberRepository.findById(memberId)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    public MemberResponseDto findMemberInfoByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    public String addFriend(Long userId, String email){
        Member user_one = memberRepository.findMemberById(userId);
        log.info("user_one id : {}",user_one.getId());

        Member user_two = memberRepository.findMemberByEmail(email);
        log.info("user_two id : {}",user_two.getId());

        friendRepository.save(new Friend(user_one, user_two, REQUEST));
        friendRepository.save(new Friend(user_two, user_one, WAIT));

        return "성공!";
    }

    public String showFriendRequests(Long userId){


        return "친구 신청 받기 완료!";
    }

}
