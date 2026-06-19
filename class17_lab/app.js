// This file is the main entry point of the application. It initializes the UI,
// loads team data, and sets up event listeners for user interactions. It also
// handles the communication between the API, the Team model, and the UI components.

import {
    fetchTeams
}
from "./api.js";

import {
    Team
}
from "./team.js";

import {
    renderTeams,
    setStatus
}
from "./ui.js";

import "./team-card.js";

const loadBtn =
    document.getElementById(
        "loadBtn"
    );

const clearBtn =
    document.getElementById(
        "clearBtn"
    );

const teamsContainer =
    document.getElementById(
        "teamsContainer"
    );

const detailsContainer =
    document.getElementById(
        "detailsContainer"
    );

let allTeams = [];

loadBtn.addEventListener(
    "click",
    loadTeams
);

clearBtn.addEventListener(
    "click",
    clearDashboard
);

function loadTeams() {

    setStatus(
        "Loading teams...",
        "warning"
    );

    fetchTeams()

        .then(data => {

            allTeams =
                data.map(
                    team =>
                        Team.fromObject(
                            team
                        )
                );

            renderTeams(
                allTeams,
                teamsContainer
            );

            setStatus(
                "Teams loaded successfully.",
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

    teamsContainer.innerHTML = "";

    detailsContainer.innerHTML = `

        <div class="alert alert-light text-center">

            No team selected yet.

        </div>
    `;

    setStatus(
        "Dashboard cleared.",
        "info"
    );

}

document.addEventListener(
    "team-selected",
    event => {

        const team =
            event.detail;

        detailsContainer.innerHTML = `

        <div class="alert alert-info">

            <h4>
                ${team.name}
            </h4>

            <p>
                Group:
                ${team.group}
            </p>

            <p>
                Points:
                ${team.points}
            </p>

            <p>
                Matches Played:
                ${team.played}
            </p>

            <p>
                Goal Difference:
                ${team.goalDifference}
            </p>

        </div>
        `;
    }
);