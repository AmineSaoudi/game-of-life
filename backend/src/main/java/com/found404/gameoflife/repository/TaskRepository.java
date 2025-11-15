package com.found404.gameoflife.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.found404.gameoflife.entity.Task;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.enums.TaskType;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUser(User user);

    List<Task> findByUserAndType(User user, TaskType type);
}
