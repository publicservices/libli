import React from "react"

export default ({onNewPostClick}) => {
    return (
	<button
	    className="button headerButton"
	    onClick={onNewPostClick}
        >
	    New post
        </button>
    )
}
