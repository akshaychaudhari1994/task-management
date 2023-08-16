// src/app/task-list/task-list.component.ts
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStatus } from '../models/task.consts';
import { TaskService } from '../services/task.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  bsModalRef?: BsModalRef;
  constructor(private taskService: TaskService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadTasks();
  }
  tasks: Task[] = [];

  openModal() {
    const initialState: ModalOptions = {
      initialState: {
      }
      , class: 'xl',
      animated: true
    };
    this.bsModalRef = this.modalService.show(TaskFormComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden!.subscribe(() => {
      this.loadTasks();
    });
  }

  markCompleted(task: Task): void {
    task.completed != task.completed;
    this.taskService.updateTask(task)
      .subscribe({ next: () => this.loadTasks(), error: (error) => console.log(error) })
  }

  selectedFilter: string = TaskStatus.ALL;

  get filteredTasks(): Task[] {
    if (this.selectedFilter === TaskStatus.ALL) {
      return this.tasks;
    } else if (this.selectedFilter === TaskStatus.COMPLETED) {
      return this.tasks.filter(task => task.completed);
    } else if (this.selectedFilter === TaskStatus.INCOMPLETE) {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      {
        next: (tasks: any) => {
          this.tasks = tasks;
        }, error: (error: any) => {
          console.log(error.message);
        }
      }
    )
  }
  
  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'badge badge-success';
      case 'medium':
        return 'badge badge-warning';
      case 'high':
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  }
}
