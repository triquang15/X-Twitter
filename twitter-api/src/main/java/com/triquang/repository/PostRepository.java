package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.triquang.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
	
	@Query("SELECT p FROM Post p WHERE p.user.id =:userId")
	List<Post> findPostByUserId(Integer userId);
}
