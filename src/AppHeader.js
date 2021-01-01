import React from "react"
import LoginLogoutButton from "./LoginLogoutButton"
import CurrentUser from "./CurrentUser"
import NewPostButton from "./NewPostButton"

export default ({
    client,
    onRegisterClick,
    onLoginClick,
    onLogoutClick,
    onUserClick,
    onNewPostClick,
    onFilterClick,
}) => {
    const {isGuest} = client
    return (
	<header className="AppHeader">

	    <div className="titleAndLogo">
		<div className="title">
		    <a href="/">Library</a>
		</div>
            </div>

	    <LoginLogoutButton
		client={client}
		onLogoutClick={onLogoutClick}
		onRegisterClick={onRegisterClick}
		onLoginClick={onLoginClick}
		onFilterClick={onFilterClick}
	    />

	    { !isGuest && (
		  <CurrentUser
		      client={client}
		      onUserClick={onUserClick}
		  ></CurrentUser>
	      )}


	    { !isGuest && (
		  <NewPostButton
		      onNewPostClick={onNewPostClick}
		  ></NewPostButton>
	    ) }
	</header>
    )
}
