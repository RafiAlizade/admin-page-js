const searchBtn = document.querySelector('.search_btn'),
    usersBox = document.querySelector('.users__box'),
    searchName = document.querySelector('.search_name'),
    searchSurname = document.querySelector('.search_surname'),
    searchEmail = document.querySelector('.search_email');


document.addEventListener("DOMContentLoaded", (event) => {
    loadPage();
});


let database = [];

async function fetchData() {
    let dataFetch = await fetch('http://localhost:3000/users');
    let response = await dataFetch.json();

    return response;
}

fetchData().then(users => {
    loadPage(users);
    database = users;
})

function loadPage(resp) {
    usersBox.innerHTML = '';

    resp.forEach(allUsers => {
        const HTML = `
        <a href="./user_detail.html?name=${allUsers.id}" class="user__href">
        <div class="user__container">
            <div class="user__img">
                <img src="./assets/images/icon-256x256.png" style="width: 128px; height: 128px;" alt="">
            </div>

            <div class="user__information">
                <span class="user__id"><span class="bold">User ID</span> : ${allUsers.id}</span>
                <span class="user__name"><span class="bold">Name :</span> ${allUsers.name}</span>
                <span class="user__surname"><span class="bold">Username :</span> ${allUsers.username}</span>
                <span class="user__mail"><span class="bold">Email :</span> ${allUsers.email}</span>
                <div class="user__buttons">
                    <button class="user_delete"><i class="bi bi-trash3"></i></button>
                    <button class="user_change"><i class="bi bi-pencil-square"></i></button>
                </div>
            </div>
        </div>
    </a>
            `

        usersBox.innerHTML += HTML
    })
};


searchBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let searchnamevalue = searchName.value.toLowerCase().trim();
    let searchsurnamenamevalue = searchSurname.value.toLowerCase().trim();
    let searchemailvalue = searchEmail.value.toLowerCase().trim();

    const filteredData = database.filter(user => {
        let useredName = user.name.toLowerCase().includes(searchnamevalue);
        let userInfo = user.username.toLowerCase().includes(searchsurnamenamevalue);
        let usermail = user.email.toLowerCase().includes(searchemailvalue);

        return useredName && userInfo && usermail;
    });

    loadPage(filteredData);
});