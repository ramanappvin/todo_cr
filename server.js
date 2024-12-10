const { urlencoded } = require('express');
const express = require ('express');
const app = express();  // Express Applicn

app.use(express.urlencoded({extended: true}));

let tasks = [];

app.get('/', (req, res)=>{
    let tasklist = tasks.map(t=> `<li>${t}</li>`).join('\n'); // .map creates a new arr by modifying each elem of the existing arr and .join converts into string // instead of .map() we could have declared an empty array, and then pushed into it, using .forEach() over task array
    res.send(`
        <html>
            <body>
                <form action="/" method="POST">
                    <input name="newtask">
                    <button type="submit">ADD</button>
                </form>
                <ul>
                    ${tasklist}
                </ul>
            </body>
        </html>
    `); // server is taking request, creating new html according to it, and returning it. it is not requiring javascript on client's browser. so, even if JS is disabled on client's browser. our code works.
});

app.post('/', (req, res)=>{
    tasks.push(req.body.newtask);
    res.redirect('/'); // initiates a GET request
});

// We first setup the Applicn, and then run the server
app.listen(5555, ()=>{  
    console.log('started server at localhost:5555');
});