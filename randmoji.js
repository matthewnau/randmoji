const bitmoji = require('./bitmoji.json');
const comics = require('./comics.json');

function randInt(max) {
	return Math.floor(Math.random() * max);
}

function jLen(object) {
	return Object.keys(object).length;
}

function randBitmoji(sex) {
	let pd2 = [];
	let colours = [];
	let body = [];
	let url = '';
	url += 'https://render.bitstrips.com//render/';
	url += comics.imoji[randInt(comics.imoji.length)].comic_id;
	url += '/316830037_16_s4-v1.png?'

	//get all JSON elements
	for (var i = 0; i < jLen(bitmoji[sex]); i++) {
		let counter = Object.keys(bitmoji[sex])[i];
		if (typeof bitmoji[sex][counter] === 'object') {
			let attribute = JSON.stringify(bitmoji[sex][counter][randInt(bitmoji[sex][counter].length)]);
			pd2.push(attribute.substr(1,attribute.length-2));
		}
	}

	let build = JSON.stringify(bitmoji[sex]['build'][randInt(jLen(bitmoji[sex]['build']))]);
	body.push(build.substr(1,build.length-2));

	for (var i = 0; i < jLen(bitmoji[sex]['colors']); i++) {
		let color = '"'+bitmoji[sex]['colors'][i][Object.keys(bitmoji[sex]['colors'][i])[0]];
		color += '":' + randInt(16777216);
		colours.push(color);
	}

	//remove the JSON elements not related to pd2
	if (sex === 'male') {
		pd2 = pd2.slice(0,pd2.length-4);
	}
	else {
		pd2 = pd2.slice(0,pd2.length-5);
		let chestSize = JSON.stringify(bitmoji[sex]['chestSize'][randInt(jLen(bitmoji[sex]['chestSize']))]);
		body.push(chestSize.substr(1,chestSize.length-2));
	}

	url += 'pd2={'+pd2+'}&colours={'+colours+'}&body={'+body+'}&sex='+bitmoji[sex]['sex'];
	url += '&outfit='+bitmoji[sex]['outfit'][randInt(bitmoji[sex]['outfit'].length)];
	url += '&proportion='+bitmoji[sex]['proportion'][randInt(bitmoji[sex]['proportion'].length)];
	url += '&cropped="body"&scale=3&style=4'

	return url;
}