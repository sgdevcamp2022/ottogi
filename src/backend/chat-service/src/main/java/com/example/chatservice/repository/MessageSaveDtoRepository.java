package com.example.chatservice.repository;

import com.example.chatservice.domain.MessageListSaveDto;
import com.example.chatservice.domain.MessageSaveDto;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


/**
 *  Chat Date Store Strategy
 *  Key : ChannelId
 *
 *  Value : MessageListDto
 *           - List<MessageSaveDto>
 *  Value : List<MessageSaveDto>
 *
 *  조회 -> findById
 *  저장 -> 조회 first, 데이터 받아 온 후 insert and Save
 *
 */
public interface MessageSaveDtoRepository extends CrudRepository<MessageListSaveDto, String> {

}
