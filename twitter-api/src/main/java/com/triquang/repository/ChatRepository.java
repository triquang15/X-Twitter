package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.triquang.model.Chat;
import com.triquang.model.User;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	public List<Chat> findByUsersId(Integer userId);
	
	@Query("SELECT c FROM Chat c WHERE :user1 MEMBER OF c.users AND :user2 MEMBER OF c.users")
	public Chat findChatByUserId(@Param("user1") User user1,@Param("user2") User user2 );
}
