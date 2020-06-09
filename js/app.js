import '../styles/style.scss';
import { get } from 'https';

const app = {};

app.apiKey = '1f645de0-a084-11ea-8c61-ad3e71f18257';

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
  const imageContainer = document.querySelector('.gallery');

  artwork.forEach(item => {
    const img = document.createElement('img');
    img.src = item.primaryimageurl;
    imageContainer.appendChild(img);
  });
};

app.clearCanvas = () => {
  const imageContainer = document.querySelector('.gallery');
  imageContainer.innerHTML = '';
};

app.selectedColor = e => {
  const selectedColor = e.target.dataset.color;
  app.getArtByColor(selectedColor);
};

const colorOptions = document.getElementsByClassName('color-option');
// console.log(colorOptions);

for (const color of colorOptions) {
  color.addEventListener('click', function(e) {
    app.clearCanvas();
    app.selectedColor(e);
  });
}
// colorOptions.forEach(color => {

//   // button
// });

// app.init();
