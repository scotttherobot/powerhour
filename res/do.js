{
/////////
// Have some configuration options.
// Have some global variables.
/////////
var BOTTLE_SIZE = 750; // A standard bottle of wine is 750ml
var SHOT_SIZE = 1.5; // An American shot is 1.5oz
var ML_PER_OZ = 29.5735; // ML to OZ conversion factor
var min_elapsed = 0; // The amount of integer minutes that have passed.
var interval = 5; // The interval to count down from, in seconds.
var countdown = interval; // Counting down from 60
var players = 1; // Default to one player.
var paused = 1; // Start with the timer not going


/////////
// Set up a minutely timer.
/////////
window.addEvent('domready', function(){

	$('overlay').hide();
	$('status').addEvent('click', function(){
		if(paused){
			paused = 0;
			updateUI();
			$('player').playVideo();
		}
		else{
			paused = 1;
			updateUI();
			$('player').pauseVideo();
		}
	});
	$('interval').addEvent('click', function(){
		if(interval == 5){
			interval = 60;
		}
		else if(interval == 60){
			interval = 90;
		}
		else if(interval == 90){
			interval = 120;
		}
		else if(interval == 120){
			interval = 5;
		}
		countdown = interval;
		updateUI();
	});

	updateUI();
	setInterval(function(){update()},1000); // A second has passed. Update the countdown.
	youTube();
});

/////////
// I would imagine that this is where the magic would happen.
/////////
function update(){
	if(!paused){
		if (!countdown){ // a minute has passed if the countdown is zero
			min_elapsed++; 
			countdown = interval;
			drinkNow(); // Tell the user it's time to drink.
			$('player').nextVideo(); // Load the next video in the playlist.
		}
		else{
			countdown--;
		}
	}
	updateUI(); // Show the new data
	
	//console.log(countdown);
}

/////////
// Returns the number of bottles consumed based
// on the number of shots provided.
/////////
function toBottles(shots){
	return toMl(shots) / BOTTLE_SIZE;
}

/////////
// Returns the ml consumed based on the number
// of shots provided
/////////
function toMl(shots){
	return toOz(shots) * ML_PER_OZ;
}

/////////
// Returns the OZ consumed based on the number
// of shots provided
/////////
function toOz(shots){
	return shots * SHOT_SIZE;
}

/////////
// Triggers UI sequences to indicate that it's time to drink.
// Perhaps change background color? Play some crazy sounds?
/////////
function drinkNow(){
	// Do a bunch of stuff here.
	// Change the background color
	backFlash(); 
	// Show the "drink now" message
	$('overlay').setStyle('color', '#'+Math.floor(Math.random()*16777215).toString(16));
	$('overlay').show();
	setTimeout(function(){$('overlay').hide()},250);
	// Now play a sound or something
	// Now change the song the chromeless player is playing

}


/////////
// Updates all of the UI elements.
/////////
function updateUI(){
	$('timer').innerText = countdown;
	$('shots').innerText = min_elapsed;
	$('bottles').innerText = toBottles(min_elapsed);
	$('ml').innerText = toMl(min_elapsed);
	$('oz').innerText = toOz(min_elapsed);
	if(paused){
		$('status').innerText = 'Game Paused.';
		$('status').setStyle('color', '#'+Math.floor(Math.random()*16777215).toString(16));
	}
	else{
		$('status').innerText = 'Game In Progress!';
	}
	$('interval').innerText = 'Game interval is ' + interval + ' seconds. Click to change.';
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

function youTube(){
	var params = { allowScriptAccess: "always" };
    var atts = { id: "player" };
    swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3",
                       "player", "425", "356", "8", null, null, params, atts);
}
function onYouTubePlayerReady(playerId) {
      //
      $('player').cuePlaylist({listType:'playlist',
      						   list:'PL2BD59BDF0A7B72F3',
      						   index: 0,
      						   startSeconds: 0,
      						   suggestedQuality: 'default'});	
}
}