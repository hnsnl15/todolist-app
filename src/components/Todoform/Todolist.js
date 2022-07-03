import React from 'react';

export default function Todolist({task, date_log}) {

  return (
    <div className='container m-1 todolist-container todo-scroll'>
      <article className='card'>
          <div className='card-body'>
            <div className='card-text' style={{fontWeight: 500}}>
              <p style={{fontSize: '12px'}}>{task}</p>
              <p style={{fontSize: '9px'}}>{date_log}</p>
            </div>
          </div>
      </article>
    </div>
  )
}
