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
let intString = "";

//stores intString and operator after operator press, if no operator is pressed,
//this object goes to the data and just returns the number entered
let userMath = {
    intOne: 0,
    intTwo: 0,
    operator: "=",
    // total: 0,
}

//clear button needs to clear #displayField and reset global variable to 0
//equal button needs to send data to server, math happens on server, gets results and appends the dom

function sendRecieveAppend() {
    console.log('in send')
    userMath.intTwo = Number(intString);
    console.log(userMath);
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
}
//clears DOM calculator display, resets intString to empty string, resets user math
function clearAll() {
    clearDisplay()
    intString = "";
    userMath = {
        intOne: 0,
        intTwo: 0,
        operator: "=",
        // total: 0,
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
    userMath.intOne = Number(intString);
    // userMath.total += Number(intString);
    userMath.operator = $(this).data('print');
    console.log(userMath);
    intString = "";
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
    intString = "";
    userMath = {
        intOne: 0,
        intTwo: 0,
        operator: "=",
        // total: 0,
    }
}
//clears characters off the DOM calculator display
function clearDisplay() {
    $('#displayField').empty();
}
