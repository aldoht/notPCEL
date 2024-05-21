import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  sendToCart() {
    this.router.navigate(["/home/cart/"]);
  }

  get isLoggedIn() {
    return this.authService.isAuthenticated && this.authService.user() !== null;
   // return true;
  }

  get user() {
    return this.authService.user();
  }

}
