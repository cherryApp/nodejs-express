// Mongoose.
var mongoose = require( "mongoose" );

// Connect.
mongoose.connect('mongodb://localhost/test');

// Session model.
var Session = mongoose.model( "Session", {
    "userId": "String",
    "sessionID": "String",
    "insdate": "Date"
} );

// User model.
var User = mongoose.model( "User", {
    email: "String",
    password: "String"
} );

// Get valid session.
var getSession = function( req, callBack ) {
    
    var where = { "sessionID": req.sessionID };
    Session.findOne( where, function( err, session ) {
        if ( err ) callBack( err );
        else callBack( false, session );
    } );
  
};

// Login user.
var loginUser = function( req, callBack ) {
    
    var where = {
      "email": req.body.email,
      "password": req.body.password
    };
    User.findOne( where, function( err, user ) {
        if ( err ) callBack( err );
        else {
          if ( user === null ) {
            callBack( true, user );
          } else {
            
            var _session = new Session( {
                "userId": user._id,
                "sessionID": req.sessionID,
                "insdate": new Date()
            } );
            _session.save();
            
            callBack( false, user );
          }
        }
    } );
  
};

module.exports = {
    "getSession": getSession,
    "loginUser": loginUser
};





