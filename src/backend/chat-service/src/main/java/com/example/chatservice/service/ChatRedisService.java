package com.example.chatservice.service;

import com.example.chatservice.domain.*;
import com.example.chatservice.repository.MessageSaveDtoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        chatSave(channelData, messageSaveDto);

    }

    public void chatSave(Optional<MessageListSaveDto> channelData, MessageSaveDto messageSaveDto){
        if(channelData.isPresent()){
//            log.info("채팅방 데이터가 존재합니다, 채팅방 이름 : {}", messageSaveDto.getChannelId());

            MessageListSaveDto messageListSaveDto = channelData.get();

            List<MessageSaveDto> messageSaveDtoList = messageListSaveDto.getMessageSaveDtoList();
//            for (MessageSaveDto saveDto : messageSaveDtoList) {
//                log.info("{}", saveDto.print());
//            }
            messageListSaveDto.saveNewMessage(messageSaveDto);
            repository.save(messageListSaveDto);
        } else{
//            log.info("채팅방 데이터가 없습니다. 채팅방 이름 : {}", messageSaveDto.getChannelId());

            MessageListSaveDto messageListSaveDto = new MessageListSaveDto(messageSaveDto);
            repository.save(messageListSaveDto);
        }
    }

    public List<MessageSaveDto> chats(ChatViewDto chatViewDto) {
        Optional<MessageListSaveDto> channelData = repository.findById(chatViewDto.getChannelId());
        List<MessageSaveDto> messageSaveDtoList = channelData.get().getMessageSaveDtoList();
        List<MessageSaveDto> chatMessages = new ArrayList<>();
        for (MessageSaveDto messageSaveDto : messageSaveDtoList) {
                chatMessages.add(messageSaveDto);
        }
        return  chatMessages;
    }

    public void quitChat(MessageSaveDto messageDto) {

    }



}
