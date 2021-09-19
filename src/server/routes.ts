import * as express from 'express';
//helper for json file
const bodyparse = require('body-parser');
const parsejson = bodyparse.json();
const fs = require('fs');
//json file
const purchaseHistory: CartItemType[] = require('./data/purchaseHistory.json');
const cheeses = require('./data/cheeses.json');

const router = express.Router();
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };



//GET Request for showing all the cheese produts
router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

//POST Request to store the purchase into purchaseHistory.json file
router.post('/api/newPurchases', parsejson, (req, res, next) => {
    const newPurchase: CartItemType[] = req.body;
    const ids = purchaseHistory.length + 1;

    const purchaseHistoryNew = { 
        id: ids,
        items: newPurchase
    }

    const updatepurchases = [...purchaseHistory, purchaseHistoryNew]

    try{
        fs.writeFileSync('./src/server/data/purchaseHistory.json', JSON.stringify(updatepurchases, null, 2));
        res.send({status: 200});
    } catch (error){
        console.log("error", error);
        res.status(400).json()
    }

})

//GET request to get the content of purchaseHistory.json file
router.get('/api/purchaseHistory', (req, res, next) => {
    res.json(purchaseHistory);
})

export default router;