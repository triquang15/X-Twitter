package com.triquang.dto;

import lombok.Data;

@Data
public class LikeDto {
	private Long id;
	private UserDto user;
	private PostDto post;
}
