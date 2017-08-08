$(document).ready(function(){
	
	function Tile(id){
		this.ID = id
		this.html = '<li class="flip-container">' +
						'<div id="card-' + this.ID + '">' +
							'<div class="front"> </div>' +
							'<div class="back"> </div>' +
						'</div>' +
					'</li>'
		this.setContent = function(string){
			$('#card-' + this.ID).find('.back').html(string);
		}
		this.getContent = function(){
			$('#card-' + this.ID).find('.back').html();
		}
	}

	function Board(size){
		this.Size = size;
		this.Tiles = [];
		this.Draw = function(){
			for(var i = 0; i < size; i++){
				$('#game').append('<ul class="row" id="row-' + i + '"> </ul>')
				for(var x = 0; x < size; x++){
			    	t = new Tile(i + '-' + x);
			   	 	this.Tiles.push(t);
					$('#row-'+i).append(t.html);
				}
			}
			
		}
		this.Randomize = function(){
			//for grid size, pick 2 random tiles and add matching emoticon
			var randomtiles = this.Tiles;
			var emoticons = ["&#9760", "&#10084", "&#10052", "&#9851", "&#9992", "&#9785", "&#9763", "&#9730"]
			var currentEmoticon = 0;
			for(var i = 0; i < (this.Size * this.Size)/2; i++){
				for (var p = 0; p < 2; p++){
					var random1 = Math.floor(Math.random()*randomtiles.length);
				    randomtiles[random1].setContent(emoticons[currentEmoticon]);
				    randomtiles.splice(random1, 1);
				}
				currentEmoticon += 1;	
				if (currentEmoticon >= emoticons.length){
					currentEmoticon = 0;
				}		
			}
		}
	}

	function Game(board){
		this.Board = board;
		this.TurnCount = 0;
		this.FirstCard = null;
		this.SecondCard = null;
		this.FirstFlipContent = "";
		this.SecondFlipContent = "";
		this.Flipping = false;

		this.Start = function(){

		}
		this.ResetTurn = function(){
			this.TurnCount = 0;
			this.FirstCard = null;
			this.SecondCard = null;
			this.FirstFlipContent = "";
			this.SecondFlipContent = "";
		}
	}

	gameBoard = new Board(8);
	gameBoard.Draw();
	gameBoard.Randomize();

	game = new Game(gameBoard);
	game.Start();



	$('.flip-container').click(function(){
	if(game.Flipping == false){

		console.log("click");
		//On second flip 
		if (game.TurnCount == 1){
			console.log("flip");
			game.SecondCard = $(this).children(":first");
			game.SecondCard.toggleClass("flipped");	
			game.SecondFlipContent = game.SecondCard.find('.back').html();
			//If the 2 cards do not match
			if (game.FirstFlipContent != game.SecondFlipContent){
				game.Flipping = true;
				//Flip them back after delay
				setTimeout(function(){
					game.FirstCard.toggleClass("flipped");
					game.SecondCard.toggleClass("flipped");
					game.ResetTurn();
					game.Flipping = false;
				}, 800);						
			}
			else{
				game.Flipping = true;
				setTimeout(function(){
					game.FirstCard.parent().off('click');
					game.SecondCard.parent().off('click');
					game.ResetTurn();
					game.Flipping = false;
				}, 500);
				
			}
		}

		//On first flip, flip the card and store the value
		if (game.TurnCount == 0){
			game.FirstCard = $(this).children(":first");
			game.FirstCard.toggleClass("flipped");		
			game.FirstFlipContent = game.FirstCard.find('.back').html();
  			game.TurnCount += 1;
		}
	}
  		
	});

});



