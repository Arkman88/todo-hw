import React from "react";
import './header.css'

const Header = () => {
    return (
        <header className="header">
            <h1>ToDos</h1>
            <input className="new-todo" 
                placeholder="What needs to be done?" 
                autoFocus>
            </input>
        </header>
    )
}

export default Header;