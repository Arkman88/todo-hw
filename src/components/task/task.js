import React from "react";
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
    state = {
        isEditing: false,
        editText: this.props.description,
    };

    onEditClick = () => {
        this.setState({ isEditing: true });
    };

    onTextChange = (e) => {
        this.setState({ editText: e.target.value });
    };

    onSave = () => {
        this.props.onEditItem(this.props.id, this.state.editText);
        this.setState({ isEditing: false });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSave();
        }
    };

    render() {
        const { created, onDeleted, onToggleDone, done } = this.props;
        const { isEditing, editText } = this.state;
        const timeAgo = formatDistanceToNow(new Date(created), 
            { addSuffix: true });
        let classNames = 'description';
        
        if (done) {classNames += ' completed'}

        return (
            <div className="view">
                <input
                    className="toggle"
                    checked={done}
                    type="checkbox"
                    onChange={onToggleDone}
                />
                {isEditing ? (
                    <input
                        type="text"
                        className="edit"
                        value={editText}
                        onChange={this.onTextChange}
                        onKeyDown={this.onKeyPress}
                        autoFocus
                    />
                ) : (
                    <label>
                        <span className={classNames} onClick={onToggleDone}>
                            {editText}
                        </span>
                        <span className="created">{timeAgo}</span>
                    </label>
                )}
                {!isEditing && (
                    <>
                        <button 
                            className="icon icon-edit" 
                            onClick={this.onEditClick} />
                        <button 
                            className="icon icon-destroy" 
                            onClick={onDeleted} />
                    </>
                )}
            </div>
        );
    }
}
