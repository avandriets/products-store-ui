import { RouterStateService } from './router.state';
import { UserStateService } from './user.state';

export const states: any[] = [
  RouterStateService,
  UserStateService,
];

export * from './router.state';
export * from './user.state';
