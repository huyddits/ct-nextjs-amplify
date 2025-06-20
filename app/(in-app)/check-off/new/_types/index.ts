export type CreateCheckOffItem = {
  assignedDate: string;
  dueDate: string;
  assignedTask: string;
  note: string;
  receivers: ReceiversItem[];
};

export type ReceiversItem = {
  userId: string;
};

export type StudentItem = {
  userId: string;
  name: string;
};
