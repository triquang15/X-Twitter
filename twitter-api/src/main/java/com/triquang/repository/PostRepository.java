package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.triquang.model.Post;
import com.triquang.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {

	List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();

	List<Post> findByRePostUsersContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(User user, Long userId);
	
	List<Post> findByLikesOrderByCreatedAtDesc(User user);
	
	@Query("SELECT p FROM Post p JOIN p.likes l WHERE l.user.id=:userId")
	List<Post> findByLikesUserId(Long userId);
}
