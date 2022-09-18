import React, { useCallback, useEffect, Dispatch, FC } from 'react';
import { Form } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { TransitionProps } from '@mui/material/transitions';
import { Radio, RadioGroup, FormControlLabel, Slide, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import Input from '@components/form/Input'
import { TodoItemType, Action } from 'types'
import HookRadio from '@components/form/HookRadio';
import HookFormWrap from '@components/form/HookFieldWrap'
import { TODO_STATUS, StatusOptions } from '@constants/common';
import { TodoValidator, defaultValues } from '@validation/todoValidator';
import { addTaskAction, updateTaskAction } from '@redux/actions/todoAction';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AddTodoModalType = PropsFromRedux & {
  isOpen: boolean;
  onClose: () => void;
  task?: TodoItemType;
  openDeleteModal?: () => void;
}

const AddTodoModal: FC<AddTodoModalType> = (props) => {
  const { task, isOpen, onClose, addTaskHandler, updateTaskHandler, openDeleteModal } = props;
  const { register, control, clearErrors, handleSubmit, reset } = useForm<TodoItemType>({
    defaultValues,
    resolver: yupResolver(TodoValidator()),
    mode: 'all',
  });

  useEffect(() => {
    clearErrors();
    if (task) {
      reset(task);
    }
    // eslint-disable-next-line
  }, [task])

  const handleClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const onSubmitForm = useCallback((values: TodoItemType) => {
    console.log("🚀 ~ onSubmitForm ~ values:", values)
    const mutateTaskValue = { ...values };
    let mutateTask = addTaskHandler;

    if (task?.id) {
      mutateTask = updateTaskHandler;
      mutateTaskValue.id = task.id;
    }

    mutateTask(mutateTaskValue);
    handleClose();
  }, [task, updateTaskHandler, addTaskHandler, handleClose])

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="add-todo-dialog"
      className="todo_modal"
    ><Form onSubmit={handleSubmit(onSubmitForm)}>
        <DialogTitle>{ task?.id ? 'Update this' : 'Add new' } task</DialogTitle>
        <DialogContent>

          <HookFormWrap
            labelProps={{ for: 'title' }}
            labelName='Title'
            colProps={{ className: 'ps-0 pe-0' }}
          >
            <Input
              name="title"
              control={control}
              type="text"
              id="title"
              placeholder="Title"
              autoComplete="off"
            />
          </HookFormWrap>
          <HookFormWrap
            labelProps={{ for: 'description' }}
            labelName='Description'
            colProps={{ className: 'ps-0 pe-0' }}
          >
            <Input
              name="description"
              control={control}
              type="text"
              id="password"
              placeholder="Description"
              autoComplete="off"
            />
          </HookFormWrap>
          <HookFormWrap
            labelProps={{ for: 'description' }}
            labelName='Status'
            colProps={{ className: 'ps-0 pe-0' }}
          >
            <HookRadio className="flex-row" name='status' control={control} options={StatusOptions}/>
          </HookFormWrap>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='info'>Discard</Button>
          {task?.id && <Button onClick={openDeleteModal} variant='outlined' color='error'>Delete</Button>}
          <Button type="submit" variant='outlined' color='success'>{task?.id ? 'Update' : 'Add'} </Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addTaskHandler: (task: TodoItemType) => dispatch(addTaskAction(task)),
  updateTaskHandler: (task: TodoItemType) => dispatch(updateTaskAction(task)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddTodoModal);