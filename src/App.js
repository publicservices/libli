import React from "react";
import "./App.css";
import "./custom-elements/library-player.js"
import UserPage from "./UserPage";
import StatusPage from "./StatusPage";
import TimelinePage from "./TimelinePage";
import ReputationPane from "./ReputationPane";
import AppHeader from "./AppHeader";
import AppPlayer from "./AppPlayer";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const constDendriteServer = "https://dendrite.matrix.org";

// Main entry point for Cerulean.
// - Reads the address bar and loads the correct page.
// - Loads and handles the top bar which is present on every page.
class App extends React.Component {
    constructor(props) {
        super(props);

        /*
           Possible Cerulean paths:
           /                       --> aggregated feed of all timelines followed
           /username               --> user's timeline
           /username/with_replies  --> timeline with replies
           /username/room_id/id     --> permalink
           Examples:
           http://localhost:3000/@really:bigstuff.com/with_replies
           http://localhost:3000/@really:bigstuff.com
           http://localhost:3000/@really:bigstuff.com/!cURbafjkfsMDVwdRDQ:matrix.org/$foobar
         */

        // sensible defaults
        this.state = {
            page: "timeline",
            viewingUserId: this.props.client.userId,
            withReplies: false,
            statusId: null,
            showLoginModal: false,
            showRegisterModal: false,
            showFilterPane: false,
            inputLoginUrl: constDendriteServer,
            inputLoginUsername: "",
            inputLoginPassword: "",
            error: null,
	    isPlaying: false
        };

        // parse out state from path
        const path = window.location.pathname.split("/");
        console.log("input path: " + window.location.pathname);
        if (path.length < 2) {
            console.log("viewing timeline");
            return;
        }
        const userId = path[1];
        if (!userId) {
            console.log("viewing timeline");
            this.state.page = "timeline";
            return;
        } else if (!userId.startsWith("@")) {
            console.log("unknown user ID in path: " + path);
            return;
        }
        this.state.page = "user";
        this.state.viewingUserId = userId;
        this.state.withReplies = path[2] === "with_replies";
        if ((path[2] || "").startsWith("!") && path[3]) {
            this.state.page = "status";
            this.state.statusId = path[3];
            this.state.roomId = path[2];
        }
    }

    componentDidMount() {
        // auto-register as a guest if not logged in
        if (!this.props.client.accessToken) {
            this.registerAsGuest();
        }
    }

    listenPlayer($mediaPlayer) {
	/* let's catch when track change, so we can do stuff */
	$mediaPlayer.addEventListener('trackChanged', (event) => {
	    const eventData = event.detail[0]
	    console.info('trackChanged event', event.detail[0])

	    console.log(eventData)

	    /* it is the first track */
	    if (!eventData || eventData.previousTrack || eventData.previousTrack.id) {
		this.setState({
		    showMediaPlayer: true
		})
	    }
	})
    }

