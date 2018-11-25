package com.netcracker.viktuk.pman.backend.service;

import com.netcracker.viktuk.pman.backend.entity.Comment;
import com.netcracker.viktuk.pman.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByTaskId(long id){
        return commentRepository.findAllByTask_IdOrderByCreatedDesc(id);
    }

    public Comment add(Comment comment){
        return commentRepository.save(comment);
    }
}
