
;(function($){
	$(function(){

        // Begin input common focus and blur for value.
        var input = $('input:text, input:password,input[type="email"],input[type="tel"],input[type="number"],input[type="search"], textarea');

        $(input).each(function () {
            var inputText = $(this).attr('placeholder')
            $(this).focus(function () {
                if ($(this).val().length === 0) {
                    $(this).attr('placeholder', '');
                }
            }).blur(function () {
                if ($(this).val().length === 0) {
                    $(this).attr('placeholder', inputText);
                    $(this).parent().removeClass('active');
                } else if ($(this).val().length > 0) {
                    $(this).parent().addClass('active');
                }
            });
        });
        // Ends input common focus and blur for value.
		
        // Phone nav click function 
        $('#phone-nav').click(function(){
            $(".nav-wrap").slideToggle();
        });
        
        
        // This function for scroll from bottom animation

            var $animation_elements = $('.animate');
            var $window = $(window);

            function check_if_in_view() {
                var window_height = $window.height();
                var window_top_position = $window.scrollTop();
                var window_bottom_position = (window_top_position + window_height);

                $.each($animation_elements, function() {
                    var $element = $(this);
                    var element_height = $element.outerHeight();
                    var element_top_position = $element.offset().top;
                    var element_bottom_position = (element_top_position + element_height);

                    //check to see if this current container is within viewport
                    if (element_top_position <= window_bottom_position) {
                        $element.addClass('in-view');
                    } else {
                        $element.removeClass('in-view');
                    }
                });
            }

            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');
        // End animation function

            $("a[href^='#']").click(function (e){
               e.preventDefault();

               var position = $($(this).attr("href")).offset().top;

               $("body, html").animate({
                       scrollTop: position
                   },
                   2000);
            });
        
                
        var elementOffset = $("#promise-bg").offset().top - 0,
            elementHeight = $("#promise-bg").outerHeight(),
            elementWidth = $("#promise-bg").outerWidth(),
            windoHeight = $(window).outerHeight();
        
        $(window).on("scroll", function(){
            if($(window).scrollTop() > (elementOffset - windoHeight) + elementHeight ){
                $("body").addClass("overlay-animate");
                $("body").addClass("start-animate");
                $("#promise-bg").css({
                    "position": "fixed",
                    "bottom" : 0,
                })
                $(".promise-content").css({
                    "margin-top" : elementHeight
                });                    
                
            }else{
                $("body").removeClass("start-animate");
                $("#promise-bg").css({
                    "position": "relative",
                    "bottom" : "auto",
                })
            }            
            
            // The social div 
            var $content = $('.hero-content');

            //Get scroll position of window 
            var windowScroll = $(this).scrollTop();

            //Slow scroll of social div and fade it out 
            if(windowScroll > 20){
                $content.addClass("go-top");
            }else{
                $content.removeClass("go-top");
            }
            
            
        })


        var scroller = {};
        scroller.e = document.getElementById("promise-bg");

        if (scroller.e.addEventListener){
            scroller.e.addEventListener("mousewheel", MouseWheelHandler, false);
            scroller.e.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        } else scroller.e.attachEvent("onmousewheel", MouseWheelHandler);

        function MouseWheelHandler(e){

            // cross-browser wheel delta
            var e = window.event || e;
            var delta = - 20 * (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));
            var pst = $('#promise-bg').scrollTop() + delta;


            $('#promise-bg').scrollTop(pst);

            var totalScrollTop = pst
            var docHeight = $('#promise-bg').outerHeight();
            var docContainerHeight = $('.our-promise-section').outerHeight();
            var progress = (totalScrollTop / (docHeight - docContainerHeight)) * 100;
            var $bgColor = progress > 99 ? '#FFFFFF' : '#FFFFFF';


            $('.overlay-progressbar').width(progress + '%').css({ backgroundColor: $bgColor });

            /*var $animatedThumb = $('.gallery-portrait-thum, .diagonal-item');
            //Slow scroll of social div and fade it out 
            $animatedThumb.css({ 
             'margin-left' : - (totalScrollLeft / 25) + "px", 
            }); */




            return false;
        }

	})// End ready function.

})(jQuery)


