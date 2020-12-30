// Player contains functions for using radio4000-player
// in the context of the matrix platform
// https://github.com/internet4000/radio4000-player
class Player {
    constructor(storage) {
        if (!storage) {
            return;
        }
    }

    play({
	track,
	tracks,
	channel
    }) {
	const $player = document.querySelector('radio4000-player')
	var vue = $player.getVueInstance()

	const playlist = this.buildPlaylist({
	    tracks,
	    channel
	})
	
	vue.updatePlaylist(playlist)
    }

    buildPlaylist({tracks, channel}) {
	// Create a playlist.
	const playlist = {
	    title: channel.displayname,
	    image: channel.avatar_url,
	    tracks: this.serializeTracks(tracks)
	}
	return playlist
    }
    serializeTracks(tracks) {
	return tracks.map(track => {
	    return {
		id: track.event_id,
		title: track.content.trackTitle,
		url: track.content.trackUrl
	    }
	})
	/* [
	   {
	   id: '1',
	   title: 'Randomfunk.ogg',
	   url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_01_-_Randomfunk.ogg'
	   },
	   {
	   id: '2',
	   title: 'Rare and Cheese - Jazzpolice',
	   url: 'https://ia801409.us.archive.org/5/items/DWK051/Rare_and_Cheese_-_02_-_Jazzpolice.ogg'
	   }
	   ] */
    }
}

export default Player;
