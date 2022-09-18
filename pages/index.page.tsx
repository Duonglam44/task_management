import { useEffect, Dispatch, useCallback, useState, useMemo, FC } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { ConnectedProps, connect } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, MenuItem, FormControl, InputLabel } from '@mui/material';

import TodoItem from '@components/TodoItem';
import AddIco from '@components/icons/AddIco'
import { RootState } from '@redux/combineReducers'
import StorageService from '@configs/localStorage';
import AddTodoModal from '@components/AddTodoModal';
import { StatusType, TodoItemType, Action } from 'types'
import { TODO_STATUS, TODO_STORAGE } from '@constants/common';
import { filterTaskAction, setTasksAction } from '@redux/actions/todoAction';

const socketService = StorageService.getInstance();

const Home: FC<PropsFromRedux> = (props) => {
  const router = useRouter();
  const { todoList, filterStatus, filterTaskHandler, setTasksHandler } = props;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (router.query?.status) {
      filterTaskHandler(router.query?.status as StatusType)
    }
    const tasksFromStorage = socketService.getItem(TODO_STORAGE);
    const parserTask = JSON.parse(tasksFromStorage || '{}');
    if (!isEmpty(parserTask)) {
      setTasksHandler(parserTask);
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    socketService.addItem(TODO_STORAGE, JSON.stringify(todoList));
  }, [todoList])

  const handleChange = useCallback((event: SelectChangeEvent) => {
    const changedStatus = event.target.value
    filterTaskHandler(changedStatus as StatusType);
    router.push({ query: { status: changedStatus } }, undefined, { shallow: true } );
  }, [filterTaskHandler, router])

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, [])

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [])

  const filteredTask = useMemo(() => {
    const parseTodoList = Object.values(todoList);
    if (filterStatus === TODO_STATUS.ALL) return parseTodoList;

    return parseTodoList.filter(({ status }: TodoItemType) => status === filterStatus);
  }, [filterStatus, todoList])

  const tasksStatusCount =  useMemo(() => {
    const statusCount: Record<string, number> = {
      [TODO_STATUS.ALL]: 0,
      [TODO_STATUS.OPEN]: 0,
      [TODO_STATUS.PENDING]: 0,
      [TODO_STATUS.COMPLETED]: 0,
    };
    Object.values(todoList).forEach(({ status }) => {
      statusCount[status as StatusType] += 1;
      statusCount[TODO_STATUS.ALL]++;
    });
    return statusCount;
  }, [todoList])

  return (
    <div className='page'>
      <h1 className='page_title'>Task Manager</h1>
      <div className='todo_wrapper'>
        <div className='todo_header'>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              className='todo_actions_status'
              value={filterStatus}
              label="Status"
              onChange={handleChange}
            >
              {
                Object.values(TODO_STATUS).map((status) => <MenuItem key={`filter_status_${status}`} value={status}>{status}</MenuItem>)
              }
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={openModal}>
            <span className="me-1">Add New</span>
            <AddIco />
          </Button>
        </div>
        <div className='todo_tasks_status'>
          {
            Object.keys(tasksStatusCount).map((status, idx) => <div className={status} key={`task_status_${idx}`}><span>{status}:</span> {tasksStatusCount[status]}</div>)
          }
        </div>
        <div className="todo_tasks">
          { filteredTask.map((task) => <TodoItem key={`todo_${task.id}`} todoItem={task} /> ) }
        </div>
      </div>
      <AddTodoModal isOpen={showModal} onClose={onCloseModal} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  filterTaskHandler: (status: StatusType) => dispatch(filterTaskAction(status)),
  setTasksHandler: (tasks: Record<string, TodoItemType>) => dispatch(setTasksAction(tasks)),
});

const mapStateToProps = (state: RootState) => {
  const { todoList, filter } = state.TodoReducer;
  return { todoList, filterStatus: filter.status };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);