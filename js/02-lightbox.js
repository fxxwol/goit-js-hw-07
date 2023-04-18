import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery')

const makeGalleryItemMarkup = ({ preview, original, description }) =>
`<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`

const makeGalleryMarkup = galleryItems.map(makeGalleryItemMarkup).join('')
gallery.innerHTML = makeGalleryMarkup

const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250
});
