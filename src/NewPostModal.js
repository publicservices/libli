import React from "react"
import Modal from "./Modal"
import InputPost from "./InputPost"

export default ({
    showNewPostModal,
    onNewPostClose,
    error,
    client,
    onPost
}) => {

    let errMsg;
    if (error) {
        errMsg = <div className="errblock">{error}</div>;
    }
    
    return (
	<Modal
            show={showNewPostModal}
            handleClose={onNewPostClose}
        >
	    <InputPost
		client={client}
		onPost={onPost}
		open={true}
            />
	    {errMsg}
        </Modal>
    )
}
