const searchBtn = document.querySelector('.search_btn'),
    searchName = document.querySelector('.search_name'),
    searchSurname = document.querySelector('.search_surname'),
    searchEmail = document.querySelector('.search_email'),
    infoSucces = document.querySelector('.info_succes'),
    searchForm = document.querySelector('form');

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

        alert('İstifadəçi uğurla yaradıldı!')
    })