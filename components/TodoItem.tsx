import React, { useCallback, useState, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, MenuItem, FormControl, InputLabel } from '@mui/material';

import EditIco from '@components/icons/EditIco'
import { TODO_STATUS } from '@constants/common';
import TrashIco from '@components/icons/TrashIco'
import AddTodoModal from '@components/AddTodoModal';
import { TodoItemType, StatusType, Action } from 'types';
import DeleteTaskDialog from '@components/DeleteTaskModal';
import { updateTaskAction } from '@redux/actions/todoAction';

type TTodoItem = PropsFromRedux & {
  todoItem: TodoItemType
}

const TodoItem: React.FC<TTodoItem> = (props) => {
  const { todoItem, updateTaskHandler } = props;
  const { description, title, status } = todoItem || {};
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    if (event.target.value === status) {
      return;
    }

    updateTaskHandler({ ...todoItem, status: event.target.value as StatusType });
  }, [todoItem, status, updateTaskHandler])

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, [])

  const closeDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, [])

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [])

  const openDeleteModal = useCallback(() => {
    setShowDeleteModal(true);
  }, [])


  return (
    <div className={`todo_item ${status}`}>
      <div className='todo_item_content'>
        <p className="task_title">{title}</p>
        <p className="task_desc">{description}</p>
      </div>
      <div className='todo_actions'>
        <Button variant="text" onClick={openModal}><EditIco /></Button>
        <Button variant="text" color='error' onClick={openDeleteModal}><TrashIco /></Button>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            className='todo_actions_status'
            value={todoItem.status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={TODO_STATUS.OPEN}>{TODO_STATUS.OPEN}</MenuItem>
            <MenuItem value={TODO_STATUS.PENDING}>{TODO_STATUS.PENDING}</MenuItem>
            <MenuItem value={TODO_STATUS.COMPLETED}>{TODO_STATUS.COMPLETED}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <AddTodoModal isOpen={showModal} onClose={onCloseModal} task={todoItem} openDeleteModal={openDeleteModal} />
      <DeleteTaskDialog isOpen={showDeleteModal} onClose={closeDeleteModal} task={todoItem} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  updateTaskHandler: (task: TodoItemType) => dispatch(updateTaskAction(task)),
});


const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TodoItem);