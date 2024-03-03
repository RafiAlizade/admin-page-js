const memberCount = document.querySelector('.allmembers_count');

let database = [];

async function fetchData() {
    let dataFetch = await fetch('http://localhost:3000/users');
    let response = await dataFetch.json();

    return response;
}


async function count() {
    let fetchedData = await fetchData();

    
    let databaseCount = 0;

    let foreachData = await fetchedData.forEach(users => {
        databaseCount += 1;
    })

    return databaseCount
}

async function init() {
    let memberCountValue = await count();
    memberCount.textContent = memberCountValue;
}

init();