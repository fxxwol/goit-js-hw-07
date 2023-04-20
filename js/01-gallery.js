import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery')

const makeGalleryItemMarkup = ({ preview, original, description }) =>
    `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            loading="lazy"
            class="gallery__image lazyload"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`

const makeGalleryMarkup = galleryItems.map(makeGalleryItemMarkup).join('')
gallery.innerHTML = makeGalleryMarkup

gallery.addEventListener('click', onImgClick)
function onImgClick(e) {
    e.preventDefault()
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}">`, {
        onShow: () => {
            gallery.addEventListener('keydown', onEscClick)
        },
        onClose: () => { gallery.removeEventListener('keydown', onEscClick) }
    })

    instance.show()

    function onEscClick(e) {
        if (e.code === 'Escape') {
            instance.close()
        }
    }

}