// const data = { username: "AdrianoMiguell" };
// const username = "AdrianoMiguell";

class dataUsers{

    constructor(username) {
        this.username = username;
    }

    getData() {
        fetch("https://api.github.com/users/" + this.username
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    ).then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        return { data };
    }

}

