package com.triquang.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.triquang.exception.UserException;
import com.triquang.model.User;
import com.triquang.repository.UserRepository;
import com.triquang.security.TokenProvider;
import com.triquang.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TokenProvider tokenProvider;

	@Override
	public User registerUser(User user) {
		return userRepository.save(user);

	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> optional = userRepository.findById(userId);
		if (optional.isPresent()) {
			return optional.get();
		}
		throw new UserException("User not exits with ID: " + userId);
	}

	@Override
	public User followUser(Integer userId1, Integer userId2) throws UserException {
		User user1 = findUserById(userId1);
		User user2 = findUserById(userId2);

		user2.getFollowers().add(user1.getId());
		user1.getFollowings().add(user2.getId());

		userRepository.save(user1);
		userRepository.save(user2);

		return user1;
	}

	@Override
	public User updateUser(User user, Integer userId) throws UserException {
		Optional<User> optional = userRepository.findById(userId);
		if (optional.isEmpty()) {
			throw new UserException("User not exist with ID: " + userId);
		}

		User oldUser = optional.get();
		if (user.getName() != null) {
			oldUser.setName(user.getName());
		}
		if (user.getEmail() != null) {
			oldUser.setEmail(user.getEmail());
		}
		if (user.getGender() != null) {
			oldUser.setGender(user.getGender());
		}
		return userRepository.save(oldUser);
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String username = tokenProvider.getEmailFromToken(jwt);
		if (username == null) {
			throw new BadCredentialsException("Username not found with token ");

		}
		Optional<User> user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UserException("User not found with " + username);

		}
		return user.get();
		
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

	@Override
	public boolean hasUserWithEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	public Optional<User> getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public boolean hasUserWithUsername(String username) {
		return userRepository.existsByUsername(username);
	}

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Override
	public User validateAndGetUserByUsername(String username) {
		return getUserByUsername(username)
				.orElseThrow(() -> new UserException(String.format("User with username %s not found", username)));
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);

	}
}
