package com.triquang.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.triquang.dto.UserDto;
import com.triquang.model.User;

public class UserDtoMapper {
	public static UserDto toUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setFullName(user.getFullName());
		userDto.setImage(user.getImage());
		userDto.setBackgroundImage(user.getBackgroundImage());
		userDto.setBio(user.getBio());
		userDto.setBirthDate(user.getBirthDate());
		userDto.setFollowers(toUserDto(user.getFollowers()));
		userDto.setFollowing(toUserDto(user.getFollowings()));
		userDto.setLogin_with_google(user.isLogin_google());

		return userDto;
	}

	public static List<UserDto> toUserDto(List<User> followers) {
		List<UserDto> userDtos = new ArrayList<>();
		for (User user : followers) {
			UserDto userDto = new UserDto();
			userDto.setId(user.getId());
			userDto.setEmail(user.getEmail());
			userDto.setFullName(user.getFullName());
			userDto.setImage(user.getImage());
			userDtos.add(userDto);
		}
		return userDtos;
	}
}
