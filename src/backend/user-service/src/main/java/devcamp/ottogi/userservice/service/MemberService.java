package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.domain.FriendState;
import devcamp.ottogi.userservice.dto.FriendRequestDto;
import devcamp.ottogi.userservice.dto.FriendResponseDto;
import devcamp.ottogi.userservice.dto.MemberResponseDto;
import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.repository.FriendRepository;
import devcamp.ottogi.userservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
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
        Member sender = memberRepository.findMemberById(userId);
        log.info("user_one id : {}",sender.getId());

        Member receiver = memberRepository.findMemberByEmail(email);
        log.info("user_two id : {}",receiver.getId());

        friendRepository.save(new Friend(sender, receiver, REQUEST));
        friendRepository.save(new Friend(receiver, sender, WAIT));

        return "성공!";
    }

    public List<FriendResponseDto> showFriend(Long userId){
        List<Friend> friendList = friendRepository.findFriends(userId);

        List<FriendResponseDto> friendResponseDtoList = new ArrayList<>();

        for (Friend friend : friendList) {
            friendResponseDtoList.add(new FriendResponseDto().builder()
                    .receiver(friend.getReceiver().getEmail())
                    .friendState(friend.getState())
                    .build());
        }

        return friendResponseDtoList;
    }

}
