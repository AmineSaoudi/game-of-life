package com.found404.gameoflife.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RewardCreateDTO(
        @NotBlank String title,
        @NotBlank String description,
        @NotNull @Min(1) Integer price) {

}
