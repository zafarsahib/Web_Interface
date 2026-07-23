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

        this.render();

    }

    render() {

        this.shadowRoot
            .querySelector(".temperature")
            .textContent =
                "Temperature: -- °C";

        this.shadowRoot
            .querySelector(".windspeed")
            .textContent =
                "Wind Speed: -- km/h";

        this.shadowRoot
            .querySelector(".winddirection")
            .textContent =
                "Wind Direction: --°";

        this.shadowRoot
            .querySelector(".weathercode")
            .textContent =
                "Weather Code: --";

        this.shadowRoot
            .querySelector(".status")
            .textContent =
                "Waiting to load weather...";

    }

}

customElements.define(
    "current-weather",
    CurrentWeather
);