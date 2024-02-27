const userIDS = new URLSearchParams(location.search).get("name");

const userID = document.querySelector('.user__id'),
      userName = document.querySelector('.user__name'),
      userUsername = document.querySelector('.user__username'),
      userMail = document.querySelector('.user__mail'),
      userPhone = document.querySelector('.user__phone'),
      userStreet = document.querySelector('.user__street'),
      userSuite = document.querySelector('.user__suite'),
      userCity = document.querySelector('.user__city'),
      usrZipcode = document.querySelector('.user__zipcode'),
      userCompany = document.querySelector('.user__company');

fetch(`http://localhost:3000/users/${userIDS}`)
.then(resp => resp.json())
.then(user => {
    userID.innerHTML = `<span class="bold">User ID</span> : ${user.id}</span>`
    userName.innerHTML = `<span class="bold">Name :</span> ${user.name}</span>`
    userUsername.innerHTML = `<span class="bold">Username :</span> ${user.username}</span>`
    userMail.innerHTML = `<span class="bold">Email :</span> ${user.email}</span>`
    userPhone.innerHTML = `<span class="bold">Phone :</span> ${user.phone}</span>`
    userCompany.innerHTML = `<span class="bold">Company :</span> ${user.company.name}</span>`
    userStreet.innerHTML = `<span class="bold">Street :</span> ${user.address.street}</span>`
    userSuite.innerHTML = `<span class="bold">Suite :</span> ${user.address.suite}</span>`
    userCity.innerHTML = `<span class="bold">City :</span> ${user.address.city}</span>`
    usrZipcode.innerHTML = `<span class="bold">Zipcode :</span> ${user.address.zipcode}</span>`
})