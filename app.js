const ServerName = "Andecola";
const ServerLink = "http://jevi.ga:3000";
const ServerVersion = "1.0.0";

const moment = require('moment');

const express = require('express');
const app = express();
var apt = new Array();
var prs = new Array();
var stor = new Array();
var ret = {};
//const https = require('https');
const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

var basic = [];
/*
const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
};
*/
app.enable('trust proxy');


app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/reg', (req, res) => {
	if(prs.indexOf(req.query.project) == -1){
		prs.push(req.query.project);
	}
	res.send(String(prs.indexOf(req.query.project)));
	console.log(prs.indexOf(req.query.project));
});

app.get('/', (req, res) => {
	crypto.pbkdf2(req.ip, '궥2s샳3운횥', 4937, 16, 'sha256', (err, key) => {
		basic = [{data:"JVstart"},{data:ServerName},{data:ServerVersion},{data:'['+key.toString('base64')+']'}];
		if(!(stor[req.query._id + '_' + req.query.varName])){
			stor[req.query._id + '_' + req.query.varName] = [];
		}


		if(req.query.cod == "push"){

			stor[req.query._id + '_' + req.query.varName].push({data:'['+key.toString('base64')+']'+req.query.data});

			//console.log(req.query);

		}
		ret._data = stor[req.query._id + '_' + req.query.varName];
		ret.varn = req.query.varName;
		res.send({"result":ret, "basic":basic});
	});
});

var ScriptInst = {
	"1.0":"<script>Entry.block.add_value_to_list.func = function (e,t){var n=t.getField('LIST',t),o=t.getValue('VALUE',t),r=Entry.variableContainer.getList(n,e);return r.array_||(r.array_=[]),r.array_.push({data:o}),$.get('"+ServerLink+"/?cod=push&_id='+Entry.projectId+'&varName='+r.name_+'&data='+o,function(data){}),r.updateView(),t.callReturn()};setInterval(function(){for(var i=0;i<Entry.variableContainer.getListByName('JVset').array_.length;i++){ var cont = Entry.variableContainer.getListByName('JVset');$.get('"+ServerLink+"/?cod=get&_id='+Entry.projectId+'&varName='+cont.array_[i].data,function(_d){Entry.variableContainer.getListByName(_d.result.varn).setArray(_d.basic.concat(_d.result._data));});}},100);</script>",

};

