{
/////////
// Have some configuration options.
// Have some global variables.
/////////
var BOTTLE_SIZE = 750; // A standard bottle of wine is 750ml
var SHOT_SIZE = 1.5; // An American shot is 1.5oz
var ML_PER_OZ = 29.5735; // ML to OZ conversion factor
var elapsed = 0; // The amount of integer minutes that have passed.

/////////
// Set up a minutely timer.
/////////
window.addEvent('domready', function(){
	setInterval(update(), 1000);
});

/////////
// I would imagine that this is where the magic would happen
/////////
function update(){
	elapesed++; // A minute has passed
	drinkNow(); // Tell the user it's time to drink.
	updateUI(); // Show the new data
	countdown(); // start a new countdown.
}

/////////
// Returns the number of bottles consumed based
// on the number of shots provided.
/////////
function toBottles(shots){
	return toML(shots) / BOTTLE_SIZE;
}

/////////
// Returns the ml consumed based on the number
// of shots provided
/////////
function toMl(shots){
	return shots * ML_PER_OZ;
}

/////////
// Triggers UI sequences to indicate that it's time to drink.
// Perhaps change background color? Play some crazy sounds?
/////////
function drinknow(){
	backFlash(); 

}


/////////
// Updates all of the UI elements.
/////////
function updateUI(){

}	

/////////
// Manages the countdown UI elements.
// When it is called, the countdown label is set to 60 and begins counting to 0
/////////
function countdown(){

}

/////////
// Rearranges UI elements to troll the drunks. 
// Elapsed time is passed in to gauge how much trolling to do.
/////////
function troll(elapsed){

}

/////////
// Changes the background color. 
// Used as a visual alert.
/////////
function backFlash(){
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.body.style.background = color;

}

}