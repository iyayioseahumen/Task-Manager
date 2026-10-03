const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});

let plans = JSON.parse(localStorage.getItem('plans')) || [];
let notifications = JSON.parse(localStorage.getItem('notifications')) || []
const todayDate  = new Date().toISOString().split('T')[0];

plans.forEach((plan) =>{
    if(plan.date <= todayDate){
        const exisistingplan = notifications.find((item) =>{
            return item.id === plan.id;
        })
        if(exisistingplan){
            return;
        }else{
            notifications.push(plan)
            localStorage.setItem('notifications', JSON.stringify(notifications))
        }
    }
})



const addPlanButton = document.querySelector('.add-plan');
function renderPlans(){
    plans.sort((a,b) =>{
        return a.date.localeCompare(b.date);
    });

    const plansHolder = document.querySelector('.plan-holder');
    plansHolder.innerHTML = '';
    plans.forEach((plan) =>{
        plansHolder.innerHTML += `
          <div class="plan"><p>${plan.name}</p> <span>Set for: ${plan.date}</span> <button class="delete-plan">Delete</button></div>
        `
    });

    const deletePlans = document.querySelectorAll('.delete-plan')
    deletePlans.forEach((button,index) =>{
        button.addEventListener('click', () =>{
            plans.splice(index,1)
            localStorage.setItem('plans', JSON.stringify(plans));
            renderPlans();
        })
    })

}

renderPlans();

addPlanButton.addEventListener('click', () =>{
    const planInput = document.querySelector('.plan-input').value;
    const dateInput = document.querySelector('.date-input').value;
    if(
        !planInput ||
        !dateInput
    ){ 
        alert('please make sure you filled ouy all the feilds ');
        return;
    }
    const plan = {
        id: crypto.randomUUID(),
        name: planInput,
        date: dateInput
    }
    plans.push(plan);
    localStorage.setItem('plans', JSON.stringify(plans));
    renderPlans();
})