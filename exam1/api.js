// this file contains functions to fetch data from the API.

export function fetchTournaments() {

    return fetch("./tournaments.json")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Unable to load tournaments."
                );
            }

            return response.json();

        });

}

export function fetchRegistrations() {

    return fetch("./registrations.json")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Unable to load registrations."
                );
            }

            return response.json();

        });

}
