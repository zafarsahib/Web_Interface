// This file contains functions related to the user interface.
// It updates the status message and renders artist cards.

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

    <div class="alert alert-${type} text-center">

        ${message}

    </div>

    `;
}

export function renderArtists(
    artists,
    container
)
{
    container.innerHTML = "";

    artists.forEach(artist => {

        const card =
            document.createElement(
                "artist-card"
            );

        card.setAttribute(
            "artist-id",
            artist.id
        );

        card.setAttribute(
            "name",
            artist.name
        );

        card.setAttribute(
            "genre",
            artist.genre
        );

        card.setAttribute(
            "stage",
            artist.stage
        );

        card.setAttribute(
            "time",
            artist.time
        );

        card.setAttribute(
            "country",
            artist.country
        );

        card.setAttribute(
            "headliner",
            artist.headliner
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