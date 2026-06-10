// this file contains functions to update the UI based on data from the API
export function setStatus(message, type) 
{
    const status =
        document.getElementById(
            "messageArea"
        );

    status.innerHTML = `

        <div class="alert alert-${type}">

            ${message}

        </div> `;
}

export function renderTournaments(tournaments) 
{
    const container =
        document.getElementById(
            "tournamentContainer"
        );

    container.innerHTML = "";

    tournaments.forEach(
        tournament => {

            container.innerHTML += `

            <div class="col-md-4 mb-3">

                <div class="card h-100">

                    <div class="card-body">

                        <h5>
                            ${tournament.name}
                        </h5>

                        <p>
                            <strong>Game:</strong>
                            ${tournament.game}
                        </p>

                        <p>
                            <strong>Entry Fee:</strong>
                            $${tournament.entryFee}
                        </p>

                        <p>
                            <strong>Max Players:</strong>
                            ${tournament.maxPlayers}
                        </p>

                        <p>
                            <strong>Registered:</strong>
                            ${tournament.registeredPlayers}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${tournament.status}
                        </p>

                        <button
                            class="btn btn-primary"
                            onclick="loadRegistrationsForTournament(${tournament.id})">

                            View Registrations

                        </button>

                    </div>

                </div>

            </div>`;
        }
    );
}

export function renderRegistrations(registrations, tournament) 
{
    const container =
        document.getElementById(
            "registrationContainer"
        );

    if (
        registrations.length === 0
    ) {

        container.innerHTML = `

            <div class="alert alert-warning">

                No registrations found.

            </div> `;

        return;
    }

    const confirmed =
        registrations.filter(
            registration =>
                registration.status ===
                "confirmed"
        );

    const revenue =
        confirmed.length *
        tournament.entryFee;

    container.innerHTML = `

        <div class="alert alert-info">

            <h5>Summary</h5>

            <p>
                Total Registrations:
                ${registrations.length}
            </p>

            <p>
                Confirmed Players:
                ${confirmed.length}
            </p>

            <p>
                Expected Revenue:
                $${revenue}
            </p>

            <p>
                Spots Left:
                ${tournament.spotsLeft}
            </p>

        </div> `;

    registrations.forEach(registration => {

            container.innerHTML += `

            <div class="card mb-2">

                <div class="card-body">

                    <h6>
                        ${registration.playerName}
                    </h6>

                    <p>
                        Gamer Tag:
                        ${registration.gamerTag}
                    </p>

                    <p>
                        Ticket Type:
                        ${registration.ticketType}
                    </p>

                    <p>
                        Status:
                        ${registration.status}
                    </p>

                </div>

            </div>`;
        }
    );
}