package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.dto.request.MemberModifyRequestDto;
import devcamp.ottogi.userservice.dto.response.FriendResponseDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.exception.ApiException;
import devcamp.ottogi.userservice.exception.ErrorCode;
import devcamp.ottogi.userservice.repository.FriendRepository;
import devcamp.ottogi.userservice.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static devcamp.ottogi.userservice.domain.FriendState.*;
import static devcamp.ottogi.userservice.exception.ErrorCode.*;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final FriendRepository friendRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDto findMemberInfoById(Long memberId){
        return memberRepository.findById(memberId)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
    }

    public MemberResponseDto findMemberInfoByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
    }

    public String addFriend(Long userId, String email){
        Member sender = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        log.info("sender Id : {}",sender.getId());

        Member receiver = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        log.info("receiver Id : {}",receiver.getId());

        if(friendRepository.existFriendRow(sender.getId(), receiver.getId()).isEmpty()){
            throw new ApiException(DUPLICATED_FRIEND);
        }

        friendRepository.save(new Friend(sender, receiver, REQUEST));
        friendRepository.save(new Friend(receiver, sender, WAIT));

        return "OK";
    }

    public List<FriendResponseDto> showFriend(Long userId){
        List<Friend> friendList = friendRepository.findFriends(userId)
                .orElseThrow(() -> new ApiException(NO_SHOW_FRIENDS));

        List<FriendResponseDto> friendResponseDtoList = new ArrayList<>();

        for (Friend friend : friendList) {
            friendResponseDtoList.add(new FriendResponseDto().builder()
                    .receiver(friend.getReceiver().getEmail())
                    .friendState(friend.getState())
                    .build());
        }

        return friendResponseDtoList;
    }

    public String acceptFriend(Long userId, String email){
        Member receiver = memberRepository.findByEmail(email)
                        .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        log.info("user Id : {} , receiver Id : {}", userId, receiver.getId());
        Friend friendRow_one = friendRepository.findFriendRow(userId, receiver.getId())
                .orElseThrow(() -> new ApiException(NO_FRIEND_REQUEST));

        Friend friendRow_two = friendRepository.findFriendRow(receiver.getId(), userId)
                .orElseThrow(() -> new ApiException(NO_FRIEND_REQUEST));

        friendRow_one.stateModify(ACCEPTED);
        friendRow_two.stateModify(ACCEPTED);

        return "OK";
    }

    public String rejectFriend(Long userId, String email){
        Member receiver = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        log.info("user Id : {} , receiver Id : {}", userId, receiver.getId());

        friendRepository.deleteFriendRow(userId, receiver.getId());
        friendRepository.deleteFriendRow(receiver.getId(), userId);

        return "OK";
    }

    public String userDelete(Long userId) {
        memberRepository.deleteMemberById(userId);
        return "OK";
    }

    public String userNameModify(Long userId, String newName){
        Member member = memberRepository.findById(userId)
                        .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
        member.nameModify(newName);

        return "OK";
    }

    public String userPasswordModify(Long userId, String newPassword){
        Member member = memberRepository.findById(userId)
                        .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
        member.passwordModify(passwordEncoder.encode(newPassword));

        return "OK";
    }


}
