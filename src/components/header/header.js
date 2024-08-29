import React from 'react'
import PropTypes from 'prop-types'

import AddForm from '../item-add-form/item-add-form'
import './header.css'

function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>Todos</h1>
      <AddForm onAdd={onAdd} />
    </header>
  )
}

Header.defaultProps = {
  onAdd: () => {},
}

Header.propTypes = {
  onAdd: PropTypes.func,
}

export default Header
