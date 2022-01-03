const express = require('express');
        const app = express();
        const port = process.env.PORT || 3223;
        let code = 4231;

        
        app.set("view engine", "ejs");  

        app.get('/', (request, response) => {
                response.render("main");
                });

        app.get('/newGame', (request, response) => {

                console.log("HELLO!");
                let nums = [1,2,3,4];

                let spot1 = 0;
                let spot2 = 0;
                for(let i = 0; i < 100; i++){
                        spot1 = (Math.floor(Math.random() * 4));
                        spot2 = (Math.floor(Math.random() * 4));

                        let temp = nums[spot1];
                        nums[spot1] = nums[spot2];
                        nums[spot2] = temp;

                        console.log(nums[spot1] + " " + nums[spot2]);
                }

                code = 0;
                code += nums[3];
                code += nums[2]*10;
                code += nums[1]*100;
                code += nums[0]*1000;

                console.log(code);

                
                response.render("main");
                });

        app.get('/:number1', (request, response) => {
                const number1 = request.params["number1"];
                //console.log("Code:" + number1);
                response.render("first", {num1:number1});
                });
        
        app.get('/:number1/:number2', (request, response) => {
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];

                const link = number1 + "/" + number2;
                //console.log("Code:" + number1 + number2);
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
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];
                const number3 = request.params["number3"];
                const number4 = request.params["number4"];

                let userCode = number1 + number2 + number3 + number4;
                let winningCode = code;
                if(userCode == winningCode){
                        response.render("fourth-win", {num1:number1, num2:number2, num3:number3, num4:number4});
                }
                
                else{
                        response.render("fourth-loss", {num1:number1, num2:number2, num3:number3, num4:number4});
                }        
                });

        app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        });