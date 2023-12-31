package com.triquang.rest;

import static com.triquang.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.rest.dto.UserDto;
import com.triquang.security.CustomUserDetails;
import com.triquang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private com.triquang.model.mapper.UserMapper userMapper;

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/profile")
	public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		return userMapper.toUserDto(user);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/")
	public List<User> getAllUser() throws UserException {
		return userService.getUsers();
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping
	public List<UserDto> getUsers() {
		return userService.getUsers().stream().map(userMapper::toUserDto).collect(Collectors.toList());
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/{userId}")
	public User findUserById(@PathVariable("userId") Integer userId) throws UserException {
		return userService.findUserById(userId);

	}

	@PutMapping("/update")
	public User updateUserHandler(@RequestBody User user, @RequestHeader("Authorization") String token)
			throws UserException {
		User userReq = userService.findUserProfile(token);
		return userService.updateUser(user, userReq.getId());

	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@PutMapping("/follow/{userId1}/{userId2}")
	public User followUser(@PathVariable Integer userId1, @PathVariable Integer userId2) throws UserException {
		return userService.followUser(userId1, userId2);

	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		return userService.searchUser(query);

	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@DeleteMapping("/{username}")
	public com.triquang.rest.dto.UserDto deleteUser(@PathVariable String username) {
		User user = userService.validateAndGetUserByUsername(username);
		userService.deleteUser(user);
		return userMapper.toUserDto(user);
	}
}
