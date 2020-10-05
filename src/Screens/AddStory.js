import React from "react";

class AddStory extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {};
        this.state.title = "";
        this.state.content = "";
    }

    handleStory = () => {
        const {title, content} = this.state;
        const story = {title:"" , content:""};
        story.title = title;
        story.content = content;

        this.props.addStory(story);
        // this.setState({
        //     story
        // })
    }

    render()
    {
        return( 
            <div>
                <section class="text-gray-700 body-font relative">
  <div class="container px-5 py-16 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Add Story</h1>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-full">
          <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
          onChange={e=> this.setState({title: e.target.value})} value={this.state.title} placeholder="Title" type="text"/>
        </div>
        <div class="p-2 w-full">
          <textarea class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-48 focus:border-indigo-500 text-base px-4 py-2 resize-none block" 
          onChange={e=> this.setState({content: e.target.value})} value={this.state.content} placeholder="Content"></textarea>
        </div>
        <div class="p-2 w-full">
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={e => {this.handleStory(); this.setState({title:"", content:""})}}>
          Add</button>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
        )
    }
}

export default AddStory;