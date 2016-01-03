module.exports = {

  identity: 'lectures',
  
connection: 'mysqlDB',
  schema:true,
  migrate: 'safe',

  
  attributes: {
  l_name: 'string',
  
  atd3:{
	  collection:'attendence',
	  via:'lecture'
  },
  sheet:{
	  columnName:'sheet_id',
	  model:'sheets'

 
  }
   
}
};