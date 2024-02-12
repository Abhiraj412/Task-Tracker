
import React from 'react';

const TaskList = ({ task, toggleTask, onToggle }) => {

  function handleToggleTask() {
    toggleTask(task.id);
  }

  return (

    <div className='task-component'>
      <input 
        type='checkbox' 
        checked={task.completed} 
        onChange={handleToggleTask} 
        onDoubleClick={onToggle} />
        {task.name}
    </div>
  );
}

export default TaskList;