app.get('/install', (req, res) => {
	//res.send("<script>Entry.block.add_value_to_list.func = function (e,t){var n=t.getField('LIST',t),o=t.getValue('VALUE',t),r=Entry.variableContainer.getList(n,e);return r.array_||(r.array_=[]),r.array_.push({data:o}),$.get('"+"https://entjevi.herokuapp.com"+"/?cod=push&_id='+Entry.projectId+'&varName='+r.name_+'&data={'+window.user.username+'}'+o,function(data){}),r.updateView(),t.callReturn()};setInterval(function(){for(var i=0;i<Entry.variableContainer.getListByName('JVset').array_.length;i++){ var cont = Entry.variableContainer.getListByName('JVset');$.get('"+"https://entjevi.herokuapp.com"+"/?cod=get&_id='+Entry.projectId+'&varName='+cont.array_[i].data,function(_d){Entry.variableContainer.getListByName(_d.varn).setArray(_d._data);});}},100);</script>")

	//res.send("setInterval(function() {var vl = Entry.variableContainer;for(var i=0;i<vl.variables_.length;i++){console.log(vl.variables_[i].name_);if(vl.variables_[i].name_ == 'JVup1'){var vala = vl.getVariableByName('JVup1');$.get('http://121.135.2.172:3000/?room=1&data='+vala.value_,	function(data){});	    }	if(vl.variables_[i].name_ == 'JVup2'){		var valb = vl.getVariableByName('JVup2');$.get('http://121.135.2.172:3000/?room=2&data='+valb.value_,	function(data){});	    }	if(vl.variables_[i].name_ == 'JVdn1'){	var valc = vl.getVariableByName('JVdn1');$.get('http://121.135.2.172:3000/?room=1',	function(data){valc.setValue(data)});	    }	if(vl.variables_[i].name_ == 'JVdn2'){	var vald = vl.getVariableByName('JVdn2');$.get('http://121.135.2.172:3000/?room=2',	function(data){vald.setValue(data)});	    }}}, 100);")
 	//res.send("var pr = Entry.projectId;$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVset').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 3){		var upset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');		var dnset = Entry.variableContainer.getListByName('JVset').array_[2].data.split(',');		var up = [String((upset[0]-1)%4+1), String((upset[1]-1)%4+1)];		var dn = [String((dnset[0]-1)%4+1), String((dnset[1]-1)%4+1)];		var vl = Entry.variableContainer;		for(var i=0;i<vl.variables_.length;i++){			if((vl.variables_[i].name_.substr(0, 4) == 'JVup') && (up.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){				console.log(vl.variables_[i].name_);				var vala = vl.getVariableByName(vl.variables_[i].name_);				$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)+'&data='+vala.value_,					function(data){});				}			if((vl.variables_[i].name_.substr(0, 4) == 'JVdn') && (dn.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){				console.log(vl.variables_[i].name_);				var valc = vl.getVariableByName(vl.variables_[i].name_);				$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length),					function(data){valc.setValue(data)});				}		}	}}, 100);});")
 	//res.send("var pr = Entry.projectId;var jevi = 'Jevi v1.0 by Dark';$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVset').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	console.log('Jevi running!');	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 3){			var upset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');			var dnset = Entry.variableContainer.getListByName('JVset').array_[2].data.split(',');			var up = [String((upset[0]-1)%4+1), String((upset[1]-1)%4+1)];			var dn = [String((dnset[0]-1)%4+1), String((dnset[1]-1)%4+1)];			var vl = Entry.variableContainer;			for(var i=0;i<vl.variables_.length;i++){				if((vl.variables_[i].name_.substr(0, 4) == 'JVup') && (up.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var vala = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)+'&data='+vala.value_,						function(data){});					}				if((vl.variables_[i].name_.substr(0, 4) == 'JVdn') && (dn.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var valc = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length),						function(data){valc.setValue(data)});					}			}		}	}, 100);});");
 	//res.send("var pr = Entry.projectId;var jevi = 'Jevi v1.0 by Dark';$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVinfo').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	console.log('Jevi running!');	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 2){			var upset = Entry.variableContainer.getListByName('JVset').array_[0].data.split(',');			var dnset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');			var up = [String(dd*4+(upset[0]-1)%4+1), String(dd*4+(upset[1]-1)%4+1)];			var dn = [String(dd*4+(dnset[0]-1)%4+1), String(dd*4+(dnset[1]-1)%4+1)];			var vl = Entry.variableContainer;			for(var i=0;i<vl.variables_.length;i++){				if((vl.variables_[i].name_.substr(0, 4) == 'JVup') && (up.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var vala = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)+'&data='+vala.value_,						function(data){});					}				if((vl.variables_[i].name_.substr(0, 4) == 'JVdn') && (dn.indexOf(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var valc = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length),						function(data){valc.setValue(data)});					}			}		}	}, 50);});");
 	//res.send("var pr = Entry.projectId;var jevi = 'Jevi v1.0 by Dark';$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVinfo').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	console.log('Jevi running!');	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 2){			var upset = Entry.variableContainer.getListByName('JVset').array_[0].data.split(',');			var dnset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');			var up = [String(dd*4+(upset[0]-1)%4+1), String(dd*4+(upset[1]-1)%4+1)];			var dn = [String(dd*4+(dnset[0]-1)%4+1), String(dd*4+(dnset[1]-1)%4+1)];			var vl = Entry.variableContainer;			for(var i=0;i<vl.variables_.length;i++){				if((vl.variables_[i].name_.substr(0, 4) == 'JVup') && (up.indexOf(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var vala = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))+'&data='+vala.value_,						function(data){});					}				if((vl.variables_[i].name_.substr(0, 4) == 'JVdn') && (dn.indexOf(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))!== -1)){									var valc = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)),						function(data){valc.setValue(data)});					}			}		}	}, 100);});");
 	//res.send("var pr = Entry.projectId;var jevi = 'Jevi v1.0 by Dark';$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVinfo').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	console.log('Jevi running!');	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 2){			var upset = Entry.variableContainer.getListByName('JVset').array_[0].data.split(',');			var dnset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');			var up = [String(dd*4+(upset[0]-1)%4+1), String(dd*4+(upset[1]-1)%4+1)];			var dn = [String(dd*4+(dnset[0]-1)%4+1), String(dd*4+(dnset[1]-1)%4+1)];			var vl = Entry.variableContainer;			for(var i=0;i<vl.variables_.length;i++){				if((vl.variables_[i].name_.substr(0, 4) == 'JVup')  && (up.indexOf(String(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))))!== -1)){									var vala = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))+'&data='+vala.value_,						function(data){});					}				if((vl.variables_[i].name_.substr(0, 4) == 'JVdn')  && (dn.indexOf(String(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))))!== -1)){									var valc = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)),						function(data){valc.setValue(data)});					}			}		}	}, 100);});");
 	//res.send("var pr = Entry.projectId;var jevi = 'Jevi v1.0 by Dark';$.get('http://jevi.ga:3000/reg/?project='+pr, function(dd){	Entry.variableContainer.getListByName('JVinfo').setArray([{data:String(dd*4+1)+','+String(dd*4+2)+','+String(dd*4+3)+','+String(dd*4+4)}]);	console.log('Jevi running!');	setInterval(function() {		if(Entry.variableContainer.getListByName('JVset').array_.length == 2){			var upset = Entry.variableContainer.getListByName('JVset').array_[0].data.split(',');			var dnset = Entry.variableContainer.getListByName('JVset').array_[1].data.split(',');			var up = [String(dd*4+(upset[0]-1)%4+1), String(dd*4+(upset[1]-1)%4+1)];			var dn = [String(dd*4+(dnset[0]-1)%4+1), String(dd*4+(dnset[1]-1)%4+1)];			var vl = Entry.variableContainer;			for(var i=0;i<vl.variables_.length;i++){				if((vl.variables_[i].name_.substr(0, 4) == 'JVup')  && (up.indexOf(String(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))))!== -1)){									var vala = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length)))+'&data='+vala.value_,						function(data){});					}				if((vl.variables_[i].name_.substr(0, 4) == 'JVdn')  && (dn.indexOf(String(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))))!== -1)){									var valc = vl.getVariableByName(vl.variables_[i].name_);					$.get('http://jevi.ga:3000/?room='+(dd*4+Number(vl.variables_[i].name_.substring(4, vl.variables_[i].name_.length))),						function(data){valc.setValue(data)});					}			}		}	}, 100);});");
 	//res.send("<script>Entry.block.add_value_to_list.func = function (e,t){	var n=t.getField('LIST',t),o=t.getValue('VALUE',t),r=Entry.variableContainer.getList(n,e);return r.array_||(r.array_=[]),r.array_.push({data:o}),$.get('http://jevi.ga:3000/?cod=push&_id='+Entry.projectId+'&varName='+r.name_+'&data='+o,function(data){}),r.updateView(),t.callReturn()};setInterval(function(){	for(var i=0;i<Entry.variableContainer.getListByName('JVset').array_.length;i++){		var cont = Entry.variableContainer.getListByName('JVset');		var ni = i;		$.get('http://jevi.ga:3000/?cod=get&_id='+Entry.projectId+'&varName='+cont.array_[ni].data,function(_d){			console.log(ni);			Entry.variableContainer.getListByName(cont.array_[ni].data).setArray(_d);			});	}},100);</script>");
 	res.send(ScriptInst["1.0"]);
 });
app.listen(process.env.PORT || 3000, () => {
	console.log("Jevi start! at "+moment().format()+"\n ServerName : "+ServerName+"\n ServerLink : "+ServerLink+"\n ServerVersion : "+ServerVersion);
});
