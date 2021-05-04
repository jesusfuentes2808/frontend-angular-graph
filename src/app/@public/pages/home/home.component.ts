import { UsersService } from './../../../@core/services/users.service';
import { AuthService } from './../../../@core/services/auth.service';
import { ApiService } from './../../../@graphql/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authApi: AuthService, private usersApi: UsersService) { }

  ngOnInit(): void {
    this.authApi.login('jesusfuentes2808@gmail.com', '1234333').subscribe(result=>{
      console.log(result);
    });

    this.usersApi.getUsers().subscribe(result => {
      console.log(result);
    });

    this.authApi.getMe().subscribe(result => {
      console.log(result);
    });
  }

}
