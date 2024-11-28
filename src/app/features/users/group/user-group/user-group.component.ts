import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormSubmitButtonComponent} from "../../../shared/form-submit-button/form-submit-button.component";
import {InputValidatorComponent} from "../../../shared/input-validator/input-validator.component";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/models/state.model";
import {loadInitialUsers} from "../../../../shared/actions/user.actions";
import {selectUserList} from "../../../../shared/selectors/user.selectors";
import {Observable} from "rxjs";
import {UserModel} from "../../../../shared/models/user.model";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {createGroup, loadInitialGroups} from "../../../../shared/actions/group.actions";
import {GroupService} from "../../../../services/group.service";

@Component({
  selector: 'app-user-group',
  standalone: true,
  imports: [
    AsyncPipe,
    FormSubmitButtonComponent,
    InputValidatorComponent,
    ReactiveFormsModule,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './user-group.component.html',
  styleUrl: './user-group.component.scss'
})
export class UserGroupComponent implements OnInit {
  userList$: Observable<UserModel[]> = this.store.select(selectUserList);
  currentGroup: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    members: [[], Validators.required],
  })

  /* todo: translations */
  /* todo: change the key for not working translations, because everything else works just fine? */

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(loadInitialUsers());
  }

  onSubmit() {
    this.store.dispatch(createGroup({group: this.currentGroup.value}));
    this.currentGroup.reset();
    console.log('submit');
  }

  manageUser(username: string, input: EventTarget | null): void {
    const currentMemberList = (this.currentGroup.get('members') as FormArray).value;
    const isChecked = (input as HTMLInputElement).checked;

    if (isChecked) {
      currentMemberList.push(this.fb.control(username).value);
    } else {
      const index = currentMemberList.findIndex((currentMember: string) => currentMember === username);
      if (index !== -1) {
        currentMemberList.splice(index, 1);
      }
    }

    if (this.members && currentMemberList) {
      this.members.setValue(currentMemberList);
    }
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

}
