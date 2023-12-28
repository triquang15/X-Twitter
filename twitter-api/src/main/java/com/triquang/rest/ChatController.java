package com.triquang.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.model.Chat;
import com.triquang.model.User;
import com.triquang.request.ChatRequest;
import com.triquang.service.ChatService;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
	@Autowired
	private ChatService chatService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Chat> createChat(@RequestBody ChatRequest req, @RequestHeader("Authorization") String token) {
		User user1 = userService.findUserProfile(token);
		User user2 = userService.findUserById(req.userId());
		Chat createChat = chatService.createChat(user1, user2);
		return new ResponseEntity<>(createChat, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Chat>> findUserChatHandler(@RequestHeader("Authorization") String token) {
		User user = userService.findUserProfile(token);
		List<Chat> listChats = chatService.findUserChat(user.getId());
		return new ResponseEntity<List<Chat>>(listChats, HttpStatus.OK);
	}
}
