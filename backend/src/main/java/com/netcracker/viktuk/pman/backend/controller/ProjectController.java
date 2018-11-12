package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.Project;
import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.entity.enums.Role;
import com.netcracker.viktuk.pman.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Project> getProjectById(@PathVariable(name = "id") Long id) {
        Optional<Project> billingAccount = projectRepository.findById(id);
        if (billingAccount.isPresent()) {
            return ResponseEntity.ok(billingAccount.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Project> save(@AuthenticationPrincipal User user, @RequestBody Project project) {
        if(user.getRole()== Role.ADMIN || user.getRole()== Role.PROJECT_MANAGER){
            project.setManager(user);
            return ResponseEntity.ok(projectRepository.save(project));
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteBillingAccount(@PathVariable(name = "id") Long id) {
        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}