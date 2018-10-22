package com.netcracker.viktuk.pman.backend.repository;

import com.netcracker.viktuk.pman.backend.entity.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
}
