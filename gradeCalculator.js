const addInputBtn = document.querySelector('#add-input-btn')
const inputBox = document.querySelector('.input-box')
const finalGradeDisplay = document.querySelector('.final-grade-display')
const resetBtn = document.querySelector('.reset-btn')
let gradeCount = 3;

function removeInput() {
    inputBox.removeChild(inputBox.lastElementChild)
}

function addInput(gradeCount){
    const newWrapper = document.createElement('div')
    newWrapper.classList.add('input-wrapper')
    inputBox.appendChild(newWrapper)
    const newNameInput = document.createElement('input')
    newNameInput.placeholder = 'Grade Name'
    newNameInput.type = 'text'
    newNameInput.classList.add('class-name-input')
    newWrapper.appendChild(newNameInput)
    const newGradeInput = document.createElement('input')
    newGradeInput.placeholder = 'Grade(%)'
    newGradeInput.classList.add('grade-input')
    newGradeInput.type = 'number'
    newGradeInput.setAttribute('id', `grade${gradeCount}`)
    newWrapper.appendChild(newGradeInput)
    const newWeightInput = document.createElement('input')
    newWeightInput.placeholder = 'Weight'
    newWeightInput.classList.add('weight-input')
    newWeightInput.type = 'number'
    newWeightInput.setAttribute('id', `weight${gradeCount}`)
    newWrapper.appendChild(newWeightInput)
    const newRemoveBtn = document.createElement('button')
    newRemoveBtn.classList.add('remove-input-btn')
    newRemoveBtn.innerText = '✕'
    newRemoveBtn.type = 'button'
    newWrapper.appendChild(newRemoveBtn)
}

function calculateGrade(gradeCount){
    let grades = []
    let weights = []
    let finalGrade = 0
    let weightSum = 0
    let realGradeCount = 0
    let weightMultiplier = 0

    for (let i = 0; i < gradeCount; i++) {
        grades.push(parseFloat(inputBox.children[i].children[1].value))
        weights.push(parseFloat(inputBox.children[i].children[2].value))

        if (!isNaN(grades[i]) && !isNaN(weights[i]) && grades[i] >= 0 && weights[i] >= 0) {   

            grades[realGradeCount] = grades[realGradeCount] * (weights[realGradeCount] / 100)
            finalGrade += grades[realGradeCount]

            weightSum += weights[realGradeCount]
            realGradeCount++
        }
    }

    if (weightSum != 100) {
        weightMultiplier = 100 / weightSum
        finalGrade = finalGrade * weightMultiplier
    }

    finalGrade = Math.round(finalGrade)

    finalGradeDisplay.textContent = finalGrade

    if (isNaN(finalGrade)) {
        finalGradeDisplay.textContent = '0'
    }

    switch(true) {
        case finalGrade >= 80: 
            finalGradeDisplay.style.color = '#7ceb9a'
            break
        case finalGrade >= 65:
            finalGradeDisplay.style.color = '#ffcb52'
            break
        case finalGrade < 65:
            finalGradeDisplay.style.color = '#ff5533'
            break
        case isNaN(finalGrade):
            finalGradeDisplay.style.color = 'var(--opposite-background-color)'
            break
    }
}


addInputBtn.addEventListener('click', () => {
    gradeCount++
    addInput(gradeCount)
})

document.addEventListener('click', e => {
    if (e.target.matches('.remove-input-btn')) {
        inputBox.removeChild(e.target.parentElement)
        gradeCount--
        calculateGrade(gradeCount)
    }
})

resetBtn.addEventListener('click', () => {
    finalGradeDisplay.style.color = 'var(--opposite-background-color)'
    finalGradeDisplay.textContent = '0.00'
})

document.addEventListener('keyup', e => {
    if (e.target.matches('.grade-input') || e.target.matches('.weight-input'))  calculateGrade(gradeCount)
})
document.addEventListener('click', e => {
    if (e.target.matches('.grade-input') || e.target.matches('.weight-input'))  calculateGrade(gradeCount)
})

