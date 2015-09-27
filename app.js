var express = require('express');

var port = process.env.PORT|| 3000 ;

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var book = require('./models/bookModel');


// mongoose.connect('mongodb://unoo:unoo123@ds051553.mongolab.com:51553/unoo');
mongoose.connect('mongodb://localhost/books') ;

var db  = mongoose.connection ;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to the db");
});


// var book1 = new book({tittle :"book1"});

// book1.save(function(err , book){
// if(err)  return console.error(err);
// console.log("saved");
// console.log(book);
// });


// book.find(function(err , books){
//    if(err)  return console.error(err);
//    console.log(books);
// });

var app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var bookRouter = express.Router();

bookRouter.route('/books')
   .post(function(req,res){
    var book  = new book(req.body);

     res.send(book);
     console.log(book);


     
   })
   .get(function(req,res){
      book.find(function(err , books){
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      });
   
   });

bookRouter.route('/books/:bookId')
  .get(function(req,res){
      book.findById(req.params.bookId ,function(err , books){
        if(err)
          res.status(500).send(err);
        else
          res.json(books);
      });
   
   });



app.use('/api' , bookRouter);




app.get('/',function(req,res){
	res.send("hello");
});



app.listen(port , function(){
	console.log("running on gulp " + port);
})