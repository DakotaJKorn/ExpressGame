const express = require('express');
        const app = express();
        const port = process.env.PORT || 3223;
        const code = 4231;

        app.set("view engine", "ejs");  

        app.get('/', (request, response) => {
                response.render("main");
                });

        app.get('/newGame', (request, response) => {
                const number1 = request.params["number1"];
                console.log("Code:" + number1);
                response.render("first", {num1:number1});
                });

        app.get('/:number1', (request, response) => {
                const number1 = request.params["number1"];
                console.log("Code:" + number1);
                response.render("first", {num1:number1});
                });
        
        app.get('/:number1/:number2', (request, response) => {
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];

                const link = number1 + "/" + number2;
                console.log("Code:" + number1 + number2);
                response.render("second", {num1:number1, num2:number2, link:link});
                });

        app.get('/:number1/:number2/:number3', (request, response) => {
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];
                const number3 = request.params["number3"];
                const link = number1 + "/" + number2 + "/" + number3;
                
                response.render("third", {num1:number1, num2:number2, num3:number3, link:link});
                });

        app.get('/:number1/:number2/:number3/:number4', (request, response) => {
                console.log("HELLO");
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];
                const number3 = request.params["number3"];
                const number4 = request.params["number4"];

                let code = number1 + number2 + number3 + number4;

                if(code == "4231"){
                        response.render("fourth-win", {num1:number1, num2:number2, num3:number3, num4:number4});
                }
                        response.render("fourth-loss", {num1:number1, num2:number2, num3:number3, num4:number4});
                });

        app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        });