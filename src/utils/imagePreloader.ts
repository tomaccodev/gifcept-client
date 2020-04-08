export default (url: string) =>
  new Promise((res) => {
    const image = new Image();
    image.addEventListener('load', () => {
      res();
    });
    image.src = url;
  });
