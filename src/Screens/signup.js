import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class Signup extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {};
        this.state.username = "";
        this.state.password = "";
    }

    handleSubmit = () =>{
        const {username, password} = this.state;
        if(!username || !password || username==="" || password==="") return;

        this.props.addUser({username, password});
        this.setState({
            username:"",
            password:""
        })
    }
    render()
    {
        if(!this.props.isAuthenticated){
        return (
            <div>
                        <div class="bg-gray-200">
    <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Pratilipi</span>
      </a>
      <p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© 2020 Pratilipi —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@HardikAswal</a>
      </p>
    </div>
  </div>
            <section className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
               
                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" 
                onChange= {e => this.setState({username: e.target.value})} value={this.state.username} placeholder="Username" type="text"/>
                <input className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4" 
                onChange = {e => this.setState({password: e.target.value})} value={this.state.password} placeholder="Password" type="password"/>
                <button 
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={()=> {this.handleSubmit()}}>Signup</button>
                <p className="text-xs text-gray-500 mt-3">Already a member? <Link to="/login">Login</Link></p>
                </div>
                </div>
            </section>
            </div>
        )
        }
        else
        {
            return (
            <Redirect to="/login"></Redirect>
            )
        }
    }
}

export default Signup;