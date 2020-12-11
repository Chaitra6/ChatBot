const express = require('express');
const { debugPort } = require('process');

function createRouter(db) {
  const router = express.Router();

  router.get('/event/', function (req, res, next) {
    db.query(
      'SELECT * FROM data',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  router.get('/allDetails/:id', function (req, res, next) {
    db.query(
      'SELECT orderdetails.* ,userdetails.*  FROM userdetails INNER JOIN orderdetails ON userdetails.orderID = orderdetails.orderID WHERE orderdetails.orderID=?',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  // userName,userEmail,userPhno,address,   req.body.name, req.body.email, req.body.phno, req.body.address,

  router.post('/pizzadetails/', function (req, res, next) {
    db.query(
      'INSERT INTO orderdetails(orderID,pType,pName,pSize,pToppings,pCount,orderTime,price)VALUES(?,?,?,?,?,?,?,?)',      
      [req.body.oid,req.body.pType, req.body.pName, req.body.pSize, req.body.pToppings, req.body.pCount, req.body.orderTime, req.body.price, req.body.maxDeliveryTime],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  router.post('/userdetails/', function (req, res, next) {
    db.query(
      'INSERT INTO userdetails(orderID,userName,userEmail,userPhno,address)VALUES(?,?,?,?,?)',      
      [req.body.oid, req.body.name, req.body.email, req.body.phno, req.body.address],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  return router;
}
 

module.exports = createRouter;
