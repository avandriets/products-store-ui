import { HttpErrorResponse } from '@angular/common/http';

export interface Status {
  resolved: boolean;
  rejected: boolean;
  pending: boolean;
  err: HttpErrorResponse | null;
}
