import React from "react"
import LoginLogoutButton from "./LoginLogoutButton"

export default ({
    client,
    onRegisterClick,
    onLoginClick,
    onUserClick,
    onFilterClick,
    onLogoutClick,
}) => {
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
		onUserClick={onUserClick}
		onFilterClick={onFilterClick}
	    />
	</header>
    )
}
