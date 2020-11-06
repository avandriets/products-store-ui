import { MainEffects } from './main.effects.service';
import { RouterEffects } from './router.effects';

export const effects: any[] = [
  MainEffects,
  RouterEffects,
];

export * from './main.effects.service';
export * from './router.effects';
