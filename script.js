class Particle {
	constructor(context, x, y, d = 2, color = '#9294AE', movement = 10, lerp = 0.05) {
		this.context = context;

		this.x = this.currentX = this.targetX = x;
		this.y = this.currentY = this.targetY = y;
		this.d = d;
		this.lerp = lerp;
		this.color = color;
		this.movement = movement;
	}

	draw() {
		var context = this.context,
			r = this.d / 2;
		context.fillStyle = this.color;
		context.beginPath();

		var x = this.x - r,
			y = this.y - r;
		
		if (Math.abs(this.targetX - this.currentX) < this.movement * 0.1) {
			this.targetX = x + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
		}
		if (Math.abs(this.targetY - this.currentY) < this.movement * 0.1) {
			this.targetY = y + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
		}
		
		this.currentX += (this.targetX - this.currentX) * this.lerp;
		this.currentY += (this.targetY - this.currentY) * this.lerp;
		
		context.arc(this.currentX, this.currentY, r, 0, Math.PI * 2, false);

		context.closePath();
		context.fill();
	}
	
	setTarget(x, y) {
		
	}
}

class Canvas {
	constructor(element, particleSpacing = 50) {
		this.canvas = element;
		this.context = element.getContext('2d');

		this.particleSpacing = particleSpacing;
		
		window.addEventListener('resize', () => this.init());
		this.init();
	}

	init () {
		this.stop();
		this.clear();
		
		this.resize();

		this.createParticles();
		this.animate();
	}
	
	resize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	createParticles() {
		var cols = Math.floor(this.canvas.width / this.particleSpacing),
			rows = Math.floor(this.canvas.height / this.particleSpacing),
			colGutter = (this.particleSpacing + (this.canvas.width - cols * this.particleSpacing)) / 2,
			rowGutter = (this.particleSpacing + (this.canvas.height - rows * this.particleSpacing)) / 2;

		this.particles = [];
		for (let col = 0; col < cols; col++) {
			for (let row = 0; row < rows; row++) {
				let x = col * this.particleSpacing + colGutter, 
						y = row * this.particleSpacing + rowGutter, 
						particle = new Particle(this.context, x, y);
				this.particles.push(particle);
			}
		}
	}

	draw() {
		this.clear();
		if (this.particles) {
			for (let i = 0; i < this.particles.length; i++) {
				this.particles[i].draw();
			}
		}
	}

	animate() {
		this.draw();
		this.animationFrame = window.requestAnimationFrame(() => this.animate());
	}

	stop() {
		window.cancelAnimationFrame(this.animationFrame);
	}
}
var cnvs = new Canvas(document.getElementById('canvas'));

$('body').mousemove(function(e) {
    var x = (e.pageX * -1 / 10);
    $("#canvas").animate({
      left: x + 'px'
    }, 10);
});



$( document ).ready(function() {
  // Main variables
    var $aboutTitle = $('.about-myself .content h2');
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;


  /* ####### HERO SECTION ####### */

  $('.hero .content .header').delay(500).animate({
    'opacity':'1',
    'top': '50%'
  },1000);


  $(window).scroll( function(){

    var bottom_of_window = $(window).scrollTop() + $(window).height();

    /* ##### ABOUT MYSELF SECTION #### */
    if( bottom_of_window > ($aboutTitle.offset().top + $aboutTitle.outerHeight())){
      $('.about-myself .content h2').addClass('aboutTitleVisible');
    } 
  /* ##### EXPERIENCE SECTION #### */

      // Check the location of each element hidden */
      $('.experience .content .hidden').each( function(i){

          var bottom_of_object = $(this).offset().top + $(this).outerHeight();

          /* If the object is completely visible in the window, fadeIn it */
          if( bottom_of_window > bottom_of_object ){

            $(this).animate({
              'opacity':'1',
              'margin-left': '0'
            },600);
          }
      });

  /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

    if((bottom_of_window > middle_of_developmentWrapper)&& (developmentIsVisible == false)){

      $('.skills-bar-container li').each( function(){

        var $barContainer = $(this).find('.bar-container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;

        var id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
              clearInterval(id);
          } else {
            width++;
            elem.css("width", width+"%");
            percent.html(width+" %");
          }
        }
      });
      developmentIsVisible = true;
    }
  }); // -- End window scroll --
});