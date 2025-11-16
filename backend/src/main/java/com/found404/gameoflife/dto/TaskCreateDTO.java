package com.found404.gameoflife.dto;

import java.time.LocalDate;

import com.found404.gameoflife.enums.TaskType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskCreateDTO(
        @NotBlank String title,
        @NotNull TaskType type,
        @NotBlank String description,
        @NotNull @Min(1) @Max(5) Integer difficulty,
        Integer targetPerWeek,
        LocalDate dueDate) {
}