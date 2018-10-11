import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  date: Date = new Date;
  user: User;

  @Output() onMenuOpened = new EventEmitter<any>();

  constructor(
  	private authservice: AuthService, 
  	private router: Router) { }

  ngOnInit() {
  	this.user = JSON.parse(window.localStorage.getItem('user'))||{ name: "Аноним" };
  }

  onLogout(){
  	this.authservice.logOut();
  	this.router.navigate(['/login']);
  }

  openMenu() {
    this.onMenuOpened.emit(true);
  }
}
