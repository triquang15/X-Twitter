package com.triquang.service;

import java.util.List;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.request.PostReplyRequest;

public interface PostService {
	public Post createPost(Post req, User user) throws UserException;

	public List<Post> findAllPost();

	public Post rePost(Long postId, User user) throws UserException, PostException;

	public Post findById(Long postId) throws PostException;

	public void deletePostById(Long postId, Long userId) throws UserException, PostException;

	public Post removeRePost(Long postId, User user) throws UserException, PostException;

	public Post createReply(PostReplyRequest req, User user) throws PostException;
	
	public List<Post> getUserPost(User user);
	
	public List<Post> findByLikesUser(User user);
}
