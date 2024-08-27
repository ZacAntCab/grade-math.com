const addInputBtn = document.querySelector('#add-input-btn')
const inputBox = document.querySelector('.input-box')
const finalGradeDisplay = document.querySelector('.final-grade-display')
const resetBtn = document.querySelector('.reset-btn')
const cumulativeSwitch = document.querySelector('#cumulative-switch')
const cumulativeSwitchInside = document.querySelector('#cumulative-switch-inside')
const priorGPAContainer = document.querySelector('.prior-gpa-container')
const currentGPA = document.querySelector('.prior-gpa-input')
const currentCredits = document.querySelector('.prior-credits-input')
let gradeCount = 3
let cumulative = false


function createOptions(text, value) {
    const newOption = document.createElement('option')
    newOption.innerText = text
    newOption.value = value
    return newOption
}

function addGradeOptions(select) {
    const placeholder = createOptions('Grade', '')
    placeholder.setAttribute('disabled', 'true')
    placeholder.setAttribute('selected', 'true')
    placeholder.setAttribute('hidden', 'true')
    select.appendChild(placeholder)
    select.appendChild(createOptions('A+', '4.0'))
    select.appendChild(createOptions('A', '4.0'))
    select.appendChild(createOptions('A-', '3.7'))
    select.appendChild(createOptions('B+', '3.3'))
    select.appendChild(createOptions('B', '3.0'))
    select.appendChild(createOptions('B-', '2.7'))
    select.appendChild(createOptions('C+', '2.3'))
    select.appendChild(createOptions('C', '2.0'))
    select.appendChild(createOptions('C-', '1.7'))
    select.appendChild(createOptions('D+', '1.3'))
    select.appendChild(createOptions('D', '1.0'))
    select.appendChild(createOptions('F(≤65)', '0'))
}

function addClassTypeOptions(select) {
    const placeholder = createOptions('Weight', '')
    placeholder.setAttribute('disabled', 'true')
    placeholder.setAttribute('selected', 'true')
    placeholder.setAttribute('hidden', 'true')
    select.appendChild(placeholder)
    select.appendChild(createOptions('Regular', '0'))
    select.appendChild(createOptions('Honors', '0.5'))
    select.appendChild(createOptions('AP/IB', '1'))
    select.appendChild(createOptions('College', '1'))
}

function addInput(){
    const newWrapper = document.createElement('div')
    newWrapper.classList.add('input-wrapper')
    inputBox.appendChild(newWrapper)
    const newNameInput = document.createElement('input')
    newNameInput.placeholder = 'Course Name'
    newNameInput.classList.add('class-name-input')
    newNameInput.type = 'text'
    newWrapper.appendChild(newNameInput)
    const newGradeSelect = document.createElement('select')
    newGradeSelect.classList.add('grade-select')
    addGradeOptions(newGradeSelect)
    newWrapper.appendChild(newGradeSelect)
    const newCreditsInput = document.createElement('input')
    newCreditsInput.placeholder = 'Credits'
    newCreditsInput.classList.add('weight-input')
    newCreditsInput.type = 'number'
    newWrapper.appendChild(newCreditsInput)
    const newWeightSelect = document.createElement('select')
    addClassTypeOptions(newWeightSelect)
    newWrapper.appendChild(newWeightSelect)
    const newRemoveBtn = document.createElement('button')
    newRemoveBtn.classList.add('remove-input-btn')
    newRemoveBtn.innerText = '✕'
    newRemoveBtn.type = 'button'
    newWrapper.appendChild(newRemoveBtn)
}

function calculateGPA(gradeCount){
    let grades = []
    let credits = []
    let weight = []
    let finalGPA = 0
    let creditsCount = 0

    for (let i = 0; i < gradeCount; i++) {
        grades.push(parseFloat(inputBox.children[i].children[1].value))
        credits.push(parseFloat(inputBox.children[i].children[2].value))
        weight.push(parseFloat(inputBox.children[i].children[3].value))


        if (!isNaN(grades[i]) && !isNaN(credits[i]) && credits[i] >= 0) {   
            
            creditsCount += credits[i];
            finalGPA += (grades[i] + weight[i]) * credits[i];
        }
    }

    if (cumulative == true && parseFloat(currentGPA.value) > 0 && parseFloat(currentCredits.value) > 0) {
        finalGPA += parseFloat(currentGPA.value) * parseFloat(currentCredits.value)
        creditsCount += parseFloat(currentCredits.value)
    }

    finalGPA = Math.round((finalGPA / creditsCount) * 100) / 100;
    
    switch(finalGPA.toString().length){
        case 1:
            finalGradeDisplay.textContent = `${finalGPA}.00`
            break
        case 3:
            finalGradeDisplay.textContent = `${finalGPA}0`
            break
        case 4:
            finalGradeDisplay.textContent = finalGPA
            break
    }

    if (isNaN(finalGPA)) {
        finalGradeDisplay.textContent = '0.00'
    }

    switch(true) {
        case finalGPA >= 3: 
            finalGradeDisplay.style.color = '#7ceb9a'
            break
        case finalGPA >= 2:
            finalGradeDisplay.style.color = '#ffcb52'
            break
        case finalGPA < 2:
            finalGradeDisplay.style.color = '#ff5533'
            break
        case isNaN(finalGPA):
            finalGradeDisplay.style.color = 'var(--opposite-background-color)'
            break
    }
}

cumulativeSwitch.addEventListener('click', () => {
    switch(true) {
        case cumulative == false:
            cumulativeSwitchInside.style.left = '8.6rem'
            cumulative = true
            priorGPAContainer.style.display = 'block'
            document.body.children[5].style.display = 'none'
            document.body.children[6].style.display = 'flex'
            document.body.children[7].innerText = 'How to Calculate Your Weighted Cumulative GPA'
            document.body.children[8].style.display = 'none'
            document.body.children[9].style.display = 'flex'
            break
        case cumulative == true:
            cumulativeSwitchInside.style.left = '0'
            cumulative = false
            priorGPAContainer.style.display = 'none'
            document.body.children[5].style.display = 'flex'
            document.body.children[6].style.display = 'none'
            document.body.children[7].innerText = 'How to Calculate Your Weighted GPA'
            document.body.children[8].style.display = 'flex'
            document.body.children[9].style.display = 'none'
    }    
})

addInputBtn.addEventListener('click', () => {
    gradeCount++
    addInput()
})

document.addEventListener('click', e => {
    if (e.target.matches('.remove-input-btn')) {
        inputBox.removeChild(e.target.parentElement)
        gradeCount--
        calculateGPA(gradeCount)
    }
})

function resetSelectColor(select) {
    select.style.color = '#777777'
}

resetBtn.addEventListener('click', () => {
    document.querySelectorAll('select').forEach(resetSelectColor)
    finalGradeDisplay.style.color = 'var(--opposite-background-color)'
    finalGradeDisplay.textContent = '0.00'
})

document.addEventListener('keyup', e => {
    if (e.target.matches('input'))  calculateGPA(gradeCount)
})
document.addEventListener('click', e => {
    if (e.target.matches('select')) {
        if (e.target.value != '') {
            e.target.style.color = '#424242'
        }
        calculateGPA(gradeCount)
    }
})
