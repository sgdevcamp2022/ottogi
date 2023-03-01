package com.example.chatservice.service;

import com.example.chatservice.domain.*;
import com.example.chatservice.repository.MessageSaveDtoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisService {



    private final MessageSaveDtoRepository repository;

    public void addChat(MessageRequestDto messageRequestDto){
        MessageSaveDto messageSaveDto = new MessageSaveDto().convertDto(messageRequestDto);

        Optional<MessageListSaveDto> channelData = repository.findById(messageSaveDto.getChannelId());
        saveChat(channelData, messageSaveDto);

    }

    public void saveChat(Optional<MessageListSaveDto> channelData, MessageSaveDto messageSaveDto){
        if(channelData.isPresent()){
            MessageListSaveDto messageListSaveDto = channelData.get();
            messageListSaveDto.saveNewMessage(messageSaveDto);
            repository.save(messageListSaveDto);
        } else{
            MessageListSaveDto messageListSaveDto = new MessageListSaveDto(messageSaveDto);
            repository.save(messageListSaveDto);
        }
    }

    public List<MessageSaveDto> chats(ChatViewDto chatViewDto) {
        MessageListSaveDto channelData = repository.findById(chatViewDto.getChannelId())
                .orElseThrow(() -> new RuntimeException("채팅 데이터가 존재하지 않습니다."));
        List<MessageSaveDto> messageSaveDtoList = channelData.getMessageSaveDtoList();
        List<MessageSaveDto> chatMessages = new ArrayList<>();
        for (MessageSaveDto messageSaveDto : messageSaveDtoList) {
                chatMessages.add(messageSaveDto);
        }
        return  chatMessages;
    }

    public void quitChat(MessageSaveDto messageDto) {

    }



}
