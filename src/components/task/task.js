import React from "react";
import './task.css'
import { formatDistanceToNow} from 'date-fns';

export default class Task extends React.Component {

    render() {
        const { description, 
            created, onDeleted, 
            onToggleDone, done } = this.props;
        const timeAgo = formatDistanceToNow(new Date(created), {addSuffix: true})
        let classNames = 'description';
        if (done) {classNames += ' completed'};

        return (
            <div className="view">
                <input className="toggle" 
                checked={done}
                type="checkbox"
                onChange={onToggleDone}>
                </input>
                <label>
                    <span className={classNames}
                        onClick={ onToggleDone}>
                        { description } 
                    </span>
                    <span className="created">{ timeAgo }</span>
                </label>
                <button className="icon icon-edit" />
                <button className="icon icon-destroy" onClick={onDeleted} />
            </div>
        )
    }
}