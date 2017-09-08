const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {

    console.log('User Action = ',  request.body.result.action);
    switch ( request.body.result.action) {
        case 'getTime':
            response.send(
            {
                "speech": Date().toString()
            })
            break;

        case 'calculater':
            doCalculation(request,response);
            break;

        default:
            response.send(
                {
                    "speech": "Unknown Action: " + request.action
                }
            )
    }
});




function  doCalculation(request,response){
        const operation = request.body.result.parameters.Operations;
        const firstNumber = parseInt(request.body.result.parameters.first);
        const secondNumber = parseInt(request.body.result.parameters.second);
        var result = 0;

        switch (operation) {
            case 'plus':
                result = firstNumber + secondNumber;
                break;

            case 'minus':
                result = firstNumber - secondNumber;
                break;

            case 'divide':
                result = (secondNumber == 0) ? "Err: Denominator must be grater than zero" : firstNumber / secondNumber;
                break;

            case 'multiply':
                result = firstNumber * secondNumber;
                break;

            default:
                result = "something went wrong"
                break;
        }

        response.send(
            {
                "speech": `${operation} = ${result}`
            }
        )
    }
