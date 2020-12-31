class LibraryPlayer extends HTMLElement {
    updatePlaylist(playlist) {
	console.log('update playlist', playlist)
    }
}

customElements.define('library-player', LibraryPlayer)

export default LibraryPlayer
