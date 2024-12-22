import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/models/state.model";
import {GroupModel} from "../../../../shared/models/group.model";
import {Observable, Subject, takeUntil} from "rxjs";
import {selectCurrentGroup} from "../../../../shared/selectors/group.selectors";
import {AsyncPipe} from "@angular/common";
import {FormSubmitButtonComponent} from "../../../shared/form-submit-button/form-submit-button.component";
import {InputValidatorComponent} from "../../../shared/input-validator/input-validator.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {UserStore} from "../../../../shared/user.store";
import {updateGroup} from "../../../../shared/actions/group.actions";
import {UserModel} from "../../../../shared/models/user.model";
import {selectUserList} from "../../../../shared/selectors/user.selectors";
import {loadInitialUsers} from "../../../../shared/actions/user.actions";

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    AsyncPipe,
    FormSubmitButtonComponent,
    InputValidatorComponent,
    ReactiveFormsModule,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  readonly userStore = inject(UserStore);
  private destroy: Subject<void> = new Subject();
  userList$: Observable<UserModel[]> = this.store.select(selectUserList);
  currentGroup: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    members: [[], [Validators.required]],
  });
  group: GroupModel = <GroupModel>{};
  errorMessage: string = '';
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    const groupId: string | null = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this.store.select(selectCurrentGroup)
        .pipe(takeUntil(this.destroy))
        .subscribe((res: GroupModel) => {
          this.group = res;
          this.currentGroup.setValue({
            title: res.title,
            description: res.description,
            members: res.members,
          });
        })
    }
    this.store.dispatch(loadInitialUsers());
  }

  onUpdate(): void {
    this.store.dispatch(updateGroup({groupId: this.group._id, group: this.currentGroup.value}));
    this.toggleEditMode();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  manageMember(username: string, input: EventTarget | null): void {
    const isChecked = (input as HTMLInputElement).checked;

    if (this.members) {
      const members = [...this.members.value];

      if (isChecked) {
        if (!members.includes(username)) {
          members.push(username);
        }
      } else {
        const filteredMembers = members.filter(member => member !== username);
        this.members.setValue(filteredMembers);
        return;
      }

      this.members.setValue(members);
    }
  }

  isPartOfTeam(username: string): boolean {
    return this.group.members.includes(username);
  }

  get title() {
    return this.currentGroup.get('title');
  }

  get description() {
    return this.currentGroup.get('description');
  }

  get members() {
    return this.currentGroup.get('members');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
