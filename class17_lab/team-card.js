// This file defines the TeamCard custom element, which is used to 
// display information about a team in the tournament. it includes shadow DOM 
// for encapsulation and card styles, as well as event handling for user interactions.

class TeamCard extends HTMLElement {

    connectedCallback() {

        this.render();

    }

    getTeamData() {

        return {

            name:
                this.getAttribute("name")
                || "Unknown Team",

            group:
                this.getAttribute("group")
                || "N/A",

            points:
                this.getAttribute("points")
                || "0",

            played:
                this.getAttribute("played")
                || "0",

            goalDifference:
                this.getAttribute(
                    "goal-difference"
                )
                || "0"
        };

    }

    getName() {

        return this.getAttribute(
            "name"
        );

    }

    getGroup() {

        return this.getAttribute(
            "group"
        );

    }

    getPoints() {

        return this.getAttribute(
            "points"
        );

    }

    getPlayed() {

        return this.getAttribute(
            "played"
        );

    }

    getGoalDifference() {

        return this.getAttribute(
            "goal-difference"
        );

    }

    renderStyle() {

        return `

        <style>

            .team-card {

                padding: 20px;
                background-color: white;
                border: 1px solid #ccc;
                border-radius: 10px;

                margin-bottom: 20px;

                box-shadow:
                0 2px 5px rgba(
                    0,0,0,0.1
                );
            }

            .leader {

                border: 3px solid green;
            }

            h3 {

                color: #0d6efd;
                margin-bottom: 10px;
            }

            button {

                margin-top: 10px;
                padding: 8px 12px;

                background-color:
                #0d6efd;

                color: white;

                border: none;

                border-radius: 5px;

                cursor: pointer;
            }

            button:hover {

                opacity: 0.9;

            }

        </style>

        `;
    }

    render() {

        const teamCard =
            this.attachShadow({
                mode: "open"
            });

        const teamData =
            this.getTeamData();

        const isLeader =
            Number(
                teamData.points
            ) >= 5;

        teamCard.innerHTML = `

        ${this.renderStyle()}

        <div class="team-card ${isLeader ? "leader" : ""}">

            <h3>
                ${this.getName()}
            </h3>

            <p>

                <strong>
                    Group:
                </strong>

                ${this.getGroup()}

            </p>

            <p>

                <strong>
                    Points:
                </strong>

                ${this.getPoints()}

            </p>

            <button id="detailsBtn">

                View Details

            </button>

        </div>

        `;

        teamCard
            .getElementById(
                "detailsBtn"
            )
            .addEventListener(
                "click",
                () => {

                    this.dispatchEvent(

                        new CustomEvent(
                            "team-selected",
                            {
                                detail:
                                    teamData,

                                bubbles:
                                    true,

                                composed:
                                    true
                            }
                        )

                    );

                }
            );

    }

}

customElements.define(
    "team-card",
    TeamCard
);
