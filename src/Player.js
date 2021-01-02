// Player contains functions for using radio4000-player
// in the context of the matrix platform
// https://github.com/internet4000/radio4000-player
class Player {
    constructor(serverUrl) {
	if (!serverUrl) {
	    return
	}
	this.serverUrl = serverUrl
    }
    play({event, events, source}) {
	const $player = document.querySelector('library-player')
	const playlist = this.buildPlaylist({events, source})
	$player.updatePlaylist(playlist)
    }

    buildPlaylist({events, source}) {
	// Create a playlist.
	const playlist = {
	    title: source.displayname,
	    image: source.avatar_url,
	    events: this.serializeEvents(events)
	}
	return playlist
    }

    downloadLink(mxcUri) {
        if (!mxcUri) {
            return;
        }
        if (mxcUri.indexOf("mxc://") !== 0) {
            return;
        }
        const mediaUrl = this.serverUrl.slice(0, -1 * "/client".length);
        return mediaUrl + "/media/r0/download/" + mxcUri.split("mxc://")[1];
    }
    
    serializeEvents(events) {
	return events.map(event => {
	    return {
		id: event.event_id,
		text: event.text,
		dataUri: this.downloadLink(event.content.url),
		title: event.content.title,
		mediaUrl: event.content.mediaUrl,
	    }
	})
    }
}

export default Player;
