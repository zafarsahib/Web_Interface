// This file contains functions for fetching data from the API. 
// It includes error handling and data transformation to ensure that the
// data is in the correct format for the application.

export function fetchTeams() {

    return fetch("./teams.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load teams."
                );

            }

            return response.json();

        });

}