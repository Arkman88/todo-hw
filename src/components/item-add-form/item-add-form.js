import React from "react"
import './item-add-form.css'

export default class AddForm extends React.Component {

    state = {
        text: ''
    }
    inputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    keyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const {text} = this.state;
            if (text.trim()) {
                this.props.onAdd(text);
                this.setState({text: ''})
            }
        }
    }

    render () {
        return (
            <input className="new-todo" 
                placeholder="What needs to be done?" 
                autoFocus
                value={this.state.text}
                onChange={this.inputChange}
                onKeyDown={this.keyPress}>
            </input>
        )
    }
}