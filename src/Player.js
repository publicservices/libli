// Player contains functions for using radio4000-player
// in the context of the matrix platform
// https://github.com/internet4000/radio4000-player
class Player {
    constructor(storage) {
        if (!storage) {
            return;
        }
    }

    play({event, events, source}) {
	console.log(event, events, source)
	const $player = document.querySelector('library-player')
	const playlist = this.buildPlaylist({events, source})
	console.log('player', $player)
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
    serializeEvents(events) {
	return events.map(event => {
	    return {
		id: event.event_id,
		text: event.text,
		dataUri: event.url,
		title: event.content.title,
		mediaUrl: event.content.mediaUrl,
	    }
	})
    }
}

export default Player;
