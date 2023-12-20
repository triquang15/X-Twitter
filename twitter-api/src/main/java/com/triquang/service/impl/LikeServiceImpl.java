package com.triquang.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Like;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.repository.LikeRepository;
import com.triquang.repository.PostRepository;
import com.triquang.service.LikeService;
import com.triquang.service.PostService;

@Service
public class LikeServiceImpl implements LikeService {
	@Autowired
	private LikeRepository likeRepository;

	@Autowired
	private PostService postService;

	@Autowired
	PostRepository postRepository;

	@Override
	public Like likePost(Long postId, User user) throws UserException, PostException {
		Like isLikeExist = likeRepository.isLikeExist(user.getId(), postId);
		if (isLikeExist != null) {
			likeRepository.deleteById(isLikeExist.getId());
			return isLikeExist;
		}
		Post post = postService.findById(postId);

		Like like = new Like();
		like.setPost(post);
		like.setUser(user);

		Like savedLike = likeRepository.save(like);
		post.getLikes().add(savedLike);
		postRepository.save(post);
		return savedLike;
	}

	@Override
	public List<Like> getAllLikes(Long postId) throws PostException {
		Post post = postService.findById(postId);
		List<Like> likes = likeRepository.findByPostId(postId);
		
		return likes;
	}

}
