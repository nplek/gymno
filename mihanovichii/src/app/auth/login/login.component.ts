import { Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
//import { AuthenService, UserAuthen } from '../../@core/service/authen.service';
import { HttpClient } from '@angular/common/http';
//import { useAnimation } from '@angular/animations';
//import { userInfo } from 'os';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  login(): void {
    //localStorage.setItem('my_token', "test");
    var _this = this;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.authenticate(this.strategy, this.user).subscribe(function (result) {
        _this.submitted = false;
        if (result.isSuccess()) {
            _this.messages = result.getMessages();
        }
        else {
            _this.errors = result.getErrors();
        }
        var redirect = result.getRedirect();
        if (redirect) {
            setTimeout(function () {
                return _this.router.navigateByUrl(redirect);
            }, _this.redirectDelay);
        }
        _this.cd.detectChanges();
    });
  }
}