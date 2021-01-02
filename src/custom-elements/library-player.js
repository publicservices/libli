class LibraryPlayer extends HTMLElement {
    constructor() {
	super()
	this.fullscreen = false
	this.closed = false
    }
    connectedCallback() {
	document.addEventListener('fullscreenchange', () => {
	    if (!document.fullscreenElement && this.fullscreen) {
		this.removeFullscreen()
	    }
	});
    }
    updatePlaylist(playlist) {
	console.log('update playlist', playlist)
	this.closed = false
	this.removeAttribute('closed')
	this.playlist = playlist
	this.render()
    }

    removeFullscreen() {
	console.log('remove', this)
	this.fullscreen = false
	this.removeAttribute('full-screen')
	document.fullscreenElement && document.exitFullscreen()
    }
    addFullscreen() {
	this.closed = false
	this.fullscreen = true
	this.requestFullscreen()
	this.setAttribute('full-screen', true)
	this.removeAttribute('closed')
    }
    toggleFullscreen() {
	this.fullscreen ? this.removeFullscreen() : this.addFullscreen()
    }

    closePlayer() {
	this.setAttribute('closed', true)
    }

    render() {
	this.innerHTML = ''
	let $container = document.createElement('player-view')
	let $buttons = document.createElement('player-buttons')

	let $fullscreenButton = document.createElement('button')
	$fullscreenButton.innerText = '↖'
	$fullscreenButton.onclick = this.toggleFullscreen.bind(this)

	let $closePlayerButton = document.createElement('button')
	$closePlayerButton.innerText = 'x'
	$closePlayerButton.onclick = this.closePlayer.bind(this)

	$buttons.append($closePlayerButton)
	$buttons.append($fullscreenButton)

	/* create all images items */
	this.playlist.events.forEach(item => {
	    if (!item.dataUri) return

	    let $item = document.createElement('player-slide')
	    let $img = document.createElement('img')
	    $img.src = item.dataUri
	    $item.append($img)
	    $container.append($item)
	})

	this.append($buttons)
	this.append($container)
    }
}

customElements.define('library-player', LibraryPlayer)

export default LibraryPlayer
