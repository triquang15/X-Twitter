package com.triquang.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.model.Reel;
import com.triquang.model.User;
import com.triquang.repository.ReelRepository;
import com.triquang.service.ReelService;

@Service
public class ReelServiceImpl implements ReelService {
	@Autowired
	private ReelRepository reelRepository;

	@Override
	public Reel createReel(Reel reel, User user) {
		Reel newReel = new Reel();
		newReel.setTitle(reel.getTitle());
		newReel.setVideo(reel.getVideo());
		newReel.setUser(user);

		return reelRepository.save(newReel);
	}

	@Override
	public List<Reel> findAllReels() {
		return reelRepository.findAll();
	}

	@Override
	public List<Reel> findUserReel(Integer userId) {
		return reelRepository.findByUserId(userId);
	}

}
