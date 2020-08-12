import React from 'react'

const blogContext = React.createContext({
    user: null,
    handleAuth: () => {},
    handleLogout: () => {},
    isAuth: null,
    displayMode: 'grid',
    changeDisplayMode: () => {},
    dataSet: []
})

export default blogContext;