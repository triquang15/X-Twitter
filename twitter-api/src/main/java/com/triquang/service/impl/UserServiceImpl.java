package com.triquang.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public User findUserById(Long userId) throws UserException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserException("User not found with id " + userId));
		return user;
	}

	@Override
	public User findUserProfile(String jwt) throws UserException {
		String email = tokenProvider.getEmailFromToken(jwt);
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UserException("User not found with email " + email);
		}

		return user;
	}

	@Override
	public User updateUser(Long userId, User req) throws UserException {
		User user = findUserById(userId);
		if (req.getFullName() != null) {
			user.setFullName(req.getFullName());
		}
		if (req.getImage() != null) {
			user.setImage(req.getImage());
		}
		if (req.getBackgroundImage() != null) {
			user.setBackgroundImage(req.getBackgroundImage());
		}
		if (req.getBirthDate() != null) {
			user.setBirthDate(req.getBirthDate());
		}
		if (req.getLocation() != null) {
			user.setLocation(req.getLocation());
		}
		if (req.getBio() != null) {
			user.setBio(req.getBio());
		}
		if (req.getPhone() != null) {
			user.setPhone(req.getPhone());
		}
		if (req.getWebsite() != null) {
			user.setWebsite(req.getWebsite());
		}
		return userRepository.save(user);
	}

	@Override
	public User followUser(Long userId, User user) throws UserException {
		User followUser = findUserById(userId);
		if (user.getFollowings().contains(followUser) && followUser.getFollowers().contains(user)) {
			user.getFollowings().remove(followUser);
			followUser.getFollowers().remove(user);
		} else {
			user.getFollowings().add(followUser);
			followUser.getFollowers().add(user);
		}
		userRepository.save(followUser);
		userRepository.save(user);
		return followUser;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

}
