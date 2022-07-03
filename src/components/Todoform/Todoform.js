import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Todolist from './Todolist';
import {AiOutlineDownCircle} from 'react-icons/ai'

function Todoform() {

const data = localStorage.getItem('Tasks');
const [task, setTask] = useState('');
const [taskStorage, setTaskStorage] = useState(data ? JSON.parse(data) : []);
const [showedCards, setShowedCards] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();

  const d = new Date();
  let currentDate = d.toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  let taskObject = {
    id: uuidv4(),
    task_name: task,
    date_log: currentDate,
    completed: false
  }

  if (taskObject.task_name) {
    alert('success')
  } else {
    alert('Please enter a note.');
    return;
  }
  
  setTaskStorage([...taskStorage, taskObject]);
  setTask('');
}


useEffect(() => {
  localStorage.setItem('Tasks', JSON.stringify(taskStorage));
})

const handleDelete = (id) => {
  const updatedTask = [...taskStorage].filter(task => task.id !== id);
  setTaskStorage(updatedTask)
}

return (
  <section className='todoform-container'>
        <div className='mainform-container'>
          <div>
          <h1>Todo</h1>
          </div>
          <form id='todoform'>
              <span>
                  <input type='text' value={task} placeholder='Type your task'
                  onChange={(e) => {setTask(e.target.value)}}
                  maxLength='23'
                  />
              </span>
              <button onClick={handleSubmit}>Add</button>
          </form>
       </div>

       {taskStorage.length > 0 && <div className='todolist-container'>
          <div className='container todolist-title' style={showedCards ? {transform: 'scale(0.88)'} : {transform: 'scale(0.96)'}}>
            <h1>Tasks ({taskStorage.length})</h1>
            <span onClick={() => {
              setShowedCards(prev => !prev)
            }}><AiOutlineDownCircle fontSize='25px'/></span>
          </div>


          {showedCards && taskStorage.map(task => {
            return (
              <div className='created-todo'>
                <Todolist 
                  key={task.id} 
                  task={task.task_name} 
                  date_log={task.date_log}
                />
                <div className='card-btns'>
                  <button onClick={() => {
                    handleDelete(task.id)
                  }}>Delete</button>
                  <button>Edit</button>
                </div>
              </div>
              )
            })}
       </div>}
    </section>
  )
}


export default Todoform;