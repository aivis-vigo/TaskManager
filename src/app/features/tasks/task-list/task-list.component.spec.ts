import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { viewAll } from "../../../shared/actions/list.actions";
import { selectTaskList } from "../../../shared/selectors/list.selectors";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;

  const initialState = {
    tasks: [
      {
        "_id": "67496d5c78a06baf1b3c0ea3",
        "title": "Implement Authentication",
        "description": "Develop and integrate a robust login and registration system...",
        "type": "Feature",
        "createdOn": "2024-11-29",
        "status": "In Progress",
        "assignedToUser": "john_doe",
        "assignedToGroup": "Dev Team",
      },
      {
        "_id": "67496d9278a06baf1b3c0ea9",
        "title": "Fix Payment Gateway Bug",
        "description": "Identify and resolve the issue causing incorrect payment...",
        "type": "Bug",
        "createdOn": "2024-11-28",
        "status": "Open",
        "assignedToUser": "jane_doe",
        "assignedToGroup": "Dev Team",
      },
      {
        "_id": "67496df278a06baf1b3c0eb1",
        "title": "Plan Product Launch Campaign",
        "description": "Develop a detailed campaign strategy for the upcoming product...",
        "type": "Campaign",
        "createdOn": "2024-11-25",
        "status": "In Progress",
        "assignedToUser": "jake_doe",
        "assignedToGroup": "Marketing team",
      }
    ],
    groups: [
      {
        "_id": "67473485c4a444351a7d5df6",
        "title": "Dev Team",
        "description": "ppl mte",
        "members": [
          "john_doe"
        ],
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        provideMockStore({ initialState }),
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store.overrideSelector(selectTaskList, initialState.tasks); // Mock the selector
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tasks visible to the user', fakeAsync(() => {
    store.dispatch(viewAll());

    fixture.detectChanges();
    tick();

    // Wait for the store update to finish
    fixture.whenStable().then(() => {
      const taskElements = fixture.debugElement.queryAll(By.css('[data-testid="ticket"]'));
      console.log('Task Elements:', taskElements);

      expect(taskElements.length).toBeGreaterThan(0); // Ensure there are tasks rendered
    });
  }));
});
