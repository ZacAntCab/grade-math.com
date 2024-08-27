const currentGrade = document.querySelector('#current-grade')
const desiredGrade = document.querySelector('#desired-grade')
const finalExamWeight = document.querySelector('#final-exam-weight')
const gradeDisplay = document.querySelector('.final-grade-display')
let currentGradeValue = 0
let desiredGradeValue = 0
let finalExamWeightValue = 0

function calculateFinalGradeNeeded(currentGrade, desiredGrade, finalExamWeight) {
    let finalGradeNeeded = (desiredGrade - (100 - finalExamWeight) / 100 * currentGrade) / (finalExamWeight / 100)
    finalGradeNeeded = Math.round(finalGradeNeeded * 100) / 100

    if (finalGradeNeeded < 0) {
        finalGradeNeeded = 0
    }
    else {
        gradeDisplay.innerText = finalGradeNeeded
    }
}

document.addEventListener('keyup', e => {
    if (e.target.matches('input')) {
        currentGradeValue = parseFloat(currentGrade.value)
        desiredGradeValue = parseFloat(desiredGrade.value)
        finalExamWeightValue = parseFloat(finalExamWeight.value)

        if (desiredGradeValue >= 0 && currentGradeValue >= 0 && finalExamWeightValue >= 0) {
            calculateFinalGradeNeeded(currentGradeValue, desiredGradeValue, finalExamWeightValue)
        }
    }
})