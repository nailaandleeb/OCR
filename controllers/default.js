//var PhantomPDF = require('phantom-pdf');
exports.index = function(req , res)
	{
	
		res.json({"status":"error","message":"Make POST requests to /api or POST request to /apidata"});
		
	};
exports.api = function(req , res)
{
	var student=[];
	var subject=[];
	if(req.params.id!='favicon')
	{
	if(( req.params.id=="api" ||req.params.id=="API")){
		console.log(req.body);
		if(req.body.student&& req.body.subject&& req.body.sheet_name&&req.body.sheetid && req.body.class_name&&	
		req.body.section&& req.body.course_name&& req.body.lecturer_name && req.body.Upload_date && req.body.term){
		if(req.body.student.length<1 && req.body.subject.length<1)
					{
					res.json({"status":"warning","file_address":"http://"+app.get('host')+'/_sheets/'+sheet.id+'.pdf',"message":"Array data of both arrays i.e student[{name,id,contactno},....] and subject[string,string,....] is not correct."});
					}
				else if(req.body.student.length<1){
					res.json({"status":"warning","file_address":"http://"+app.get('host')+'/_sheets/'+sheet.id+'.pdf',"message":'Array data of student is not correct. Its format is student=[{name(string), id(string), contactno(string)},..... ]'});
					}
				else if(req.body.subject.length<1){
					res.json({"status":"warning","file_address":"http://"+app.get('host')+'/_sheets/'+sheet.id+'.pdf',"message":'Array data of subject is not correct. Its format is subject=[string,string,......] '});
					}
				else{
		
		var fs = require('fs');
		var pdf = require('html-pdf');
		var qrCode = require('qrcode-npm');
		var obj={
			sheet:req.body.sheetid,
			user:req.body.user
		}
		var text=req.body.sheetid;
		var qr = qrCode.qrcode(4, 'M');
		qr.addData(text);
		qr.make();
		var image= qr.createImgTag(4);
		
		var html='<div style="margin-left:400px; margin-top:20px;">'+
		'<h4 style="text-decoration:underline;">'+req.body.sheet_name+'</h4></div>'+
			'<div style="margin-left:320px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.class_name+'</h4>'+
			'</div>'+
			'<div style="margin-left:480px; margin-top:-42px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.section+'</h4>'+
			'</div>'+
			'<div style="margin-left:580px; margin-top:-42px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.course_name+'</h4>'+
			'</div>'+
			'<div style="margin-left:320px; margin-top:-10px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.lecturer_name+'</h4>'+
			'</div>'+
			'<div style="margin-left:450px; margin-top:-42px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.term+'</h4>'+
			'</div>'+
			'<div style="margin-left:580px; margin-top:-42px;">'+
			'<h4 style="text-decoration:underline;">'+req.body.Upload_date+'</h4>'+
			'</div>'+
			'</div><div style="position:fixed; top:30px; right:40px;">'+image+'</div><br></div>'+
			'<div style="font-size: 30px;   padding-bottom:60px;">'+
			' <!--padding between table and description-portion--></div> '+
			'<div style="font-size: 30px; margin-left:240px; margin-bottom:-35px;">&#x25CF;'+
			'</div>  <div style="font-size: 30px; margin-left:290px; margin-bottom:-35px;">&#x25CF;</div>'+
			' <div style="font-size: 30px; margin-left:340px; margin-bottom:-35px;">&#x25CF;</div> '+
			' <div style="font-size: 30px; margin-left:392px; margin-bottom:-35px;">&#x25CF;</div> '+
			' <div style="font-size: 30px; margin-left:444px; margin-bottom:-35px;">&#x25CF;</div> '+
			' <div style="font-size: 30px; margin-left:498px; margin-bottom:-35px;">&#x25CF;</div> '+
			'<div style="font-size: 30px; margin-left:545px; margin-bottom:-35px;">&#x25CF;</div>  '+
			'<div style="font-size: 30px; margin-left:595px; margin-bottom:-35px;">&#x25CF;</div> '+
			'<div style="font-size: 30px; margin-left:649px; margin-bottom:-35px;">&#x25CF;</div>'+
			' <div style="font-size: 30px; margin-left:698px; margin-bottom:-35px;">&#x25CF;</div> '+
			'<div style="font-size: 30px;margin-left:747px; margin-bottom:-35px;">&#x25CF;</div> '+
			'<div style="font-size: 30px; margin-left:797px; margin-bottom:-36px;">&#x25CF;</div> '+
			'<div style="font-size: 30px; margin-left:850px; margin-bottom:-34.5px;">&#x25CF;</div>'+
			' <div style=" margin-left:903px; margin-bottom:-34px;"><div style="font-size: 30px;">&#x25CF;</div> '+
			'</div>  <div style="margin-left:955px; margin-bottom:-8px;  ">  <div style="font-size: 30px;">&#x25CF;</div></div>'+
			'<!--end of vertical circle--> '+
			'<div style=" float:left; margin-top:10px;"> <div style="font-size: 30px; margin-bottom:5px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:10px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:9px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:8px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:6px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:6px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:6px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px;margin-bottom:7px; ">&#x25CF;</div> '+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px;">&#x25CF;</div>'+
			'<div style="font-size:30px;margin-bottom:8px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px;margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px;margin-bottom:7px;  ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:6px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px;margin-bottom:7px; ">&#x25CF;</div> '+
			'<div style="font-size: 30px;margin-bottom:7px;  ">&#x25CF;</div>'+
			'<div style="font-size: 30px;margin-bottom:7px; ">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px;">&#x25CF;</div>'+
			'<div style="font-size: 30px; margin-bottom:7px; ">&#x25CF;</div> '+
			'<div style="font-size: 30px;margin-bottom:7px; ">&#x25CF;</div></div>'+
			'<table border="1" cellpadding="0" cellspacing="0"style="margin-left:17px;	margin-top:5px"><tr><th style="font-size: 14px;">'+
			'<center>Sr</center></th><th  style="font-size: 14px;"><center>NAME</center></th><th  style="font-size: 14px;"><center>ID</center>'+
			'</th>'
			for(var j=0;j<req.body.subject.length;j++){
			if(req.body.subject[j])
			html+='<td style="font-size: 8px;"><center>'+req.body.subject[j].substr(0,5)+'<center></td> ';
			else
			html+='<th ><center><center></th> ';
			}
			 html+='</tr><tbody><th></th><th></th><th></th>';
			 for(var c=0;c<req.body.subject.length;c++){
			 html+='<th style="  width:50px; height:40px; font-size:8px;">';
			 }
			 
			/*'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th>'+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th>'+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th> '+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th> '+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th> '+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th> '+
			'<th style="  width:45px; height:40px; font-size:15px;"></th> <th style="  width:45px; height:40px; font-size:15px;"></th> '+
			'<th style="  width:45px; height:40px; font-size:15px;"></th>  ';			
		 */	var std_name="",std_id="";
			for(var i=1;i<=req.body.student.length && i<=25;i++)
			{
				if(req.body.student[i-1])
				{
					std_name=req.body.student[i-1].name;
					std_id=req.body.student[i-1].ID;
				}
				else
				{
					std_name=" ";
					std_id=" ";
				}
				html+='<tr ><td class="sr" align="center">'+i+'</td><td>'+
				'<input style="width: 100px;   height:40px;text-align: center;color:black;" type="text" value="'+std_name+'" placeholder="Enter name" /></td>'+
				
				'<td><input type="text" value="'+std_id+'" placeholder="Enter id" style="width: 100px;  height:40px; text-align: center;color:black;"/></td>';
				for(var c=0;c<req.body.subject.length;c++){
					html+='<td style="  width:45px; height:40px;font-size:15px;"></td>';
				}
			/* 	'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td>'+
				'<td style="  width:45px; height:40px;font-size:15px;"></td>'+
				 '<td style="  width:45px; height:40px;font-size:15px;"></td><td style="  width:45px; height:40px;font-size:15px;"></td></tr>';
		 */	}
			
			html+='<tr ><td  align="center"></td><td style="  width:45px; height:53px; font-size:15px;"></td> '+
			' <td style="  width:45px; height:53px; font-size:15px;"></td>'
				for(var c=0;c<req.body.subject.length;c++){
					html+=' <td style="  width:45px; height:40px; font-size:15px;"></td>';
				}
		/* 	' <td style="  width:45px; height:40px; font-size:15px;"></td>  <td style="  width:45px; height:40px; font-size:15px;"></td>  '+
			'<td style="  width:45px; height:40px; font-size:15px;"></td> <td style="  width:45px; height:40px; font-size:15px;"></td>  '+
			'<td style="  width:45px; height:40px; font-size:15px;"></td>  <td style="  width:45px; height:40px; font-size:15px;"></td>  '+
			'<td style="  width:45px; height:40px; font-size:15px;"></td>  <td style="  width:45px; height:40px; font-size:15px;"></td>  '+
			'<td style="  width:45px; height:40px; font-size:15px;"></td>  <td style="  width:45px; height:40px; font-size:15px;"></td>  '+
			'<td style="  width:45px; height:40px; font-size:15px;"></td>  <td style="  width:45px; height:40px; font-size:15px;"></td> */
			html+='</tr></tbody></table> '+
			'<!-- END DATATABLE EXPORT -->   </div>    </div></div></div>  </body></html>';
		var options =   {
                format: 'A4',
                orientation: 'portrait',
               height:'13.5in',
                type: 'pdf'
               
           };
		
		pdf.create(html, options).toFile('sheets/_sheets/'+req.body.sheet_name+req.body.sheetid+'.pdf', function(err, result) {
		 	if(result)
			{
				console.log("\nPdf Created on path : "+JSON.stringify(result));
						res.json({"status":"success","file_address":"http://"+app.get('host')+'/API/sheets/_sheets/'+req.body.sheet_name+req.body.sheetid+'.pdf',"message":""});
			
			}
			else
			{
				console.log(err);
				res.json({"status":"error"});
			}
		});
		};
		//})
		}
		else
		{
			res.json({"status":"error","message":'give data i.e student, subject, sheet_name, class_name, section, course_name,'+
			' lecturer_name, institute_name & Upload_date. EXAMPLE: /api?sheet_name=mini&class_name=Nursury and so on give all information'});
		}

		}
		else
		{
			res.json({"status":"error","message":"Make POST request to /api with data i.e /api?sheet_name=mini&class_name=Nursury etc"});
		}
		
	}
	
};

