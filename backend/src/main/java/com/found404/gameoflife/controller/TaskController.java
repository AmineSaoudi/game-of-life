package com.found404.gameoflife.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.dto.TaskCreateDTO;
import com.found404.gameoflife.dto.TaskPatchDTO;
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
        return taskService.getTasksByUserId(userId);
    }

    @PostMapping
    public TaskResponseDTO createTask(@AuthenticationPrincipal DbUserPrincipal principal,
            @Valid @RequestBody TaskCreateDTO taskReq) {
        Integer userId = principal.getId();
        return taskService.createTaskForUser(userId, taskReq);
    }

    @PatchMapping("/{id}")
    public TaskResponseDTO editTask(@PathVariable Integer id, @RequestBody TaskPatchDTO task) {
        return taskService.editById(id, task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Integer id) {
        taskService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
