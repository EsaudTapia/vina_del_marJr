// $('.navbar-vertical .navbar-toggler').on('click', function () {
//     var $this = $(this)
//     var $isShow = $this.parent('.navbar-vertical').hasClass('show')
//     var $isHide = $this.parent('.navbar-vertical').hasClass('hidden')
//     if ($isShow) {
//         $('.navbar-vertical.show').removeClass('show')
//         $this.parent('.navbar-vertical').addClass('hidden')
//         //console.log($isShow)
//     }
//     else {
//         if ($isHide) {
//             $('.navbar-vertical.hidden').removeClass('hidden')
//             $this.parent('.navbar-vertical').addClass('show')
//         }
//     }
// })

let $navbartoggler = document.querySelector('.navbar-vertical .navbar-toggler')

$navbartoggler.addEventListener('click', ()=>{
    console.log('presiono clicnk')
    let $navbarVertical = document.querySelector('.navbar-vertical')
    var $isShow = $navbarVertical.classList.contains('show')
    var $isHide = $navbarVertical.classList.contains('hidden')

    if ($isShow) {
        document.querySelector('.navbar-vertical.show').classList.remove('show')
        $navbarVertical.classList.add('hidden')
     } else if ($isHide){
        document.querySelector('.navbar-vertical.hidden').classList.remove('hidden')
        $navbarVertical.classList.add('show')
    }
})