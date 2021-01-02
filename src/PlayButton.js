import React from "react"

export default ({onClick}) => {
    return (
	<button
	    onClick={onClick}
	    className="button lightButton buttonPlay"
	>
	    Play
	</button>
    )
}
