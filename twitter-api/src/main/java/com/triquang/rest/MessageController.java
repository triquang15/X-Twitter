package com.triquang.rest;

import static com.triquang.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.model.Message;
import com.triquang.model.User;
import com.triquang.service.MessageService;
import com.triquang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/chat/{chatId}")
	public Message createMessage(@RequestBody Message message, @RequestHeader("Authorization") String token,
			@PathVariable Integer chatId) {
		User user = userService.findUserProfile(token);
		return messageService.createMessage(user, chatId, message);
	}

	@Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
	@ResponseStatus(HttpStatus.ACCEPTED)
	@GetMapping("/{chatId}")
	public List<Message> findChatsMessage(@PathVariable Integer chatId) {
		return messageService.findChatsMessages(chatId);
	}
}
