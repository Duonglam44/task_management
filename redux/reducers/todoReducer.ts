import { TODO_STATUS } from '@constants/common';
import { Action, TodoReducerState } from 'types'
import { TODO_ACTIONS } from '@redux/types/index'

const initialState: TodoReducerState = {
  todoList: {},
  filter: { status: TODO_STATUS.ALL },
}

export const TodoReducer = (state = initialState, action: Action): TodoReducerState => {
  const { type, payload } = action || {}
  switch (type) {
    case TODO_ACTIONS.SET_TASKS: {

      return {
        ...state,
        todoList: payload?.params
      }
    }

    case TODO_ACTIONS.ADD_TASK: {
      const id = (Math.random() + 1).toString(36).substring(2);

      return {
        ...state,
        todoList: { [id]: { id, ...payload?.params}, ...state.todoList }
      }
    }

    case TODO_ACTIONS.REMOVE_TASK: {
      const clonedTodoList = { ...state.todoList }
      delete clonedTodoList[payload?.params || ''];

      return {
        ...state,
        todoList: clonedTodoList,
      }
    }
    case TODO_ACTIONS.UPDATE_TASK: {
      const clonedTodoList = { ...state.todoList }
      clonedTodoList[payload?.params.id] = payload?.params;

      return {
        ...state,
        todoList: clonedTodoList,
      }
    }
    case TODO_ACTIONS.FILTER_TASK:
      return {
        ...state,
        filter: { status: payload?.params },
      }

    default:
      return state
  }
}
