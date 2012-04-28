/*
	Megaphone by Logan Wilkerson
*/
(function(window){
	var Megaphone = function(src, data){
		this.init(src, data);
	}
	
	var proto = Megaphone.prototype;
	proto.audio;
	proto.data;
	proto.loaded = false;
	proto.pauseID;
	
	proto.init = function(src, data){
		this.audio = new Audio();
		this.audio.mp = this;
		this.data = data;
		this.audio.play();
		this.audio.pause();
		this.audio.addEventListener('canplaythrough',
			function(){this.mp.loaded = true;},
			false);
		this.audio.src = src;
	}
	
	proto.play = function(sound, volume){
		// Set Default values
		volume = typeof volume !== 'undefined' ? volume : 1;
		
		// If no sound data exists do nothing
		if(typeof this.data[sound] === 'undefined')
			return;
		
		// Clear the previous pause function
		clearTimeout(this.pauseID);
		
		// Get start time and length
		var start = this.data[sound]['start'];
		var length = this.data[sound]['length'];
		
		// Attempt to play the sounds. If the sound
		// Check to see if it is loaded. If not
		// wait and play, otherwise do nothing.
		try{
			this.audio.currentTime = start;
			this.audio.volume = volume;
			this.audio.play();
			this.pauseID = setTimeout(function(mp){
				mp.audio.pause();
			}, length*1000,
				this
			);
		} catch(err){
			if(!this.loaded)
				this.waitAndPlay(sound, volume);
		}
	}
	
	proto.waitAndPlay = function(sound, volume, mp){
		volume = typeof volume !== 'undefined' ? volume : 1;
		mp = typeof mp !== 'undefined' ? mp : this;
		if(mp.loaded)
			mp.play(sound, volume);
		else
			setTimeout(mp.waitAndPlay, 50, sound, volume, mp);
	}
	
	proto.pause = function(){
		// Clear the previous pause function
		clearTimeout(this.pauseID);
		this.audio.pause();
	}


	window.Megaphone = Megaphone;
}(window));