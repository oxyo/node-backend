
const express = require('express');
const PORT = 3000;
const HOST = '0.0.0.0';
const program = require('commander');
const Database = require('better-sqlite3');
const options = {
		memory: false,
		readonly: false,
		fileMustExist: true

};

const db = new Database('/db/skills.db', options);
const app = express();


app.get('/', function(req, res){
	var skills = getSkills();

	console.log('Command: / Getting Skills list...');
	console.log(skills);

	res.json(skills);
});


app.get('/skills', function(req, res){
	var skills = getSkills();

	console.log('Command: /skills Getting Skills list...');
	console.log(skills);

	res.json(skills);
});


app.get('/skill/:id', function(req, res){

	var sel = req.params.id;

	console.log('Command: /skill/'+sel+' Getting Skill by Id ');
	
	var message = {
		statusCode: 500,
		Error: 'No skill found with current id'
	}

	try {
    	var skill = getSkill(sel);
    	console.log(skill);
		res.json(skill);
	}
	catch(err) {
		console.log(err);
	    res.json(message);
	}

});


app.get('/addskill/:skill', function(req, res){	
	var skill = req.params.skill;
	console.log('Command: /addskill/'+skill+' Creating new skill - '+skill);
	addSkill(skill);
	var message = 'OK';
	res.json(message);
});


app.get('/removeskill/:skill', function(req, res){
	var skill = req.params.skill;
	console.log('Command: /removeskill/'+skill+' Remove skill - '+skill);
	deleteBySkill(skill);
	var message = 'OK';
	res.json(message);
});


app.get('*', function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); 
  err.statusCode = 404;
  err.Error = 'Incorrect url';
  //next(err);
  res.json(err);
});


app.listen(PORT, () => console.log(`Backend listening on http://${HOST}:${PORT}`));




function getSkills(){

	var skillsList = db.prepare('SELECT * FROM skills').all();

	return skillsList;	
}


function getSkill(id){

	var row = db.prepare('SELECT * FROM skills WHERE Id=?').get(id);

	return row.Skill;	
}


function addSkill(skill){
	var rndId = Math.floor(Math.random() * 100) + 1;
	var addSkill = db.prepare('INSERT INTO skills VALUES (NULL, $Skill)');

		addSkill.run({
			
			Skill: skill

		});
}


function deleteById(id){

	var query = 'DELETE FROM skills WHERE Id='+id;
	var deleteRow = db.prepare(query);
	deleteRow.run();
}


function deleteBySkill(skill){

	var query = 'DELETE FROM skills WHERE Skill LIKE "%' + skill + '%"';
	var deleteRow = db.prepare(query);
	deleteRow.run();
}


program
  .version('0.0.1', '-v, --version')
  .option('-d, --display-skills', 'Display Skills')
  .option('-a, --add-skill [skill]', 'Add the specified skill')
  .option('-r, --remove-skill [skill]', 'Remove specified skill')
  .parse(process.argv);


if (program.displayskills) {

	var skills = getSkills();

	console.log('Skills list: ------------------------------------------ ');
	console.log(skills);
}

if (program.addSkill) {

	var skill = program.addSkill;
	addSkill(skill);
	console.log('New skill - '+ skill + ' added successfully');
	var skills = getSkills();
	console.log(skills);
}


if (program.removeSkill) {

	var skill = program.removeSkill;
	deleteBySkill(skill);
	console.log('Skill - '+ skill + ' removed successfully');
	var skills = getSkills();
	console.log(skills);
}





