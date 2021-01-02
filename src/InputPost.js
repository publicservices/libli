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
	    inputMediaUrl:"",
	    inputTitle:"",
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

            if (this.state.inputPost.length > 0) {
                await this.props.client.postNewThread({
		    text: this.state.inputPost,
                    dataUri: dataUri,
		    title: this.state.inputTitle,
		    mediaUrl: this.state.inputMediaUrl,
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
            <div className="InputPost">
		<form className="Form">
		    <label className="FormItem FormItemHorizontal">
			<span className="FormItemTitle">Media (file)</span>
			<input
			className="Input InputFile"
			type="file"
			name="file"
			accept="image/*"
			onChange={this.onUploadFileClick.bind(this)}
			/>
		    </label>
		    <div className="FormItem">
			<textarea
			    name="inputPost"
			    className="Textarea"
			    type="text"
			    placeholder="Message"
			    onKeyDown={this.handleKeyDown.bind(this)}
			    onChange={this.handleInputChange.bind(this)}
			    value={this.state.inputPost}
			></textarea>
		    </div>
		    
		    <div className="FormItem">
			<input
			    name="inputMediaUrl"
			    className="Input"
			    type="text"
			    placeholder="URL"
			    onKeyDown={this.handleKeyDown.bind(this)}
			    onChange={this.handleInputChange.bind(this)}
			    value={this.state.inputMediaUrl}
			></input>
		    </div>

		    <div className="FormItem">
			<input
			    name="inputTitle"
			    className="Input"
			    type="text"
			    placeholder="Title"
			    onKeyDown={this.handleKeyDown.bind(this)}
			    onChange={this.handleInputChange.bind(this)}
			    value={this.state.inputTitle}
			></input>
		    </div>
		    <div className="FormItem FormItemSubmit">
			{this.postButton()}
		    </div>
		</form>
            </div>
        );
    }
}

export default InputPost;
