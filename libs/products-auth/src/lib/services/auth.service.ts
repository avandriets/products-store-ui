import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ENVIRONMENT } from '@products-store-ui/configuration';
import { User, UserManager } from 'oidc-client';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public user: User;
  public loggedIn = false;

  private appServer = `${window.location.protocol}//${window.location.host}`;
  private settings: any = { };
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private manager: UserManager = null;

  public constructor(
    @Inject(ENVIRONMENT) private environment: any,
  ) {

    this.settings = {
      authority: `${this.environment.keyCloakURL}${this.environment.keyCloakRealm}/`,
      client_id: this.environment.keyClientId,
      redirect_uri: `${this.appServer}/assets/auth.html`,
      silent_redirect_uri: `${this.appServer}/assets/silent-renew.html`,
      post_logout_redirect_uri: this.appServer,
      response_type: 'id_token token',
      scope: 'openid profile email',
      automaticSilentRenew: true,
      monitorSession: true,
      filterProtocolClaims: true,
      loadUserInfo: true,
    };

    this.manager = new UserManager(this.settings);

    this.manager.getUser().then(user => {
        if (user) {
          this.user = user;
          this.loadUserSettings(user);
        } else {
          this.loggedIn = false;
          this.user = null;
        }
      },
    ).catch(() => (this.loggedIn = false));

    this.manager.events.addUserLoaded(user => this.loadUserSettings(user));

    this.manager.events.addUserSignedOut(() => {
      console.log('addUserSignedOut');
      this.startSignout();
    });

    this.manager.events.addSilentRenewError(data => {
      console.log('addSilentRenewError', data);
      this.silentSignIn();
    });

    this.manager.events.addAccessTokenExpired(
      () => {
        console.log('addAccessTokenExpired');
        this.silentSignIn();
      },
    );

  }

  public login(): void {

    this.startSignin();

  }

  public logout(): void {

    this.startSignout();

  }

  public getUser(): Observable<User> {

    return from(
      this.manager.getUser().then(user => user).catch(err => {
        console.log(err);

        return null;
      }),
    ).pipe(
      map(user => {
          if (user) {
            user.profile = this.jwtHelper.decodeToken(this.user.access_token);
            this.user.profile = user.profile;

            return user;
          }
        },
      ));

  }

  private silentSignIn(): void {

    this.manager.signinSilent().then(() => { },
      error => {
        console.log('signinSilent error - ', error);
        this.startSignin();
      },
    ).catch(error => {
        console.log('signinSilent error - ', error);
        this.startSignin();
      },
    );

  }

  private loadUserSettings(user: User): void {

    if (user) {
      this.loggedIn = true;
      this.user = user;
    }

    this.user.profile = this.jwtHelper.decodeToken(user.access_token);

  }

  private startSignin(): void {

    this.manager.signinRedirect({ data: localStorage.getItem('redirectUrl') }).then(() => {
      console.log('signinRedirect done');
    }).catch(err => console.log(err));

  }

  private startSignout(): void {

    this.manager.signoutRedirect().then(resp => {
      console.log('signed out', resp);
    }).catch(err => {
      console.log(err);
    });

  }

}
