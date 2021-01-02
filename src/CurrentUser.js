import React from "react"

export default ({client, onUserClick}) => {
    const title = `Logged in as: ${client.userId}`
    let myUser = (
        <span
	    className="loggedInUser"
	    onClick={onUserClick}
	    title={title}
        >
	    {client.userId}
        </span>
    )
    return myUser
}
