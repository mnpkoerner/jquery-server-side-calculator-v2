$(document).ready(readyNow)

function readyNow() {
    console.log('ready')
    $('button').on('click', appendDisplayBeforeSubmit);
    $('#submitButton').on('click', sendRecieveAppend)
    $('#clearButton').on('click', clearAll);
    $('.number').on('click', concatGlobal)
    $('.operator').on('click', addToObject)
}

//stores all number button clicks as strings between operator presses
let intString = '';

//stores intString and operator after operator press, if no operator is pressed,
//this object goes to the data and just returns the number entered
let userMath = {
    intOne: '',
    intTwo: '',
    operator: '=',
    intTwoPresent: false,
    // total: 0,
}

//sends userMath to server, where calculations happen and finished math
//is recalled with GET request in getAndAppendDom
function sendRecieveAppend() {
    console.log('in send')
    if (intString === '') {
        alert('Please enter a valid equation')
        clearAll();
        return;
    }
    userMath.intTwo = Number(intString);
    userMath.intTwoPresent = true;
    console.log(userMath);
    if (userMath.intOne === '' || userMath.intTwoPresent === false) {
        alert('Please enter a valid equation');
        clearAll();
    }
    $.ajax({
        url: '/calculate',
        type: 'POST',
        data: userMath
    }).then(function (response) {
        console.log(response);
        clearAll()
        getAndAppendDom();
    })
}

function getAndAppendDom() {
    $.ajax({
        url: '/calculate',
        type: 'GET',
    }).then(function (response) {
        console.log(response)
        appendDom(response)
    })
}

function appendDom(obj) {
    $('#target').empty();
    for (equ of obj) {
        $('#target').append(`<p>${equ.intOne} ${equ.operator} ${equ.intTwo} = ${equ.result}`)
    }
    $('#totalTarget').empty();
    $('#totalTarget').append(`Result: ${equ.result}`);

}
//clears DOM calculator display, resets intString to empty string, resets user math
function clearAll() {
    clearDisplay()
    intString = '';
    userMath = {
        intOne: '',
        intTwo: '',
        operator: "=",
        intTwoPresent: false,
    }
}

//also need a function to add each digit to a string in userMath before operator is clicked
//when operator is clicked, it should update the global variable with it's value
function concatGlobal() {
    intString += $(this).data('print')
    console.log(intString)
}
//operator should append mathObject.intOne with intString, then clear intString
function addToObject() {
    if (intString === '') {
        alert('Please enter a valid equation')
        clearAll()
        return
    }
    userMath.intOne = Number(intString);
    // userMath.total += Number(intString);
    userMath.operator = $(this).data('print');
    console.log(userMath);
    intString = '';
    userMath.intTwoPresent = false
}
//equal should append mathObject.intTwo with new intString, then clear intString

function appendDisplayBeforeSubmit() {
    let printData = $(this).data('print')
    console.log(printData)
    $('#displayField').append(printData)
}


//clears the DOM calculator display and resets global variables
function clearAll() {
    clearDisplay()
    intString = '';
    userMath = {
        intOne: '',
        intTwo: '',
        operator: '=',
        intTwoPresent: false,
        // total: 0,
    }
}
//clears characters off the DOM calculator display
function clearDisplay() {
    $('#displayField').empty();
}
