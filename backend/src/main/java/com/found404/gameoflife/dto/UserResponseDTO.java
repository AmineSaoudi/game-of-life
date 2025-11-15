package com.found404.gameoflife.dto;

import jakarta.validation.constraints.NotBlank;

public record UserResponseDTO(@NotBlank String username) {

}
