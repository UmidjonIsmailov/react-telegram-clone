import React, { Component } from 'react'
import Sider from './Components/Sider/Sider'
import Content from './Components/content/Content'
export default class App extends Component {
  state={
    chatUsers:[],
    nameOfValue:'',
    selectedUser:"",
    messages:[],
    history: [],
  }
  checkName=(clickedName,id)=>{
    this.setState({
      nameOfValue:clickedName,
      selectedUser:id,
    })
  }
  wirteUsers=(name,surname)=>{
    let item=this.state.chatUsers;
    this.state.chatUsers.push({id:item.length,firstName:name,lastName:surname});
    this.setState({
      chatUsers:this.state.chatUsers
    })
    localStorage.setItem('users',JSON.stringify(item))
  }
  writingMessages=(string,from,to)=>{
    let b=new Date();
    let a={
      fromId:from,
      toId:to,
      text:string,
      date:b.getHours()+':'+b.getMinutes(),
    }
    let c=this.state.messages
    c.push(a);
    this.setState({
      messages:c,
    })
    localStorage.setItem('message',JSON.stringify(this.state.messages))
  }
  getMessages=(user)=>{
    let historyOfChat=this.state.messages;
    console.log("HI its history"+ historyOfChat);
    this.state.history.push(historyOfChat);
    this.setState({
      history:this.state.history,
    }) 
  }
  componentDidMount(){
    let newchat=localStorage.getItem('users');
    if(newchat){
      let usersArray=JSON.parse(newchat);
      this.setState({
        chatUsers:usersArray
      })
    }
    else {
      return ' '
    }
    let text1=localStorage.getItem('message');
    if(text1){
      let newSms=JSON.parse(text1);
      this.setState({
        messages:newSms,
      });
      this.getMessages(this.state.chatUsers)
    }
    else{
      return ' '
    }
  }
  showItems=()=>{
    console.log(this.state.history)
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sider chatUsers={this.wirteUsers} checkedName={this.checkName} selected={this.state.selectedUser} usersChat={this.state.chatUsers}/>
          </div>
          <div className="col-md-9">
            <Content friend={this.state.nameOfValue} history={this.state.history} userId={this.state.selectedUser} writing={this.writingMessages} last={this.state.messages} />
          </div>
        </div>
      </div>
    )
  }
}