import { HttpErrorResponse } from '@angular/common/http';

/**
 * Provides Status Interface.
 */
export interface Status {
  resolved: boolean;
  rejected: boolean;
  pending: boolean;
  err: HttpErrorResponse | null;
}

/**
 * Provides Statuses Interface.
 */
export interface Statuses {
  [key: string]: Status;
}
