package com.triquang.model.mapper;

import org.springframework.stereotype.Service;

import com.triquang.model.User;
import com.triquang.rest.dto.UserDto;

@Service
public class UserMapperImpl implements UserMapper {

	@Override
	public UserDto toUserDto(User user) {
		if (user == null) {
			return null;
		}
		return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getBirthDate(),user.getImageUrl(),
			user.getBackgroundImage(), user.getWebsite(), user.getLocation() ,user.getBio(),user.getRole());
	}
}
