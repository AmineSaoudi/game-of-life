package com.found404.gameoflife.dto;

import jakarta.validation.constraints.NotBlank;

public record UserCreateDTO(@NotBlank String username, @NotBlank String password) {

}
