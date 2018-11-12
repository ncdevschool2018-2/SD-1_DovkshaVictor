package com.netcracker.viktuk.pman.backend.repository;

import com.netcracker.viktuk.pman.backend.entity.Task;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByProject_Id(Long id, Pageable pageable);
    List<Task> findByProject_IdAndNameContaining(Long id, String filter, Pageable pageable);
    Integer countAllByProject_Id(Long id);
    Integer countByProject_IdAndNameContaining(Long id, String filter);
}
