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

setStatus("Ready","success");