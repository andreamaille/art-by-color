import '../styles/style.scss';

console.log('hellooooo');

const app = {};

app.apiKey = '1f645de0-a084-11ea-8c61-ad3e71f18257';

app.getData = () => {
  const getImages = fetch(
    `https://api.harvardartmuseums.org/object?apikey=${app.apiKey}`
  );

  getImages
    .then(response => response.json())
    .then(response => {
      console.log(response.records);
    });
};

app.init = () => {
  app.getData();
};

app.init();
