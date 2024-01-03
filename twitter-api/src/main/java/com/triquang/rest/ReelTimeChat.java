package com.triquang.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.model.Message;

@RestController
public class ReelTimeChat {
	
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@MessageMapping("/chat/{groupId}")
	public Message sendToUser(@Payload Message message,@DestinationVariable String groupId) {
		messagingTemplate.convertAndSendToUser(groupId, "/private", message);
		
		return message;
		
	}
	
}