    async registerAsGuest() {
        try {
            let serverUrl = this.state.inputLoginUrl + "/_matrix/client";
            await this.props.client.registerAsGuest(serverUrl);
            window.location.reload();
        } catch (err) {
            console.error("Failed to register as guest:", err);
            this.setState({
                error: "Failed to register as guest: " + JSON.stringify(err),
            });
        }
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

    onLoginClose() {
        this.setState({ showLoginModal: false, error: null });
    }

    onRegisterClose() {
        this.setState({ showRegisterModal: false, error: null });
    }

    onLoginClick(ev) {
        this.setState({
            showLoginModal: true,
            showRegisterModal: false,
            inputLoginUrl: constDendriteServer,
            inputLoginUsername: "",
            inputLoginPassword: "",
        });
    }

    onRegisterClick(ev) {
        this.setState({
            showLoginModal: false,
            showRegisterModal: true,
            inputLoginUrl: constDendriteServer,
            inputLoginUsername: "",
            inputLoginPassword: "",
        });
    }

    onFilterClick(ev) {
        this.setState({
            showFilterPane: !this.state.showFilterPane,
        });
    }
    onPlay(ev) {
        this.setState({
	    isPlaying: true
	})
	this.props.player.play(ev)
    }

    onKeyDown(formType, event) {
        if (event.key !== "Enter") {
            return;
        }
        if (formType === "login") {
            this.onSubmitLogin();
        } else if (formType === "register") {
            this.onSubmitRegister();
        } else {
            console.warn("onKeyDown for unknown form type:", formType);
        }
    }

    async onSubmitLogin() {
        let serverUrl = this.state.inputLoginUrl + "/_matrix/client";
        try {
            await this.props.client.login(
                serverUrl,
                this.state.inputLoginUsername,
                this.state.inputLoginPassword,
                true
            );
            this.setState({
                page: "user",
                viewingUserId: this.props.client.userId,
                showLoginModal: false,
            });
        } catch (err) {
            console.error("Failed to login:", err);
            this.setState({
                error: "Failed to login: " + JSON.stringify(err),
            });
        }
    }

    async onSubmitRegister() {
        try {
            let serverUrl = this.state.inputLoginUrl + "/_matrix/client";
            await this.props.client.register(
                serverUrl,
                this.state.inputLoginUsername,
                this.state.inputLoginPassword
            );
            this.setState({
                page: "user",
                viewingUserId: this.props.client.userId,
                showRegisterModal: false,
            });
        } catch (err) {
            console.error("Failed to register:", err);
            this.setState({
                error: "Failed to register: " + JSON.stringify(err),
            });
        }
    }

    async onLogoutClick(ev) {
        try {
            await this.props.client.logout();
        } finally {
            // regardless of whether the HTTP hit worked, we'll remove creds so UI needs a kick
            this.forceUpdate(() => {
                this.registerAsGuest();
            });
        }
    }

    onLogoClick() {
        window.location.href = "/";
    }

    onUserClick() {
        window.location.href = "/" + this.props.client.userId;
    }

    /**
     * Render a main content page depending on this.state.page
     * Possible options are:
     *  - status: A permalink to a single event with replies beneath
     *  - timeline: The aggregated feed of all users the logged in user is following.
     *  - user: An arbitrary user's timeline. If the user is the logged in user, an input box to post a message is also displayed.
     */
    renderPage() {
        if (!this.props.client.accessToken) {
            return <div>Please wait....</div>;
        }
        if (this.state.page === "user") {
            return (
                <UserPage
                    client={this.props.client}
                    userId={this.state.viewingUserId}
                    withReplies={this.state.withReplies}
                    onPlay={this.onPlay.bind(this)}
                />
            );
        } else if (this.state.page === "status") {
            return (
                <StatusPage
                    client={this.props.client}
                    userId={this.state.viewingUserId}
                    eventId={this.state.statusId}
                    roomId={this.state.roomId}
                />
            );
        } else if (this.state.page === "timeline") {
            return <TimelinePage client={this.props.client} />;
        } else {
            return <div>Whoops, how did you get here?</div>;
        }
    }

    render() {
        let filterPane;
        if (this.state.showFilterPane) {
            filterPane = (
                <ReputationPane onClose={this.onFilterClick.bind(this)} />
            );
        }
	
        return (
            <div className="App">
	    
	    <AppHeader
	    client={this.props.client}
	    onLogoutClick={this.onLogoutClick.bind(this)}
	    onRegisterClick={this.onRegisterClick.bind(this)}
	    onLoginClick={this.onLoginClick.bind(this)}
	    onUserClick={this.onUserClick.bind(this)}
	    onFilterClick={this.onFilterClick.bind(this)}
	    ></AppHeader>
	    
	    <AppPlayer isPlaying={this.state.isPlaying}></AppPlayer>
	    
            <main className="AppMain">
	    {this.renderPage()}
	    </main>
	    
            {filterPane}

            <LoginModal
		error={this.state.error}
		showLoginModal={this.state.showLoginModal}
		inputLoginUrl={this.state.inputLoginUrl}
		inputLoginUsername={this.state.inputLoginUsername}
		inputLoginPassword={this.state.inputLoginPassword}
		handleInputChange={this.handleInputChange.bind(this)}
		onKeyDown={this.onKeyDown.bind(this, "login")}
		onSubmitLogin={this.onSubmitLogin.bind(this)}
		onLoginClose={this.onLoginClose.bind(this)}
	    ></LoginModal>

	    <RegisterModal
		error={this.state.error}
		showRegisterModal={this.state.showRegisterModal}
		inputLoginUrl={this.state.inputLoginUrl}
		inputLoginUsername={this.state.inputLoginUsername}
		inputLoginPassword={this.state.inputLoginPassword}
		handleInputChange={this.handleInputChange.bind(this)}
		onKeyDown={this.onKeyDown.bind(this, "register")}
		onSubmitRegister={this.onSubmitRegister.bind(this)}
		onRegisterClose={this.onRegisterClose.bind(this)}
	    ></RegisterModal>
	    
            </div>
        )
    }
}

export default App;
