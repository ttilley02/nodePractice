const express = require('express');
const morgan = require('morgan');
const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'))

app.get('/', (req, res)=>{
  res.send("Hello Express!")  
});

app.get('/burgers',(req, res) =>{
    res.send("We have juicy burgers!")
});

app.get('/pizza/pepperoni',(req, res) =>{
    res.send("Coming right up!")
});

app.get('/pizza/pineapple',(req, res) =>{
    res.send("Thats not real pizza -__- ")
});

app.get('/echo',(req, res) =>{
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText)
});

app.get('/queryviewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

  app.get('/sum', (req, res) => {
    //1. get values from the request
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    let c = a + b;
  
    //2. validate the values
    if(!a) {
    //3. a was not provided
      return res.status(400).send('Please provide first number');
    }
    if(!b) {
    //3. b was not provided
      return res.status(400).send('Please provide second number');
    }
    //4. and 5. both a and b are valid so add them together.
    const result = `The sum of A and B is  ${c}`;
  
    //6. send the response 
    res.send(result);
  });


    
    app.get('/lotto', (req, res) => { 
        const chosenNumbers = req.query.arr; 
        const winningNumbers = []; 
        const matchingNumbers = []; 
        let response = "";

    for (let i = 0; i < 6; i++){
        winningNumbers.push(Math.floor(Math.random()*21))
    }

    for(let i = 0; i < winningNumbers.length; i++){
        for(let j = 0; j < chosenNumbers.length; j++){
            if (winningNumbers[i] == chosenNumbers[j]){
                matchingNumbers.push(chosenNumbers[j])
                break
            }
        }
    }
    
    if (matchingNumbers.length < 4){
        response = "Sorry, you lose"
    } else if (matchingNumbers.length === 4){
        response = "You win a free ticket!"
    } else if (matchingNumbers.length === 5){
        response = "You win $100"
    } else {
        response = "Congrats! You could have won the mega millions!"
    }

res.send(`${response} you matched ${matchingNumbers.length} numbers`)
});

app.get('/cipher', (req, res) => {
    //1. get values from the request
    const text = req.query.text;
    const shiftNumber = Number(req.query.shiftNumber);
     
    //2. validate the values
    if(!text) {
    //3. text was not provided
      return res.status(400).send('Please provide text');
    }
    if(!shiftNumber) {
    //3. shift was not provided
      return res.status(400).send('Please provide shift');
    }
    
    const shiftStart = text.toUpperCase().split('') 
    const shiftCode = shiftStart.map((letter) => {
         return letter.charCodeAt(0)
    })
    const shiftConvert = shiftCode.map((number)=>{
        newNumber = number + shiftNumber
        if(newNumber > 90){
            let newShift = (newNumber-91)+65
            return String.fromCharCode(newShift)
        }
        else{
            return String.fromCharCode(newNumber)
        }
                
    })



    
    //6. send the response 
    res.send(shiftConvert);
  });





app.listen(8000, ()=>{
    console.log('express server is listening on port 8000')
})