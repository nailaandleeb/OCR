exports.index=function(req,res){
	console.log("\n\n***********************\napidata index");
	
	if(req.body){
	apidata(req,res);
	}
	else{
			res.json({"status":"error","message":"Make post requests to /apidata with image=(base64 image data)"});
		}
	}
var fs=require("fs");
var _=require("underscore");
var formatAttendence=function(sheet,att,txt,txt2,res,req){
	var arr=_.groupBy(att,'student_id');
	var b=Object.keys(arr);
	//console.log(arr);
	var at=[];
	var report=[];	
	var rep=[];
 			    for(var a in b){
				   (function(a){ 
				  	   at=[];
				 for(var i in arr[b[a]]){
					(function(i){ 
					at.push({marks:arr[b[a]][i].marks.replace(/(\r\n|\n|\r)/gm,""),subject:arr[b[a]][i].subject_id});
					var st=arr[b[a]][i].student_id;
					if(i==arr[b[a]].length-1){
					stud(at,st,req,function(r){
					//console.log("\n\nCAll back************");
					rep.push(r);
					if(a==b.length-1 && i==arr[b[a]].length-1){
								if(req.query.callback)
								{
									res.send(req.query.callback+'(\'{status:"success",report:'+rep+',sheet_id:'+sheet+',last:'+txt+',first:'+txt2+'}\')');
								}
								else{
									res.json({status:"success",report:rep,sheet_id:sheet,last:txt,first:txt2});
								}						
								}
					});
					
					}
				}(i));
				}
			}(a));
			} 
  }
 function stud(at,st,req,next){
		//console.log(at);
	var rep={};
	var std=req.body.student;
	for(var s in req.body.student){
		(function(s){
			if(std[s].ID==st){
				//console.log(std[s].ID);


			 rep={
								"student":std[s],
								"att":at//.replace(/(\r\n|\n|\r)/gm,"")
								};
								//console.log("\n\nbefore returning");
								//console.log(rep);
								//next(rep);
							}
							if(s==req.body.student.length-1){
								next(rep);
							}
		}(s));
	}

    }
exports.create=function(req,res){
	//apidata(req,res);
	 upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }else{
				console.log({error_code:0,err_desc:null});
				apidata(req,res);
         }
        }) 
    };
