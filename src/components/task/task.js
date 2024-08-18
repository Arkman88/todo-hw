import React from "react";
import './task.css'
import { formatDistanceToNow} from 'date-fns';

export default class Task extends React.Component {
    
    state = {
        done: false
    }

    onLabelClick = () => {
        this.setState(({done}) =>{
            return {
                done: !done
            }
        })
    }

    render() {
        const { description, created, onDeleted } = this.props;
        const {done} = this.state;
        const timeAgo = formatDistanceToNow(new Date(created), {addSuffix: true})
        let classNames = 'description';
        if (done) {classNames += ' completed'};

        return (
            <div className="view">
                <input className="toggle" 
                checked={done}
                type="checkbox"
                onChange={this.onLabelClick}>
                </input>
                <label>
                    <span className={classNames}
                        onClick={ this.onLabelClick}>
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