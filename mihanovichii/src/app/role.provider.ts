import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken,NbAuthSimpleToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {

  }

  getRole(): Observable<string> {
    //console.log(this.authService..getPayload()['role']);
    console.log('roleProvider.gerRole()');

    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthSimpleToken) => {
          console.log(token);
          return token.isValid() ? token.getPayload()['role'] : 'guest';
        }),
      );
  }
}