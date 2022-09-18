import { TODO_ACTIONS } from '@redux/types'
import { StatusType, TodoItemType } from 'types'

export const addTaskAction = (task: TodoItemType) => {
  return {
    type: TODO_ACTIONS.ADD_TASK,
    payload: { params: task }
  }
}

export const updateTaskAction = (task: TodoItemType) => {
  return {
    type: TODO_ACTIONS.UPDATE_TASK,
    payload: { params: task }
  }
}

export const removeTaskAction = (id: string) => {
  return {
    type: TODO_ACTIONS.REMOVE_TASK,
    payload: { params: id }
  }
}

export const filterTaskAction = (status: StatusType) => {
  return {
    type: TODO_ACTIONS.FILTER_TASK,
    payload: { params: status }
  }
}

export const setTasksAction = (tasks: Record<string, TodoItemType>) => {
  return {
    type: TODO_ACTIONS.SET_TASKS,
    payload: { params: tasks }
  }
}
