const questions = document.querySelector('#questions')
const questionsCorrect = document.querySelector('#questions-correct')
const gradeDisplay = document.querySelector('.final-grade-display')
const letterDisplay = document.querySelector('#letter-grade-display')

function calculateGrade() {
    const grade = Math.round(parseFloat(questionsCorrect.value) / parseFloat(questions.value) * 100)
    gradeDisplay.innerText = grade
    let letter = ''
    switch(true) {
        case grade >= 97: 
            letter = 'A+'
            break
        case grade >= 93: 
            letter = 'A'
            break
        case grade >= 90: 
            letter = 'A-'
            break
        case grade >= 87: 
            letter = 'B+'
            break
        case grade >= 83: 
            letter = 'B'
            break
        case grade >= 80: 
            letter = 'B-'
            break
        case grade >= 77: 
            letter = 'C+'
            break
        case grade >= 73: 
            letter = 'C'
            break
        case grade >= 70: 
            letter = 'C-'
            break
        case grade >= 67: 
            letter = 'D+'
            break
        case grade >= 65: 
            letter = 'D'
            break
        case grade < 65: 
            letter = 'F'
            break    
    }
    letterDisplay.innerText = letter

    switch(true) {
        case grade >= 80: 
            gradeDisplay.style.color = '#1fcc5b'
            letterDisplay.style.color = '#1fcc5b'
            break
        case grade >= 65:
            gradeDisplay.style.color = '#ffcb52'
            letterDisplay.style.color = '#ffcb52'
            break
        case grade < 65:
            gradeDisplay.style.color = '#ff5533'
            letterDisplay.style.color = '#ff5533'
            break
    }
}

document.addEventListener('keyup', e => {
    if (e.target.matches('input')) {
        if (parseFloat(questions.value) > 0 && parseFloat(questions.value) >= parseFloat(questionsCorrect.value)) {
            calculateGrade()
        }
        else {
            gradeDisplay.innerText = '0'
            gradeDisplay.style.color = 'var(--opposite-background-color)'
            letterDisplay.innerText = 'N/A'
            letterDisplay.style.color = 'var(--opposite-background-color)'
        }
    }
})