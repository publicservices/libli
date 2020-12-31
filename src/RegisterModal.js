import React from "react"
import Modal from "./Modal"

export default ({
    error,
    showRegisterModal,
    inputLoginUrl,
    inputLoginUsername,
    inputLoginPassword,
    handleInputChange,
    onKeyDown,
    onSubmitRegister,
    onRegisterClose,
}) => {

    let errMsg;
    if (error) {
        errMsg = <div className="errblock">{error}</div>;
    }
    
    return (
	<Modal
            show={showRegisterModal}
            handleClose={onRegisterClose}
        >
            <span className="modalSignIn">Register a new account</span>
            <form onSubmit={onSubmitRegister}>
                <div>
                    <input
                        name="inputLoginUrl"
                        className="inputLogin"
                        type="text"
                        placeholder="Dendrite Homeserver URL e.g https://dendrite.matrix.org"
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
                        onClick={onSubmitRegister}
                        value="Register"
                    ></input>
                </div>
            </form>
        </Modal>
    )
}
