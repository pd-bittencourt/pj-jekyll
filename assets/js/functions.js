$(function(){
	mentoringBubbleClick();
	setInterval(function(){articleSwing();}, 3000);
  smoothScroll(500);
});

//smoothScroll
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}



// article 
function articleSwing(){
	var randNum = Math.floor(Math.random() * $('.article-thumb').length)
	$('.article-thumb').eq(randNum).addClass('is-emph')
		.siblings().removeClass('is-emph');
}

// when I click a face
// get the distance of the face from its parent
// move the whole container up 115px + the count
// add the is-open class to the face (pop the bubble)

function mentoringBubbleClick() {
	$('.face').on('click',function() {

		var $this = $(this),
				faceTop = $this.position().top,
				vMath = faceTop - 230;
				faceLeft = $this.position().left,
				hMath = 0 - faceLeft

		if($(window).width() > 640){
			$this.parent().css('top', -+ vMath +'px');
		}	else {
			if($this.hasClass('back-btn')) {
				mentoringNarrowStart();
			} else {
				$this.parent().css('left', + hMath +'px');
			}
		}
		if(!$this.hasClass('back-btn')) {
			$this.addClass('has-bubble-open')
			.siblings().removeClass('has-bubble-open');
		}	
	});

	$('.face:nth-child(3)').addClass('has-bubble-open')


}

// Youtube parallax, start Mentoring pictures
$(window).scroll(function() {
	youtubeVidScroll();
	startMentoring();
	startArticles();
});

function youtubeVidScroll() {
	var wScroll = $(window).scrollTop();

	$('.video-strip').css('background-position','center -'+ wScroll/2 +'px');

}

// Articles

function startArticles(){
	var wScroll = $(window).scrollTop();

	if($('.articles').offset().top - $(window).height()/2 < wScroll) {
		$('.article-thumb').each(function(i){
			setTimeout(function(){
				$('.article-thumb').eq(i).addClass('is-visible');
			}, 300 * i);
		});
	}
}



// Mentoring bubbles
function startMentoring() {
	
	var wScroll = $(window).scrollTop();
	
	if($('section.mentoring').offset().top - $(window).height()/2 < wScroll) {
		if($(window).width() > 640){
			$('.faces').addClass('launched');
				if(!$('.face').hasClass('has-bubble-open')){
					setTimeout(function(){
						$('.face:nth-child(3)').addClass('has-bubble-open');
					}, 400);
				}
		}
	}
};



function mentoringNarrowStart() {
	$('.faces').css({
		'top': '230px',
		'left': '0px'
	});
	$('.face').first().addClass('has-bubble-open')
		.siblings().removeClass('has-bubble-open');
}

function mentoringWideStart() {
	$('.faces').css({
		'top': '0px',
		'left': '0px'
	});
	$('.face:nth-child(3)').addClass('has-bubble-open')
		.siblings().removeClass('has-bubble-open');
}

$(window).resize(function() {
	if($(window).width() > 640) {
		mentoringWideStart();
	} else {
		mentoringNarrowStart();
	}
});



