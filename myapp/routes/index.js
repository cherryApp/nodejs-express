var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dashboard' });
});

/* GET products listing. */
router.get('/products', function(req, res, next) {
    var productsHandler = require( '../model/products' );
    productsHandler.getAll( {}, function(data) {
      res.render('products', { title: 'Products', products: data });      
    });
});

/* GET orders listing. */
router.get('/orders', function(req, res, next) {
    res.render('orders', { title: 'Orders' });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
    var userHandler = require( '../model/user' );
    userHandler.getAll( {}, function(data) {
      if ( !data ) data = [];
      res.render('users', { title: 'Users', users: data });      
    })
});

/* GET new products. */
var productFields = [
  {'label': 'Name', 'name': 'name'},
  {'label': 'Price', 'name': 'price'},
  {'label': 'Manufacturer', 'name': 'manufacturer'},
  {'label': 'In Stock', 'name': 'instock'},
  {'label': 'Image', 'name': 'image'}
];
router.get('/products/new', function(req, res, next) {
    res.render(
      'product_new',
      {title: 'New Product', formFields: productFields}
    );
});

router.post( '/product/save-new', function( req, res ) {
    var productsHandler = require( '../model/products' );
    productsHandler.insert( req.body, function(data) {
      res.redirect( '/products' );      
    } );
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
        res.redirect('/products');             
    } );
});

router.get( '/products/delete/:id', function( req, res ) {
  var productsHandler = require( '../model/products' );
  productsHandler.remove( {'_id': req.params.id}, function() {
    res.redirect('/products'); 
  });
});


module.exports = router;
