package com.found404.gameoflife.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthResponseDTO(@NotBlank String token, @NotBlank UserResponseDTO user) {

}
