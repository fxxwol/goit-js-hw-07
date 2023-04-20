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
    const instance = createInstance(e.target.dataset.source)
    console.log(instance)

    instance.show()
}

function createInstance(src) {
    return basicLightbox.create(`
    <img src="${src}">`, {
        onShow: (inst) => {
            gallery.addEventListener('keydown', e => { onEscClick(e, inst) })
        },
        onClose: (inst) => { gallery.removeEventListener('keydown', onEscClick) }
    })
}


function onEscClick(e, instance) {
    if (e.code === 'Escape') {
        instance.close()
    }
}