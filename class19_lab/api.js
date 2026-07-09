// This file contains functions for fetching artist data.
// It loads the JSON file and handles possible errors.

export function fetchArtists() {

    return fetch("./artists.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load artists."
                );

            }

            return response.json();

        });

}