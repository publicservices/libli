import React from "react"

export default ({client, onUserClick}) => {
    let myUser = (
        <span
	    className="loggedInUser"
	    onClick={onUserClick}
        >
	    {client.userId}
        </span>
    )
    return myUser
}
