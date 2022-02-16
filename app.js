const express=require('express');
const app=express();

let accounts=[{id: 1, username: 'baiazid123', email:'baiazidthethunder@gmail.com', password:'000000'}];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
    res.sendFile(__dirname+"/views/login.html");

});

app.post('/login',(req,res)=>{
    let confirm=false;
    for(let i=0;i<accounts.length;i++)
    {
        if(req.body.username == accounts[i].username && req.body.password == accounts[i].password)
        {
            confirm= true;
            break;
        }
    }
    if(confirm)
    {
        res.redirect('/text');
    }
    else
    {
        res.redirect('/loginErr');
    }
});

app.get('/register',(req,res) =>{
    res.sendFile(__dirname+"/views/register.html");

});
app.get('/registerErr',(req,res) =>{
    res.sendFile(__dirname+"/views/registerErr.html");
});
app.get('/forgotpass',(req,res) =>{
    res.sendFile(__dirname+"/views/forgotpass.html");

});
app.post('/addaccount',(req,res) =>{
   
        if(req.body.password === req.body.conf_password)
        {
            let user= true;
            let email= true;
           for(let i=0;i<accounts.length;i++)
           {
               if(req.body.username == accounts[i].username)
               {
                   user=false;
                   break;
               }
               if(req.body.email == accounts[i].email)
               {
                    email=false;
                    break;
               }
           }
           if(user == true && email == true)
           {
            accounts.push({id: accounts.length+1, username: req.body.username ,email: req.body.email,password: req.body.password});
            console.log(accounts);
            res.redirect('/');
           }
           else
            {
                res.redirect('/registerErr');
            }
           
        }
        else
        {
            res.redirect('/registerErr');
        }
    
    
});
app.post('/recoverpass',(req,res) =>{

    let confirm;
    for(let i=0;i<accounts.length;i++)
    {
        if(req.body.email == accounts[i].email)
        {
            confirm=accounts[i];
            break;
        }
    }
    if(confirm)
    {
        res.send('Username-ul este: '+confirm.username+
        '<br>Parola este: '+confirm.password+
        '<form method="post" action="/backtologin">'+'<button type="submit">Inapoi la log-in</button></form>');
    }
    else
    {
        res.redirect('/recoverErr');
    }

});
app.get('/text',(req,res) =>{
    res.sendFile(__dirname+"/views/text.html");

});

app.get('/loginErr',(req,res) =>{
    res.sendFile(__dirname+'/views/loginErr.html');

});
app.get('/recoverErr',(req,res) =>{
    res.sendFile(__dirname+'/views/recoverErr.html');

});

app.post('/logout',(req,res) =>{
    res.redirect('/');
});
app.post('/backtologin',(req,res) =>{
    res.redirect('/');
});


const port=process.env.PORT || 3000;
app.listen(port,() =>console.log(`Se asculta pe portul ${port}...`));