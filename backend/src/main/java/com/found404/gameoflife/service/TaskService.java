package com.found404.gameoflife.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.mapper.TaskMapper;
import com.found404.gameoflife.repository.TaskRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper mapper;

    public List<TaskResponseDTO> getTasksById(Integer userId) {
        return mapper.toDtos(taskRepository.findByUserId(userId));
    }

}
