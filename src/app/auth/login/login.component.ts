import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';


@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message ;

  constructor( 
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta
   ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин, вход, система'},
      {name: 'description', content: 'Страница для входа в систему'}
    ])
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
    .subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({
          text:'Теперь можно осуществить вход', 
          type:'success'});
      } else if (params['accessDenied']) {
        this.showMessage({
          text:'Осуществите вход для работы с системой', 
          type:'warning'});
      }
    })

  	this.form = new FormGroup({
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  	})
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
  	const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
    .subscribe((user: User) => {
      console.log(user);
      if (user) {
        if (user.password === formData.password) {
          this.message.text == '';
          window.localStorage.setItem('user',JSON.stringify(user));
          this.authService.logIn();
          this.router.navigate(['/system', 'bill']);
        }
         else {

          this.showMessage({
            text: 'Неверный пароль',
            type: 'danger'});
         }
      } else {
        this.showMessage({
            text: 'Такой пользователь не существует',
            type: 'danger'});
      }
    });
  }

}
