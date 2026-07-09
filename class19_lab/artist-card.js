// This file defines the ArtistCard custom element.
// It uses a template, Shadow DOM, and dispatches
// a custom event when the View Details button is clicked.

class ArtistCard extends HTMLElement {

    constructor() {

        super();

        this.artistCard =
            this.attachShadow({
                mode: "open"
            });

    }

    connectedCallback() {

        this.render();

    }

    getArtistData() {

        return {

            id:
                this.getAttribute("artist-id"),

            name:
                this.getAttribute("name")
                || "Unknown Artist",

            genre:
                this.getAttribute("genre")
                || "N/A",

            stage:
                this.getAttribute("stage")
                || "N/A",

            time:
                this.getAttribute("time")
                || "N/A",

            country:
                this.getAttribute("country")
                || "N/A",

            headliner:
                this.getAttribute("headliner")
                === "true"

        };

    }

    render() {

        this.artistCard.innerHTML = "";

        const template =
            document.getElementById(
                "artist-template"
            );

        const clone =
            template.content.cloneNode(
                true
            );

        const artist =
            this.getArtistData();

        clone.querySelector(
            ".artist-name"
        ).textContent =
            artist.name;

        clone.querySelector(
            ".artist-genre"
        ).textContent =
            `Genre: ${artist.genre}`;

        clone.querySelector(
            ".artist-stage"
        ).textContent =
            `Stage: ${artist.stage}`;

        if (
            artist.headliner
        ) {

            clone.querySelector(
                ".artist-card"
            ).style.border =
                "3px solid gold";

        }

        clone.querySelector(
            ".detailsBtn"
        ).addEventListener(
            "click",
            () => {

                this.dispatchEvent(

                    new CustomEvent(

                        "artist-selected",

                        {

                            detail:
                                artist,

                            bubbles:
                                true,

                            composed:
                                true

                        }

                    )

                );

            }

        );

        this.artistCard.appendChild(
            clone
        );

    }

}

customElements.define(
    "artist-card",
    ArtistCard
);