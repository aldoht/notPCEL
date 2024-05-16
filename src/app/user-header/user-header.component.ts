import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this.authService.isAuthenticated && this.authService.user() !== null;
   // return true;
  }

  get user() {
    return this.authService.user();
  }

}
