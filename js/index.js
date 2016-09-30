//Function to grab random int between min - max
var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = function()
{
	// lets git the HTML canvas element so we draw on it
	var canvas = document.getElementById("c");
	var ctx = canvas.getContext("2d");

	var W = document.getElementById("result").offsetWidth, /// get the width of our window
		H = document.getElementById("result").offsetHeight; // get the height

	console.log(document.getElementById("result").style.height);
	// set our canvas to our siz of Width and Height
	canvas.width = W;
	canvas.height = H;

	//console.log("my color request: "+colorsArray);

	/*===============Box class=================================*/
	function Box(_x, _y)
	{
		// the X/Y position
		this.x = _x;
		this.y = _y;

		//lets give it velocity X and Y
		this.xVel = 10 + Math.random()*20;
		this.yVel = 1;

		//the box width and height
		this.width = 20;
		this.height = 20;

		//random colors for our box
		/*this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*255);
		this.b = Math.round(Math.random()*255);*/

		this.randomColor = randomInt(0,colorsArray.colors.length-1);
		this.r = colorsArray.colors[this.randomColor].red;
		this.g = colorsArray.colors[this.randomColor].green;
		this.b = colorsArray.colors[this.randomColor].blue;

		console.log(colorsArray);


		this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";

		//lets make draw method for out box
		this.draw = function()
		{
			ctx.strokeStyle = this.rgba;
			ctx.strokeRect(this.x,this.y,this.width,this.height);

			this.update();
		}

		//function that handle our logincss for our box
		this.update = function()
		{
			//lets check if the ball get out of our screen and when it does that , make it bounce
			//check the left window border
			if(this.x<0){
				this.x = 0;		//set its position to 0
				this.xVel *= -1; //make it bounce
			}

			//check the right border
			if(this.x > W - this.width)
			{
				this.x = W - this.width; //set its position to 0
				this.xVel *= -1; //make it bounce
			}

			//check the top border
			if(this.y < 0){
				this.y = 0;	//this is what happen when u copy/paste
				this.yVel *= -1; //make it bounce
			}

			// the reaason why we did this if functin so the boxes dont
			//try to add y by its belocity whe it reaches the bottom
			//now we add gravity
			if(this.y < H - this.height)
				this.yVel += .25;

			//check the bottom border
			if(this.y > H - this.height)
			{
				//when it bounces off the bottom decrease the ball speed
				this.xVel *= .5;
				this.yVel *= .5;

				this.y = H - this.height; //set its position to 0
				this.yVel *= -1; //make it bounce
			}

			//move add speed to our x/y
			this.x += this.xVel;
			this.y += this.yVel;
		}
	}// Box Class

	// lets make array of boxes
	var boxes = [];

	// Function to draw stuff on our screen :)
	function draw()
	{
		//Background
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = 'rgba(32,38,57,0.5)';
		ctx.fillRect(0,0,W,H);

		ctx.globalCompositeOperation = "lighter";

		//loop through the boxes and draw them
		for(i=0; i<boxes.length; i++)
			boxes[i].draw();

		update();
	}

	//Function for our logic
	function update()
	{
		for(i=0; i<boxes.length; i++)
			boxes[i].update();
	}

	setInterval(function(){boxes.push(new Box(0,0))},1000);

	//set interval so we can draw then update our drawing
	// every 30 milisecond
	setInterval(draw,30);
}