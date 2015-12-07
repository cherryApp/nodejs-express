var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dashboard' });
});

/* GET products listing. */
router.get('/products', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    res.send('product page');
});

/* GET one product. */
router.get('/products/:id', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    productsHandler.getOne( {'_id': req.params.id}, function(data) {
        res.render('product', { data: data });       
    } );
});

/* Update product. */
router.post('/products/update/:id', function(req, res, next) {

    // console.log( req.body );

    var productsHandler = require( '../model/products' );

    productsHandler.update( {'_id': req.params.id}, req.body, function(data) {
        res.redirect('/products/'+req.params.id);             
    } );
});

/* GET new products. */
router.get('/products/new', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    var product = {
        name: "Vasaló",
        price: 12555,
        manufacturer: "Bosch",
        image: "http://www.redo.hu/images/stories/virtuemart/product/bosch_vasalo_tda503011p_5177d013e1af4.jpg",
        instock: 12
    };
    productsHandler.insert( product, function(data) {
        res.send('product inserted: '+data );        
    } );
});

module.exports = router;
