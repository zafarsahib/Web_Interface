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

        this.shadowRoot.appendChild(clone);

    }

    connectedCallback() {

        this.loadWeather();

    }

    async loadWeather() {

        this.showStatus(
            "Loading weather..."
        );

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const weather =
                        await getCurrentWeather(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                    this.render(weather);

                }
                catch (error) {

                    this.showStatus(
                        error.message
                    );

                }

            },

            () => {

                this.showStatus(
                    "Location permission denied."
                );

            }

        );

    }

    showStatus(message) {

        this.shadowRoot
            .querySelector(".status")
            .textContent = message;

    }

    render(weather) {

        const current =
            weather.current_weather;

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
                `Weather Code: ${current.weathercode}`;

        this.showStatus(
            "Current weather loaded successfully."
        );

    }

}

customElements.define(
    "current-weather",
    CurrentWeather
);