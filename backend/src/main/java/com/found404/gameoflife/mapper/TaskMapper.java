package com.found404.gameoflife.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.found404.gameoflife.dto.TaskResponseDTO;
import com.found404.gameoflife.entity.Task;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface TaskMapper {

    TaskResponseDTO toDto(Task task);

    List<TaskResponseDTO> toDtos(List<Task> tasks);
}