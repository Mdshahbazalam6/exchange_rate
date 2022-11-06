import express from 'express'
import cors from "cors"
const app = express()
import fetch from 'node-fetch';
import bodyparser from 'body-parser'

app.use(cors())

var cache = {
  hour:0,minutes:0,oldHour:0,oldMinute:0
};

app.post('/',bodyparser.json(),(req,res)=>{
let body = req.body
console.log(body)
cache.oldHour = cache.hour
cache.oldMinute = cache.minutes
cache.hour = body.hrs
cache.minutes = body.mns

res.send({cache})}
)
// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: {
//     "apikey" :  "bKTS3F3e7OWfxfKs0g6iOA6RXYSWDuEe"
//   }
// };

// fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=&base=EUR", requestOptions)
//   .then(response => response.text())
//   .then(result => res.status(200).send(result))
//   .catch(error => console.log('error', error));      
// })

app.get('/getrates', bodyparser.json(),function(req, res, next) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
          "apikey" :  "bKTS3F3e7OWfxfKs0g6iOA6RXYSWDuEe"
        }
    };
  if (cache.rates) {
    res.send(cache.rates);
  } else {
    fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=&base=INR", requestOptions)
    .then(response => response.json()) 
    .then(response => {
      cache.rates = response.rates;
      console.log(cache)
      res.send(response.rates);
    })
  }
});

setInterval(function() {
  delete cache.rates;
}, 60 * 1000)

app.listen(5000)