import React from "react";
import './item-add-form.css';

export default class AddForm extends React.Component {
    state = {
        text: ''
    };

    inputChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { text } = this.state;
            if (text.trim()) {
                this.props.onAdd(text);
                this.setState({ text: '' });
            }
        }
    };

    render() {
        return (
            <input
                className="new-todo"
                placeholder="Добавьте сюда задачу"
                autoFocus
                value={this.state.text}
                onChange={this.inputChange}
                onKeyDown={this.onKeyPress}
            />
        );
    }
}
