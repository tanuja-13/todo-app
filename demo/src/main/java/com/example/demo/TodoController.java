package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoRepository repository;

    public TodoController(TodoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/todos")
    public List<Todo> getTodos() {
        return repository.findAll();
    }

    @PostMapping("/todos")
    public Todo addTodo(@RequestBody Todo todo) {
        return repository.save(todo);
    }

    @PutMapping("/todos/{id}")
    public Todo updateTodo(@PathVariable Long id,
                           @RequestBody Todo newTodo) {

        Todo todo = repository.findById(id).orElseThrow();

        todo.setTask(newTodo.getTask());

        return repository.save(todo);
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }
}