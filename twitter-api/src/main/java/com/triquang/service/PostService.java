package com.triquang.service;

import java.util.List;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;

public interface PostService {
	public Post createPost(Post post, Integer userId) throws UserException, PostException;

	public String deletePost(Integer postId, Integer userId) throws UserException, PostException;

	public List<Post> findPostByUserId(Integer userId) throws UserException;

	public Post findPostById(Integer postId) throws PostException;

	public List<Post> findAllPost() throws PostException;

	public Post savePost(Integer postId, Integer userId) throws UserException, PostException;

	public Post likePost(Integer postId, Integer userId) throws UserException, PostException;

}
