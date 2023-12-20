package com.triquang.service;

import java.util.List;

import com.triquang.exception.UserException;
import com.triquang.model.User;

public interface UserService {
	public User findUserById(Long userId) throws UserException;

	public User findUserProfile(String jwt) throws UserException;

	public User updateUser(Long userId, User user) throws UserException;

	public User followUser(Long userId, User user) throws UserException;

	public List<User> searchUser(String query);
}
