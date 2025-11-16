package com.found404.gameoflife.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.found404.gameoflife.dto.TaskCreateDTO;
import com.found404.gameoflife.dto.TaskPatchDTO;
import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.entity.Task;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.enums.TaskType;
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

    // @Transactional
    // public TaskResponseDTO editById(Integer id, TaskPatchDTO taskPutReq) {
    // Task existingTask = taskRepository.findById(id)
    // .orElseThrow(() -> new BadRequestException("Cannot find task with id: " +
    // id));

    // mapper.updateEntityFromPatch(taskPutReq, existingTask);

    // return mapper.toDto(taskRepository.save(existingTask));
    // }

    @Transactional
    public TaskResponseDTO editById(Integer id, TaskPatchDTO taskPatchReq) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Cannot find task with id: " + id));

        // 1) capture old state BEFORE patch
        boolean oldCompleted = Boolean.TRUE.equals(existingTask.getCompleted());
        int oldDifficulty = existingTask.getDifficulty() != null ? existingTask.getDifficulty() : 0;
        TaskType taskType = existingTask.getType();
        User user = existingTask.getUser(); // attached JPA entity

        // 2) apply patch (may change completed, difficulty, etc.)
        mapper.updateEntityFromPatch(taskPatchReq, existingTask);

        // 3) capture new state AFTER patch
        boolean newCompleted = Boolean.TRUE.equals(existingTask.getCompleted());
        int newDifficulty = existingTask.getDifficulty() != null ? existingTask.getDifficulty() : 0;

        // did "completed" actually change in this request?
        boolean completedChanged = taskPatchReq.completed() != null && oldCompleted != newCompleted;

        // 4) only apply completed/completedAt/points logic for NON_RECURRING tasks
        boolean isSingleTask = taskType == TaskType.NON_RECURRING;

        if (isSingleTask && completedChanged) {

            // 4a) update completedAt
            if (newCompleted) {
                // marking as completed now
                existingTask.setCompletedAt(Instant.now());
            } else {
                // un-completing → clear timestamp
                existingTask.setCompletedAt(null);
            }

            // 4b) update user points
            // points = difficulty * 10
            if (newCompleted) {
                // went: false -> true → add points (using new difficulty)
                int delta = newDifficulty * 10;
                user.setPoints(user.getPoints() + delta);
            } else {
                // went: true -> false → remove points (using old difficulty)
                int delta = oldDifficulty * 10;
                user.setPoints(user.getPoints() - delta);
            }
        }

        // 5) save task; user will be flushed automatically due to @Transactional
        Task saved = taskRepository.save(existingTask);
        return mapper.toDto(saved);
    }

    public void deleteById(Integer id) {
        if (!taskRepository.existsById(id)) {
            throw new NotFoundException("Cannot find task with id: " + id);
        }
        taskRepository.deleteById(id);
    }

}
