import React from 'react';
import Signup from './Screens/signup';
import Login from './Screens/login';
import WelcomeScreen from './Screens/WelcomeScreen';
import Story from './Screens/story';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AddStory from './Screens/AddStory';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.state.user = [];
    this.state.isAuthenticated = false;
    this.state.stories = [];
  }

  componentDidMount(){
    // axios.get('/api/users')
    axios.get('http://localhost:5000/api/users')
         .then(res => {
            const user = res.data;
            this.setState({
                user:user
            });        
      });
    
  //  axios.get('/api/stories')
    axios.get('http://localhost:5000/api/stories')
    .then(res => {
        const stories = res.data;
        console.log("Stories: ", stories);
        this.setState({
            stories
        });        
   });
}

  addUser(user_info){
    console.log(user_info);
    let {user}=this.state;
    user.push(user_info);
    console.log(user);

    // axios.post('/api/users/register',user_info)
    axios.post('http://localhost:5000/api/users/register',user_info)
    .then(res => {
      if(res.status === 400) alert("Username already exists.");
        if(res.status === 200)
        {
          this.setState({
              user:user,
              isAuthenticated: true
          })
      }
    })
    .catch(err => {
        window.alert("Username must be atleast 3 characters long\nPassword must be atleast 15 characters long.");
        console.log(err)
    });
    console.log(this.state.user);
  }

  handleLogin = (user) =>{
    console.log("Inside Handle login");
    const credentials = {
        username:user.username,
        password:user.password
    }
    if(!credentials.username || !credentials.password) return console.log('Invalid');
    // axios.post('/api/users/login',credentials) 
    axios.post('http://localhost:5000/api/users/login',credentials)
         .then(response=>{
            console.log(response.data); 
            if(response.headers['x-auth-token'])
                {
                console.log(response.headers['x-auth-token']);
                localStorage.setItem("user",JSON.stringify(response.headers));
                this.setState({
                    isAuthenticated:true
                });
            }
            return response.data;
         })
         .catch(err => window.alert('Invalid ID or Password.'));
    this.setState({
        username:"",
        password:""
    });
}


logout = (e) =>{
    console.log('Logging out...');
    localStorage.removeItem("user");
    window.location.reload();
    this.setState({
        isAuthenticated:false
    });
}

addStory = (story) => {
  console.log(story);
  const stories = this.state.stories;

  stories.push(story);

  // axios.post('/api/stories',story)
  axios.post('http://localhost:5000/api/stories',story)
    .then(res => {
      if(res.status === 400) alert("Title already exists.");
        if(res.status === 200)
        {
          // window.location.reload();
          window.location.href = window.location.href;

          this.setState({
              stories
          })
      }
    })
    .catch(err => {
        console.log(err)
    });
}

showStory = (info) => {
  const {stories} = this.state;
  const story = info.x;
  const decoded = info.decoded;
  console.log(story);
  console.log(decoded);
  var curr_story = story;
  console.log(curr_story._id)
  if(!curr_story.totalViews.includes(decoded.id)){
    curr_story.totalViews.push(decoded.id);
    console.log(curr_story);
    // axios.put(`/api/stories/${curr_story._id}`,curr_story)
    axios.put(`http://localhost:5000//api/stories/${curr_story._id}`,curr_story)
         .then(res => {
            this.setState({
               stories
            });
         })
         .catch(err => {
            console.log(err);
         })
  }

  localStorage.setItem("story",JSON.stringify(story));
}

  render()
  {
    return (
      <React.Fragment>
        <Route  path="/" exact><Redirect to="/login"></Redirect></Route>
        <Route exact path="/signup" render={()=><Signup isAuthenticated={this.state.isAuthenticated} user={this.state.user} addUser={this.addUser.bind(this)} ></Signup>}></Route>
        <Route exact path="/login" render={()=><Login isAuthenticated={this.state.isAuthenticated} handleLogin={this.handleLogin.bind(this)} isAuthenticated={this.state.isAuthenticated} user={this.state.user}></Login>}></Route>
        <Route exact path="/profile" render={()=><WelcomeScreen showStory={this.showStory.bind(this)} stories={this.state.stories} addStory={this.addStory.bind(this)} logout={this.logout.bind(this)} isAuthenticated={this.state.isAuthenticated} user={this.state.user} addUser={this.addUser.bind(this)} ></WelcomeScreen>}></Route>
        <Route exact path="/story" render={()=><Story logout={this.logout.bind(this)} isAuthenticated={this.state.isAuthenticated} storyPanel={this.state.storyPanel} showProduct={this.showStory.bind(this)} stories={this.state.stories} isAuthenticated={this.state.isAuthenticated} user={this.state.user}></Story>}></Route>
      </React.Fragment>
    );
  }
}

export default App;
