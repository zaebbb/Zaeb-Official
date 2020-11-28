$(document).ready(function(){

    // scroll header nav
    $(window).scroll(function(){
        if(this.scrollY > 50){
            $('.nav').addClass("scroll");
        } else {
            $('.nav').removeClass("scroll");
        }
    });

    // button scroll click
    $('.fa-chevron-up').click(function(){
        $('html').animate({scrollTop: 0});
    });

    // button fixed menu-2 click
    $('.fa-location-arrow').click(function(){
        $('.fixed-menu-2').addClass("active");
        $('.fixed-menu-1').addClass("active");
    });
    $('.fa-times').click(function(){
        $('.fixed-menu-2').removeClass("active");
        $('.fixed-menu-1').removeClass("active");
    });

    // button animated menu open-close
    $('.menu-btn').click(function(){
        $('.nav-ul').toggleClass("active");
        $('.menu-btn').toggleClass("active");
    });

    // button perfomances
    $('.fa-sliders-h').click(function(){
        $('*').toggleClass("perfomances");
        $('canvas').style.display = "none";
        $('a:hover').toggleClass("perfomances");
        $('.nav').style.shadow = "none";
    });

    // editor text, library JavaScript
    let edit_1 = new Typed(".edit-1", {
        strings: ["Web Developer", "Web Designer", "JavaScript Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    let edit_2 = new Typed(".edit-2", {
        strings: ["Web Developer", "Web Designer", "JavaScript Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});