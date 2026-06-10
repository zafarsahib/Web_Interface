// Progressive Enhancement

// Base page already works with:
// - heading
// - description
// - button
// - placeholder content

// JS enhances the page by:
// - loading data from API
// - updating content
// - improving feedback

// DOM
const loadPostBtn = document.getElementById("load-post-btn");
const status = document.getElementById("status");
const postContent = document.getElementById("post-content");

// addEventListener for button
loadPostBtn.addEventListener("click", () => {

  // update status to loading
  status.textContent = "Loading post...";

  // fetch post data
  fetch("https://jsonplaceholder.typicode.com/posts/1")

    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })

    .then((post) => {
      // replace placeholder text
      postContent.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;

      // success message
      status.textContent = "Post loaded successfully";
    })

    .catch((error) => {
      // error message
      status.textContent = `Failed to load post: ${error.message}`;
    });

});