import React from "react";
import AddForm from "../item-add-form/item-add-form";
import './header.css'

const Header = ({onAdd}) => {
    return (
        <header className="header">
            <h1>Todos</h1>
            <AddForm  onAdd={onAdd}/>
        </header>
    )
}

export default Header;