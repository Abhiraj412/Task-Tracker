import './App.css';
import { useState, useRef, useEffect } from 'react';
import TaskList from './components/TaskList';
import Button from './components/Button';

const LOCAL_STORAGE_KEY = 'todoA.todo';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const taskRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    const taskName = taskRef.current.value.trim();
    if (!taskName) {
      alert('Please enter a task');
      return;
    }
    const id = Math.floor(Math.random() * 10000);
    const currentDate = new Date().toLocaleDateString();
    setTasks(prevTasks => [
      ...prevTasks,
      { id: id, name: taskName, complete: false, date: currentDate }
    ]);
    taskRef.current.value = '';
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, complete: !task.complete } : task
    ));
  }

  function removeTasks() {
    setTasks(tasks.filter(task => !task.complete));
  }

  function removeAllTasks() {
    setTasks([]);
  }

  function clearStorage() {
    localStorage.clear();
    alert('Storage has been cleared, refresh the page to see results.');
  }

  function handleFilterChange(status) {
    setFilter(status);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.complete;
    } else if (filter === 'incomplete') {
      return !task.complete;
    }
    return true;
  });

  const incompleteTasksCount = tasks.filter(task => !task.complete).length;

  return (
    <div className='container'>

      <h1 className='project-title'>Task Tracker</h1>

      <div className="input-container">

        <input className='input-field' ref={taskRef} placeholder='Add a new task' />

        <Button onClick={addTask} text='Add' />
      </div>

      <div className="buttons-container">

        <Button onClick={() => handleFilterChange('all')} text='All Tasks' />
        <Button onClick={() => handleFilterChange('completed')} text='Completed' />
        <Button onClick={() => handleFilterChange('incomplete')} text={`Incomplete (${incompleteTasksCount})`} />
        <Button onClick={removeTasks} text='Remove Completed' />
        <Button onClick={removeAllTasks} text='Remove All' />
        <Button onClick={clearStorage} text='Clear Storage' />

      </div>

      {filteredTasks.length > 0 ? <TaskList tasks={filteredTasks} toggleTask={toggleTask} /> :
      
       <p>No tasks to show</p>}

    </div>
  );
}

export default App;
