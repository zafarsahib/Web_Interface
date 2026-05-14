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

            console.log(users);

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
