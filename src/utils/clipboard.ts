export const copy = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
};
