import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserModel} from "../../shared/models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnDestroy {
  private destroy: Subject<void> = new Subject();

  constructor(protected userService: UserService, private router: Router) {
    this.userService.loadInitialUsers()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: UserModel[]) => {
        this.userService.userSubject.next(res);
      });
  }

  viewUser(userId: string): void {
    this.router.navigate(['/user-list', userId]);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
