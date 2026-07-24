import { getCurrentWeather } from "./api.js";


export class CurrentWeather extends HTMLElement {

    constructor() {

        super();

        this.attachShadow({
            mode: "open"
        });


        const template =
            document.getElementById(
                "weather-card-template"
            );


        const clone =
            template.content.cloneNode(true);


        this.shadowRoot.appendChild(
            clone
        );

    }


    connectedCallback() {

        this.loadWeather();


        this.shadowRoot
            .querySelector(".location-button")
            .addEventListener(
                "click",
                () => this.loadWeatherByLocation()
            );


        this.shadowRoot
            .querySelector(".coordinate-button")
            .addEventListener(
                "click",
                () => this.loadManualWeather()
            );

    }


    async loadWeather() {

        this.showStatus(
            "Loading weather..."
        );


        const latitude =
            this.getAttribute(
                "latitude"
            );


        const longitude =
            this.getAttribute(
                "longitude"
            );


        // Use manual coordinates when attributes exist.
        if (
            latitude &&
            longitude
        ) {

            await this.loadWeatherByCoordinates(
                latitude,
                longitude
            );

            return;

        }


        // Otherwise use browser location.
        this.loadWeatherByLocation();

    }


    loadManualWeather() {

        this.updateResultTitle(
            "Manual Coordinates"
        );


        const latitude =
            this.shadowRoot
                .querySelector(".latitude")
                .value
                .trim();


        const longitude =
            this.shadowRoot
                .querySelector(".longitude")
                .value
                .trim();



        if (
            latitude === "" ||
            longitude === ""
        ) {

            this.clearWeather();


            this.showStatus(
                "Please enter both latitude and longitude."
            );


            return;

        }


        this.loadWeatherByCoordinates(
            latitude,
            longitude
        );

    }


    async loadWeatherByCoordinates(
        latitude,
        longitude
    ) {

        this.showStatus(
            "Loading weather..."
        );


        try {

            const weather =
                await getCurrentWeather(
                    latitude,
                    longitude
                );


            this.render(
                weather
            );


        }
        catch (error) {

            this.clearWeather();


            this.showStatus(
                error.message
            );

        }

    }


    loadWeatherByLocation() {

        this.updateResultTitle(
            "Current Location"
        );


        this.showStatus(
            "Loading weather..."
        );


        navigator.geolocation.getCurrentPosition(

            async (position) => {


                await this.loadWeatherByCoordinates(

                    position.coords.latitude,

                    position.coords.longitude

                );


            },


            () => {

                this.clearWeather();


                this.showStatus(
                    "Location permission denied."
                );

            }

        );

    }



    updateResultTitle(source) {

        this.shadowRoot
            .querySelector(".result-title")
            .textContent =
            `Weather Result (${source})`;

    }



    clearWeather() {

        this.shadowRoot
            .querySelector(".temperature")
            .textContent =
            "Temperature:";


        this.shadowRoot
            .querySelector(".windspeed")
            .textContent =
            "Wind Speed:";


        this.shadowRoot
            .querySelector(".winddirection")
            .textContent =
            "Wind Direction:";


        this.shadowRoot
            .querySelector(".weathercode")
            .textContent =
            "Weather:";

    }



    showStatus(message) {

        this.shadowRoot
            .querySelector(".status")
            .textContent =
            message;

    }



    getWeatherDescription(weatherCode) {

        switch (weatherCode) {

            case 0:
                return "Clear Sky";


            case 1:
                return "Mainly Clear";


            case 2:
                return "Partly Cloudy";


            case 3:
                return "Overcast";


            case 45:
            case 48:
                return "Fog";


            case 51:
            case 53:
            case 55:
                return "Drizzle";


            case 61:
            case 63:
            case 65:
                return "Rain";


            case 71:
            case 73:
            case 75:
                return "Snow";


            case 95:
                return "Thunderstorm";


            default:
                return `Weather Code ${weatherCode}`;

        }

    }



    render(weather) {

        const current =
            weather.current_weather;


        const description =
            this.getWeatherDescription(
                current.weathercode
            );



        this.shadowRoot
            .querySelector(".temperature")
            .textContent =
            `Temperature: ${current.temperature} °C`;



        this.shadowRoot
            .querySelector(".windspeed")
            .textContent =
            `Wind Speed: ${current.windspeed} km/h`;



        this.shadowRoot
            .querySelector(".winddirection")
            .textContent =
            `Wind Direction: ${current.winddirection}°`;



        this.shadowRoot
            .querySelector(".weathercode")
            .textContent =
            `Weather: ${description}`;



        this.showStatus(
            "Weather loaded successfully."
        );

    }

}



customElements.define(
    "current-weather",
    CurrentWeather
);