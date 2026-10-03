const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});
const today = new Date();

const dateElement = document.querySelector('.js-date');

dateElement.textContent = today.toLocaleString('en-US',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})
const todayDate = new Date().toDateString()

let list = JSON.parse(localStorage.getItem('list')) || [];
let saveDate = localStorage.getItem('activityDate');

if(saveDate === null){
    saveDate = new Date().toDateString()
    localStorage.setItem('activityDate', saveDate);
}

if(saveDate !== todayDate){
    let history = JSON.parse(localStorage.getItem('history')) || [];
    const dayHistory = {
        date: saveDate,
        activities: list
    };
    history.push(dayHistory);
    localStorage.setItem('history', JSON.stringify(history));

    list = []
    localStorage.setItem('list' , JSON.stringify(list));
    localStorage.setItem('activityDate', todayDate);
}

    function renderList (){
        const listHolder = document.querySelector('.js-activity');
        listHolder.innerHTML = '';
        list.forEach((item, index) =>{
            listHolder.innerHTML += `
                <div class="activity-item">
                    <label>
                        <input type="checkbox" class="js-checkbox" data-index="${index}"
                        ${item.completed ? 'checked': ''}>
                         <span class="item-name">${item.name} </span>
                    </label>
                    <button class="js-delete">delete</button>
                </div>
                
            `
        })

        const deleteButtons = document.querySelectorAll('.js-delete');
        deleteButtons.forEach((button,index) => {
            button.addEventListener('click', () =>{
                list.splice(index,1);
                localStorage.setItem('list' , JSON.stringify(list));
                renderList();
            })
        })

        const checkboxes = document.querySelectorAll('.js-checkbox');
        checkboxes.forEach((checkbox) =>{
            checkbox.addEventListener('change', () =>{
                const index = checkbox.dataset.index;
                list[index].completed = checkbox.checked;
                localStorage.setItem('list' , JSON.stringify(list));
                renderList();
            })
        });


        let completedActivities = 0;

        list.forEach((item) =>{
            if(item.completed){
                completedActivities++;
            };
        })

        let percentage = 0;
        if(list.length > 0){
            percentage = (completedActivities/list.length)*100;
        }
        const progressText = document.querySelector('.js-progress-text');
        const progressFill = document.querySelector('.js-progress-fill');

        progressText.textContent = `${completedActivities}/ ${list.length} - ${percentage.toFixed(0)}%`;
        progressFill.style.width = `${percentage}%`;
    }
renderList();
const addActivity = document.querySelector('.js-add');
addActivity.addEventListener('click', () => {
    const activityInput = document.querySelector('.activity-input')
    const jsInput = activityInput.value;
    const activity = {
        name: jsInput,
        completed: false
    }
    list.push(activity);
    localStorage.setItem('list' , JSON.stringify(list));
    activityInput.value = ''
    renderList();
})