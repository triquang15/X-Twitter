package com.triquang.service;

import java.util.List;

import com.triquang.model.Message;
import com.triquang.model.User;

public interface MessageService {
	public Message createMessage(User user, Integer chatId, Message message);
	public List<Message> findChatsMessages(Integer chatId);
}
