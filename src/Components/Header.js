import React, { Component } from 'react';

export default function(props) {
  return (
    <header>
        <div className='wrapper'>
          <h1>GiuseppeDonadioDotCom</h1>
          {this.state.user ?
            <button onClick={props.logout}>Log Out</button>
            :
            <button onClick={props.login}>Log In</button>
          }
        </div>
    </header>
  )
}
