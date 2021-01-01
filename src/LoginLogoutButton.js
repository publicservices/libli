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
                className=" headerButton lightButton"
                onClick={onLogoutClick}
	    >
                Logout
	    </button>
        );
        let loginButton;
        let myUser;
        if (client.isGuest) {
	    logoutButton = (
                <button
		    className="lightButton headerButton"
		    onClick={onRegisterClick}
                >
		    Register
                </button>
	    );
	    loginButton = (
                <button
		    className="lightButton headerButton spacer"
		    onClick={onLoginClick}
                >
		    Login
                </button>
	    );
        }

        return (
	    <div className="topRightNav">
                {myUser}
                <img
		src="/filter.svg"
		alt="filter"
		className="filterButton"
		onClick={onFilterClick}
                />
                {logoutButton}
                {loginButton}
	    </div>
        );
    }
    
    return (
        <div>
	    <button
                className=" lightButton topRightNav"
                onClick={onRegisterClick}
	    >
                Register
	    </button>
	    <button
                className=" lightButton topRightNav"
                onClick={onLoginClick}
	    >
                Login
	    </button>
        </div>
    );
};

export default LoginLogoutButton;

