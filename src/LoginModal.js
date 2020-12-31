import React from "react"
import Modal from "./Modal"

export default ({
    error,
    showLoginModal,
    inputLoginUrl,
    inputLoginUsername,
    inputLoginPassword,
    handleInputChange,
    onKeyDown,
    onSubmitLogin,
    onLoginClose,
}) => {

    let errMsg;
    if (error) {
        errMsg = <div className="errblock">{error}</div>;
    }
    
    return (
	<Modal
            show={showLoginModal}
            handleClose={onLoginClose}
        >
            <span className="modalSignIn">Sign in</span>
            <form onSubmit={onSubmitLogin}>
		<div>
		    <input
			name="inputLoginUrl"
			className="inputLogin"
			type="text"
			placeholder="Homeserver URL e.g https://matrix.org"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginUrl}
		    ></input>
		</div>
		<div>
                    <input
			name="inputLoginUsername"
			className="inputLogin"
			type="text"
			placeholder="Username e.g alice"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginUsername}
                    ></input>
		</div>
		<div>
                    <input
			name="inputLoginPassword"
			className="inputLogin"
			type="password"
			placeholder="Password"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginPassword}
                    ></input>
		</div>
		{errMsg}
		<div>
                    <input
			type="button"
			className="darkButton modalSignInButton"
			onClick={onSubmitLogin}
			value="Login"
                    ></input>
		</div>
            </form>
        </Modal>
    )
}
