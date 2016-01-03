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
		//console.log(b);
		var at=[];
			var report=[];	
			var rep=[];
		 			    for(var a in b){
						   (function(a){ 
						  	   at=[];
						 for(var i in arr[b[a]]){
							(function(i){ 
							at.push({attendence:arr[b[a]][i].attendence});
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
	//console.log(st);
		var rep={};
		var std=req.body.student;
		for(var s in req.body.student){
			(function(s){
				if(std[s].ID==st){
					//console.log(std[s].ID);
				 rep={
									"student":std[s],
									"att":at
									};
									console.log("\n\nbefore returning");
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
	var image1= filter.binarize(image);
	//creating three copies of an image
 	var image2=new dv.Image(image1);
	var image3=new dv.Image(image1);
	var image4=new dv.Image(image1);
	var copy={
		"x":0,
        "y":0,
        "width": image4.width,
        "height":55
	}
	var copy1={
		"x":image4.width-61,
        "y":0,
        "width": 61,
        "height":image4.height
	}
	var copy2={
		"x":0,
        "y":165,
        "width": image4.width,
        "height":image4.height-165
	}
	//clearing upper portion of image including qrcode,only table remains
	image4.clearBox(copy);
	image4.clearBox(copy1);
	image4.clearBox(copy2);
	//using library to extract data from image source(https://github.com/creatale/node-fv)
	var fr= new fv.FormReader('eng',image4);
	var form1 =fr.find();
	var refcircle= form1.toObject();
	//redaing qrcode form original image
	var qr=new dv.ZXing(image);
	qr.tryHarder=true;
	var data=qr.findCode();
	console.log(data);
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
	console.log(result);
	//getting horizontal circles
	 
	for(var i=0;i<result.length-1;i++){
	var obj=result[i];
	//console.log(obj);
	 box={
		"x":obj.box.x,
        "y":obj.box.y,
        "width": obj.box.width,
        "height":obj.box.height
	
	}
	var crop2=image2.crop(box);
	}
	
	 
	 //clearing everything except vertical circles
	   var box3={
		"x":0,
        "y":0,
		"width": image1.width,
        "height":refcircle.checkboxes[0].box.y+(refcircle.checkboxes[0].box.height+1)
	}
	var box2={
		"x":refcircle.checkboxes[0].box.x+(refcircle.checkboxes[0].box.width/2),
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
	var crop3=image3.crop(b3);
	 } 
	var counter=0;
	var txt1=[];
	var txt3=[];
	/* ***************** */
	/* till here we have croped an image means every cell of table is cropped */
	/* ***************** */
				// //////Saving Attendence////// 
				 // croping attendence 
				/* console.log(req.body.lecture);
				 console.log(req.body.student.length);
				 console.log(req.body.lecture.length);*/
	for(var l=0;l<req.body.subject.length;l++){
	counter++;
	var col1={
	'x':result[l].box.x+(result[l].box.width/2),
	'y':res.checkboxes[1].box.y+(res.checkboxes[1].box.width/2),
	'width':86,
	'height':55
	}
	var col2={
	'x':result[l].box.x+(result[l].box.width/2),
	'y':res.checkboxes[req.body.student.length+2].box.y+(res.checkboxes[req.body.student.length+2].box.width/2),
	'width':86,
	'height':123
	}
	/* code to read text(OCR) this reads integers but upto maximum 50% accuracy*/
	var temp2=image1.crop(col2);
	var txt2=new dv.Tesseract('eng',temp2);
	fs.writeFileSync('sheets/temp2'+l+'.jpg',image3.toBuffer('jpg'))

	txt3[l]=txt2.findText('plain',true);
	var temp=image1.crop(col1);
	fs.writeFileSync('sheets/temp'+l+'.jpg',image3.toBuffer('jpg'))

	var txt=new dv.Tesseract('eng',temp);
	 txt1[l]=txt.findText('plain',true);
	}
	/* ************ */
	var attendence=[];
	counter=0;
	for(var l=0;l<req.body.subject.length;l++){
	for(var s=0;s<req.body.student.length;s++){
			counter++;
	var col={
	'x':result[l].box.x+(result[l].box.width/2),
	'y':res.checkboxes[s+2].box.y+(res.checkboxes[s+2].box.width/2),
	'width':86,
	'height':55
	}
	/* code for OMR same as OCR but here we just read mark on the basis of confidence value given by this library.
		confidence value tells that whether selected image (which is one cell of table) is empty or have any mark inside it.
	*/
	var coloumn=image1.crop(col);
	fs.writeFileSync('sheets/coloumns'+counter+'.jpg',image3.toBuffer('jpg'))

	var txt=new dv.Tesseract('eng',coloumn);
	var att=txt.findText('plain',true);
			//if(txt1[l].text=='' && txt1[l].confidence==0){
				if(att.text!='' && att.confidence>0){
				  
				  attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,attendence:att.text});
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
				}
				}
				else{
					
					attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,attendence:0});
				  
				if(s==req.body.student.length-1 && l==req.body.subject.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
				}
					
				}
			//}
			/*else{
				if(att.text!='' && att.confidence>0){
				 attendence.push({student_id:req.body.student[s].ID,subject_id:req.body.subject[l]
				  ,attendence:'A'});
				 
				if(s==req.body.student.length-1 && l==req.body.lecture.length-1){
						formatAttendence(req.body.sheetid,attendence,txt3,txt1,resp,req);
						 
				}
				}
				else{
				attendence.push({student_id:req.body.student[s].ID,lecture_id:req.body.lecture[l]
				  ,attendence:'P'});
				  
				if(s==req.body.student.length-1 && l==req.body.lecture.length-1){
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

