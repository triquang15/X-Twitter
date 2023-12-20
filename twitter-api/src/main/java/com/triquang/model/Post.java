package com.triquang.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private User user;
	private String content;
	private String image;
	private String video;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();

	@OneToMany
	private List<Post> repPosts = new ArrayList<>();

	@ManyToMany
	private List<User> rePostUsers = new ArrayList<>();

	@ManyToOne
	private Post replyFor;
	
	private boolean isReply;
	private boolean isPost;
	private LocalDateTime createdAt;
	

}
