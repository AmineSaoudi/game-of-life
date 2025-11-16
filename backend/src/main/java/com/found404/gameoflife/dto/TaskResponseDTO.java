package com.found404.gameoflife.dto;

import java.time.Instant;
import java.time.LocalDate;

import com.found404.gameoflife.enums.TaskType;

public record TaskResponseDTO(
        Integer id,
        String title,
        TaskType type,
        String description,
        Integer difficulty,
        Integer targetPerWeek,
        Boolean completed,
        Instant createdAt,
        Instant completedAt,
        LocalDate dueDate) {
}
