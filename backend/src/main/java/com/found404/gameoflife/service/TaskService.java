package com.found404.gameoflife.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.found404.gameoflife.dto.TaskCreateDTO;
import com.found404.gameoflife.dto.TaskPatchDTO;
import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.entity.Task;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.exception.custom.BadRequestException;
import com.found404.gameoflife.exception.custom.NotFoundException;
import com.found404.gameoflife.mapper.TaskMapper;
import com.found404.gameoflife.repository.TaskRepository;
import com.found404.gameoflife.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper mapper;

    public List<TaskResponseDTO> getTasksByUserId(Integer userId) {
        return mapper.toDtos(taskRepository.findByUserId(userId));
    }

    public TaskResponseDTO createTaskForUser(Integer userId, TaskCreateDTO taskReq) {

        Task newTask = mapper.toEntity(taskReq);

        // 2) Attach user without hitting DB (proxy)
        User userRef = userRepository.getReferenceById(userId);
        newTask.setUser(userRef);

        // 4) Save and map back to DTO
        Task saved = taskRepository.save(newTask);
        return mapper.toDto(saved);

    }

    @Transactional
    public TaskResponseDTO editById(Integer id, TaskPatchDTO taskPutReq) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Cannot find task with id: " + id));

        mapper.updateEntityFromPatch(taskPutReq, existingTask);

        return mapper.toDto(taskRepository.save(existingTask));
    }

    public void deleteById(Integer id) {
        if (!taskRepository.existsById(id)) {
            throw new NotFoundException("Cannot find task with id: " + id);
        }
        taskRepository.deleteById(id);
    }

}
