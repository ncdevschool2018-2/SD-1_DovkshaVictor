package com.netcracker.viktuk.pman.backend.entity;

import java.util.List;

public class Tasks {
    int count;
    List<Task> tasks;

    public Tasks(int count, List<Task> tasks) {
        this.count = count;
        this.tasks = tasks;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
