const express = require('express');
let code = 4231;

function randomizeCode(){
                let nums = [1,2,3,4];

                let spot1 = 0;
                let spot2 = 0;
                for(let i = 0; i < 1000; i++){
                        spot1 = (Math.floor(Math.random() * 4));
                        spot2 = (Math.floor(Math.random() * 4));

                        let temp = nums[spot1];
                        nums[spot1] = nums[spot2];
                        nums[spot2] = temp;
                }

                code = 0;
                code += nums[3];
                code += nums[2]*10;
                code += nums[1]*100;
                code += nums[0]*1000;

                console.log(code);
}

const app = express();
const port = process.env.PORT || 3223;
const session = require('express-session');
const req = require('express/lib/request');
        
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
        secret: 'random string',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
}));

app.set("view engine", "ejs");  

app.get('/', (request, response) => {

        let invalidLogin = request.query.reason || null;

        const user = request.session ? request.session.username: "user not set";
                 response.render("index", {my_user: request.session.username, error: invalidLogin});
});

app.post('/signup',(request, response) => {
        const valid_users = [{username:"Dakota", password:"Korn"}];

        const username = request.body.username;
        const pass = request.body.password;
        var foundUser = valid_users.find(usr => {
                return usr.username == username && usr.password == pass;
        });

        if(foundUser){
                request.session.username = username;
                request.session.password = pass;
                request.session.valid = true;
                response.redirect("/main");
        }
        else{
                request.session.destroy(() => {});
                response.redirect("/?reason=invalid_user");
        }
});

app.get('/main', (request, response) => {
        if(request.session.valid)
                response.render("main", {my_user: request.session.username});
        else
                response.redirect("/");
                
});

app.get('/newGame', (request, response) => {
        if(request.session.valid){
                randomizeCode();
                response.render("main");
        }
        else
                response.redirect("/");

});

app.get('/:number1', (request, response) => {
        if(request.session.valid){
                const number1 = request.params["number1"];
                response.render("first", {num1:number1});
        }
        else
                response.redirect("/");  
        
});
        
app.get('/:number1/:number2', (request, response) => {
        if(request.session.valid){
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];

                const link = number1 + "/" + number2;
                response.render("second", {num1:number1, num2:number2, link:link});
        }
        else
                response.redirect("/");  
});

app.get('/:number1/:number2/:number3', (request, response) => {
        if(request.session.valid){
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];
                const number3 = request.params["number3"];
                const link = number1 + "/" + number2 + "/" + number3;
                
                response.render("third", {num1:number1, num2:number2, num3:number3, link:link});
        }
        else
                response.redirect("/");  
});

app.get('/:number1/:number2/:number3/:number4', (request, response) => {
        if(request.session.valid){
                const number1 = request.params["number1"];
                const number2 = request.params["number2"];
                const number3 = request.params["number3"];
                const number4 = request.params["number4"];

                let userCode = number1 + number2 + number3 + number4;
                let winningCode = code;
                if(userCode == winningCode)
                        response.render("fourth-win", {num1:number1, num2:number2, num3:number3, num4:number4});
                else
                        response.render("fourth-loss", {num1:number1, num2:number2, num3:number3, num4:number4});
                  
        }     
        else
                response.redirect("/"); 
});

app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
});