const loadBtn=document.getElementById("loadBtn");
const clearBtn=document.getElementById("clearBtn");
const status=document.getElementById("status");
const usersContainer=document.getElementById("usersContainer");

function setStatus(message, type) {

    status.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
}

function loadUsers() {

    setStatus("Loading users...", "warning");

    fetch("https://jsonplaceholder.typicode.com/users")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load users");
            }

            return response.json();

        })

        .then(users => {

            users
                .slice(0,5)
                .forEach(renderUserCard);

            setStatus(
                "Users loaded successfully",
                "success"
            );

        })

        .catch(error => {

            setStatus(
                error.message,
                "There was an error loading users"
            );

        });

}

loadBtn.addEventListener("click", loadUsers);

function renderUserCard(user){

    usersContainer.innerHTML += `

    <div class="col-md-6 col-lg-4">

        <div class="card h-100 shadow">

            <div class="card-body">

                <h5 class="card-title">
                    ${user.name}
                </h5>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${user.phone}
                </p>

                <p>
                    <strong>City:</strong>
                    ${user.address.city}
                </p>

                <p>
                    <strong>Company:</strong>
                    ${user.company.name}
                </p>

            </div>

        </div>

    </div>

    `;
}

