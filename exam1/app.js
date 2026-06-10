// this file contains the main logic for loading tournaments and 
// registrations, and updating the UI accordingly
import {
    fetchTournaments,
    fetchRegistrations
}
from "./api.js";

import {
    renderTournaments,
    renderRegistrations,
    setStatus
}
from "./ui.js";

import {
    Tournament
}
from "./tournament.js";

const loadBtn =
    document.getElementById(
        "loadBtn"
    );

const clearBtn =
    document.getElementById(
        "clearBtn"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

let allTournaments = [];

const registrationCache = {};

loadBtn.addEventListener(
    "click",
    loadTournaments
);

clearBtn.addEventListener(
    "click",
    clearDashboard
);

function loadTournaments() {

    setStatus(
        "Loading tournaments...",
        "warning"
    );

    fetchTournaments()

        .then(data => {

            allTournaments =
                data.map(
                    tournament =>
                        Tournament.fromObject(
                            tournament
                        )
                );

            renderTournaments(
                allTournaments
            );

            setStatus(
                "Tournaments loaded.",
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

function clearDashboard() {

    document.getElementById(
        "tournamentContainer"
    ).innerHTML = "";

    document.getElementById(
        "registrationContainer"
    ).innerHTML = "";

    setStatus(
        "Dashboard cleared.",
        "info"
    );
}

window.loadRegistrationsForTournament =
function (tournamentId) {

    const tournament =
        allTournaments.find(
            tournament =>
                tournament.id ===
                tournamentId
        );

    if (
        registrationCache[
            tournamentId
        ]
    ) {

        renderRegistrations(
            registrationCache[
                tournamentId
            ],
            tournament
        );

        return;
    }

    fetchRegistrations()

        .then(registrations => {

            const filtered =
                registrations.filter(
                    registration =>
                        registration.tournamentId ===
                        tournamentId
                );

            registrationCache[
                tournamentId
            ] = filtered;

            renderRegistrations(
                filtered,
                tournament
            );

        })

        .catch(error => {

            setStatus(
                error.message,
                "danger"
            );

        });

};

searchInput.addEventListener(
    "input",
    function () {

        const searchTerm =
            this.value.toLowerCase();

        const filtered =
            allTournaments.filter(
                tournament =>

                    tournament.name
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )

                    ||

                    tournament.game
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )
            );

        renderTournaments(
            filtered
        );

    }
);