package com.found404.gameoflife.dto;

import com.found404.gameoflife.enums.TaskType;

public record TaskCreateDTO(
        String title,
        TaskType type,
        String description,
        Integer difficulty,
        Integer targetPerWeek) {
}