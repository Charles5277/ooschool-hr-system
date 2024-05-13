export interface LogDTO {
  id: number;
  type: string;
  action: string;
  time: string;
  operator: string;
  target: string;
  original: string | null;
  current: string | null;
}
