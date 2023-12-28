package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.model.Chat;
import com.triquang.model.Message;
import com.triquang.model.User;
import com.triquang.repository.ChatRepository;
import com.triquang.repository.MessageRepository;
import com.triquang.service.ChatService;
import com.triquang.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {
	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ChatRepository chatRepository;

	@Override
	public Message createMessage(User user, Integer chatId, Message req) {
		Message message = new Message();
		Chat chat = chatService.findChatById(chatId);
		message.setChat(chat);
		message.setContent(req.getContent());
		message.setImage(req.getImage());
		message.setUser(user);
		message.setCreateAt(LocalDateTime.now());

		Message savedMessage = messageRepository.save(message);
		chat.getMessages().add(savedMessage);
		chatRepository.save(chat);
		return savedMessage;
	}

	@Override
	public List<Message> findChatsMessages(Integer chatId) {
		return messageRepository.findByChatId(chatId);
	}

}
