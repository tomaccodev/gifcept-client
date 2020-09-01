export const copy = async (data: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(data);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
};
