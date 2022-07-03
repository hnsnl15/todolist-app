import React from 'react';


export default function Todolist({task, date_log, style}) {
  
  return (
    <div className='container m-1 todolist-container todo-scroll'>
      <article className='card'>
          <div className='card-body'>
            <div className='card-text' style={{fontWeight: 500, position: 'relative'}}>
              <p className='isComplete' style={style ? {fontSize: '14px', textDecoration: 'line-through'} : {fontSize: '14px'}}>{task}</p>
              <p style={{fontSize: '12px'}}>{date_log}</p>
            </div>
          </div>
      </article>
    </div>
  )
}
