import React from "react";

// Modal is a way to display dialog boxes
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show
        ? "Modal Modal--isVisible"
        : "Modal Modal--notVisible";

    return (
        <aside className={showHideClassName}>
	    <aside className="ModalOverlay" onClick={handleClose}></aside>
            <article className="ModalMain">
                {children}
            </article>
        </aside>
    );
};

export default Modal;
