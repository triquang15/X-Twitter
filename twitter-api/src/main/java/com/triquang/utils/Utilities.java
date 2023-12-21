package com.triquang.utils;

import com.triquang.model.Like;
import com.triquang.model.Post;
import com.triquang.model.User;

public class Utilities {
	public final static boolean isLikedByReqUser(User reqUser, Post post) {
		for (Like like : post.getLikes()) {
			if (like.getUser().getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}

	public final static boolean rePostByReqUser(User reqUser, Post post) {
		for (User user : post.getRePostUsers()) {
			if (user.getId().equals(reqUser.getId())) {
				return true;
			}
		}
		return false;
	}

	public static boolean isReqUser(User reqUser, User user) {
		return reqUser.getId().equals(user.getId());
	}

	public static boolean isFollowedByUser(User reqUser, User user) {
		return reqUser.getFollowings().contains(user);
	}
}
