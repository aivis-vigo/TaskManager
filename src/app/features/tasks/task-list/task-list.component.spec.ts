import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
class MockUserStore {
  isAuthorized(role: string) {
    return role === 'Admin';
  }

  belongsToGroup(groupId: number) {
    return groupId === 1;
  }
}

interface TaskModel {
  title: string;
  description: string;
  assignedToGroup: string;
  createdOn: string;
  status: string;
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let userStore: MockUserStore;

  const mockState = {
    tasks: [
      { title: 'Task 1', description: 'Task description 1', assignedToGroup: '1', createdOn: '2024-11-29', status: 'Open' },
      { title: 'Task 2', description: 'Task description 2', assignedToGroup: '2', createdOn: '2024-11-29', status: 'In Progress' },
      { title: 'Task 3', description: 'Task description 3', assignedToGroup: '1', createdOn: '2024-11-29', status: 'Closed' },
    ],
    user: { id: 1, groupId: 1, role: 'User' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        { provide: MockUserStore, useClass: MockUserStore },
        provideMockStore({ initialState: mockState }),
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    userStore = TestBed.inject(MockUserStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only tasks assigned to the user\'s group', () => {
    component.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual([
        { _id: '1', title: 'Task 1', description: 'Task description 1', assignedToGroup: '1', createdOn: '2024-11-29', status: 'Open' },
        { _id: '3', title: 'Task 3', description: 'Task description 3', assignedToGroup: '1', createdOn: '2024-11-29', status: 'Closed' },
      ]);
    });
  });

  it('should allow Admin to see all tasks', () => {
    spyOn(userStore, 'isAuthorized').and.returnValue(true);

    component.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(3);
    });
  });

});
