package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.Project;
import com.netcracker.viktuk.pman.backend.entity.Task;
import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.repository.ProjectRepository;
import com.netcracker.viktuk.pman.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    public List<Task> getAllTasks(@PathVariable(name = "id") Long id)
    {
        return taskRepository.findAllByProject_Id(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Task> getTaskById(@PathVariable(name = "id") Long id) {
        Optional<Task> billingAccount = taskRepository.findById(id);
        if (billingAccount.isPresent()) {
            return ResponseEntity.ok(billingAccount.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.POST)
    public ResponseEntity<Task> save(@AuthenticationPrincipal User user, @PathVariable(name = "id") Long id, @RequestBody Task task) {
        Project project = projectRepository.findProjectById(id);
        if(project!=null){
            task.setProject(project);
            task.setAuthor(user);
            return ResponseEntity.ok(taskRepository.save(task));
        }
        return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteBillingAccount(@PathVariable(name = "id") Long id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}