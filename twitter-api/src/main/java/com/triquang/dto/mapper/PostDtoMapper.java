package com.triquang.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.triquang.dto.PostDto;
import com.triquang.dto.UserDto;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.utils.Utilities;

public class PostDtoMapper {
	public static PostDto toPostDto(Post post, User reqUser) {
		UserDto userDto = UserDtoMapper.toUserDto(post.getUser());
		boolean isLiked = Utilities.isLikedByReqUser(reqUser, post);
		boolean isRePosted = Utilities.rePostByReqUser(reqUser, post);

		List<Long> rePostUserId = new ArrayList<>();
		for (User user : post.getRePostUsers()) {
			rePostUserId.add(user.getId());
		}

		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setContent(post.getContent());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setImage(post.getImage());
		postDto.setTotalLikes(post.getLikes().size());
		postDto.setTotalReplies(post.getRepPosts().size());
		postDto.setTotalReposts(post.getRePostUsers().size());
		postDto.setUser(userDto);
		postDto.setLike(isLiked);
		postDto.setReposts(isRePosted);
		postDto.setRePostUsersId(rePostUserId);
		postDto.setReplyPosts(toPostDtos(post.getRepPosts(), reqUser));
		postDto.setVideo(post.getVideo());

		return postDto;
	}

	public static List<PostDto> toPostDtos(List<Post> posts, User userReq) {
		List<PostDto> postDtos = new ArrayList<>();

		for (Post post : posts) {
			PostDto postDto = toReplyPostDto(post, userReq);
			postDtos.add(postDto);
		}
		return postDtos;
	}

	private static PostDto toReplyPostDto(Post post, User userReq) {
		UserDto userDto = UserDtoMapper.toUserDto(post.getUser());
		boolean isLiked = Utilities.isLikedByReqUser(userReq, post);
		boolean isRePosted = Utilities.rePostByReqUser(userReq, post);

		List<Long> rePostUserId = new ArrayList<>();
		for (User user : post.getRePostUsers()) {
			rePostUserId.add(user.getId());
		}

		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setContent(post.getContent());
		postDto.setCreatedAt(post.getCreatedAt());
		postDto.setImage(post.getImage());
		postDto.setTotalLikes(post.getLikes().size());
		postDto.setTotalReplies(post.getRepPosts().size());
		postDto.setTotalReposts(post.getRePostUsers().size());
		postDto.setUser(userDto);
		postDto.setLike(isLiked);
		postDto.setReposts(isRePosted);
		postDto.setRePostUsersId(rePostUserId);
		postDto.setVideo(post.getVideo());

		return postDto;
	}
}
