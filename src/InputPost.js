import React from "react";
import "./InputPost.css";

// Input box for posts
// Props:
//  - client: Matrix client
//  - onPost: function() called when a post is sent.
class InputPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputPost: "",
	    inputTrackUrl:"",
	    inputTrackTitle:"",
            loading: false,
	    
	    /* not using */
            uploadFile: null,
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.onPostClick(event);
        }
    }

    async onPostClick(ev) {
        this.setState({
            loading: true,
        });
        try {
            let dataUri;
            if (this.state.uploadFile) {
                dataUri = await this.props.client.uploadFile(
                    this.state.uploadFile
                );
                console.log(dataUri);
            }
            this.setState({
                uploadFile: null,
            });

	    const trackUrl = 'https://youtu.be/fYcv3cg61b8'

            if (this.state.inputPost.length > 0) {
                await this.props.client.postNewThread({
		    text: this.state.inputPost,
                    dataUri: dataUri,
		    trackTitle: this.state.inputTrackTitle,
		    trackUrl: this.state.inputTrackUrl,
		});
            }
            this.setState({ inputPost: "" });
            if (this.props.onPost) {
                this.props.onPost();
            }
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    onUploadFileClick(event) {
        const file = event.target.files[0];
        console.log(file);
        this.setState({
            uploadFile: file,
        });
    }

    postButton() {
        if (!this.props.client.accessToken) {
            return <div />;
        }
        let classes = "inputPostSendButton";
        return (
            <button
                alt="Create track"
                className={classes}
                onClick={this.onPostClick.bind(this)}
            >Add</button>
        );
    }

    render() {
        if (this.state.loading) {
            return <div className="loader">Loading...</div>;
        }
        return (
            <div>
                <div className="inputPostWithButton">
		    <input
                        name="inputTrackTitle"
                        className="inputPost"
                        type="text"
                        placeholder="Track title"
                        onKeyDown={this.handleKeyDown.bind(this)}
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.inputTrackTitle}
                    ></input>              

		    <input
                        name="inputTrackUrl"
                        className="inputPost"
                        type="text"
                        placeholder="Track URL"
			onKeyDown={this.handleKeyDown.bind(this)}
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.inputTrackUrl}
                    ></input>

		    <textarea
                        name="inputPost"
                        className="inputPost"
                        type="text"
                        placeholder="Track body"
                        onKeyDown={this.handleKeyDown.bind(this)}
                        onChange={this.handleInputChange.bind(this)}
                        value={this.state.inputPost}
                    ></textarea>
		    
                    {this.postButton()}
                </div>
                {/* <input
                    className="inputPostUploadButton"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={this.onUploadFileClick.bind(this)}
                    /> */}
            </div>
        );
    }
}

export default InputPost;
