class LibraryPlayer extends HTMLElement {
    updatePlaylist(playlist) {
	console.log('update playlist', playlist)
	this.playlist = playlist
	this.render()
    }
    render() {
	this.innerHTML = ''
	let $container = document.createElement('player-view')
	this.playlist.events.forEach(item => {
	    console.log('item', item)
	    let $item = document.createElement('article')
	    $item.innerText = item.id
	    $container.append($item)
	})
	this.append($container)
    }
}

customElements.define('library-player', LibraryPlayer)

export default LibraryPlayer
