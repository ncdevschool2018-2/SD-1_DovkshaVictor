package com.netcracker.viktuk.pman.backend.service;

import com.netcracker.viktuk.pman.backend.entity.Task;
import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final int TASKS_IN_PAGE = 5;
    private final TaskRepository taskRepository;
    private final UserService userService;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }

    public List<Task> getByProject_Id(Long id, int page) {
        return taskRepository.findAllByProject_Id (id, PageRequest.of(page, TASKS_IN_PAGE));
    }

    public List<Task> filterByProject_Id(Long id, String filter, int page) {
        return taskRepository.findByProject_IdAndNameContaining (id, filter,  PageRequest.of(page, TASKS_IN_PAGE));
    }

    public Integer getCountByProject_Id(Long id) {
        return taskRepository.countAllByProject_Id (id);
    }

    public Integer getCountOfFiltered(Long id, String filter){
        return taskRepository.countByProject_IdAndNameContaining(id, filter);
    }

    public Task getById(Long id){
        Optional<Task> task = taskRepository.findById(id);
        return task.orElse(null);
    }

    public Task save(Task task){
        String assigned_username = task.getAssigned_username();
        if(assigned_username!=null && !assigned_username.isEmpty()){
            task.setAssigned((User)userService.loadUserByUsername(assigned_username));
        }
        return taskRepository.save(task);
    }
    public void removeById(Long id) {
        taskRepository.deleteById(id);
    }
}
