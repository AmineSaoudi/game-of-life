package com.found404.gameoflife.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.found404.gameoflife.dto.UserCreateDTO;
import com.found404.gameoflife.dto.UserResponseDTO;
import com.found404.gameoflife.entity.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "points", ignore = true)
    User toEntity(UserCreateDTO dto);

    UserResponseDTO toDto(User entity);

    List<UserResponseDTO> toDtos(List<User> entities);

}
