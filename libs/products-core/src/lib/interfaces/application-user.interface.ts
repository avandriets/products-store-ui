export interface ApplicationUser {
  id: string | null;
  name: string | null;
  email: string | null;
  anonymous?: boolean;
}
