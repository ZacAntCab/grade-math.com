const table = document.querySelector("#table");
const navBox = document.querySelector("#nav-btn-box");
const page = document.querySelector("#page")
const removeButton = document.querySelector("#remove-button");
const addButton = document.querySelector("#add-button")
let grades = 0;
let grade = [];
let credits = []

const infoBtn = document.querySelector('#info-btn');
const infoDialog = document.querySelector('#info');
const exitInfoBtn = document.querySelector('#exit-info-btn');

infoBtn.addEventListener('click', () => {
    infoDialog.showModal();
    infoDialog.setAttribute('class', 'info-dialog')
    exitInfoBtn.addEventListener('click', () => {
        infoDialog.close()
        infoDialog.setAttribute('class', 'hidden')
    })
})

function RemoveGradeInput() {
    table.removeChild(table.lastElementChild);
}

function AddGradeInput(grades) {
    const newGradeWrap = document.createElement('div')
    newGradeWrap.setAttribute('class', 'double-input-wrap')
    table.appendChild(newGradeWrap)
    const newGrade = document.createElement("input");
    newGrade.classList.add('double-input-first');
    newGrade.setAttribute('id', `grade${grades}`);
    newGrade.setAttribute('type', 'number')
    newGrade.setAttribute('placeholder', 'Grade')
    newGradeWrap.appendChild(newGrade);
    const newCredits = document.createElement('input');
    newCredits.classList.add('double-input-second');
    newCredits.classList.add('credits-input');
    newCredits.setAttribute('id', `credits${grades}`);
    newCredits.setAttribute('placeholder', 'Credits')
    newGradeWrap.appendChild(newCredits);
}

function AddNextButton() {
    const nextBtn = document.createElement("button");
    nextBtn.classList.add('nav-btn');
    nextBtn.innerText = 'Next';
    nextBtn.setAttribute('id', "next-btn");
    nextBtn.setAttribute('type', 'button');
    navBox.appendChild(nextBtn);
}

function RemoveNextButton() {
    navBox.removeChild(navBox.lastElementChild)
}

function determineValidity() {

    const numberDialog = document.getElementById(`invalid-number-dialog`);
    const blankDialog = document.getElementById(`blank-dialog`);

    const exitBtn1 = document.getElementById(`exit-btn-1`);
    const exitBtn2 = document.getElementById(`exit-btn-2`);

    const gradeArray = [];

    const gradeCount = table.childElementCount;
    for (let i = 0; i < gradeCount; i++) {

        gradeArray.push(document.getElementById(`grade${i + 1}`).value)


        if (parseFloat(gradeArray[i]) > 100 || parseFloat(gradeArray[i]) < 0) { 
            numberDialog.setAttribute('class', 'validity-dialog')
            numberDialog.show()
            exitBtn1.addEventListener('click', () => {
                numberDialog.setAttribute('class', 'hidden')
                numberDialog.close()
            })
            return true;
        }
        else if (gradeArray[i] == ''){
            blankDialog.setAttribute('class', 'validity-dialog')
            blankDialog.show()
            exitBtn2.addEventListener('click', () => {
                blankDialog.setAttribute('class', 'hidden')
                blankDialog.close()
            })
            return true;
        }
    }

}

function calculateGPA() {
    const gradeCount = table.childElementCount;
    let creditsCount = 0;
    let gradeSum = 0;

    for (let i = 0; i < gradeCount; i++) {
        grade.push(parseFloat(document.getElementById(`grade${i + 1}`).value));
        credits.push(parseFloat(document.getElementById(`credits${i + 1}`).value));
        
        creditsCount += credits[i];

        if (grade[i] >= 93) {
            gradeSum += credits[i] * 4.0;
        }
        else if (grade[i] >= 90) {
            gradeSum += credits[i] * 3.7;
        }
        else if (grade[i] >= 87) {
            gradeSum += credits[i] * 3.3;
        }
        else if (grade[i] >= 83) {
            gradeSum += credits[i] * 3.0;
        }
        else if (grade[i] >= 80) {
            gradeSum += credits[i] * 2.7;
        }
        else if (grade[i] >= 77) {
            gradeSum += credits[i] * 2.3;
        }
        else if (grade[i] >= 73) {
            gradeSum += credits[i] * 2.0;
        }
        else if (grade[i] >= 70) {
            gradeSum += credits[i] * 1.7;
        }
        else if (grade[i] >= 67) {
            gradeSum += credits[i] * 1.3;
        }
        else if (grade[i] >= 65) {
            gradeSum += credits[i] * 1.0;
        }
        else if (grade[i] < 65) {
            gradeSum += credits[i] * 0.0;
        }
    }

    console.log(gradeSum)
    console.log(creditsCount)

    const finalGPA = Math.round((gradeSum / creditsCount) * 10) / 10;

    console.log(finalGPA)

    return finalGPA;
}

function clearPage() {
    page.removeChild(page.firstElementChild)
    navBox.removeChild(navBox.lastElementChild)
}

function displayGPA(finalGPA) {
    const spacer = document.createElement('div');
    spacer.setAttribute('class','box-box')
    spacer.setAttribute('id', 'spacer');
    page.appendChild(spacer)
    const finalGradeBox = document.createElement('div');
    finalGradeBox.setAttribute('class', 'quarter-grade-box');
    finalGradeBox.innerText = `${finalGPA}`;
    spacer.appendChild(finalGradeBox);   
}

function finalStep() {
    const nxtBtn = document.querySelector('#next-btn');

    nxtBtn.addEventListener('click', () => {
        const gradeValidity = determineValidity();
        if (gradeValidity) {
            return;
        }
        const gpa = calculateGPA();
        clearPage();
        displayGPA(gpa);
    })
}

const navBoxObserver = new MutationObserver(finalStep)

navBoxObserver.observe(navBox, {childList: true})

removeButton.addEventListener('click', () => {
    if (grades == 0){
        return;
    }
    else if (grades == 1)
    {
        RemoveNextButton();
    }
    grades--;
    RemoveGradeInput();

})

addButton.addEventListener('click', () => {
    if (grades == 44){
        return;
    }
    else if (grades == 0) {
        AddNextButton();
    }
    grades++;
    AddGradeInput(grades);
})
