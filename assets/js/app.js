const searchBtn = document.querySelector('.search_btn'),
    usersBox = document.querySelector('.users__box'),
    searchName = document.querySelector('.search_name'),
    searchSurname = document.querySelector('.search_surname'),
    searchEmail = document.querySelector('.search_email'),
    searchForm = document.querySelector('form');

// document.addEventListener("DOMContentLoaded", (event) => {
//     loadPage();
// });

let isLoading = false;


let database = [];

async function fetchData() {
    let dataFetch = await fetch('http://localhost:3000/users');
    let response = await dataFetch.json();
    database = response;

    return response;
}

async function createData(userData) {
    let createAPI = await fetch('http://localhost:3000/users', {
        method: 'POST', body: JSON.stringify(userData), headers:{
            'Content-type' : 'Application/json; charset=UTF-8'
        }
    });
    let createResponse = await createAPI.json();

    return createResponse;
}

function createCard(user) {
    const cardCode = `
    <a href="./user_detail.html?id=${user.id}" class="user__href">
    <div class="user__container">
        <div class="user__img">
            <img src="./assets/images/icon-256x256.png" style="width: 128px; height: 128px;" alt="">
        </div>

        <div class="user__information">
            <span class="user__id"><span class="bold">User ID</span> : ${user.id}</span>
            <span class="user__name"><span class="bold">Name :</span> ${user.name}</span>
            <span class="user__surname"><span class="bold">Username :</span> ${user.username}</span>
            <span class="user__mail"><span class="bold">Email :</span> ${user.email}</span>
            <div class="user__buttons">
                <button class="user_delete"><i class="bi bi-trash3"></i></button>
                <button class="user_change"><i class="bi bi-pencil-square"></i></button>
            </div>
        </div>
    </div>
</a>
    `

    return cardCode
}

async function showUsers() {
    isLoading = true;

    if (isLoading) {
        usersBox.querySelector('span').textContent = 'Loading content...';
    } 


    let usersArray = await fetchData();

    if (usersArray) {
        isLoading = false;
        usersBox.innerHTML = '';
        usersArray.forEach(user => {
            usersBox.insertAdjacentHTML('beforeend', createCard(user))
        })
    }
}

showUsers();

//  ! DELETE DATA / UPDATE DATA

searchForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    let searchnamevalue = searchName.value.trim();
    let searchsurnamenamevalue = searchSurname.value.trim();
    let searchemailvalue = searchEmail.value.trim();

    if (!searchnamevalue || !searchsurnamenamevalue || !searchemailvalue) return

    let userInformations = {
        'name' : `${searchnamevalue}`,
        'username' : `${searchsurnamenamevalue}`,
        'email' : `${searchemailvalue}`
    }

    await createData(userInformations);
})