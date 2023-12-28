package com.triquang.model.mapper;

import com.triquang.model.User;
import com.triquang.rest.dto.UserDto;

public interface UserMapper {
	UserDto toUserDto(User user);
}
