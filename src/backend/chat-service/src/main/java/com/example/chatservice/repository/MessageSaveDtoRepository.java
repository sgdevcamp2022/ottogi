package com.example.chatservice.repository;

import com.example.chatservice.domain.MessageSaveDto;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MessageSaveDtoRepository extends CrudRepository<MessageSaveDto, String> {
}
