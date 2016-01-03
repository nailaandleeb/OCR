module.exports = {

  identity: 'attendence',
  
connection: 'mysqlDB',
  schema:true,
  migrate: 'safe',

  
  attributes: {
  attendence:'string',
  sheet:{
	  columnName:'sheet_id',
	  model:'sheets'
  },
  
  lecture:{
	  columnName:'lec_id',
	  model:'lectures'
  },
  
  student:{
	  columnName:'student_id',
	  model:'students'
  }

 
  }
   
};
