// src/app/task-form/task-form.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Priority } from '../models/task.consts';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<Task>();
  newTaskTitle = '';
  taskForm!: FormGroup;

  constructor(private taskService: TaskService, private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      priority_name: [Priority.LOW],
      creation_date: ['']
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: 0,
        title: this.taskForm.value.title,
        completed: false,
        description: this.taskForm.value.description,
        priority_name: this.taskForm.value.priority_name,
        creation_date: this.taskForm.value.creation_date,
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.bsModalRef.hide();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.taskForm.reset();
  }
}
