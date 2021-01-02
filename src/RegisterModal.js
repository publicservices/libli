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
            <header className="ModalHeader">
		<h2 className="ModalTitle">Register a new account</h2>
	    </header>

	    <form onSubmit={onSubmitRegister} className="Form">
                <div className="FormItem">
                    <input
                        name="inputLoginUrl"
                        className="Input"
                        type="text"
                        placeholder="Dendrite Homeserver URL e.g https://dendrite.matrix.org"
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
                        onClick={onSubmitRegister}
                        value="Register"
                    ></input>
                </div>
            </form>
        </Modal>
    )
}
