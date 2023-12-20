package com.triquang.service;

import java.util.List;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Like;
import com.triquang.model.User;

public interface LikeService {
	public Like likePost(Long postId, User user) throws UserException, PostException;
	public List<Like> getAllLikes(Long postId) throws PostException;
}
