const weightedSwitch = document.querySelector('.switch')
const weightedSwitchInside = document.querySelector('.switch-inside')
const currentGPA = document.querySelector('#current-gpa')
const creditsEarned = document.querySelector('#credits-earned')
const targetGPA = document.querySelector('#target-gpa')
const remainingCredits = document.querySelector('#remaining-credits')
const gpaDisplay = document.querySelector('.final-grade-display')
const letterGradeDisplay = document.querySelector('#letter-grade-display')
const highestPossibleGPAHeading = document.querySelector('h4')
let remainingGPAAverage = 0
let highestPossibleGPA = 0
let currentGPAValue = 0
let creditsEarnedValue = 0
let targetGPAValue = 0
let remainingCreditsValue = 0

function showHighestPossibleGPA(gpa) {
    gpaDisplay.nextElementSibling.style.display = 'none'
    letterGradeDisplay.style.display = 'none'
    highestPossibleGPAHeading.style.display = 'flex'
    switch(gpa.toString().length){
        case 1:
            gpaDisplay.innerText = `${gpa}.00`
            break
        case 3:
            gpaDisplay.innerText = `${gpa}0`
            break
        case 4:
            gpaDisplay.innerText = gpa
            break
    }
}

function resetDisplay() {
    gpaDisplay.nextElementSibling.style.display = 'flex'
    letterGradeDisplay.style.display = 'flex'
    highestPossibleGPAHeading.style.display = 'none'
    gpaDisplay.innerText = '0.00'
    letterGradeDisplay.innerText = 'N/A'
}

function calculateRemainingGPAAverage(currentGPA, creditsEarned, targetGPA, remainingCredits) {
    resetDisplay()
    remainingGPAAverage = Math.round((targetGPA * (creditsEarned + remainingCredits) - (currentGPA * creditsEarned)) / remainingCredits * 100) / 100

    highestPossibleGPA = Math.round((remainingCredits * 4 + creditsEarned * currentGPA) / (remainingCredits + creditsEarned) * 100) / 100

    while ((Math.round((remainingGPAAverage * remainingCredits + creditsEarned * currentGPA) / (creditsEarned + remainingCredits) * 100) / 100) >= targetGPA) {
        remainingGPAAverage -= 0.01
    }

    remainingGPAAverage = Math.round((remainingGPAAverage + 0.01) * 100) / 100

    if (remainingGPAAverage > 4) {
        showHighestPossibleGPA(highestPossibleGPA)
        return
    }

    if (remainingGPAAverage < 0) {
        remainingGPAAverage = 0
    }

    switch(remainingGPAAverage.toString().length){
        case 1:
            gpaDisplay.innerText = `${remainingGPAAverage}.00`
            break
        case 3:
            gpaDisplay.innerText = `${remainingGPAAverage}0`
            break
        case 4:
            gpaDisplay.innerText = remainingGPAAverage
            break
    }

    switch(true) {
        case remainingGPAAverage <= 0:
            letterGradeDisplay.innerText = 'F'
            break
        case remainingGPAAverage <= 1:
            letterGradeDisplay.innerText = 'D'
            break
        case remainingGPAAverage <= 1.3:
            letterGradeDisplay.innerText = 'D+'
            break
        case remainingGPAAverage <= 1.7:
            letterGradeDisplay.innerText = 'C-'
            break
        case remainingGPAAverage <= 2:
            letterGradeDisplay.innerText = 'C'
            break
        case remainingGPAAverage <= 2.3:
            letterGradeDisplay.innerText = 'C+'
            break
        case remainingGPAAverage <= 2.7:
            letterGradeDisplay.innerText = 'B-'
            break
        case remainingGPAAverage <= 3:
            letterGradeDisplay.innerText = 'B'
            break
        case remainingGPAAverage <= 3.3:
            letterGradeDisplay.innerText = 'B+'
            break
        case remainingGPAAverage <= 3.7:
            letterGradeDisplay.innerText = 'A-'
            break
        case remainingGPAAverage <= 4:
            letterGradeDisplay.innerText = 'A'
            break
    }
}

document.addEventListener('keyup', e => {

    currentGPAValue = parseFloat(currentGPA.value)
    creditsEarnedValue = parseFloat(creditsEarned.value)
    targetGPAValue = parseFloat(targetGPA.value)
    remainingCreditsValue = parseFloat(remainingCredits.value)
    
    if (e.target.matches('input') && currentGPAValue >= 0 && creditsEarnedValue > 0 && targetGPAValue > 0 && remainingCreditsValue > 0) {
        calculateRemainingGPAAverage(currentGPAValue, creditsEarnedValue, targetGPAValue, remainingCreditsValue)
    }
})
