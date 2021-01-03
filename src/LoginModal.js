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
        errMsg = <div className="FormItem errblock">{error}</div>;
    }
    
    return (
	<Modal
            show={showLoginModal}
            handleClose={onLoginClose}
        >
            <header className="ModalHeader">
		<h2 className="ModalTitle">Sign in</h2>
	    </header>

	    <form onSubmit={onSubmitLogin} className="Form">
		<div className="FormItem">
		    <input
			name="inputLoginUrl"
			className="Input"
			type="text"
			placeholder="Homeserver URL e.g https://matrix.org"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginUrl}
		    ></input>
		</div>
		<div className="FormItem">
                    <input
			name="inputLoginUsername"
			className="Input"
			type="text"
			placeholder="Username e.g alice"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginUsername}
                    ></input>
		</div>
		<div className="FormItem">
                    <input
			name="inputLoginPassword"
			className="Input"
			type="password"
			placeholder="Password"
			onChange={handleInputChange}
			onKeyDown={onKeyDown}
			value={inputLoginPassword}
                    ></input>
		</div>
		{errMsg}

		<div className="FormItem FormItemSubmit">
                    <input
			type="button"
			className="button darkButton"
			onClick={onSubmitLogin}
			value="Login"
                    ></input>
		</div>
            </form>

	    <footer className="ModalFooter">
		<p>
		    Note: try to also login with the <a href="https://app.element.io">element.io</a> matrix client, with the same user, to see in details what is happening with your data.
		</p>
	    </footer>
        </Modal>
    )
}
