import React from 'react';

const TaskList = ({ tasks, toggleTask }) => {
  return (
    <table className='task-table'>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Task</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id}>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td>{task.date}</td>
            <td>
              <input
                type='checkbox'
                checked={task.complete}
                onChange={() => toggleTask(task.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
