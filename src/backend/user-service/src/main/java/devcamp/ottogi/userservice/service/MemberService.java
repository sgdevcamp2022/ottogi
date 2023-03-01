package devcamp.ottogi.userservice.service;

import devcamp.ottogi.userservice.dto.response.FriendResponseDto;
import devcamp.ottogi.userservice.dto.response.MemberResponseDto;
import devcamp.ottogi.userservice.entity.Friend;
import devcamp.ottogi.userservice.entity.Member;
import devcamp.ottogi.userservice.exception.ApiException;
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

    public MemberResponseDto findMemberInfoById(Long memberId) {
        return memberRepository.findById(memberId)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
    }

    public MemberResponseDto findMemberInfoByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
    }

    public String addFriend(Long userId, String email) {
        log.info("친구 요청 [IN] userId : {} , To : {}", userId, email);

        Member sender = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));


        Member receiver = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));


        if (friendRepository.existFriendRow(sender.getId(), receiver.getId()).isPresent()) {
            throw new ApiException(DUPLICATED_FRIEND);
        }
        String channelId = sender.getName() + receiver.getName();

        friendRepository.save(new Friend(sender, receiver, REQUEST, channelId));
        friendRepository.save(new Friend(receiver, sender, WAIT, channelId));

        log.info("친구 요청 [DONE] userId {} , To : {}", userId, email);

        return "OK";
    }

    public List<FriendResponseDto> showFriend(Long userId) {

//        log.info("친구 조회 [IN] userId : {}", userId);

        List<Friend> friendList = friendRepository.findFriends(userId)
                .orElseThrow(() -> new ApiException(NO_SHOW_FRIENDS));

        List<FriendResponseDto> friendResponseDtoList = new ArrayList<>();

        for (Friend friend : friendList) {
            friendResponseDtoList.add(new FriendResponseDto().builder()
                    .name(friend.getReceiver().getName())
                    .userId(friend.getReceiver().getId())
                    .email(friend.getReceiver().getEmail())
                    .profileImagePath(friend.getReceiver().getProfileImagePath())
                    .friendState(friend.getState())
                    .channelId(friend.getChannelId())
                    .createdAt(friend.getCreatedAt())
                    .build());
        }

//        log.info("친구 조회 [DONE] userId : {}", userId);

        return friendResponseDtoList;
    }

    public String acceptFriend(Long userId, String email) {

        log.info("친구 승인 [IN] userId : {} , To : {}", userId, email);

        Member receiver = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        Friend friendRow_one = friendRepository.findFriendRow(userId, receiver.getId())
                .orElseThrow(() -> new ApiException(NO_FRIEND_REQUEST));

        Friend friendRow_two = friendRepository.findFriendRow(receiver.getId(), userId)
                .orElseThrow(() -> new ApiException(NO_FRIEND_REQUEST));

        friendRow_one.modifyState(ACCEPTED);
        friendRow_two.modifyState(ACCEPTED);

        friendRow_one.modifyCreatedAt();
        friendRow_two.modifyCreatedAt();

        log.info("친구 승인 [DONE] userId : {} , To : {}", userId, email);

        return "OK";
    }

    public String rejectFriend(Long userId, String email) {

        log.info("친구 거절 [IN] userId : {} , To : {}", userId, email);

        Member receiver = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));


        friendRepository.deleteFriendRow(userId, receiver.getId());
        friendRepository.deleteFriendRow(receiver.getId(), userId);

        log.info("친구 거절 [DONE] userId : {} , To : {}", userId, email);

        return "OK";
    }

    public String userDelete(Long userId) {
        memberRepository.deleteMemberById(userId);
        return "OK";
    }

    public String userNameModify(Long userId, String newName) {

        log.info("이름 변경 [IN] userId : {}, newName : {}", userId, newName);

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
        member.modifyName(newName);

        log.info("이름 변경 [DONE] userId : {}, newName : {}", userId, newName);

        return "OK";
    }

    public String userPasswordModify(Long userId, String newPassword) {
        log.info("비밀번호 변경 [IN] userId : {}, newPassword : {}", userId, newPassword);

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));
        member.modifyPassword(passwordEncoder.encode(newPassword));

        log.info("비밀번호 변경 [DONE] userId : {}, newPassword : {}", userId, newPassword);
        return "OK";
    }


    public String userIntroModify(Long userId, String introduction) {
        log.info("자기소개 변경 [IN] userId : {}, introduction : {}", userId, introduction);
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new ApiException(NO_MEMBER_ERROR));

        member.modifyIntroduction(introduction);
        log.info("자기소개 변경 [DONE] userId : {}, introduction : {}", userId, introduction);

        return "OK";
    }
}
