module.exports = {

  identity: 'sheets',
  
connection: 'mysqlDB',
  schema:true,
  migrate: 'safe',

  
  attributes: {
  SheetName:'string',
  Class:'string',
  Section:"string",
  Course:"string",
  status:{
	  type:'string',
	  defaultsTo:0
  },
  //students:'integer',
  user:{
	  columnName:'user_id',
	  model:'user'
  },
  
  student:{
	  collection:'students',
	  via:'sheet'
  },
   lecture:{
	  collection:'lectures',
	  via:'sheet'
  },
  att:{
	  collection:"attendence",
	  via:"sheet"
  }

  
 
  }
   
};
