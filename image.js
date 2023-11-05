class Image {
	constructor(element) {
		if (!(element instanceof HTMLElement)) {
			throw new Error('Передан не HTML элемент');
		}
		this.renderCurrentImage = this.renderCurrentImage.bind(this);
		this.element = element;
		this.galleryBack = document.querySelector('.gallery__back');
		this.galleryForward = document.querySelector('.gallery__forward');

		this.currentImage = 1;
		this.galleryBack.addEventListener('click', () => {
			this.currentImage = this.currentImage - 1;

			this.renderCurrentImage();
		});
		this.galleryForward.addEventListener('click', () => {

			this.currentImage = this.currentImage + 1;

			this.renderCurrentImage();
		});

		this.renderCurrentImage();

	}
	renderCurrentImage() {
		if (this.currentImage === 1) {
			this.galleryBack.setAttribute('disabled', 'disabled');
		} else {
			this.galleryBack.removeAttribute('disabled');
		}

		this.galleryForward.setAttribute('disabled', 'disabled');

		request({
			url: `gallery/image${this.currentImage + 1}.json`,
			onSuccess: (imageData) => {
				this.galleryForward.removeAttribute('disabled');
			}
		});

		request({
			url: `gallery/image${this.currentImage}.json`,
			onSuccess: (imageData) => {
				galleryImage.src = imageData.image;
				galleryTitle.textContent = imageData.title;
			}
		});
	}

}