class TitleAnimator {
	constructor(title='Sample Title', animationType='typewritter', delay=400) {
		this.title = title;
		this.animationType = animationType;
		this.delay = delay;
		this.animate();
	}

	setTitle(title) {
		this.title = title;
		this.animate();
	}

	setAnimationType(animationType) {
		this.animationType = animationType;
		this.animate();
	}

	setDelay(delay) {
		this.delay = delay;
		this.animate();
	}

	updateDocumentTitle() {
		switch(this.animationType) {
			case 'typewritter':
				var title = Array.isArray(this.title)? this.title.join(' ') : this.title;
				var n = title.length;
				this.index = (this.index + 1) % n;
				document.title = title.substring(0, this.index + 1);
				break;
			case 'scroll':
				var title = Array.isArray(this.title)? this.title.join(' ') : this.title;
				var n = title.length;
				this.index = (this.index + 1) % n;
				document.title = title.substring(this.index, this.index + n)
									+ ' ' + title.substring(0, this.index);
				break;
			case 'tabScroll':
				var title = Array.isArray(this.title)? this.title.join(' ') : this.title;
				var n = title.length;
				this.index = this.index == 0 ? 2 * n : this.index - 1;
				document.title = title.substring(Math.min(n, (2 * n) - this.index), n) 
									+ '_'.repeat(Math.min(n , this.index))
									+ title.substring(0, Math.min(n, (2 * n) - this.index))
									+ '_'.repeat(Math.max(0, n - this.index));
				break;
			case 'flash':
				var title = Array.isArray(this.title)? this.title : [this.title];
				this.index = (this.index + 1) % title.length;
				document.title = title[this.index];
				break;
			default:
				console.log('Animation type \"' + this.animationType + '\" not supported.');
				var title = Array.isArray(this.title)? this.title.join(' ') : this.title;
				document.title = title;
		}
	}

	animate() {
		this.stop();
		this.index = 0;
		this.intervalHandle = setInterval(this.updateDocumentTitle.bind(this), this.delay);
	}

	stop() {
		if (this.intervalHandle !== undefined) {
			clearInterval(this.intervalHandle);
			var title = Array.isArray(this.title)? this.title.join(' ') : this.title;
			document.title = title;
		}
	}
}