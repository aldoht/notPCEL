import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const notSetupGuard: CanActivateFn = (route, state) => {
  let service = inject(AuthService);
  let router = inject(Router);

  if (service.ready) {
    if (!service.isAuthenticated) {
      return true;
    }

    return service.shouldSetup ? router.navigate(["/auth/setup"]) : true;
  }

  return service.readyPromise().then(value => {
    if (!service.isAuthenticated) {
      return true;
    }

    return service.shouldSetup ? router.navigate(["/auth/setup"]) : true;
  });
};

export const setupGuard: CanActivateFn = (route, state) => {
  let service = inject(AuthService);
  let router = inject(Router);

  if (service.ready) {
    return service.shouldSetup ? true : router.navigate(["/home"]);
  }

  return service.readyPromise().then(value => {
    return service.shouldSetup ? true : router.navigate(["/home"]);
  });
};
