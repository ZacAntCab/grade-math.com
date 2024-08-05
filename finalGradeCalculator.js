const table = document.querySelector("#table");
const navBox = document.querySelector("#nav-btn-box");
const page = document.querySelector("#page")
const removeButton = document.querySelector("#remove-button");
const addButton = document.querySelector("#add-button")
let grades = 0;
let grade = [];
let percentage = [];

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
    const newPercentage = document.createElement('input');
    newPercentage.classList.add('double-input-second');
    newPercentage.setAttribute('id', `percentage${grades}`);
    newPercentage.setAttribute('placeholder', '%')
    newGradeWrap.appendChild(newPercentage);
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
    const percentageDialog = document.getElementById('invalid-percentage-dialog');
    const percentageSumDialog = document.getElementById('invalid-percentage-sum-dialog');

    const exitBtn1 = document.getElementById(`exit-btn-1`);
    const exitBtn2 = document.getElementById(`exit-btn-2`);
    const exitBtn3 = document.getElementById(`exit-btn-3`);
    const exitBtn4 = document.getElementById(`exit-btn-4`);

    const gradeArray = [];
    const percentageArray = [];
    let wholePercentage = 0;

    const gradeCount = table.childElementCount;
    for (let i = 0; i < gradeCount; i++) {

        gradeArray.push(document.getElementById(`grade${i + 1}`).value)
        percentageArray.push(document.getElementById(`percentage${i + 1}`).value)


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
        else if (percentageArray[i].includes('%') || percentageArray[i] == '' || parseFloat(percentageArray) <= 0 || parseFloat(percentageArray) >= 100) {
            percentageDialog.setAttribute('class', 'validity-dialog')
            percentageDialog.show()
            exitBtn3.addEventListener('click', () => {
                percentageDialog.setAttribute('class', 'hidden')
                percentageDialog.close()
            })
            return true;
        }

        wholePercentage = wholePercentage + parseFloat(percentageArray[i])
    }

    if (wholePercentage != 100) {
        percentageSumDialog.setAttribute('class', 'validity-dialog')
        percentageSumDialog.show()
        exitBtn4.addEventListener('click', () => {
            percentageSumDialog.setAttribute('class', 'hidden')
            percentageSumDialog.close()
        })
        return true;
    }

}

function calculateFinalGrade() {
    const gradeCount = table.childElementCount;
    let finalGrade = 0;

    for (let i = 0; i < gradeCount; i++) {
        grade.push(`${document.getElementById(`grade${i + 1}`).value}`);
        percentage.push(`${document.getElementById(`percentage${i + 1}`).value}`);
        finalGrade += (parseFloat(percentage[i]) / 100) * parseFloat(grade[i]);
    }

    return [finalGrade, grade];
}

function clearPage() {
    page.removeChild(page.firstElementChild)
    navBox.removeChild(navBox.lastElementChild)
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

function displayLetterGrade(grade) {

    const letterGradeBox = document.createElement('div');
    const gradeCount = table.childElementCount;
    letterGradeBox.setAttribute('class', 'letter-grade-box')
    document.getElementById('spacer').appendChild(letterGradeBox);
    let letterGradeText = '';
    let aCount = 0;
    let lowestGrade = 100;

    for (let i = 0; i < gradeCount; i++) {
        if (grade[1][i] >= 90) {
            aCount++;
        }
        if (parseFloat(grade[1][i]) < lowestGrade) {
            lowestGrade = parseFloat(grade[1][i]);
        }
    }

    if (aCount == gradeCount) {
        letterGradeText = "Try-Hard";
    }
    else if (grade[0] >= 90) {
        letterGradeText = `Would've Been All A's Without That ${lowestGrade}`;
    }
    else if (grade[0] >= 80) {
        letterGradeText = "Good, But at the Same Time, Kinda Embarissing";
    }
    else if (grade[0] >= 70) {
        letterGradeText = "Technically Average";
    }
    else if (grade[0] >= 60) {
        letterGradeText = "Maybe This Just Isn't Your Subject";
    }
    else if (grade[0] < 60) {
        letterGradeText = "There's Always the Next Grade... Well, Actually Maybe Not For You";
    }

    letterGradeBox.innerText = letterGradeText;
}

function finalStep() {
    const nxtBtn = document.querySelector('#next-btn');

    nxtBtn.addEventListener('click', () => {
        const gradeValidity = determineValidity();
        if (gradeValidity) {
            return;
        }
        const grade = calculateFinalGrade();
        clearPage();
        displayFinalGrade(grade[0]);
        displayLetterGrade(grade);
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
    if (grades == 55){
        return;
    }
    else if (grades == 0) {
        AddNextButton();
    }
    grades++;
    AddGradeInput(grades);
})
