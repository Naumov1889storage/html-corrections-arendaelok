$(document).ready(function(){
  $('.slider').slick({
    infinite: true,
    slidesToShow: 3,
	  slidesToScroll: 1,
    prevArrow: '<button class="prev"></button>',
    nextArrow: '<button class="next"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('.product-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    prevArrow: '<button class="prev"></button>',
    nextArrow: '<button class="next"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.gallery-slider').slick({
    infinite: true,
    slidesToShow: 1,
	  slidesToScroll: 1,
    dots: true,
    arrow: false
  });

  // Плавный скроллинг к блоку по клику в меню
  $('.menu__link').click(function(){
    var scroll_to = $(this).attr('href');
    if ($(scroll_to).length != 0){
      $('html, body').animate({ scrollTop: $(scroll_to).offset().top }, 500);
      // закрытие меню на мобильных
      $('.humburger').toggleClass('active');
      $('.menu').toggleClass('dn');
    }
  });

  $('.main-nav__link').click(function(){
    var scroll_to = $(this).attr('href');
    if ($(scroll_to).length != 0){
      $('html, body').animate({ scrollTop: $(scroll_to).offset().top }, 500);
    }
  });

  let humburger = document.getElementsByClassName('humburger'),
      menu = document.querySelector('.menu');

  // АНИМАЦИЯ ГАМБУРГЕРА

    for (var i = 0; i < humburger.length; i++) {
        humburger[i].addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('dn');
        });
    }

    // Прелоадер

  setTimeout(function () {
    var preloader = document.getElementById('preloader');
    if(!preloader.classList.contains('done')){
      preloader.classList.add('done');
    }
  }, 1500);

});

// Отправка заявки
$('.form').submit(function(e){
  e.preventDefault();
  var selectSpruce = document.getElementById('spruce'); // выпадающий список с выбором елки
  var info = {
    name: $('input[name=name]').val(),
    phone: $('input[name=phone]').val(),
    spruce: selectSpruce.options[selectSpruce.selectedIndex].text // текст выбранной option
  }
  if (info['name'] == '' || info['phone'] == ''){
    throwAlert('Заполните поля, отмеченные звездочкой*!', 'danger');
    return false;
  }
  // Валидация обязательных полей
  info['phone'] = Number(info['phone'].replace(/\D+/g,"")).toString();
  if (info['phone'].length != 11){
    throwAlert('Некорректно указан номер телефона', 'danger');
    return false;
  }
  // Проверка чекбокса (согласие на обработку данных)
  var checkbox = $('#agreement-checkbox').is(':checked');
  if (!checkbox){
    throwAlert('Дайте согласие на обработку данных', 'danger');
    return false;
  }
  console.log(info);
  // Формирование тела запроса
  var body = '';
  for (key in info)
    body += '&' + key + '=' + encodeURIComponent(info[key]);
  // Отрезаем первый символ в теле (&)
  body = body.slice(1);
  $.ajax({
    type: $(this).attr('method'),
    url: $(this).attr('action'),
    data: body,
  }).done(function(){
    throwAlert('Заявка отправлена! Ожидайте звонка', 'success')
  }).fail(function(){
    throwAlert('Ошибка отправки/обработки заявки', 'danger')
  });
});

// Сброс выбранной ели при закрытии окна
$('#close-modal').click(function(){
  $('#spruce').val(0);
});

// Выбор нужной ели и открытие окна при клике на цену
$('.product-price').click(function(){
  $('#spruce').val($(this).data('target'));
  $('#modal').toggle('toggle');
});

function throwAlert(message, type){
  $.bootstrapGrowl(message,{
      type: type,
      offset: {from: 'top', amount: 20},
      delay: 4000,
      width: 'auto',
      allow_dismiss: false
    });
}