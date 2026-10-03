const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});

let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
const today = new Date()
const todayDate  = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const noticeBoard = document.querySelector('.main')
function renderNotice(){
    noticeBoard.innerHTML = '';
    notifications.forEach((note) =>{
    noticeBoard.insertAdjacentHTML('beforeend', `
        <div class="notify">
            <h2>${note.date === todayDate ? 'Today' : 'Overdue'}</h2>
            <p class="notify-name">${note.name}<span class="notify-date">Planned for ${note.date === todayDate ? 'Today' : note.date}</span></p>
            <button class="delete-note">Delete</button>
        </div>
    `);
})

 const deleteNotice = document.querySelectorAll('.delete-note');
 deleteNotice.forEach((button,index) =>{
    button.addEventListener('click', () =>{
        notifications.splice(index,1);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        renderNotice();
    })
 })
}
renderNotice();