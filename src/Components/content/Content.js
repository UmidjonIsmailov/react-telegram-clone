import React, { Component } from 'react'

export default class Content extends Component {
    state={
        inputValue:''        
    }
    changeMessage=(event)=>{
        this.setState({
            inputValue:event.target.value
        })
    }
    sendMessage=()=>{
        let from = 0;
        let to=this.props.userId
        this.props.writing(this.state.inputValue,from,to)
        this.setState({
            inputValue:'',
        })
    }
    render() {
        const {friend,history,last,userId}=this.props
        return (
            <div>
                {friend ? 
            <div className="row">
                <div className="col-md-12 d-grid">
                    <h1>{this.props.friend}</h1>
                    <input type="text" value={this.state.inputValue} onChange={this.changeMessage} className="form-control"/>
                </div>
                <div className="col-md-4 text-right offset-11 float-right">
                    <button className="btn btn-success btn-block mb-2 mt-2" onClick={this.sendMessage}>Send</button>
                </div> <hr/>
                <div className="col-md-12 rounded bg-light mt-2">
                    {
                        last.filter(item=>{
                            return item.toId===userId
                        }).map((item,index)=>{
                            return <h5 id='time' className={`p-2 mt-2 ${item.id===0 ? ' float-right' : ' float-left'}`}>
                                {item.text} <span>{item.date}</span>
                            </h5>
                        })
                    }
                </div>
            </div> : ''}
            </div>
        )
    }
}
