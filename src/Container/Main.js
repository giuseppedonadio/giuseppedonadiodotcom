import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';
import Header from '../Components/Header.js';
import '../App.css';



class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentProject: '',
      currentDescription: '',
      username: '',
      projects: [],
      user: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }


  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const projectsRef = firebase.database().ref('projects');
    const project = {
      title: this.state.currentProject,
      description: this.state.currentDescription,
      user: this.state.user.displayName || this.state.user.email
    }
    projectsRef.push(project);
    this.setState({
      currentProject: '',
      currentDescription: '',
      username: ''
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const projectsRef = firebase.database().ref('projects');
    projectsRef.on('value', (snapshot) => {
      let projects = snapshot.val();
      let newState = [];
      for (let project in projects) {
        newState.push({
          id: project,
          title: projects[project].title,
          description: projects[project].description,
          user: projects[project].user
        });
      }
      this.setState({
        projects: newState
      });
    });
  }

  removeProject(projectId) {
    const projectRef = firebase.database().ref(`/projects/${projectId}`);
    projectRef.remove();
  }

  render() {
    return (
      <div className='dashboard'>
        <header>
            <div className='wrapper'>
              <h1>GiuseppeDonadioDotCom</h1>
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
              }
            </div>
        </header>

        {this.state.user ?
          <div className='wrapper'>
            <p>Welcome {this.state.user.displayName}</p>
            <div className='container'>
              <section className="add-project">
          			<form onSubmit={this.handleSubmit}>
          		      <input type="text" name="username" placeholder={this.state.user.displayName} onChange={this.handleChange} value={this.state.username} />
          		      <input type="text" name="currentProject" placeholder="Insert Project Title" onChange={this.handleChange} value={this.state.currentProject} />
                    <input type="text" name="currentDescription" placeholder="Insert Description" onChange={this.handleChange} value={this.state.currentDescription} />
          		      <button>Add Item</button>
          		  </form>
        		  </section>
              <section className='display-project'>
        		    <div className="wrapper">
        		      <ul>
        		        {this.state.projects.map((project) => {
        				    return (
        				      <li key={project.id}>
        				        <h3>{project.title}</h3>
                        <p>{project.description}</p>
        				        <p>brought by: {project.user}</p>
        				        <button onClick={() => this.removeProject(project.id)}>Remove Project</button>
        				      </li>
        				        )
        				    })
        				    }
        		      </ul>
        		    </div>
    		      </section>
            </div>
          </div>

          :

          <div className='wrapper'>
          <div className='container'>
            <section className='display-project'>
              <div className="wrapper">
                <ul>
                  {this.state.projects.map((project) => {
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
}
export default Main;
