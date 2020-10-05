import React from "react";
import { BrowserRouter as Router, Route,Redirect,Link} from "react-router-dom";
import Header from "./header";
import jwtDecode from 'jwt-decode';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

class Story extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.state.isAuthenticated = props.isAuthenticated;
        this.state.liveUsers = ""
    }

    //New
    componentDidMount (){
        const socket = socketIOClient(ENDPOINT);
        socket.on("counter", data => {
            // console.log("Received: ",data);

            this.setState({
                liveUsers: data.count
            });
          });
    }
    //NEW
    render(){
        let story = JSON.parse(localStorage.getItem('story'));
        if(!localStorage.getItem('user')){
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
                <Link to="/profile"><button class="flex ml-10 mt-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go Back</button></Link>
               <section class="text-gray-700 body-font">
               <div class="container px-5 py-5 mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                    <h2 class="text-s text-indigo-500 tracking-widest font-medium title-font mb-1"> 
                        <svg fill="none" style={{display:"inline", backgroundColor:"#e8e8e8", borderRadius:"50%", margin:"5px", padding:"5px"}}stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg> {story.totalViews.length} 
                        <span style={{marginLeft:"10px", marginRight:"10px"}}> </span>
                        <svg fill="none" style={{display:"inline", backgroundColor:"#e8e8e8", borderRadius:"50%", margin:"5px", padding:"5px"}} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg> {this.state.liveUsers}
                    </h2>
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{story.title}</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">{story.content}</p>
                    </div>
                    {/* <div class="flex flex-wrap">
                    <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200">
                    <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                    <p class="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                    <a class="text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    </a>
                    </div> 
                    </div> */}
                    {/* <Link to="/profile"><button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >Go Back</button></Link> */}
                </div>
                </section>
            </div>
        )
        }
    }
}
export default Story;








































