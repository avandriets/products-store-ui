import { NotificationService } from './notification/notification.service';
import { UIPopoverService } from './popover';

export const services: any[] = [
  NotificationService,
  UIPopoverService,
];

export * from './notification/notification.service';
export * from './popover';
