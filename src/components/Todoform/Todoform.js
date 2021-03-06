import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Todolist from './Todolist';
import {AiOutlineDownCircle} from 'react-icons/ai'

function Todoform() {

const data = localStorage.getItem('Tasks');
const [task, setTask] = useState('');
const [taskStorage, setTaskStorage] = useState(data ? JSON.parse(data) : []);
const [showedCards, setShowedCards] = useState(false);
const [editInput, setEditInput] = useState(false);
const [edited, setEdited] = useState('');

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
    console.log('success')
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

const toggleTaskCompleted = (id) => {
  const updatedTask = [...taskStorage].map((task) => {
    if(task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  })

  setTaskStorage(updatedTask);
}


const handleEdit = (id) => {
  const toEdit = [...taskStorage]
      .filter(task => task.id === id)
      .map(task => {return task.task_name})
      
      setEditInput(prev => !prev);
      setEdited(toEdit);
}

const submitEdit = (id) => {

  const d = new Date();
  let currentDate = d.toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  [...taskStorage]
    // eslint-disable-next-line array-callback-return
    .filter(function(task) {
      if(task.id === id) {
        task.task_name = edited;
        task.date_log = currentDate;
      }
    });
    
    
    setEditInput(prev => !prev);
    setEdited('');
}


return (
  <section className='todoform-container'>
        <div className='mainform-container'>
          <div>
          <h1>Todo</h1>
          </div>
          <form id='todoform'>
              {!editInput ? (
              <>
                <span>
                    <input id='add-input' type='text' value={task} placeholder='Type your task'
                    onChange={(e) => {setTask(e.target.value)}}
                    maxLength='23'
                    />
                </span>
                <button onClick={handleSubmit}>Add</button>
              </>) : (
              <>
                <span>
                    <input type='text' value={edited} placeholder='Edit your task'
                    onChange={(e) => {setEdited(e.target.value)}}
                    maxLength='23'
                    />
                </span>
              </>)}
              
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
              <div className='created-todo' key={task.id}>
                <Todolist 
                  task={task.task_name} 
                  date_log={task.date_log}
                  style={task.completed}
                />
                <div className='card-btns'>
                  <input className='checker' type="checkbox" 
                  style={{marginRight: '12px'}}
                  onChange={() => {
                    toggleTaskCompleted(task.id);
                  }}
                  checked={task.completed}
                  />
                  <button onClick={() => {
                    handleDelete(task.id)
                  }}>Delete</button>
                  <button id={task.id} onClick={() => {
                    handleEdit(task.id);
                  }}
                  >Edit</button>

                  {editInput && (
                    <button onClick={(e) => {
                      e.preventDefault(); 
                      submitEdit(task.id);
                      }}>Save</button>
                  )}
                </div>
              </div>
              )
            })}
       </div>}
    </section>
  )
}

export default Todoform;