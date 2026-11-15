package com.campus.notes.service;

import com.campus.notes.model.Note;
import com.campus.notes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    public List<Note> getAllNotes() {
        return repository.findAllByOrderByCompletedAsc();
    }

    public Note createNote(Note note) {
        return repository.save(note);
    }

    public Note toggleComplete(Long id) {
        Note note = repository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
        note.setCompleted(!note.isCompleted());
        return repository.save(note);
    }

    public void deleteNote(Long id) {
        repository.deleteById(id);
    }
}