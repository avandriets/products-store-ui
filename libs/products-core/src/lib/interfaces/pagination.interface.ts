export interface Pagination {
  index: number | null;
  limit: number | null;
  offset: number | null;
  count?: number | null;
}
