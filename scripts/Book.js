/*
	Book.js 
	Title: A Day at the Circus
	Authors: Logan Wilkerson & Cameron Blashka
	We'd like to give a huge thanks to Taylor Young who drew
	all of the following images:
	Ringleader, Clown, Firebreather/fire, Strongman + Game,
	Elephant, Cannon+Cannonman, lion, and band.
	The remaining images are from Open Clip Art and the bg 
	was commandeered from google images.
*/
(function(window){
	var Book = function(stage){
		this.init(stage);
	}
	
	var p = Book.prototype;
	var book;
	
	p.stage;
	p.resourcesLoaded = 0;
	p.totalResources = 18;
	p.allResourcesLoaded = false;
	p.curPage = 0;
	
	//Sounds
	p.megaphone;
	p.data = {
		'page1narr' : {
			'start'  : 0,
			'length' : 6.5
		},
		'page2narr' : {
			'start'  : 7,
			'length' : 4.5
		},
		'page3narr' : {
			'start'  : 12,
			'length' : 4.5
		},
		'page4narr' : {
			'start'  : 17,
			'length' : 5.5
		},
		'page5narr' : {
			'start'  : 23,
			'length' : 4
		},
		'page6narr' : {
			'start'  : 28,
			'length' : 4
		},
		'page7narr' : {
			'start'  : 33,
			'length' : 3.5
		},
		'ringleader' : {
			'start'  : 37,
			'length' : 4
		},
		'honk' :{
			'start'  : 41,
			'length' : 1
		},
		'fireball' : {
			'start'  : 43,
			'length' : 2.5
		},
		'grunt1' : {
			'start'  : 46,
			'length' : 1.5
		},
		'grunt2' : {
			'start'  : 48,
			'length' : 2.5
		},
		'ding' : {
			'start'  : 51,
			'length' : 6.5 
		},
		'lion' : {
			'start'  : 58,
			'length' : 3.5
		},
		'elephant' : {
			'start'  : 62,
			'length' : 2
		},
		'band1' : { 
			'start'  : 65,
			'length' : 7.5
		},
		'band2' : {
			'start'  : 73,
			'length' : 7.5
		},
		'cannonfire' : {
			'start'  : 81,
			'length' : 2.5
		},
		'cannonyell' : {
			'start'  : 84,
			'length' : 1.5
		}
	};
		
	//Images
	p.ringLeader = new Image();
	p.start_button = new Image();
	p.leftArrow_image = new Image();
	p.rightArrow_image = new Image();
	p.circus_background = new Image();
	p.clown = new Image();
	p.firebreather = new Image();
	p.fireImage = new Image();
	p.waterImage = new Image();
	p.elephant = new Image();
	p.lion = new Image();
	p.game = new Image();
	p.gameding = new Image();
	p.strongman = new Image();
	p.band = new Image();
	p.cannon = new Image();
	p.cannonman = new Image();
	p.smoke = new Image();
	p.note = new Image();
	
	//DisplayObjects
	p.leftArrow;
	p.rightArrow;
	p.fire;
	p.water;
	p.ding;
	
	p.setUpPage = new Array();
	
	p.init = function(stage){
		book = this;
		this.stage = stage;
		this.prepareResources();
		this.waitAndStart();
	}
	
	p.prepareResources = function(){
		//shared
		this.leftArrow_image.src = 'imgs/leftarrow.png';
		this.leftArrow_image.onload = this.handleResourceLoad;
		this.rightArrow_image.src = 'imgs/rightarrow.png';
		this.rightArrow_image.onload = this.handleResourceLoad;
		this.circus_background.src = 'imgs/circus-background.jpg';
		this.circus_background.onload = this.handleResourceLoad;
		
		//page 0
		this.start_button.src = 'imgs/start.png';
		this.start_button.onload = this.handleResourceLoad;
		
		//page 1
		this.ringLeader.src = 'imgs/ringleader.png';
		this.ringLeader.onload = this.handleResourceLoad;
		this.ringLeaderSound = new Audio('sounds/ringleader.mp3');
		this.narr_page1 = new Audio('sounds/narr_page1.mp3');
		
		//page 2
		this.clown.src = 'imgs/clown.png';
		this.clown.onload = this.handleResourceLoad;
		this.firebreather.src = 'imgs/firebreather.png';
		this.firebreather.onload = this.handleResourceLoad;
		this.fireImage.src = 'imgs/fire.png';
		this.fireImage.onload = this.handleResourceLoad;
		
		//page 3
		this.game.src = 'imgs/game.png';
		this.game.onload = this.handleResourceLoad;
		this.gameding.src = 'imgs/temp-gameding.png';
		this.gameding.onload = this.handleResourceLoad;
		this.strongman.src = 'imgs/strongman.png';
		this.strongman.onload = this.handleResourceLoad;
		this.note.src = 'imgs/note.png';
		this.note.onload = this.handleResourceLoad;
		
		//page 4
		this.lion.src = 'imgs/temp.png';
		this.lion.onload = this.handleResourceLoad;
		this.elephant.src = 'imgs/elephant.png';
		this.elephant.onload = this.handleResourceLoad;
		
		//page 5
		this.band.src = 'imgs/temp-band.png';
		this.band.onload = this.handleResourceLoad;
		
		//page 6
		this.cannon.src = 'imgs/cannon.png';
		this.cannon.onload = this.handleResourceLoad;
		this.cannonman.src = 'imgs/cannonman.png';
		this.cannonman.onload = this.handleResourceLoad;
		this.smoke.src = 'imgs/smoke.png';
		this.smoke.onload = this.handleResourceLoad;
		
	}
	
	p.handleResourceLoad = function(){
		book.resourcesLoaded++;
		if(book.resourcesLoaded == book.totalResources){
			book.allResourcesLoaded = true;
		}
	}
	
	p.waitAndStart = function(){
		if(book.allResourcesLoaded){
			book.start();
		}
		else{
			setTimeout(book.waitAndStart, 50);
		}
	}
	
	p.start = function(){
		this.leftArrow = new Bitmap(this.leftArrow_image);
		this.leftArrow.click = this.leftClick;
		this.leftArrow.y = 400;
		this.rightArrow = new Bitmap(this.rightArrow_image);
		this.rightArrow.click = this.rightClick;
		this.rightArrow.x = 650;
		this.rightArrow.y = 400;

		this.stage.canvas.addEventListener('onselectstart', function(e){
			alert('test');
			e.preventDefault();
			book.handleClick(e);
			return false;
		}, false
		);
		this.stage.canvas.addEventListener('click', function(e){
			e.preventDefault();
			book.handleClick(e);
			return false;
		}, false
		);
		Ticker.addListener(this);
		
		this.setUpPage[0]();
	}
	
	p.tick = function(){
		this.stage.update();
	}
	
	p.rightClick = function(){
		if(book.setUpPage[book.curPage+1]){
			book.setUpPage[++book.curPage]();
		}
	}
	
	p.leftClick = function(){
		if(book.setUpPage[book.curPage-1]){
			book.setUpPage[--book.curPage]();
		}
	}
	
	p.setUpPage[0] = function(){
		book.stage.removeAllChildren();
		var displayObject = new Bitmap(book.start_button);
		displayObject.click = function(){
			if(typeof book.megaphone === 'undefined')
				book.megaphone = new Megaphone('sounds/audio.wav', book.data);
			book.rightClick();
		}
		displayObject.x = 250;
		displayObject.y = 100;
		if(typeof book.megaphone !== 'undefined')
			book.megaphone.pause();
		book.stage.addChild(displayObject);
	}
	
	p.setUpPage[1] = function(){
		book.stage.removeAllChildren();		
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var rl = new Bitmap(book.ringLeader);
		rl.x = 350;
		rl.y = 185;
		rl.click = function(){
			book.megaphone.play('ringleader');
		};
		book.stage.addChild(bg);
		book.stage.addChild(rl);
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page1narr');
	}
	
	p.setUpPage[2] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var clown = new Bitmap(book.clown);
		clown.y = 85;
		clown.x = 150;
		var firebreather = new Bitmap(book.firebreather);
		firebreather.y = 160;
		firebreather.x = 475;
		
		book.fire = new Bitmap(book.fireImage);
		firebreather.click = function(){
			book.fire.y = 175;
			book.fire.x = 360;
			book.stage.addChild(book.fire);
			book.megaphone.play('fireball');
			setTimeout(
				function(){
					book.stage.removeChild(book.fire);
				},1000);
		};
		
		book.water = new Bitmap(book.waterImage);
		clown.click = function(){
			book.megaphone.play('honk');
		};
		
		book.stage.addChild(bg);
		book.stage.addChild(clown);
		book.stage.addChild(firebreather)
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page2narr');
	}
	
	p.setUpPage[3] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var game = new Bitmap(book.game);
		game.x = 180;
		game.y = 50;
		game.click = function(){
		//	book.ding = new Bitmap(book.gameding);
		//	book.ding.x = this.x;
		//	book.ding.y = this.y;
		//	book.stage.addChild(book.ding);
			book.megaphone.play('ding');
		//	setTimeout(
		//		function(ding){
		//			book.stage.removeChild(book.ding);
		//		}, 500);
			var note = new Bitmap(book.note);
			note.x = 280;
			note.y = 10;
			book.stage.addChild(note);
			note.tick = function(){
				this.alpha -= .02;
				if(this.alpha == 0)
					book.stage.removeChild(this);
			}
			Ticker.addListener(note);
		}
		var strongman = new Bitmap(book.strongman);
		strongman.x = 400;
		strongman.y = 180;
		strongman.click = function(){
			var r = Math.random();
			if(r < .5)
				book.megaphone.play('grunt1');
			else
				book.megaphone.play('grunt2');
		}
		
		book.stage.addChild(bg);
		book.stage.addChild(game);
		book.stage.addChild(strongman);
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page3narr');
	}
	
	p.setUpPage[4] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var lion = new Bitmap(book.lion);
		lion.x = 500;
		lion.y = 300;
		lion.click = function(){
			book.megaphone.play('lion');
		}
		var elephant = new Bitmap(book.elephant);
		elephant.x = 110;
		elephant.y = 125;
		elephant.click = function(){
			book.megaphone.play('elephant');
		}
		
		book.stage.addChild(bg);
		book.stage.addChild(lion);
		book.stage.addChild(elephant);
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page4narr');
	}
	
	p.setUpPage[5] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var band = new Bitmap(book.band);
		band.x = 125;
		band.y = 250;
		band.click = function(){
			var r = Math.random();
			if(r < .5)
				book.megaphone.play('band1');
			else
				book.megaphone.play('band2');
		}
		
		book.stage.addChild(bg);
		book.stage.addChild(band);
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page5narr');
	}
	
	p.setUpPage[6] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var cannon = new Bitmap(book.cannon);
		cannon.x = 150;
		cannon.y = 210;
		cannon.click = function(){
			var cannonman = new Bitmap(book.cannonman);
			cannonman.x = 300;
			cannonman.y = 250;
			var smoke = new Bitmap(book.smoke);
			smoke.x = 380;
			smoke.y = 185;
			smoke.scaleX = 1.8;
			smoke.scaleY = 1.8;
			book.stage.addChild(smoke);
			book.stage.addChildAt(cannonman, book.stage.getChildIndex(this));
			book.megaphone.play('cannonfire');
			Ticker.addListener(cannonman);
			Ticker.addListener(smoke);
			cannonman.tick = function(){
				this.x += 23;
				this.y -= 12
				if(this.x > book.stage.canvas.width)
					book.stage.removeChild(this);
			}
			smoke.tick = function(){
				this.alpha -= .05;
				if(this.alpha == 0)
					book.stage.removeChild(this);
			}
		}
		
		book.stage.addChild(bg);
		book.stage.addChild(cannon);
		book.stage.addChild(book.rightArrow);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page6narr');
	}
	
	p.setUpPage[7] = function(){
		book.stage.removeAllChildren();
		var bg = new Bitmap(book.circus_background);
		bg.x = -250;
		bg.y = -200;
		var elephant = new Bitmap(book.elephant);
		elephant.x = 100;
		elephant.y = 125;
		elephant.click = function(){
			book.megaphone.play('elephant');
		}
		var strongman = new Bitmap(book.strongman);
		strongman.x = 500;
		strongman.y = 180;
		strongman.click = function(){
			var r = Math.random();
			if(r < .5)
				book.megaphone.play('grunt1');
			else
				book.megaphone.play('grunt2');
		}
		var rl = new Bitmap(book.ringLeader);
		rl.x = 290;
		rl.y = 185;
		rl.click = function(){
			book.megaphone.play('ringleader');
		};
		book.stage.addChild(bg);
		book.stage.addChild(strongman);
		book.stage.addChild(elephant);
		book.stage.addChild(rl);
		book.stage.addChild(book.leftArrow);
		book.megaphone.play('page7narr');
	
	}
	
	
	
	p.flag = false;
	p.handleClick = function(evt){
		if(!book.flag){
			book.flag = true;
			setTimeout(function(){ book.flag = false;}, 100);
			evt.preventDefault();
			for(var i = 0; i < book.stage.getNumChildren(); i++){
				var child = book.stage.getChildAt(i);
				if(book.checkIntersect(child, evt)){
					//Only should do one click
					if(child.click){
						child.click();
						return;
					}
				}
			}
		}
		return false;
	}
	
	p.checkIntersect = function(displayObject, evt){
		var cords = this.getActualCords(evt);
		if(!displayObject.image)
			return false;
		var x1 = displayObject.x;
		var x2 = x1 + displayObject.image.width;
		var y1 = displayObject.y;
		var y2 = y1 + displayObject.image.height;
		return (cords.x >= x1 &&
				cords.x <= x2) &&
			   (cords.y >= y1 &&
			    cords.y <= y2);
	}
	
	p.getActualCords = function(evt){
		var canvas = this.stage.canvas;
		var cords = new Object();
		cords.x = evt.pageX - $(canvas).offset().left;
		cords.y = evt.pageY - $(canvas).offset().top;
		return cords;
	}
	
	window.Book = Book;
}(window));