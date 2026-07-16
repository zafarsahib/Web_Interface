export class PerformanceCard extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: "open"
        });

        const template = document.getElementById(
            "performance-card-template"
        );

        const clone = template.content.cloneNode(true);

        this.shadowRoot.appendChild(clone);

        this._performance = null;
    }

    set performance(value) {
        this._performance = value;
        this.render();
    }

    get performance() {
        return this._performance;
    }

    render() {
        if (!this._performance) {
            return;
        }

        const article =
            this.shadowRoot.querySelector(
                ".performance-card"
            );

        article.className = "performance-card";

        if (this._performance.featured) {
            article.classList.add("featured");
        }

        if (!this._performance.hasTickets) {
            article.classList.add("sold-out");
        }

        this.shadowRoot
            .querySelector(".title")
            .textContent =
                this._performance.title;

        this.shadowRoot
            .querySelector(".artist")
            .textContent =
                this._performance.artist.displayLabel;

        this.shadowRoot
            .querySelector(".country")
            .textContent =
                this._performance.artist.country;

        this.shadowRoot
            .querySelector(".genre")
            .textContent =
                this._performance.artist.genre;

        this.shadowRoot
            .querySelector(".stage")
            .textContent =
                `Stage: ${this._performance.stage}`;

        this.shadowRoot
            .querySelector(".time")
            .textContent =
                `Time: ${this._performance.time}`;

        this.shadowRoot
            .querySelector(".price")
            .textContent =
                this._performance.formattedPrice;

        this.shadowRoot
            .querySelector(".tickets")
            .textContent =
                this._performance.ticketLabel;

        this.shadowRoot
            .querySelector(".lineup-label")
            .textContent =
                this._performance.lineupLabel;
    }
}

customElements.define(
    "performance-card",
    PerformanceCard
);