// this file contains functions related to the user interface. 

export function setStatus(
    message,
    type
)
{
    const status =
        document.getElementById(
            "messageArea"
        );

    status.innerHTML = `

    <div class="alert alert-${type}">

        ${message}

    </div>`;
}

export function renderTeams(
    teams,
    container
)
{
    container.innerHTML = "";

    teams.forEach(team => {

        const card =
            document.createElement(
                "team-card"
            );

        card.setAttribute(
            "name",
            team.name
        );

        card.setAttribute(
            "group",
            team.group
        );

        card.setAttribute(
            "points",
            team.points
        );

        card.setAttribute(
            "played",
            team.played
        );

        card.setAttribute(
            "goal-difference",
            team.goalDifference
        );

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "col-md-4 mb-3";

        wrapper.appendChild(
            card
        );

        container.appendChild(
            wrapper
        );

    });

}