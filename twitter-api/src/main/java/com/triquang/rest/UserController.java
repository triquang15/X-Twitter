package com.triquang.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.dto.UserDto;
import com.triquang.dto.mapper.UserDtoMapper;
import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.service.UserService;
import com.triquang.utils.Utilities;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/profile")
	public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
		User user = userService.findUserProfile(jwt);
		UserDto userDto = UserDtoMapper.toUserDto(user);
		userDto.setReq_user(true);

		return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);

	}

	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getUserById(@PathVariable Long userId, @RequestHeader("Authorization") String jwt)
			throws UserException {
		User userReq = userService.findUserProfile(jwt);
		User user = userService.findUserById(userId);

		UserDto userDto = UserDtoMapper.toUserDto(user);
		userDto.setReq_user(Utilities.isReqUser(userReq, user));
		userDto.setFollowed(Utilities.isFollowedByUser(userReq, user));

		return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);

	}

	@GetMapping("/search")
	public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query) throws UserException {
		List<User> users = userService.searchUser(query);
		List<UserDto> userDtos = UserDtoMapper.toUserDto(users);

		return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);

	}

	@PutMapping("/update")
	public ResponseEntity<UserDto> updateUser(@RequestBody User req, @RequestHeader("Authorization") String jwt)
			throws UserException {
		User userReq = userService.findUserProfile(jwt);
		User user = userService.updateUser(userReq.getId(), req);
		UserDto userDtos = UserDtoMapper.toUserDto(user);

		return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);

	}

	@PutMapping("/{userId}/follow")
	public ResponseEntity<UserDto> followUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt)
			throws UserException {
		User userReq = userService.findUserProfile(jwt);
		User user = userService.followUser(userId, userReq);
		UserDto userDtos = UserDtoMapper.toUserDto(user);
		userDtos.setFollowed(Utilities.isFollowedByUser(userReq, user));

		return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);

	}
}
