
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
            $("body").toggleClass("navExpanded");
            if($(".nav-wrap").is(":visible")){
                $(".nav-wrap").slideUp();   
                $(".nav-wrap span").hide();
            }else{
                $(".nav-wrap span").delay(200).fadeIn();
                $(".nav-wrap").slideDown();
            }
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
        
        if($("#promise-inner").length){
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
        }
        
        if($("#overlay-mask").length){
            var elementOffset = $(".work-hero-section").offset().top,
                elementHeight = $(".work-hero-section").outerHeight(),
                elementWidth = $(".work-hero-section").outerWidth(),
                windoHeight = $(window).outerHeight();
        
            $(window).on("scroll", function(){
                var overlay = document.getElementById('overlay-mask');

                var windowScroll = $(this).scrollTop();


                if($(window).scrollTop() > elementOffset - windoHeight){
                    let scrollTop = document.documentElement.scrollTop;
                    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    let progress = windowScroll / elementHeight;
                    var transformValue = 'scaleX('+progress+')';
                    //console.log(transformValue);
                    
                    overlay.style.WebkitTransform = transformValue;
                    overlay.style.MozTransform = transformValue;
                    overlay.style.OTransform = transformValue;
                    overlay.style.transform = transformValue;
                }          


            });  
        }
        
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
        
        
        $(window).on("scroll load", function(){
            if($(".footer-section").length){
                //if($(window).scrollTop() > $(".our-values-section").offset().top - 150){
                    var theta = $(window).scrollTop() / 500 % Math.PI;
                    $('.round-logo').css({ transform: 'rotate(' + theta + 'rad)' });
                //}

                if($(".before-footer").length){
                    if($(window).scrollTop() > $(".before-footer").offset().top - 150){
                        $(".promise-inner, .promise-bg, .work-hero-section").css({
                            'z-index' : 1,
                        });
                        $(".footer-fixed-section").css({
                            'z-index' : 2,
                        });
                    }else{
                        $(".promise-inner, .promise-bg, .work-hero-section").css({
                            'z-index' : 2,
                        });
                        $(".footer-fixed-section").css({
                            'z-index' : 1,
                        });
                    }
                }else{

                    if($(window).scrollTop() > $(".before-footer").offset().top - 150){
                        $(".footer-fixed-section").css({
                            'z-index' : 2,
                        });
                    }else{
                        $(".footer-fixed-section").css({
                            'z-index' : 1,
                        });
                    }
                }

            }
            
        }); 
        
        
        var footerHeight = $(".footer-fixed-section").outerHeight();
        
        $(".main-content-wrap").css({
            'margin-bottom' : footerHeight + 'px'
        })
        
        $(window).on("resize", function(){
            var footerHeight = $(".footer-fixed-section").outerHeight();
        
            $(".main-content-wrap").css({
                'margin-bottom' : footerHeight + 'px'
            }) 
        });
        
        if($(".white-nav-content").length){
            $("body").addClass("white-nav-page-body")
        }
        
        
        $('#second-number-val').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          autoplaySpeed: 5000,
          speed: 1000,
          vertical: true,
          //verticalSwiping: true,
          asNavFor: '#process-slider-content-wrap'
        });
        
        $('#process-slider-content-wrap').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '#second-number-val',
          dots: false,
          arrows: false,
          fade: true,
          //centerMode: true,
          //focusOnSelect: false
        });
        
        $("#our-process-slider-controller .slide-prev").click(function(){
            $('#process-slider-content-wrap').slick("prev");
        });
        
        $("#our-process-slider-controller .slide-next").click(function(){
            $('#process-slider-content-wrap').slick("next");
        });
        
        if($(".body-copy").length){
            wordWrap();   
            
            var delayTime = 0.4 
            $('.body-copy').each(function(){
                var $this = $(this);
                $this.find("span").each(function(i){
                    $(this).css({
                       'animation-delay'  : delayTime + (i * .2) + 's'
                    });  
                })
            });
            
        }
        
        
        // Change nav color by section on scroll function.
        if($(".dark-section").length){
            var mywindow = $(window);
            var mypos = mywindow.scrollTop();
            var up = false;
            var newscroll;
            mywindow.on("load scroll resize", function(){
                newscroll = mywindow.scrollTop();
                var totalSection = $(".dark-section").length;
                //console.log(totalSection)
                $(".dark-section").each(function(){
                    var blackSec = $(this);
                    var startBlackSec = $(this).offset().top - 40;
                    var endBlackSec = startBlackSec + blackSec.outerHeight();
                    var scrollTp = $(window).scrollTop();
                    
                    if(totalSection === 1){ // This is for single section
                        if(scrollTp > startBlackSec && scrollTp < endBlackSec){
                           //console.log("Begin black section");
                           $("body").addClass("whiteHeader");
                        }

                        if(scrollTp > endBlackSec + 20 || scrollTp < startBlackSec){
                            $("body").removeClass("whiteHeader");
                        }   
                    }else{ // this is for multi section
                        if(scrollTp > startBlackSec && scrollTp < endBlackSec){
                           //console.log("Begin black section");
                           $("body").addClass("whiteHeader");
                        }

                        if(scrollTp > endBlackSec + 20){
                            $("body").removeClass("whiteHeader");
                        }
                    }
                });
                
                
                mypos = newscroll;
            });
        }
        
        if($(".four-zero-four-content").length || $(".all-works").length ){
            $("body").addClass("whiteHeader");
        }

	})// End ready function.
    
    $(window).on("load", function(){
        $("body").addClass("loaded");
    })
    
    
    function wordWrap() {
        $(".body-copy").each(function(){
          var bdy = $(this);
          var body2 = bdy.parent().find(".body-copy-two");
          var text = $(bdy).text();
          var html = $(bdy).html();
          var bWidth = $(bdy).width();
          var words = text.split(" ");
          var span = "";
          var word = "";
          var allSpans = "";
          var lastWord = "";
          $(words).each(function(i, w) {
            if (lastWord != "") {
              w = lastWord + " "+ w ;
              lastWord = "";
            };
            word = w + " ";
            span = span + word;
            body2.append(word);
            if (body2.width() >= bWidth) {
              var wLen = word.length;
              span = span.slice(0, -wLen);
              lastWord = w + " ";
              allSpans = allSpans + "<span>" + $.trim(span) + "</span>";
              body2.html("");
              span = "";
              word = "";
            }
          });
          var lastSpan = "<span>" + body2.text() + "</span>";
          $(bdy).html(allSpans + lastSpan);
        })
    }
    

})(jQuery);

