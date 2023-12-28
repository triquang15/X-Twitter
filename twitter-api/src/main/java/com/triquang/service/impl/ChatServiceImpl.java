package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.ChatException;
import com.triquang.model.Chat;
import com.triquang.model.User;
import com.triquang.repository.ChatRepository;
import com.triquang.service.ChatService;

@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Chat createChat(User user1, User user2) {
		Chat isExist = chatRepository.findChatByUserId(user1, user2);
		if (isExist != null) {
			return isExist;
		}
		Chat chat = new Chat();
		chat.getUsers().add(user2);
		chat.getUsers().add(user1);
		chat.setCreateAt(LocalDateTime.now());
		return chatRepository.save(chat);
	}

	@Override
	public Chat findChatById(Integer chatId) {
		Optional<Chat> optional = chatRepository.findById(chatId);
		if (optional.isEmpty()) {
			throw new ChatException("Chat not found with ID: " + chatId);
		}
		return optional.get();
	}

	@Override
	public List<Chat> findUserChat(Integer userId) {
		return chatRepository.findByUsersId(userId);
	}

}
