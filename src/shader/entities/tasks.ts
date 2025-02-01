type minutes = number;

export type Task = {
  id: string;
  projectId: string;
  name: string;
  month: minutes[];
  year: minutes[];
  goal: minutes;
  deadline: Date | null;
};
