package com.found404.gameoflife.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.service.TaskService;

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

    // @PostMapping
    // public TaskResponse createMyTask(@AuthenticationPrincipal DbUserPrincipal
    // principal,
    // @Valid @RequestBody TaskCreateRequest req) {
    // Integer userId = principal.getId();
    // Task task = taskService.createTaskForUser(userId, req);
    // return TaskMapper.toResponse(task);
    // }

}
