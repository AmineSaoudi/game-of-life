package com.found404.gameoflife.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.dto.TaskCreateDTO;
import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.service.TaskService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskResponseDTO> getTasks(@AuthenticationPrincipal DbUserPrincipal principal) {
        Integer userId = principal.getId(); // or principal.getUser().getId()
        return taskService.getTasksById(userId);
    }

    @PostMapping
    public TaskResponseDTO createTask(@AuthenticationPrincipal DbUserPrincipal principal,
            @Valid @RequestBody TaskCreateDTO taskReq) {
        Integer userId = principal.getId();
        return taskService.createTaskForUser(userId, taskReq);
    }

}
