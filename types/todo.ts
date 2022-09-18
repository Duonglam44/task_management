export type TodoItemType = {
  id?: string;
  title: string;
  description: string;
  status?: StatusType;
}

export type StatusType =  "Open" | "Pending" | "Completed" | "All";

export type TodoReducerState = {
  todoList: Record<string, TodoItemType>;
  filter: {
    status?: StatusType,
  },
}

export type TodoFormValue = {
  title: string;
  description: string;
  status: StatusType;
}