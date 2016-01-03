/* var Waterline = require('waterline');

var Person = Waterline.Collection.extend({
 */
var bcrypt=require('bcrypt-nodejs'); 
 var mysql = require('sails-mysql');
module.exports = {

 identity: 'user',
  adapters: {
		mysqlAdapt: mysql
	},
connection: 'mysqlDB',
  schema:true,
  migrate: 'safe',

  
  attributes: {
	  name:"string",
	  q:"string",
  	username: { type: 'string', unique: true ,required: true},
	password: 'string',
	toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
	},
	beforeCreate: function(values, next) {
    var usr = this;//posted data of user to be saved
//console.log(values);
  //if (!user.isModified('password')) return next();
//salts are randomnly generated and bcrypt password
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(values.password, salt, null, function(err, hash) 
	{
      if (err) return next(err);
	  
      usr.password = hash;
	  //console.log(user.password);
      next();
    });
  });
  },

//match passwords 
comparePassword : function(candidatePassword, cb) {
//console.log(candidatePassword);
//console.log(this.password);
    /* bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    }); */
	
}
};
//module.exports = Person;

