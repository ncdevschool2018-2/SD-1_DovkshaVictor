package com.netcracker.viktuk.pman.backend.entity;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.netcracker.viktuk.pman.backend.entity.enums.Priority;
import com.netcracker.viktuk.pman.backend.entity.enums.Status;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project")
    Project project;

    @NotNull
    @Column(name = "name")
    String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    Priority priority;

    @Enumerated(EnumType.STRING)
    Status status;

    Date created;
    Date updated;

    Date resolved;
    Date closed;

    String due_date;
    String estimation;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User author;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User assigned;

    @Transient
    String assigned_username;

    String description;

    @PrePersist
    protected void onCreate() {
        created = new Date();
        updated = created;
        status = Status.OPEN;
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
        if(status==Status.READY_FOR_TEST){
            resolved = updated;
        }
        if(status==Status.CLOSED){
            closed = updated;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getDue_date() {
        return due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }

    public String getEstimation() {
        return estimation;
    }

    public void setEstimation(String estimation) {
        this.estimation = estimation;
    }

    public User getAssigned() {
        return assigned;
    }

    public void setAssigned(User assigned) {
        this.assigned = assigned;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Date getResolved() {
        return resolved;
    }

    public void setResolved(Date resolved) {
        this.resolved = resolved;
    }

    public Date getClosed() {
        return closed;
    }

    public void setClosed(Date closed) {
        this.closed = closed;
    }

    @JsonGetter("assigned")
    public String getAssignedUsernameJSON() {
        if(assigned!=null){
            return assigned.getUsername();
        }else return null;
    }

    public String getAssigned_username() {
        return assigned_username;
    }

    @JsonSetter("assigned")
    public void setAssigned_username(String assigned_username) {
        this.assigned_username = assigned_username;
    }
}
