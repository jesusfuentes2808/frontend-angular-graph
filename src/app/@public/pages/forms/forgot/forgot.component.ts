import { Component, OnInit } from '@angular/core';
import {PasswordService} from "@core/services/password.service";
import {basicAlert} from "../../../../@shared/alerts/toasts";
import {TYPE_ALERT} from "../../../../@shared/alerts/values.config";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  emailValue: string;

  constructor(private passwordService: PasswordService) { }

  ngOnInit(): void {
  }

  reset(){
    this.passwordService.reset(this.emailValue).subscribe( result => {
      console.log(result);
      if(result.status){
        basicAlert(TYPE_ALERT.SUCCESS, result.message);
        //this.router.navigate(['login']);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, result.message);
    });
  }

}
