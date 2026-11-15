package com.campus.notes.controller;

import com.campus.notes.model.Note;
import com.campus.notes.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Note> getAll() {
        return service.getAllNotes();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return service.createNote(note);
    }

    @PutMapping("/{id}/toggle")
    public Note toggle(@PathVariable Long id) {
        return service.toggleComplete(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteNote(id);
    }
}