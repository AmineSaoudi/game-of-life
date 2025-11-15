package com.found404.gameoflife.dto;

import java.time.Instant;

import com.found404.gameoflife.enums.TaskType;

public record TaskResponseDTO(
        Integer id,
        String title,
        TaskType type,
        String description,
        Integer difficulty,
        Integer targetPerWeek,
        boolean completed,
        Instant createdAt,
        Instant completedAt) {
}
