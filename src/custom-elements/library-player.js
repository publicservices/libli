class LibraryPlayer extends HTMLElement {
    static get observedAttributes() {
	return ['event-id']
    }
    connectedCallback() {
	this.fullscreen = false
	this.autoplay = false
	this.closed = false
	this.autoplayTiming = Number(this.getAttribute('autoplay-timing')) || 5000
	this.nextAutoplayEvents = []
	
	const closed = this.getAttribute('closed') || true
	if (closed === "false") {
	    this.closed = false
	} else {
	    this.setAttribute('closed', true)
	    this.closed = true
	}
	this.eventId = this.getAttribute('event-id') || ''
	
	document.addEventListener('fullscreenchange', () => {
	    if (!document.fullscreenElement && this.fullscreen) {
		this.removeFullscreen()
	    }
	})
    }
    attributeChangedCallback(name, oldValue, newValue) {
	if (name === 'event-id') {
	    this.eventId = newValue
	    this.selectCurrentEvent()
	}
    }

    selectEvent(eventId) {
	const eventsLen = this.playlist.events.length
	const currentEventObjects = this.playlist.events.filter(event => {
	    return event.id === eventId
	})

	const currentEventObject = currentEventObjects[0]
	this.currentEventIndex = this.playlist.events.indexOf(currentEventObject)
	this.previousEventIndex = this.currentEventIndex - 1
	this.nextEventIndex = this.currentEventIndex + 1

	if (this.previousEventIndex < 0) {
	    this.previousEventIndex = eventsLen - 1
	}

	if (this.nextEventIndex > eventsLen - 1) {
	    this.nextEventIndex = 0
	}

	const $elActive = this.querySelector('player-slide[is-active]')
	$elActive && $elActive.removeAttribute('is-active')

	const $el = this.querySelector(`player-slide[slide-id="${eventId}"]`)
	$el && $el.setAttribute('is-active', true)

	if (this.autoplay) {
	    this.nextAutoplayEvents.push(
		setTimeout(this.selectNextEvent.bind(this), this.autoplayTiming)
	    )
	}
    }
    
    selectCurrentEvent() {
	this.selectEvent(this.eventId)
    }
    selectNextEvent() {
	const nextEventId = this.playlist.events[this.nextEventIndex].id
	this.selectEvent(nextEventId)
    }
    selectPreviousEvent() {
	const previousEventId = this.playlist.events[this.previousEventIndex].id
	this.selectEvent(previousEventId)
    }
    playNextEvent() {
	if (this.autoplay) {
	    this.toggleAutoplay()
	}
	this.selectNextEvent()
    }
    playPreviousEvent() {
	if (this.autoplay) {
	    this.toggleAutoplay()
	}
	this.selectPreviousEvent()
    }
    
    updatePlaylist(playlist) {
	this.closed = false
	this.removeAttribute('closed')
	this.playlist = playlist
	this.render()
    }

    removeFullscreen() {
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

    toggleAutoplay() {
	this.autoplay = !this.autoplay

	if (this.autoplay) {
	    this.nextAutoplayEvents.push(
		setTimeout(this.selectNextEvent.bind(this), this.autoplayTiming)
	    )
	} else {
	    if (this.nextAutoplayEvents.length) {
		this.nextAutoplayEvents.forEach(clearTimeout)
	    }
	}
    }

    closePlayer() {
	this.setAttribute('closed', true)
    }

    render() {
	this.innerHTML = ''
	let $container = document.createElement('player-view')
	let $buttons = document.createElement('player-buttons')

	let $autoPlayButton = document.createElement('input')
	$autoPlayButton.type = 'checkbox'
	$autoPlayButton.innerText = '⇢'
	$autoPlayButton.checked = this.autoplay
	$autoPlayButton.onclick = this.toggleAutoplay.bind(this)
	
	let $fullscreenButton = document.createElement('button')
	$fullscreenButton.innerText = '↖'
	$fullscreenButton.onclick = this.toggleFullscreen.bind(this)

	let $closePlayerButton = document.createElement('button')
	$closePlayerButton.innerText = 'x'
	$closePlayerButton.onclick = this.closePlayer.bind(this)

	let $nextButton = document.createElement('button')
	$nextButton.innerText = '→'
	$nextButton.onclick = this.playNextEvent.bind(this)

	let $previousButton = document.createElement('button')
	$previousButton.innerText = '←'
	$previousButton.onclick = this.playPreviousEvent.bind(this)
	
	$buttons.append($closePlayerButton)
	$buttons.append($fullscreenButton)
	$buttons.append($previousButton)
	$buttons.append($nextButton)
	$buttons.append($autoPlayButton)

	/* create all images items */
	this.playlist.events.forEach((event, index) => {
	    if (!event.dataUri) return

	    let $slide = document.createElement('player-slide')
	    $slide.setAttribute('slide-id', event.id)

	    if (index === this.currentEventIndex) {
		$slide.setAttribute('is-active', true)
	    }
	    
	    let $img = document.createElement('img')
	    $img.src = event.dataUri
	    $img.loading = 'lazy'
	    $img.addEventListener('load', () => {
		$img.setAttribute('loaded', true)
	    })
	    $slide.append($img)
	    $container.append($slide)
	})

	this.append($buttons)
	this.append($container)
    }
}

customElements.define('library-player', LibraryPlayer)

export default LibraryPlayer
