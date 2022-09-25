import React, { Component } from 'react'
import { ModalBody, ModalFooter, ModalHeader,Modal } from 'reactstrap'

export default class Sider extends Component {
    state={
        visible:false,
        value:''
    }
    saveUsers=(event)=>{
        event.preventDefault()
        let a=event.target[0].value;
        let b=event.target[1].value;
        this.props.chatUsers(a,b);
        this.onClickToggle();
    }
    onClickToggle=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }
    clickedUser=(name,id)=>{
        this.props.checkedName(name,id);
    }
    render() {
        const {usersChat,selected}=this.props
        return (
            <div className="row d-grid p-2">
                <button type='button' className="btn btn-dark mt-2 ml-3" onClick={this.onClickToggle}>Add users</button>
                <Modal isOpen={this.state.visible} toggle={this.onClickToggle}>
                    <ModalHeader>Add user</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.saveUsers} id='form'>
                            Name <input type="text" className={"form-control"} />
                            Last name <input type="text" className={"form-control"}/>
                            Phone <input type="text" className={"form-control"} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type='submit' form='form' className="btn btn-success" >Save</button>
                        <button type='button' className="btn btn-danger" onClick={this.onClickToggle}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <div className="col-md-12">
                    <ul className="list-group mt-2">
                        {
                            usersChat.map((item,index)=>{
                                return <li className={`list-group-item ${item.id===selected ? 'active': " "} mt-2`}  onClick={()=>this.clickedUser(item.firstName,item.id)} key={index}>{item.firstName} {item.lastName}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
