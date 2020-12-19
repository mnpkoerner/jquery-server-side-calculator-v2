const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));


let allCalculations = []

app.get('/calculate', (req, res) => {
    console.log('you got to /calculate');
    res.send(allCalculations);
})


app.post('/calculate', (req, res) => {
    console.log('post to /calculate')
    let mathFromClient = req.body;
    let finishedMath = doTheMath(mathFromClient);
    allCalculations.push(finishedMath)
    res.sendStatus(201)
})

function doTheMath(obj) {
    let finishedMath = {
        intOne: obj.intOne,
        intTwo: obj.intTwo,
        operator: obj.operator,
        result: 0
    }
    switch (obj.operator) {
        case '+':
            finishedMath.result = Number(obj.intOne) + Number(obj.intTwo);
            break;
        case '-':
            finishedMath.result = obj.intOne - obj.intTwo;
            break;
        case '*':
            finishedMath.result = obj.intOne * obj.intTwo;
            break;
        case '/':
            finishedMath.result = obj.intOne / obj.intTwo;
            break;
        default:
            console.log('server side error in doTheMath, unexpected input')
    }
    return finishedMath
}



app.listen(PORT, () => {
    console.log('Server running on PORT', PORT)
})
