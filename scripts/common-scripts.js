
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
        
        var headerHeight = $(".header-section").outerHeight();

        $("a[href^='#']").click(function (e){
           e.preventDefault();

           var position = $($(this).attr("href")).offset().top;

            if($(window).width() > 767){
                $("body, html").animate({
                   scrollTop: position
                }, 2000);   
            }else{
                $("body, html").animate({
                   scrollTop: position - headerHeight
                }, 2000);
            }
        });
        
                
        var elementOffset = $("#promise-inner").offset().top,
            elementHeight = $("#promise-inner").outerHeight(),
            elementWidth = $("#promise-inner").outerWidth(),
            windoHeight = $(window).outerHeight();
        
        $(window).on("scroll", function(){
            
            var windowScroll = $(this).scrollTop();
            
            
            if($(window).scrollTop() > elementOffset - windoHeight){
                let scrollTop = document.documentElement.scrollTop;
                let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                let progress = 100 * (scrollTop - elementOffset) / elementWidth;
                document.querySelector("#overlay-progressbar").style.width = progress + 20 + "%";
                
                
            }
            
            if($(window).scrollTop() > (elementOffset - windoHeight) + elementHeight ){
                $("body").addClass("overlay-animate");
                $("body").addClass("start-animate");
                $("#promise-inner").css({
                    "position": "fixed",
                    "bottom" : 0,
                })
                $(".promise-content").css({
                    "margin-top" : elementHeight
                });    
                
            }else{
                $("body").removeClass("start-animate");
                //$("body").removeClass("overlay-animate");
                $("#promise-inner").css({
                    "position": "relative",
                    "bottom" : "auto",
                })
                $("#overlay-progressbar").width(0);
                //$background.css({'background-position':'center center'});
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
            
        });
        
        
        if ($("#founder-slider").length) {

            $("#founder-slider").on('init', function (event, slick, currentSlide, nextSlide) {
                $(this).find(".slick-current.slick-active").prev().addClass('prev-slide');                
            });

            $("#founder-slider").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                //arrows: true,
                dots: false,
                infinite: true,
                fade: false,
                centerMode: false,
                speed: 1300,

            }).on('afterChange', function (event, slick, currentSlide, nextSlide){
                $(this).find(".slick-slide").removeClass('prev-slide');
                $(this).find(".slick-current.slick-active").prev().addClass('prev-slide');
                var getNum = currentSlide + 1;
                getNum = getNum < 10 ? '0' + getNum : getNum;
                $(this).parents('.founder-inner').find('.count-slide > span').text("/ " + getNum);
                

            }).on("mousewheel", function (event){
                event.preventDefault();
                if (event.deltaX > 0 || event.deltaY < 0) {
                    $(this).slick('slickNext');
                } else if (event.deltaX < 0 || event.deltaY > 0) {
                    $(this).slick('slickPrev');
                }
            });

            $('#founder-slider-controller .slide-prev button').on('click', function (e) {
                e.preventDefault();
                $('#founder-slider > .slick-prev').trigger('click');
            });

            $('#founder-slider-controller .slide-next button').on('click', function (e) {
                e.preventDefault();
                $('#founder-slider > .slick-next').trigger('click');
            });


        }
        
        
        $(window).on("scroll", function(){
            //if($(window).scrollTop() > $(".our-values-section").offset().top - 150){
                var theta = $(window).scrollTop() / 500 % Math.PI;
                $('.round-logo').css({ transform: 'rotate(' + theta + 'rad)' });
            //}
            
            if($(window).scrollTop() > $(".our-values-section").offset().top - 150){
                $(".promise-inner, .promise-bg").css({
                    'z-index' : 1,
                });
                $(".footer-fixed-section").css({
                    'z-index' : 2,
                });
            }else{
                $(".promise-inner, .promise-bg").css({
                    'z-index' : 2,
                });
                $(".footer-fixed-section").css({
                    'z-index' : 1,
                });
            }
        }); 
        
        
        var footerHeight = $(".footer-fixed-section").outerHeight();
        
        $(".home-content").css({
            'margin-bottom' : footerHeight + 'px'
        })
        
        $(window).on("resize", function(){
            var footerHeight = $(".footer-fixed-section").outerHeight();
        
            $(".home-content").css({
                'margin-bottom' : footerHeight + 'px'
            }) 
        })
        

	})// End ready function.

})(jQuery)

