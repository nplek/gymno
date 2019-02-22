import { Component } from '@angular/core';
import { NbLogoutComponent, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent extends NbLogoutComponent {

    logout(strategy: string): void {
        var _this = this;
        console.log(strategy);
        this.service.logout(strategy).subscribe(function (result) {
            localStorage.clear();
            //var redirect = result.getRedirect();
            var redirect = '/auth/login';
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    }

}