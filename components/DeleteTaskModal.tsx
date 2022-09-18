import React, { FC, useCallback, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { TransitionProps } from '@mui/material/transitions';
import { Button, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

import { TodoItemType, Action } from 'types'
import { removeTaskAction } from '@redux/actions/todoAction';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DeleteTaskDialogType = PropsFromRedux & {
  isOpen: boolean;
  onClose: () => void;
  task: TodoItemType;
}

const DeleteTaskDialog: FC<DeleteTaskDialogType> = (props) => {
  const { isOpen, onClose, task, updateTaskHandler } = props;
  const { id, title, description } = task || {};
  const deleteTaskHandler = useCallback(() => {
    onClose();

    if (!id) return;
    updateTaskHandler(id);
  }, [onClose, updateTaskHandler, id]);

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Are you sure to delete this task?</DialogTitle>
      <DialogContent>
        <div className='todo_item_content'>
          <p className="task_title">{ title }</p>
          <p className="task_desc">{ description }</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='success'>Discard</Button>
        <Button onClick={deleteTaskHandler} variant='outlined' color='error'>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  updateTaskHandler: (id: string) => dispatch(removeTaskAction(id)),
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeleteTaskDialog);
