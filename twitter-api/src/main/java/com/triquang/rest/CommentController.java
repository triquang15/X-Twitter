package com.triquang.rest;

import static com.triquang.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Comment;
import com.triquang.model.User;
import com.triquang.service.CommentService;
import com.triquang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping("/post/{postId}")
	public ResponseEntity<Comment> createComment(@RequestBody Comment comment,
			@RequestHeader("Authorization") String token, @PathVariable Integer postId) {

		User user = userService.findUserProfile(token);
		Comment createComment = commentService.createComment(comment, postId, user.getId());
		return new ResponseEntity<>(createComment, HttpStatus.CREATED);
	}

	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comment> likeComment(@RequestHeader("Authorization") String token,
			@PathVariable Integer commentId) {

		User user = userService.findUserProfile(token);
		Comment likeComment = commentService.likeComment(commentId, user.getId());
		return new ResponseEntity<>(likeComment, HttpStatus.OK);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/{commentId}")
	public ResponseEntity<Comment> findCommentById(@PathVariable Integer commentId) {

		Comment likeComment = commentService.findCommentById(commentId);
		return new ResponseEntity<>(likeComment, HttpStatus.ACCEPTED);
	}
}
