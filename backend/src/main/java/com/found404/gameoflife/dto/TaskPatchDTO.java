package com.found404.gameoflife.dto;

import java.time.LocalDate;

import com.found404.gameoflife.enums.TaskType;

public record TaskPatchDTO(
                String title,
                TaskType type,
                String description,
                Integer difficulty,
                Integer targetPerWeek,
                Boolean completed,
                LocalDate dueDate) {
}