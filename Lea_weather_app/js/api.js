const BASE_URL =
    "https://api.open-meteo.com/v1/forecast";

export async function getCurrentWeather(
    latitude,
    longitude
) {

    const url =
        `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Weather could not be loaded."
        );

    }

    return await response.json();

}