export async function getFestivalData() {

const responses = await Promise.all([
  fetch("./artists.json"),
  fetch("./performances.json")
]);

const [artistResponse, performanceResponse] = responses;

  if (!artistResponse.ok || !performanceResponse.ok) {
    throw new Error("Festival data could not be loaded.");
  }

  const artists = await artistResponse.json();

  const performances = await performanceResponse.json();

  return { artists, performances};
}