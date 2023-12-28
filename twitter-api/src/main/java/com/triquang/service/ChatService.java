package com.triquang.service;

import java.util.List;

import com.triquang.model.Chat;
import com.triquang.model.User;

public interface ChatService {
	
	public Chat createChat(User user1, User user2);

	public Chat findChatById(Integer chatId);

	public List<Chat> findUserChat(Integer userId);
}
