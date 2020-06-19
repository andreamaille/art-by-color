import '../styles/style.scss';

import { get } from 'https';
// import 'slick-carousel/slick/slick-theme.css';

const $ = require('jquery');
require('jquery');
require('slick-carousel');

const app = {};

app.apiKey = '1f645de0-a084-11ea-8c61-ad3e71f18257';

app.getArt = () => {
  const getArt = fetch(
    `https://api.harvardartmuseums.org/object?size=50&classification=Paintings&apikey=${app.apiKey}`
  );

  getArt
    .then(response => response.json())
    .then(response => {
      const allArtwork = response.records;
      const artwork = allArtwork.filter(
        item =>
          item.primaryimageurl !== null && item.primaryimageurl !== undefined
      );
      console.log(artwork);
      app.displayImages(artwork);
    });
};

app.getArtByColor = selectedColor => {
  const getArt = fetch(
    `https://api.harvardartmuseums.org/object?size=100&classification=Paintings&hasimage=1&q=${selectedColor}&apikey=${app.apiKey}`
  );

  getArt
    .then(response => response.json())
    .then(response => {
      const allArtwork = response.records;
      const artwork = allArtwork.filter(item => item.primaryimageurl !== null);
      console.log(artwork);
      app.displayImages(artwork);
    });
};

app.displayImages = artwork => {
  // clear gallery of any images displayed
  $('.gallery-slider').slick('slickRemove', null, null, true);

  const images = [];

  // create img element for every item in artwork array
  artwork.forEach(item => {
    const img = `<img src='${item.primaryimageurl}' alt='${item.title} - ${item.medium}'>`;
    images.push(img);
  });

  let currentSlide = [];

  for (const image of images) {
    if (currentSlide.length < 3) {
      currentSlide.push(image);
    }

    if (currentSlide.length === 3) {
      const currentImages = currentSlide.join('');
      $('.gallery-slider').slick(
        'slickAdd',
        `<div>
          ${currentImages}
          </div>`
      );
      currentSlide = [];
    }
  }
};

app.selectedColor = e => {
  const selectedColor = e.target.dataset.color;
  app.getArtByColor(selectedColor);
};

const colorOptions = document.getElementsByClassName('color-option');

for (const color of colorOptions) {
  color.addEventListener('click', function(e) {
    // app.clearCanvas();
    app.selectedColor(e);
  });
}

app.init = () => {
  app.getArt();

  $('.gallery-slider').slick({
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
  });
};

app.init();
