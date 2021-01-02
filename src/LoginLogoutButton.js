import React from "react";

// LoginLogoutButton
const LoginLogoutButton = ({
    client,
    onFilterClick,
    onUserClick,
    onLoginClick,
    onRegisterClick,
    onLogoutClick,
}) => {
    if (client.accessToken) {
        let logoutButton = (
	    <button
                className="button headerButton"
                onClick={onLogoutClick}
		title="Log out of the application, disconnect user"
	    >
                Logout
	    </button>
        );
        let loginButton;
        let myUser;
        if (client.isGuest) {
	    logoutButton = (
                <button
		    className="button headerButton"
		    onClick={onRegisterClick}
		    title="Register a new user to start posting and interacting with other users (select a Matrix server to host your account)"
                >
		    Register
                </button>
	    );
	    loginButton = (
                <button
		    className="button headerButton"
		    onClick={onLoginClick}
		    title="Log in the application with an existing user account"
                >
		    Login
                </button>
	    );
        }

        return (
	    <>
                {myUser}
                <img
		src="/filter.svg"
		alt="filter"
		className="button filterButton"
		onClick={onFilterClick}
                />
                {logoutButton}
                {loginButton}
	    </>
        );
    }
    
    return (
        <>
	    <button
                className="button"
                onClick={onRegisterClick}
	    >
                Register
	    </button>
	    <button
                className="button"
                onClick={onLoginClick}
	    >
                Login
	    </button>
        </>
    );
};

export default LoginLogoutButton;

