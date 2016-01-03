module.exports = {

  identity: 'students',
  
  connection: 'mysqlDB',
  schema:true,
  migrate: 'safe',

  
  attributes: {
  name: 'string',
  rollno: 'string',
  contactno:'string',
  
  sheet:{
	  columnName:'sheet_id',
	  model:'sheets'
  },
  att:{
	  collection:"attendence",
	  via:"student"
  }
 
  }   
};
