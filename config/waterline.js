var mysqlAdapter = require('sails-mysql');

//var mongoAdapter = require('sails-mongo');
module.exports = {

  // Setup Adapters
  // Creates named adapters that have have been required
  adapters: {
  //  mongoAdapt: mongoAdapter
    mysqlAdapt: mysqlAdapter
  },

  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
//mongoDB: {
   //   adapter: 'mongoAdapt',
	 /* module: 'sails-mongo',
      host: 'localhost',
      database: 'waterline_test',
      user:'',
      password:'',
	  port : 27017*/
	 // module: 'sails-mongo',
      //url: "mongodb://localhost:27017/test9"
	  
    //}
    mysqlDB: {
      adapter: 'mysqlAdapt',
      
	 user : process.env.OPENSHIFT_MYSQL_DB_USERNAME || "root",
		password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || "",
		database : process.env.OPENSHIFT_GEAR_NAME || 'emailalerts',
		host:process.env.OPENSHIFT_MYSQL_DB_HOST || "localhost",
		port:process.env.OPENSHIFT_MYSQL_DB_PORT,
		
      supportBigNumbers:true, //true/false
      debug:false,  //['ComQueryPacket'], //false or array of node-mysql debug options
      trace:true //true/false
    } 
  }

};
