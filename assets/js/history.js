const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});

let history = JSON.parse(localStorage.getItem('history')) || [];

function renderHistory(){
    const body = document.querySelector('.main')
    body.innerHTML = '';
    history.forEach((item) =>{
        let listHTML = '';
        item.activities.forEach((activity) =>{
            listHTML += `
            <p class="item">${activity.name} <span>-</span> <span>${activity.completed ? 'complete' : 'incomplete'} </span></p>
            `
        })
       body.innerHTML += `
       <div class="history-item">
            <p class="item-date">${item.date}</p>
            <div class="item-list">
                    ${listHTML}
                </div>
            </div>
        </div>
       `

    })
}
renderHistory();