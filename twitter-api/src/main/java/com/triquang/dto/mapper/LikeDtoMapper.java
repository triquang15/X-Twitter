package com.triquang.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.triquang.dto.LikeDto;
import com.triquang.dto.PostDto;
import com.triquang.dto.UserDto;
import com.triquang.model.Like;
import com.triquang.model.User;

public class LikeDtoMapper {
	public static LikeDto toLikeDto(Like like, User reqUser) {
		UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
		UserDto reqDto = UserDtoMapper.toUserDto(reqUser);
		PostDto postDto = PostDtoMapper.toPostDto(like.getPost(), reqUser);

		LikeDto likeDto = new LikeDto();
		likeDto.setId(like.getId());
		likeDto.setPost(postDto);
		likeDto.setUser(userDto);

		return likeDto;
	}

	public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser) {
		List<LikeDto> likeDtos = new ArrayList<>();

		for (Like like : likes) {
			UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
			PostDto postDto = PostDtoMapper.toPostDto(like.getPost(), reqUser);
			LikeDto likeDto = new LikeDto();
			likeDto.setId(like.getId());
			likeDto.setPost(postDto);
			likeDto.setUser(userDto);
			likeDtos.add(likeDto);
		}
		return likeDtos;
	}
}
