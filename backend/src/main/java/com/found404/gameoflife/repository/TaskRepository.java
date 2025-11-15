package com.found404.gameoflife.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.found404.gameoflife.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByUserId(Integer userId);
}
