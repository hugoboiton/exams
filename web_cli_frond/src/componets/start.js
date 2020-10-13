import React, { Component } from 'react'
import Login from './login';
import Register from './register'
import Menu from './menu'
import CreatDoc from './creat_doc'
import ListDoct from './list_doc'
export class Start extends Component {
   
    constructor(props){
        super(props)
        this.state ={
            step: 1, // cambiando entre componentes
            session:
            {
                user:"sin user"
            },
            list:[],
        }
        this.steps=this.steps.bind(this);
        this.newlist=this.newlist(this);
    }
    steps(new_step)
    {
        this.setState({
            step:new_step
        })
    }
    newlist(li)
    {
        this.setState({
            list:li
        })
    }
    render() 
    {
        const {step}=this.state;
        const {session}=this.state;
        const {list}=this.state;
        switch (step) 
        {
            //login 
            case 1 :
                return(<Login
                            steps={this.steps}
                            session={session}
                        />)
            
            // registre    
            case 2 :
                return(<Register
                    steps={this.steps}
                     />)
            // menu    
            case 3:
                return(<Menu
                    steps={this.steps}
                    session={session}
                    newlist={this.newlist}
                     />)
            // creat documents
            case 4:
                return(<CreatDoc
                    steps={this.steps}
                    session={session}
                     />)
            // list and delet docu
            case 5:
               
                return(<ListDoct
                    steps={this.steps}
                    session={session}
                     />)
            default:
                return(<Login
                    steps={this.steps}
                    session={session}
                />)

        }
    }

}
export default Start;