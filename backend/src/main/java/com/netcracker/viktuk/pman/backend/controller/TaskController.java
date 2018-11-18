package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.Project;
import com.netcracker.viktuk.pman.backend.entity.Task;
import com.netcracker.viktuk.pman.backend.entity.Tasks;
import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.entity.enums.Role;
import com.netcracker.viktuk.pman.backend.entity.enums.Status;
import com.netcracker.viktuk.pman.backend.repository.ProjectRepository;
import com.netcracker.viktuk.pman.backend.repository.TaskRepository;
import com.netcracker.viktuk.pman.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    private final ProjectRepository projectRepository;


    @Autowired
    public TaskController(TaskService taskService, ProjectRepository projectRepository) {
        this.taskService = taskService;
        this.projectRepository = projectRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Tasks> getAllTasks(@RequestParam(name = "project_id") Long id,
                                             @RequestParam(name = "page") Integer page,
                                             @RequestParam(name = "filter", required = false) String filter) {
        page--;
        if (filter != null && !filter.isEmpty()) {
            List<Task> list = taskService.filterByProject_Id(id, filter,page);
            int size = taskService.getCountOfFiltered(id, filter);
            return ResponseEntity.ok(new Tasks(size, list));
        } else {
            List<Task> list = taskService.getByProject_Id(id, page);
            int size = taskService.getCountByProject_Id(id);
            return ResponseEntity.ok(new Tasks(size, list));
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Task> getTaskById(@PathVariable(name = "id") Long id) {
        Task task = taskService.getById(id);
        if (task!=null) {
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Task> create(@AuthenticationPrincipal User user, @PathVariable(name = "id") Long id, @RequestBody Task task) {
        Project project = projectRepository.findProjectById(id);
        if (project != null) {
            if (user.getRole() == Role.ADMIN || user.getRole() == Role.PROJECT_MANAGER) {
                task.setProject(project);
                task.setAuthor(user);
                return ResponseEntity.ok(taskService.save(task));
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.notFound().build();
    }


    //NOW SAVE ONLY STATUS AND PRIORIY!! TODO!
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Task> update(@AuthenticationPrincipal User user, @RequestBody Task task) {
        Task taskFromDb = taskService.getById(task.getId());
        if (taskFromDb!=null) {
            if (user.getRole() != Role.ADMIN && user.getRole() != Role.PROJECT_MANAGER) {
                if ((user.getRole() != Role.DEVELOPER || (taskFromDb.getStatus() != Status.OPEN || task.getStatus() != Status.IN_PROGRESS)) && (taskFromDb.getStatus() != Status.IN_PROGRESS || task.getStatus() != Status.READY_FOR_TEST)) {
                    if (user.getRole() != Role.TESTER || taskFromDb.getStatus() != Status.READY_FOR_TEST || (task.getStatus() != Status.OPEN && task.getStatus() != Status.CLOSED)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                    }
                }
            }
/*
            if(user.getRole() == Role.ADMIN || user.getRole() == Role.PROJECT_MANAGER){

            }else if (user.getRole() == Role.DEVELOPER && (taskFromDb.getStatus() == Status.OPEN && task.getStatus() == Status.IN_PROGRESS) || (taskFromDb.getStatus() == Status.IN_PROGRESS && task.getStatus() == Status.READY_FOR_TEST)) {

            } else if (user.getRole() == Role.TESTER && taskFromDb.getStatus() == Status.READY_FOR_TEST &&(task.getStatus()==Status.OPEN || task.getStatus() == Status.CLOSED)) {

            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
*/
            taskFromDb.setStatus(task.getStatus());
            taskFromDb.setPriority(task.getPriority());
            if((user.getRole()==  Role.ADMIN || user.getRole() == Role.PROJECT_MANAGER)) {
                taskFromDb.setAssigned_username(task.getAssigned_username());
            }else if(task.getStatus()==Status.READY_FOR_TEST|| task.getStatus()== Status.OPEN || task.getStatus() == Status.CLOSED){
                taskFromDb.setAssigned(null);
            }
            return ResponseEntity.ok(taskService.save(taskFromDb));
        }
        return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteBillingAccount(@PathVariable(name = "id") Long id) {
        taskService.removeById(id);
        return ResponseEntity.noContent().build();
    }
}