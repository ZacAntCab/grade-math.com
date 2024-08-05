const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const navBox = document.getElementById("nav-btn-box");
const removeButtonMi = document.getElementById("remove-button-mi");
const addButtonMi = document.getElementById("add-button-mi")
const removeButtonMa = document.getElementById("remove-button-ma");
const addButtonMa = document.getElementById("add-button-ma")
const page = document.getElementById("page")
let minorWord = 'minor';
let majorWord = 'major';
let minors = 0;
let majors = 0;
const minor = [];
const major = [];

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

function RemoveGradeInput(table) {
    table.removeChild(table.lastElementChild);
}

function AddGradeInput(gradeName, grades, table) {

    const newGrade = document.createElement("input");
    newGrade.classList.add('input');
    newGrade.setAttribute('id', `${gradeName}${grades}`);
    newGrade.required = true;
    newGrade.setAttribute('type', 'number')
    newGrade.setAttribute('placeholder', 'Grade')
    newGrade.min = 0;
    newGrade.max = 100;
    table.appendChild(newGrade);
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

function determineValidity(gradeName, table) {

    const numberDialog = document.getElementById(`invalid-number-dialog-${gradeName}`);
    const blankDialog = document.getElementById(`blank-dialog-${gradeName}`);

    const exitBtn1 = document.getElementById(`exit-btn-1-${gradeName}`)
    const exitBtn2 = document.getElementById(`exit-btn-2-${gradeName}`)

    const array = [];

    const gradeCount = table.childElementCount;
    for (let i = 0; i < gradeCount; i++) {

        array.push(document.getElementById(`${gradeName}${i + 1}`).value)

        if (array[i] == '' || parseFloat(array[i]) > 100 || parseFloat(array[i]) < 0) {

            if (parseFloat(array[i]) > 100 || parseFloat(array[i]) < 0) { 
                numberDialog.setAttribute('class', 'validity-dialog')
                numberDialog.show()
                exitBtn1.addEventListener('click', () => {
                    numberDialog.setAttribute('class', 'hidden')
                    numberDialog.close()
                })
            }
            else if (array[i] == ''){
                blankDialog.setAttribute('class', 'validity-dialog')
                blankDialog.show()
                exitBtn2.addEventListener('click', () => {
                    blankDialog.setAttribute('class', 'hidden')
                    blankDialog.close()
                })
            }

            return true;
        }
    }

}

function clearPage() {
    page.removeChild(page.firstElementChild)
    navBox.removeChild(navBox.lastElementChild)
}

function calculateValues(grade, gradeName, table) {

    const gradeCount = table.childElementCount;
    let gradeSum = 0;

    for (let i = 0; i < gradeCount; i++) {
        grade.push(`${document.getElementById(`${gradeName}${i + 1}`).value}`)
        gradeSum += parseFloat(grade[i]);
    }

    return [gradeCount, gradeSum, grade]
}

function calculateLetterGrades(gradeValues) {

    let letterGrades = [0, 0, 0, 0, 0]

    for (let i = 0; i < gradeValues[0]; i++) {
        if (gradeValues[2][i] >= 90) {
            letterGrades[0]++;
        }
        else if (gradeValues[2][i] >= 80) {
            letterGrades[1]++;
        }
        else if (gradeValues[2][i] >= 70) {
            letterGrades[2]++;
        }
        else if (gradeValues[2][i] >= 60) {
            letterGrades[3]++;
        }
        else {
            letterGrades[4]++;
        }
    }

    return letterGrades;
}

function calculateFinalGrade(grade1, grade2) {
    if (grade1[0] > 0 && grade2[0] > 0) {
        return Math.round(grade1[1]/grade1[0] * 0.4 + grade2[1]/grade2[0] * 0.6);
         
    }
    else if (grade1[0] > 0) {
        return Math.round(grade1[1]/grade1[0]);
    }
    else {
        return Math.round(grade2[1]/grade2[0]);
    }
}

function displayFinalGrade(finalGrade) {
    const spacer = document.createElement('div');
    spacer.setAttribute('class','box-box')
    spacer.setAttribute('id', 'spacer');
    page.appendChild(spacer)
    const finalGradeBox = document.createElement('div');
    finalGradeBox.setAttribute('class', 'quarter-grade-box');
    finalGradeBox.innerText = `${finalGrade}`;
    spacer.appendChild(finalGradeBox);
    
}

function displayLetterGrade(finalGrade, gradeValues1, gradeValues2) {

    const letterGradeBox = document.createElement('div');
    letterGradeBox.setAttribute('class', 'letter-grade-box')
    document.getElementById('spacer').appendChild(letterGradeBox);
    let letterGradeText = '';

    if (gradeValues1[3][0] == gradeValues1[0] && gradeValues2[3][0] == gradeValues2[0]) {
        letterGradeText = "Try-Hard";
    }
    else if (finalGrade >= 90) {
        letterGradeText = "So Close to All A's... Except Not Really";
    }
    else if (finalGrade >= 80) {
        letterGradeText = "Good, But at the Same Time, Kinda Embarissing";
    }
    else if (finalGrade >= 70) {
        letterGradeText = "Technically Average";
    }
    else if (finalGrade >= 60) {
        letterGradeText = "Maybe This Just Isn't Your Subject";
    }
    else if (finalGrade < 60) {
        letterGradeText = "There's Always the Next Grade... Well, Actually Maybe Not For You";
    }

    letterGradeBox.innerText = letterGradeText;
}

function finalStep() {
    const nxtBtn = document.getElementById('next-btn');

    nxtBtn.addEventListener('click', () => {
        const minorValidity = determineValidity(minorWord, table1);
        const majorValidity = determineValidity(majorWord, table2);
        if (minorValidity || majorValidity) {
            return;
        }
        const minorValues = calculateValues(minor, minorWord, table1);
        const majorValues = calculateValues(major, majorWord, table2);
        clearPage();
        minorValues.push(calculateLetterGrades(minorValues));
        majorValues.push(calculateLetterGrades(majorValues));
        const finalGrade = calculateFinalGrade(minorValues, majorValues);
        displayFinalGrade(finalGrade);
        displayLetterGrade(finalGrade, minorValues, majorValues)
        
    })
}

const navBoxObserver = new MutationObserver(finalStep)

navBoxObserver.observe(navBox, {childList: true})

removeButtonMi.addEventListener('click', () => {
    if (minors == 0){
        return;
    }
    else if (majors == 0 && minors == 1)
    {
        RemoveNextButton();
    }
    minors--;
    RemoveGradeInput(table1);

})

addButtonMi.addEventListener('click', () => {
    if (minors == 24){
        return;
    }
    else if (minors == 0 && majors ==0) {
        AddNextButton();
    }
    minors++;
    AddGradeInput(minorWord, minors, table1);
})

removeButtonMa.addEventListener('click', () => {
    if (majors == 0){
        return;
    }
    else if (majors == 1 && minors == 0)
        {
            RemoveNextButton();
        }
    majors--;
    RemoveGradeInput(table2);
})

addButtonMa.addEventListener('click', () => {
    if (majors == 24){
        return;
    }
    else if (minors == 0 && majors ==0) {
        AddNextButton();
    }
    majors++;
    AddGradeInput(majorWord, majors, table2);
})