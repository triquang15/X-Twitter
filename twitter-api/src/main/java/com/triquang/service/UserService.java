package com.triquang.service;

import java.util.List;
import java.util.Optional;

import com.triquang.exception.UserException;
import com.triquang.model.User;

public interface UserService {

	List<User> getUsers();

	public User registerUser(User user);

	public User findUserById(Integer userId) throws UserException;

	public User findUserByEmail(String email) throws UserException;

	public User followUser(Integer userId1, Integer userId2) throws UserException;

	public User updateUser(User user, Integer userId) throws UserException;

	public User findUserProfile(String jwt) throws UserException;

	public List<User> searchUser(String query);

	boolean hasUserWithEmail(String email);

	boolean hasUserWithUsername(String username);

	Optional<User> getUserByUsername(String username);

	User validateAndGetUserByUsername(String username);

	void deleteUser(User user);
}
