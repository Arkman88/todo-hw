import React from "react";

const Header = () => {
    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo" 
                placeholder="What needs to be done?" 
                autoFocus>
            </input>
        </header>
    )
}

export default Header;