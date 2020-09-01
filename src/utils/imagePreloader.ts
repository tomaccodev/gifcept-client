export default (url: string): Promise<void> =>
  new Promise((res) => {
    const image = new Image();
    image.addEventListener('load', () => {
      res();
    });
    image.src = url;
  });
