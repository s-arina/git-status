import '../../css/Tasks.css';
import React from 'react';
import { useState, useContext } from 'react';
import { db } from '../../db/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import {
  toggleComplete,
  handleEditTitle,
  handleDelete,
} from '../../db/Firestore';
import SingleTaskCard from './SingleTaskCard';
import { GlobalContext } from '../../context/GlobalState';

function Tasks() {
  const [title, setTitle] = useState('');
  const { tasks } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(
      collection(
        db,
        'allUsers',
        window.localStorage.getItem('uid'),
        'userTasks'
      ),
      { title, completed: false , created: new Date().getTime()}
    );
    setTitle('');
  };

  return (
    <div className='todo-list'>
      <div className='task-title'>
        <h2>Today's Tasks</h2>
      </div>

      <form className='add-task-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter a task...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </form>
      <div className='task-container'>
        
        <div className='tasks'>
          {tasks.length > 0 ? (
            // could probably add a sort method here
            tasks
              .sort((a, b) => (a.created > b.created ? 1 : -1))
              .map((task) => (
                <SingleTaskCard
                  key={task.id}
                  task={task}
                  handleSubmit={handleSubmit}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEditTitle={handleEditTitle}
                />
              ))
          ) : (
            <h2>No tasks at the moment...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
