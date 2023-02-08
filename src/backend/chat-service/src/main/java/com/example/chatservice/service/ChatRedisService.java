package com.example.chatservice.service;

import com.example.chatservice.domain.ChatEnterDto;
import com.example.chatservice.domain.MessageRequestDto;
import com.example.chatservice.domain.MessageSaveDto;
import com.example.chatservice.repository.MessageSaveDtoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.example.chatservice.domain.ChatType.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisService {

    private final RedisTemplate<String, MessageSaveDto> redisTemplate;
    private final MessageSaveDtoRepository repository;


    public void enterChat(ChatEnterDto chatEnterDto){

        MessageSaveDto messageSaveDto = MessageSaveDto.builder()
                .type(ENTER)
                .channelId(chatEnterDto.getChannelId())
                .Id(chatEnterDto.getUserId())
                .name(chatEnterDto.getName())
                .message(chatEnterDto.getName() + " 님이 커뮤니티에 함께합니다!")
                .build();

        repository.save(messageSaveDto);
        Optional<MessageSaveDto> byId = repository.findById(messageSaveDto.getChannelId());
        System.out.println(byId);
//        redisTemplate.opsForValue().set(messageDto.getChannelId(), messageDto);
    }

    public void addChat(MessageRequestDto messageRequestDto){
        MessageSaveDto messageSaveDto = new MessageSaveDto().convertDto(messageRequestDto);
        repository.save(messageSaveDto);
        Optional<MessageSaveDto> messageSaveDtoData = repository.findById(messageSaveDto.getChannelId());
        MessageSaveDto messageSaveDto1 = messageSaveDtoData.get();
        System.out.println("messageSaveDto1.getMessage() = " + messageSaveDto1.getMessage());
        System.out.println("messageSaveDto1.getName() = " + messageSaveDto1.getName());
        System.out.println("messageSaveDto1.getChannelId() = " + messageSaveDto1.getChannelId());


//        redisTemplate.opsForValue().set(messageSaveDto.getChannelId(), messageSaveDto);
    }

    public void quitChat(MessageSaveDto messageDto) {

    }



}
