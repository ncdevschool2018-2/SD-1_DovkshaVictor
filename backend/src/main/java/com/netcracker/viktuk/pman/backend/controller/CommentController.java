package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.Comment;
import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.service.CommentService;
import com.netcracker.viktuk.pman.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private CommentService commentService;
    private TaskService taskService;

    @Autowired
    public CommentController(CommentService commentService, TaskService taskService) {
        this.commentService = commentService;
        this.taskService = taskService;
    }

    @RequestMapping(value = "/task/{task_id}", method = RequestMethod.GET)
    public Iterable<Comment> getAllComments(@PathVariable Long task_id) {
        return commentService.getCommentsByTaskId(task_id);
    }

    @RequestMapping(value = "/task/{task_id}", method = RequestMethod.POST)
    public Comment add(@AuthenticationPrincipal User user, @RequestBody Comment comment, @PathVariable Long task_id) {
        comment.setTask(taskService.getById(task_id));
        comment.setAuthor(user);
        return commentService.add(comment);
    }
}
