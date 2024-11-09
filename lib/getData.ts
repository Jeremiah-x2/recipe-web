export async function getData(url: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${url}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