//go one page back in browser
exports.create=function(req,res){
	/*  try {
        //var data=JSON.parse(req.body.array_android);
		var data=Qs.parse(req.body,{ plainObjects: true });
		//var data=req.body.array_android;
		res.json({error:null,data:data});
		
    } catch(e) {
        res.json({error:e,data:null});
    } */}
exports.new=function(req,res){
console.log("Default New function");
	res.send('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>'+
	'<script type="text/javascript">$(document).ready(function (){$("#btn392").click(function(){   document.getElementById("div391").innerHTML=""; '+
	'           var url = document.getElementById("link").value;var success = function(data){var html = [];data = $.parseJSON(data);'+
	'html.push("Status : ", data.status, ", <br>","message : ", data.message, ", <br>", "file_address : <a download href=\'"+data.file_address+"\'>",'+
	' data.file_address, "</a><br>");$("#div391").html(html.join("")).css("background-color", "orange");};'+
	'$.ajax({type: "GET",    url: url,data:{todo:"jsonp"},dataType: "jsonp",crossDomain: true,    '+
	'      cache:false, success: success,error:function(jqXHR, textStatus, errorThrown)'+
	'{alert("error... This site have not returned data");}});});});</script><a name="#jsonp-ajax">'+
	'</a><div id="example-section39">    <div>Check API</div><input type="text" name="link" id="link" value="http://api-alriaz.rhcloud.com" style="width:80%; '+
	'height:30px;"/><br><button id="btn392" type="button">Make Request</button><div id="div391"></div></div>');
}