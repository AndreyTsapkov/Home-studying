import React from 'react';
import IconButton from 'components/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';

const Todo = ({ text, completed, onToggleCompleted, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />

      <p className="TodoList__text">{text}</p>
      {/* <button type="button" className="TodoList__btn" onClick={onDelete}>
        Удалить
      </button> */}

      <IconButton>
        <DeleteIcon width="32" height="32" fill="#fff" onClick={onDelete} />
      </IconButton>
    </div>
  );
};

export default Todo;
