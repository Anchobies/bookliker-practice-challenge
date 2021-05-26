document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {
        data.forEach(book => {
            let listItem = document.createElement("li");

            listItem.textContent = book["title"];

            document.getElementById("list-panel").appendChild(listItem);

            listItem.addEventListener("click", () => {
                renderBook(book);
            });
        })
    })

    const updateUsers = (userArray, id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                users: userArray
            })
        })
        .then(res => res.json())
        .then(data => renderBook(data));
    }

    function renderBook(book) {
        document.getElementById("show-panel").innerHTML = `<img src=${book.img_url}><h4>${book.title}</h4>
        <h4>${book.subtitle}</h4><h4>${book.author}</h4><p>${book.description}</p><ul id="user-list"></ul><button class="not-liked" id=${book.id}>LIKE</button>`;

        const thisButton = document.getElementById(book.id);

        book.users.forEach(user => {
            let likedUser = document.createElement("li");

            likedUser.textContent = user.username;

            document.getElementById("user-list").appendChild(likedUser);

            if (user.id === 1) {
                thisButton.className = "liked";
            }
        })

        thisButton.addEventListener("click", () => {
            let usersCopy = [...book.users];
            if (thisButton.className === "liked") {
                usersCopy.pop();

                thisButton.className = "not-liked";
                updateUsers(usersCopy, book.id);
            }

            else {
                usersCopy.push({"id":1, "username":"pouros"});

                thisButton.className = "liked";
                updateUsers(usersCopy, book.id);
            }
        })
    }
});


