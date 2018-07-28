/*
<View
  user={this.state.user}
  onSubmit={this.handleSubmit}
  placeholderUsername={this.state.user.displayName}
  onChange={this.handleChange}
  valueUsername={this.state.username}
  valueProject={this.state.currentProject}
  valueDescription={this.state.currentDescription}
  projects={this.state.projects}
/>
*/

import React, { Component } from 'react';

export default function(props) {
  return (
    <div className='wrapper'>
      {props.user ?

          <p>Welcome {props.user.displayName}</p>

          <div className='container'>

          <section className="add-project">
            <form onSubmit={props.handleSubmit}>
                <input type="text" name="username" placeholder={props.user.displayName} onChange={props.handleChange} value={props.valueUsername} />
                <input type="text" name="currentProject" placeholder="Insert Project Title" onChange={props.handleChange} value={props.valueProject} />
                <input type="text" name="currentDescription" placeholder="Insert Description" onChange={props.handleChange} value={props.valueDescription} />
                <button>Add Item</button>
            </form>
          </section>

          <section className='display-project'>
            <div className="wrapper">
              <ul>
                {props.projects.map((project) => {
                return (
                  <li key={project.id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>brought by: {project.user}</p>

                  </li>
                    )
                })
                }
              </ul>
            </div>
          </section>

          </div>

        :

          <div className='container'>
            <section className='display-project'>
              <div className="wrapper">
                <ul>
                  {props.projects.map((project) => {
                  return (
                    <li key={project.id}>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <p>by: {project.user}</p>
                    </li>
                      )
                  })
                  }
                </ul>
              </div>
            </section>
          </div>

</div>
      }
    </div>
  );
}
