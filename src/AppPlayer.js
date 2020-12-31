import React from "react"

export default ({isPlaying}) => {
    let playerClasses
    if (isPlaying) {
	playerClasses = 'Player Player--isPlaying'
    } else {
	playerClasses = 'Player'
    }

    /* html custom-element, webcomponent external to react */
    return (
	<aside className={ `${playerClasses}` }>
	    <library-player></library-player>
	</aside>
    )
}
