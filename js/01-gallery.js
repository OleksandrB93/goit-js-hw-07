import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const divRef = document.querySelector(".gallery");

function createGalleryMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`
    )
    .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

// divRef.innerHTML=addGalleryMarkup;
divRef.insertAdjacentHTML("beforeend", addGalleryMarkup);
divRef.addEventListener("click", onImageClick);

function blockStandartAction(event) {
  event.preventDefault();
}

function onImageClick(event) {
  blockStandartAction(event);

  const isImageContainer = event.target.classList.contains("gallery__image");
  if (!isImageContainer) {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  divRef.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}
