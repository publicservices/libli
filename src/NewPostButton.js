import React from "react"

export default ({onNewPostClick}) => {
    return (
	<button
	    className="lightButton headerButton"
	    onClick={onNewPostClick}
        >
	    New post
        </button>
    )
}
