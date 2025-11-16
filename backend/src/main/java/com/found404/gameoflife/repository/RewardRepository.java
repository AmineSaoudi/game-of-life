package com.found404.gameoflife.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.found404.gameoflife.entity.Reward;

public interface RewardRepository extends JpaRepository<Reward, Integer> {
    List<Reward> findByUserId(Integer userId);

    Optional<Reward> findByIdAndUser_Id(Integer id, Integer userId);

}
