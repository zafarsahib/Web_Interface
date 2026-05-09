
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const messageArea = document.getElementById("messageArea");
const userContainer = document.getElementById("userContainer");

loadBtn.addEventListener("click", function () {

    messageArea.innerHTML = `
        <div class="alert alert-warning text-center d-flex justify-content-center align-items-center w-50 mx-auto">
            <div class="spinner-border spinner-border-sm me-2"></div>
            Processing request...
        </div>
    `;

    userContainer.innerHTML = "";

    // we use fetch() to get external data or Dummy JSON data. It returns a promise that resolves to the response object.
    // first .then returns data in the form of a JSON object, second .then parse Json data. 
    const fetchRequest = fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );

    fetchRequest
        .then((response) => {
            // Check status code
            if (response.status !== 200) {
                throw new Error("User not found");
            }

            return response.json();
        })

        // Parsed JSON data
        .then((user) => {

            setTimeout(() => {

                messageArea.innerHTML = `
                    <div class="alert alert-success text-center w-50 mx-auto">
                        User loaded successfully!
                    </div>
                `;

                // User card
                userContainer.innerHTML = `
                    <div class="card shadow mx-auto" style="width: 30%;">

                        <div class="card-body">

                            <h3 class="card-title text-center mb-4">
                                ${user.name}
                            </h3>

                            <p class="card-text">
                                <strong>Email:</strong> ${user.email}
                            </p>

                            <p class="card-text">
                                <strong>Phone:</strong> ${user.phone}
                            </p>

                            <p class="card-text">
                                <strong>City:</strong> ${user.address.city}
                            </p>

                            <p class="card-text">
                                <strong>Company:</strong> ${user.company.name}
                            </p>

                            <p class="card-text">
                                <strong>Website:</strong> ${user.website}
                            </p>

                        </div>
                    </div>
                `;

            }, 2000);
        })

        .catch((error) => {

            console.log("Error:", error);

            setTimeout(() => {

                messageArea.innerHTML = `
                    <div class="alert alert-danger text-center w-50 mx-auto">
                        Error loading user data.
                    </div>
                `;

                userContainer.innerHTML = "";

            }, 2000);
        });
});

clearBtn.addEventListener("click", function () {
    messageArea.innerHTML = "";
    userContainer.innerHTML = "";
});