import React from "react";
import { Link, Redirect } from "react-router-dom";
import AddStory from './AddStory';
import Header from './header';
import jwtDecode from 'jwt-decode';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

class WelcomeScreen extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={};
        this.state.liveUsers = "";
        this.state.user = null;
    }

    // componentDidMount()
    // {
    //     try{
    //     const decoded = jwtDecode(localStorage.getItem('user'));
    //     this.setState({
    //         user:decoded
    //     });
    //     }
    //     catch(ex){}
    // }

    render(){
        if(!localStorage.getItem("user")){
            return (
                <Redirect to="/login"></Redirect>
            )
        }
        else{  
       
        const decoded = jwtDecode(localStorage.getItem('user'));

        console.log(decoded);
        return (
            <div>
                <Header logout={this.props.logout}></Header>
                <AddStory addStory={this.props.addStory} stories={this.props.stories}></AddStory>

                <section class="text-gray-700 body-font overflow-hidden">
                <div class="container px-5 py-24 mx-auto">
                    <div class="-my-8">

                    {this.props.stories.map((x,i)=>(
                        <div class="py-8 flex flex-wrap md:flex-no-wrap" key={i}>
                
                        <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                        <span class="tracking-widest font-medium title-font text-gray-900">{i+1}</span>
                        <span class="mt-1 text-gray-500 text-sm">{x.date}</span>
                        </div>
                        <div class="md:flex-grow">
                        <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{x.title}</h2>
                        <p class="leading-relaxed">{x.content.substring(0, 120)}...</p>
                        <Link to="/story" onClick={e => {this.props.showStory({x, decoded})}} class="text-indigo-500 inline-flex items-center mt-4">Read More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        </Link>
                        <hr style={{borderWidth:"2px"}}></hr>
                        </div>
                    </div>
                    ))}
                  
                    </div>
                </div>
                </section>
            </div>
        )
        }
    }
}

export default WelcomeScreen;