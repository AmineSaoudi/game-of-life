package com.found404.gameoflife.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.found404.gameoflife.dto.RewardCreateDTO;
import com.found404.gameoflife.dto.RewardResponseDTO;
import com.found404.gameoflife.dto.UserResponseDTO;
import com.found404.gameoflife.entity.Reward;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.exception.custom.BadRequestException;
import com.found404.gameoflife.exception.custom.NotFoundException;
import com.found404.gameoflife.mapper.RewardMapper;
import com.found404.gameoflife.mapper.UserMapper;
import com.found404.gameoflife.repository.RewardRepository;
import com.found404.gameoflife.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RewardMapper rewardMapper;

    public List<RewardResponseDTO> getRewardsByUserId(Integer userId) {
        return rewardMapper.toDtos(rewardRepository.findByUserId(userId));
    }

    @Transactional
    public UserResponseDTO purchaseRewardForUser(Integer userId, Integer rewardId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Reward reward = rewardRepository.findByIdAndUser_Id(rewardId, userId)
                .orElseThrow(() -> new NotFoundException("Reward not found"));

        int price = reward.getPrice();
        if (user.getPoints() < price) {
            throw new BadRequestException("Not enough points");
        }

        user.setPoints(user.getPoints() - price);
        // reward.setPurchasedAt(Instant.now());

        userRepository.save(user);
        rewardRepository.save(reward);

        return userMapper.toDto(user);
    }

    public RewardResponseDTO createRewardForUser(Integer userId, RewardCreateDTO rewardReq) {

        Reward newReward = rewardMapper.toEntity(rewardReq);

        // 2) Attach user without hitting DB (proxy)
        User userRef = userRepository.getReferenceById(userId);
        newReward.setUser(userRef);

        // 4) Save and map back to DTO
        Reward saved = rewardRepository.save(newReward);
        return rewardMapper.toDto(saved);

    }

    public void deleteById(Integer id) {
        if (!rewardRepository.existsById(id)) {
            throw new NotFoundException("Cannot find reward with id: " + id);
        }
        rewardRepository.deleteById(id);
    }

}
