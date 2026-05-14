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

                <button
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

    postsContainer.innerHTML = `
        <div class="text-secondary">
            Loading posts...
        </div>
    `;

    fetch("https://jsonplaceholder.typicode.com/posts")

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "Failed to load posts"
                );
            }

            return response.json();

        })

        .then(posts => {

            const userPosts = posts
                .filter(post => post.userId === userId)
                .slice(0,3);

            renderPosts(
                userPosts,
                postsContainer
            );

        })

        .catch(error => {

            postsContainer.innerHTML = `
                <div class="text-danger">
                    ${error.message}
                </div>
            `;

        });

}

function renderPosts(posts, container){

    container.innerHTML = "";

    posts.forEach(post => {

        container.innerHTML += `

        <div class="card mt-2">

            <div class="card-body">

                <h6>
                    ${post.title}
                </h6>

                <p class="mb-0">
                    ${post.body}
                </p>

            </div>

        </div>

        `;

    });

}



