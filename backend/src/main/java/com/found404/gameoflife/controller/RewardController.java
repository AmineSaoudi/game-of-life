package com.found404.gameoflife.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.dto.RewardCreateDTO;
import com.found404.gameoflife.dto.RewardResponseDTO;
import com.found404.gameoflife.dto.UserResponseDTO;
import com.found404.gameoflife.service.RewardService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/rewards")
public class RewardController {

    private final RewardService rewardService;

    @GetMapping
    public List<RewardResponseDTO> getRewards(@AuthenticationPrincipal DbUserPrincipal principal) {
        Integer userId = principal.getId(); // or principal.getUser().getId()
        return rewardService.getRewardsByUserId(userId);
    }

    @PostMapping
    public RewardResponseDTO createReward(@AuthenticationPrincipal DbUserPrincipal principal,
            @Valid @RequestBody RewardCreateDTO rewardReq) {
        Integer userId = principal.getId();
        return rewardService.createRewardForUser(userId, rewardReq);
    }

    @PostMapping("/{rewardId}/purchase")
    public UserResponseDTO purchaseReward(@PathVariable Integer rewardId,
            @AuthenticationPrincipal DbUserPrincipal principal) {
        Integer userId = principal.getId();
        return rewardService.purchaseRewardForUser(userId, rewardId);
    }

    @DeleteMapping("/{rewardId}")
    public ResponseEntity<Void> deleteReward(@PathVariable Integer rewardId) {
        rewardService.deleteById(rewardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
