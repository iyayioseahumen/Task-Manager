const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.menu')
toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active')
    navLinks.classList.toggle('active')
});

let goals = JSON.parse(localStorage.getItem('goals')) || [];
const addGoal = document.querySelector('.js-add-goal')
 function renderGoals(){
    const goalsHolder = document.querySelector('.js-goals');
    goalsHolder.innerHTML = '';

    goals.forEach((goal,index)=>{

        let stepsHtml = '';
        goal.steps.forEach((step,stepIndex) =>{
            stepsHtml += `
            <div class="step-item">
                    <label>
                        <input type="checkbox" class="step-checkbox" data-goal-index="${index}" data-step-index="${stepIndex}"
                        ${step.completed ? 'checked': ''}>
                         <span class="step-name">${step.name} </span>
                    </label>
                    <button class="step-delete" data-goal-index="${index}"  data-step-index="${stepIndex}">delete</button>
            </div>
            `
        })
        
        goalsHolder.insertAdjacentHTML('beforeend', `
        <div class="goal">
                <div class="goal-progress">
                    <p class="goal-progress-text"></p>
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill"></div>
                    </div>
                </div>
                <div>
                    <span class="goal-name">${goal.name} </span>
                    <button class="add-steps" data-index="${index}">Add Steps</button>
                    <button class="delete-goal">Delete Goal</button>
                </div>
                <div class="step" data-index="${index}">
                    <input type="text" class="step-input">
                    <button class="add-step">Add Step</button>
                </div>
                <div class="steps-container">
                ${stepsHtml}
                </div>
        </div>
        `)
        const goalCards = document.querySelectorAll('.goal')
        const goalCard = goalCards[index];
        const progressText = goalCard.querySelector('.goal-progress-text')
        const progressFill = goalCard.querySelector('.goal-progress-fill')
        let completedSteps = 0;
        goal.steps.forEach((step) =>{
            if(step.completed){
                completedSteps++;
            }
        })

        let goalPercentage = 0;
        if(goal.steps.length > 0){
            goalPercentage = (completedSteps/goal.steps.length)*100;
        }

        progressText.textContent = `${completedSteps}/ ${goal.steps.length} - ${goalPercentage.toFixed(0)}%`
        progressFill.style.width = '0%';
        setTimeout(() => {
        progressFill.style.width = `${goalPercentage}%`;
    }, 50);
    })

    const goalDeleteButtons = document.querySelectorAll('.delete-goal');
    goalDeleteButtons.forEach((button,index)=>{
        button.addEventListener('click', () => {
            goals.splice(index,1);
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
        })
    })

    const addStepsButtons = document.querySelectorAll('.add-steps');

    addStepsButtons.forEach((button,index) =>{
        button.addEventListener('click', () =>{
        const goalCards = document.querySelectorAll('.goal')
        const goalCard = goalCards[index];
        const stepCard = goalCard.querySelector('.step');
        stepCard.classList.toggle('active');
        })
    })

    const addStepButtons = document.querySelectorAll('.add-step');
    addStepButtons.forEach((button,index) =>{
        button.addEventListener('click', () =>{
            const  goalCard = button.parentElement;
            const stepInput = goalCard.querySelector('.step-input');
            if(!stepInput.value){
                alert('please fill out the required feild');
                return;
            }
            const step = {
                name: stepInput.value,
                completed: false
            }
            goals[index].steps.push(step);
            localStorage.setItem('goals', JSON.stringify(goals));
            stepInput.value = '';
            renderGoals();



        })
    })

    const stepDeletebuttons = document.querySelectorAll('.step-delete')
    stepDeletebuttons.forEach((button) =>{
        button.addEventListener('click', () =>{
        const goalIndex = button.dataset.goalIndex;
        const stepIndex = button.dataset.stepIndex;

        goals[goalIndex].steps.splice(stepIndex,1);
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals();

    })
    })

    const stepCheckboxes = document.querySelectorAll('.step-checkbox');
    stepCheckboxes.forEach((checkbox) =>{
        checkbox.addEventListener('change', () =>{
            const goalIndex = checkbox.dataset.goalIndex;
            const stepIndex = checkbox.dataset.stepIndex;

            goals[goalIndex].steps[stepIndex].completed = checkbox.checked;
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
        })
    })
};
renderGoals();
addGoal.addEventListener('click', () =>{
    const goalInput = document.querySelector('.js-goal-input');
    const newGoal = goalInput.value;
    if(!newGoal){
        alert('please fill out the required feild')
        return;
    }
    const goal = {
        name: newGoal,
        steps: []
    }
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    renderGoals();
})
