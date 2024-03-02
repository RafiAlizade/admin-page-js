const userIDS = new URLSearchParams(location.search).get("id");
const deleteBtn = document.querySelector('.user_delete');
const changeBtn = document.querySelector('.user_change');
const confirmBtn = document.querySelector('.confirm_href');
const cancelBtn = document.querySelector('.cancel_href');

const userID = document.querySelector('.user__id'),
    userName = document.querySelector('.user__name'),
    userUsername = document.querySelector('.user__username'),
    userMail = document.querySelector('.user__mail'),
    userPhone = document.querySelector('.user__phone'),
    userStreet = document.querySelector('.user__street'),
    userSuite = document.querySelector('.user__suite'),
    userCity = document.querySelector('.user__city'),
    userZipcode = document.querySelector('.user__zipcode'),
    userCompany = document.querySelector('.user__company');


let usernameValue = '';
let userusernameValue = '';
let usermailValue = '';
let userphoneValue = '';
let usercompanyValue = '';
let userstreetValue = '';
let usersuiteValue = '';
let usercityValue = '';
let userzipcodeValue = '';

fetch(`http://localhost:3000/users/${userIDS}`)
    .then(resp => resp.json())
    .then(user => {
        userID.innerHTML = `<span class="bold">User ID</span> : ${user.id}</span>`
        userName.innerHTML = `<span class="bold">Name :</span> ${user.name}</span>`
        userUsername.innerHTML = `<span class="bold">Username :</span> ${user.username}</span>`
        userMail.innerHTML = `<span class="bold">Email :</span> ${user.email}</span>`
        userPhone.innerHTML = `<span class="bold">Phone :</span> ${user.phone ? user.phone : 'Daxil Edilməyib'}</span>`
        userCompany.innerHTML = `<span class="bold">Company :</span> ${user.company?.name ? user.company.name : 'Daxil edilməyib'}</span>`
        userStreet.innerHTML = `<span class="bold">Street :</span> ${user.address?.street ? user.address.street : 'Daxil Edilməyib'}</span>`
        userSuite.innerHTML = `<span class="bold">Suite :</span> ${user.address?.suite ? user.address.suite : 'Daxil ediməyib'}</span>`
        userCity.innerHTML = `<span class="bold">City :</span> ${user.address?.city ? user.address.city : 'Daxil edilməyib'}</span>`
        userZipcode.innerHTML = `<span class="bold">Zipcode :</span> ${user.address?.zipcode ? user.address.zipcode : 'Daxil edilməyib'}</span>`

        // ! Values

        usernameValue = user.name;
        userusernameValue = user.username;
        usermailValue = user.email;
        userphoneValue = user.phone ? user.phone : 'Daxil Edilməyib';
        usercompanyValue = user.company?.name ? user.company.name : 'Daxil edilməyib';
        userstreetValue = user.address?.street ? user.address.street : 'Daxil Edilməyib';
        usersuiteValue = user.address?.suite ? user.address.suite : 'Daxil ediməyib';
        usercityValue = user.address?.city ? user.address.city : 'Daxil edilməyib';
        userzipcodeValue = user.address?.zipcode ? user.address.zipcode : 'Daxil edilməyib';
    })

async function deleteData(ID) {
    let dataFetch = await fetch(`http://localhost:3000/users/${ID}`, { method: 'DELETE' });

    return dataFetch;
}

async function updateData(objectData) {
    let dataFetch = await fetch(`http://localhost:3000/users/${userIDS}`, {
        method: 'PUT',
        body: JSON.stringify(objectData),
        headers : {
            'Content-type': 'application/json; charset=UTF-8',
          }
    })
}

deleteBtn.addEventListener('click', async function () {
    let deletedData = await deleteData(userIDS);
})

changeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    deleteBtn.style.display = 'none';
    changeBtn.style.display = 'none';
    confirmBtn.classList.toggle('d-none');
    cancelBtn.classList.toggle('d-none');

    userName.innerHTML = `<span class="bold">Name :</span> <input type='text' class='usernames_input' value='${usernameValue}'> </span>`;
    userUsername.innerHTML = `<span class="bold">Username :</span> <input type='text' class='username_input' value='${userusernameValue}'> </span>`;
    userMail.innerHTML = `<span class="bold">Email :</span> <input type='text' class='usermail_input' value='${usermailValue}'> </span>`;
    userPhone.innerHTML = `<span class="bold">Phone :</span> <input type='text' class='userphone_input' value='${userphoneValue}'> </span>`;
    userCompany.innerHTML = `<span class="bold">Company :</span> <input type='text' class='usercompany_input' value='${usercompanyValue}'> </span>`;
    userStreet.innerHTML = `<span class="bold">Street :</span> <input type='text' class='userstreet_input' value='${userstreetValue}'> </span>`;
    userSuite.innerHTML = `<span class="bold">Suite :</span> <input type='text' class='usersuite_input' value='${usersuiteValue}'> </span>`;
    userCity.innerHTML = `<span class="bold">City :</span> <input type='text' class='usercity_input' value='${usercityValue}'> </span>`;
    userZipcode.innerHTML = `<span class="bold">Zipcode :</span> <input type='text' class='userzipcode_input' value='${userzipcodeValue}'> </span>`;
});

cancelBtn.addEventListener('click', function () {
    cancelBtn.href = `http://127.0.0.1:5500/user_detail.html?id=${userIDS}`
})

confirmBtn.addEventListener('click', function() {
    let usernameinputValue = document.querySelector('.usernames_input').value;
    let userusernameinputValue = document.querySelector('.username_input').value;
    let usermailinputValue = document.querySelector('.usermail_input').value;
    let userphoneinputValue = document.querySelector('.userphone_input').value;
    let usercompanyinputValue = document.querySelector('.usercompany_input').value;
    let userstreetinputValue = document.querySelector('.userstreet_input').value;
    let usersuiteinputValue = document.querySelector('.usersuite_input').value;
    let usercityinputValue = document.querySelector('.usercity_input').value;
    let userzipcodeinputValue = document.querySelector('.userzipcode_input').value;

    let userData = {
        "id": `${userIDS}`,
        "name": `${usernameinputValue}`,
        "username": `${userusernameinputValue}`,
        "email": `${usermailinputValue}`,
        "address" : {
            "street" : `${userstreetinputValue}`,
            "suite" : `${usersuiteinputValue}`,
            "city": `${usercityinputValue}`,
            "zipcode": `${userzipcodeinputValue}`,
        },
        "phone" : `${userphoneinputValue}`,
        "company" : {
            "name" : `${usercompanyinputValue}`
        }
    }

    updateData(userData)

    confirmBtn.href = `http://127.0.0.1:5500/user_detail.html?id=${userIDS}`;
})