package com.example.chatservice.service;

import com.example.chatservice.domain.ChatEnterDto;
import com.example.chatservice.domain.MessageListSaveDto;
import com.example.chatservice.domain.MessageRequestDto;
import com.example.chatservice.domain.MessageSaveDto;
import com.example.chatservice.repository.MessageSaveDtoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.chatservice.domain.ChatType.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisService {

    private final MessageSaveDtoRepository repository;

    public void enterChat(ChatEnterDto chatEnterDto){

        MessageSaveDto messageSaveDto = MessageSaveDto.builder()
                .type(ENTER)
                .channelId(chatEnterDto.getChannelId())
                .Id(chatEnterDto.getUserId())
                .name(chatEnterDto.getName())
                .message(chatEnterDto.getName() + " 님이 커뮤니티에 함께합니다!")
                .build();

//        Optional<List<MessageSaveDto>> channelData = repository.findById(messageSaveDto.getChannelId());
//
//        if(channelData.isPresent()){
//            List<MessageSaveDto> messageSaveDtoList = channelData.get();
//            messageSaveDtoList.add(messageSaveDto);
//            repository.save(messageSaveDtoList);
//        } else{
//            List<MessageSaveDto> messageSaveDtoList = new ArrayList<>();
//            messageSaveDtoList.add(messageSaveDto);
//            repository.save(messageSaveDtoList);
//        }
    }

    public void addChat(MessageRequestDto messageRequestDto){
        MessageSaveDto messageSaveDto = new MessageSaveDto().convertDto(messageRequestDto);

        System.out.println("데이터 찾기전");
        Optional<MessageListSaveDto> channelData = repository.findById(messageSaveDto.getChannelId());
        System.out.println("데이터 찾음");

        if(channelData.isPresent()){
            System.out.println("데이터가 있습니다.");
            MessageListSaveDto messageListSaveDto = channelData.get();

            List<MessageSaveDto> messageSaveDtoList = messageListSaveDto.getMessageSaveDtoList();
            for (MessageSaveDto saveDto : messageSaveDtoList) {
                saveDto.print();
            }

            messageListSaveDto.saveNewMessage(messageSaveDto);
            repository.save(messageListSaveDto);
        } else{
            System.out.println("데이터가 없습니다.");
            MessageListSaveDto messageListSaveDto = new MessageListSaveDto(messageSaveDto);
            repository.save(messageListSaveDto);
        }
    }

    public void quitChat(MessageSaveDto messageDto) {

    }



}
