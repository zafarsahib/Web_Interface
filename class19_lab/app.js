// This file is the main entry point of the application.
// It loads artist data, updates the UI, and handles
// user interactions.

import {
    fetchArtists
}
from "./api.js";

import {
    Artist
}
from "./artist.js";

import {
    renderArtists,
    setStatus
}
from "./ui.js";

import "./artist-card.js";

const loadBtn =
    document.getElementById(
        "loadBtn"
    );

const clearBtn =
    document.getElementById(
        "clearBtn"
    );

const artistsContainer =
    document.getElementById(
        "artistsContainer"
    );

const detailsContainer =
    document.getElementById(
        "detailsContainer"
    );

let allArtists = [];

loadBtn.addEventListener(
    "click",
    loadArtists
);

clearBtn.addEventListener(
    "click",
    clearLineup
);

function loadArtists() {

    setStatus(
        "Loading lineup...",
        "warning"
    );

    fetchArtists()

        .then(data => {

            allArtists =
                data.map(
                    artist =>
                        Artist.fromObject(
                            artist
                        )
                );

            renderArtists(
                allArtists,
                artistsContainer
            );

            setStatus(
                "Lineup loaded successfully.",
                "success"
            );

        })

        .catch(error => {

            setStatus(
                error.message,
                "danger"
            );

        });

}

function clearLineup() {

    artistsContainer.innerHTML = "";

    detailsContainer.innerHTML = `

        <div class="alert alert-light text-center">

            No artist selected.

        </div>

    `;

    setStatus(
        "Lineup cleared.",
        "info"
    );

}

document.addEventListener(
    "artist-selected",
    event => {

        const artist =
            event.detail;

        detailsContainer.innerHTML = `

        <div class="alert alert-info">

            <h4>

                ${artist.name}

            </h4>

            <p>

                <strong>

                    Genre:

                </strong>

                ${artist.genre}

            </p>

            <p>

                <strong>

                    Stage:

                </strong>

                ${artist.stage}

            </p>

            <p>

                <strong>

                    Time:

                </strong>

                ${artist.time}

            </p>

            <p>

                <strong>

                    Country:

                </strong>

                ${artist.country}

            </p>

            <p>

                <strong>

                    Headliner:

                </strong>

                ${artist.headliner ? "Yes" : "No"}

            </p>

            <p>

                <strong>

                    Summary:

                </strong>

                ${artist.name} - ${artist.genre} - ${artist.stage}

            </p>

        </div>

        `;

    }
);