//OCR + OMR code in this section  source:(https://github.com/creatale/node-dv)
function apidata(req,resp){
  try{
 	var im=fs.readFileSync('./files/image.jpg');
	var image = new dv.Image('jpg',im);

	var filter = fv.filters;
	var image1= filter.binarize(image);//convert image to black n white
	//fs.writeFileSync('sheets/image1.jpg',image1.toBuffer('jpg'))
	
	//creating three copies of an image
 	var image2=new dv.Image(image1);
	var image3=new dv.Image(image1);
	var image4=new dv.Image(image1);
	var copy={//clear portion above vertical circles
		"x":0,
        "y":0,
        "width": image4.width,
        "height":65
	}
	var copy1={//clear right most portion including bottom right circle of some pdfs
		"x":image4.width-65,
        "y":0,
        "width": 61,
        "height":image4.height
	}
	var copy2={//clear portion below qrcode
		"x":0,
        "y":465,
        "width": image4.width,
        "height":image4.height-165
	}
	image4.clearBox(copy);
	image4.clearBox(copy1);
	image4.clearBox(copy2);
	fs.writeFileSync('sheets/image4.jpg',image4.toBuffer('jpg'))
	 var fr= new fv.FormReader('eng',image4);
	var form1 =fr.find();
	var refcircle= form1.toObject();
	//reading qrcode form original image
	var qr=new dv.ZXing(image);
	qr.tryHarder=true;
	var data=qr.findCode();
	//console.log(data);
	//clearing qrcode portion
	 var qryup={
		"x":0,
        "y":0,
        "width": image1.width,
        "height":data.points[0].y+40
	}
	image2.clearBox(qryup);
	//fs.writeFileSync('sheets/image2(i).jpg',image2.toBuffer('jpg'))

	//clearing whole portion except horizontal circles)
	  var qrdown={
		"x":0,
        "y":data.points[0].y+145,
        "width": image1.width,
        "height":image1.height-data.points[0].y
	}
	image2.clearBox(qrdown);
	//var or=image1.crop(image2);
	fs.writeFileSync('sheets/image2.jpg',image2.toBuffer('jpg'));

	var fr= new fv.FormReader('eng',image2);
	var form =fr.find();
	var result= form.toObject();

	//console.log(result);
	//getting horizontal circles
	 
	for(var i=0;i<result.checkboxes.length-1;i++){
	var obj=result.checkboxes[i];
	//console.log(obj);
	 box={
		"x":obj.box.x,
        "y":obj.box.y,
        "width": obj.box.width,
        "height":obj.box.height
	
	}
	var crop2=image2.crop(box);
//fs.writeFileSync('sheets/image2('+i+').jpg',crop2.toBuffer('jpg'))
	//got number of total lectures
	}


//using library to extract data from image source(https://github.com/creatale/node-fv)
	var fr= new fv.FormReader('eng',image4);
	var form1 =fr.find();
	var refcircle= form1.toObject();
	//console.log(image4.width);
	//console.log(image4.height);
	//console.log(refcircle.checkboxes);
	 //clearing everything except vertical circles
	   var box3={
		"x":0,
        "y":0,
		"width": image1.width,
        "height":refcircle.checkboxes[0].box.y+(refcircle.checkboxes[0].box.height+1)
	}
	var box2={
		"x":image4.width-(image4.width-65),//refcircle.checkboxes[0].box.x+(refcircle.checkboxes[0].box.width/2),
		"y":0,
        "width": image1.width,
        "height":image1.height
	} 
	image3.clearBox(box2);
	image3.clearBox(box3);
	fs.writeFileSync('sheets/image3.jpg',image3.toBuffer('jpg'))
	
	var fr= new fv.FormReader('eng',image3);
    var form =fr.find();
	var res= form.toObject();
	//getting vertical circles
	 for(var i=0;i<res.checkboxes.length;i++){
	var obj=res.checkboxes[i];
	 b3={
			"x":obj.box.x,
        "y":obj.box.y,
        "width": obj.box.width,
        "height":obj.box.height
	}
	//var crop3=image3.crop(b3);
	//fs.writeFileSync('sheets/image3('+i+').jpg',crop3.toBuffer('jpg'))
	 } 
	var counter=0;
	var txt1=[];
	var txt3=[];
	// ***************** 
	//res=students
	//result=lectures
				// //////Saving Attendence////// 
				 // croping result (subject wise)
	/*for(var l=0;l<req.body.subject.length;l++){
	counter++;
	var col1={
	'x':result.checkboxes[l].box.x+(result.checkboxes[l].box.width-700),
	'y':res.checkboxes[0].box.y+(res.checkboxes[0].box.width/2),
	'width':95,
	'height':75
	}
	var temp=image1.crop(col1);
	//fs.writeFileSync('sheets/col1'+counter+'.jpg',temp.toBuffer('jpg'));
	
	var col2={
	'x':result.checkboxes[l].box.x+(result.checkboxes[l].box.width-700),
	'y':res.checkboxes[req.body.student.length+2].box.y+(res.checkboxes[req.body.student.length+2].box.width/2)+15,
	'width':95,
	'height':75
	}
	var temp2=image1.crop(col2);
	//fs.writeFileSync('sheets/col2'+counter+'.jpg',temp2.toBuffer('jpg'));

	var txt2=new dv.Tesseract('eng',temp2);
	txt3[l]=txt2.findText('plain',true);
	var txt=new dv.Tesseract('eng',temp);
	txt1[l]=txt.findText('plain',true);
	}
*/	// ************ 
fs.writeFileSync('sheets/image1.jpg',image1.toBuffer('jpg'));	 

	var attendence=[];
	counter=0;
	for(var l=0;l<req.body.subject.length;l++){
	for(var s=0;s<req.body.student.length;s++){
			counter++;
	var col={
	'x':result.checkboxes[l].box.x+(result.checkboxes[l].box.width/2),
	'y':res.checkboxes[s+1].box.y+(res.checkboxes[s+1].box.width/2),
	'width':95,
	'height':75
	}
	var coloumn=image1.crop(col);
	var txt=new dv.Tesseract('eng',coloumn);
	var att=txt.findText('plain',true);
	//console.log(att);
	fs.writeFileSync('sheets/img'+counter+'.jpg',coloumn.toBuffer('jpg'));
	
		//console.log(att);
			//if(txt1[l].text=='' && txt1[l].confidence==0){
				if(att.text!='' && att.confidence>0){
				  
				  attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,marks:att.text});
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
				}
				}
				else{
					
					attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,marks:'0'});
				  
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
				}
					
				}
		/*	}
	
	
			else{
				if(att.text!='' && att.confidence>0){
				 attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,attendence:att.text});
				 
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
						 
				}
				}
				else{
				attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,attendence:att.text});
				  
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
						
				}
				}
	}*/
	 }
	}
			// //////End Saving Attendence////// 
		}	
	 catch(e){
	console.log(e);
		resp.json({"status":"error","message":"Format of Image file is not correct"});
	}; 
}
 
exports.show=function(req,res){
	res.send("apidata show");
}

