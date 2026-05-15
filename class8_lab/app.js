const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const status = document.getElementById("status");
const usersContainer = document.getElementById("usersContainer");

const postCache = {};
let allUsers = [];

function setStatus(message, type) {

    if (!message) {
        status.innerHTML = "";
        return;
    }

    status.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
}

const clearDashboard = () => {

    usersContainer.innerHTML = "";

    setStatus("Dashboard cleared", "info");

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = "";
    }

    document
        .querySelectorAll("[id^='posts-']")
        .forEach(container => {
            container.innerHTML = "";
            container.style.display = "block";
        });

    Object.keys(postCache)
        .forEach(key => delete postCache[key]);

};

clearBtn.addEventListener("click", clearDashboard);

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

            allUsers = users.slice(0, 5);

            renderUsers(allUsers);

            setStatus(
                "Users loaded successfully",
                "success"
            );

        })

        .catch(error => {

            setStatus(
                error.message,
                "danger"
            );

        });

}

loadBtn.addEventListener("click", loadUsers);

function renderUsers(users) {

    usersContainer.innerHTML = "";

    users.forEach(renderUserCard);
}

function renderUserCard(user) {

    usersContainer.innerHTML += `

    <div class="col-md-6 col-lg-4 mb-3">

        <div class="card h-100 shadow">

            <div class="card-body">

                <h5 class="card-title">
                    ${user.name}
                </h5>

                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>

                <button
                    id="btn-${user.id}"
                    class="btn btn-primary mt-2"
                    onclick="loadPostsForUser(${user.id})">

                    Load Posts

                </button>

                <div
                    id="posts-${user.id}"
                    class="mt-3">
                </div>

            </div>

        </div>

    </div>

    `;
}

function loadPostsForUser(userId) {

    const postsContainer =
        document.getElementById(`posts-${userId}`);

    const button =
        document.getElementById(`btn-${userId}`);

    // TOGGLE HIDE
    if (
        postCache[userId] &&
        postsContainer.style.display !== "none"
    ) {

        postsContainer.style.display = "none";
        button.textContent = "Show Posts";
        return;
    }

    if (
        postCache[userId] &&
        postsContainer.style.display === "none"
    ) {

        postsContainer.style.display = "block";
        button.textContent = "Hide Posts";
        return;
    }

    postsContainer.innerHTML = `
        <div class="text-center">
            <div class="spinner-border spinner-border-sm"></div>
            <p class="mt-2">Loading posts...</p>
        </div>
    `;

    fetch("https://jsonplaceholder.typicode.com/posts")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load posts");
            }

            return response.json();

        })

        .then(posts => {

            const userPosts = posts
                .filter(post => post.userId === userId)
                .slice(0, 3);

            postCache[userId] = userPosts;

            renderPosts(userPosts, postsContainer);

            button.textContent = "Hide Posts";

        })

        .catch(error => {

            postsContainer.innerHTML = `
                <div class="text-danger">
                    ${error.message}
                </div>
            `;

        });

}

function renderPosts(posts, container) {

    container.innerHTML = "";

    posts.forEach(post => {

        container.innerHTML += `

        <div class="card mt-2">

            <div class="card-body">

                <h6>${post.title}</h6>

                <p class="mb-0">${post.body}</p>

            </div>

        </div>

        `;

    });

}

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchTerm =
            this.value.toLowerCase();

        const filteredUsers =
            allUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm)
            );

        renderUsers(filteredUsers);

    });

}