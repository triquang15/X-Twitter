package com.triquang.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.dto.LikeDto;
import com.triquang.dto.mapper.LikeDtoMapper;
import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Like;
import com.triquang.model.User;
import com.triquang.service.LikeService;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api")
public class LikeController {
	@Autowired
	private UserService userService;

	@Autowired
	private LikeService likeService;

	@PostMapping("/{postId}/likes")
	public ResponseEntity<LikeDto> likePost(@PathVariable Long postId, @RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		Like like = likeService.likePost(postId, user);

		LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);

		return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);

	}

	@GetMapping("/post/{postId}")
	public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		List<Like> likes = likeService.getAllLikes(postId);

		List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);

		return new ResponseEntity<>(likeDtos, HttpStatus.OK);

	}
}
