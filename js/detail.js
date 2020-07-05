$(document).ready(function () {
  let product_id = window.location.search.split('=')[1];

  let getProduct = new Promise((resolve, reject) => {
    $.get(
      `https://5ee2489c8b27f30016094881.mockapi.io/products/${product_id}`,
      function (data) {
        resolve(data);
      }
    ).fail((err) => {
      reject(err);
    });
  });
  getProduct
    .then((data) => {
      if (screen.width > 600) {
        $('#product-title').text(data.name);
        $('#product-brand').text(data.brand);
        $('#price').text(data.price);
        $('#default-img').attr('src', data.preview);
        $('#desc').text(data.description);
        $('#preview-imgs').text('');
        for (let i = 0; i < data.photos.length; i++) {
         
          let thisImg = $('<img>')
            .addClass('preview-img')
            .attr('src', data.photos[i]);
          if (i == 0) {
            thisImg.addClass('active-img');
          }
          thisImg.click(function () {
            $('#default-img').attr('src', data.photos[i]);
            $('.preview-img').removeClass('active-img');
            thisImg.addClass('active-img');
          });
          $('#preview-imgs').append(thisImg);
        }
      } else {
        $('#product-title').text(data.name);
        $('#product-brand').text(data.brand);
        $('#price').text(data.price);
        $('#desc').text(data.description);
        $('#preview-imgs').text('');
        $('#preview').text('');
        $('#d-img').text('');
        for (let i = 0; i < data.photos.length; i++) {
          let thisImg = $('<img>')
            .addClass('preview-img')
            .attr('src', data.photos[i]);
          $('#d-img').append(thisImg);
        }
        $('#d-img').slick({
          autoplay: true,
          dots: true,
          arrows: false,
          autoplaySpeed: 2000,
        });
      }

      $('#btn-cart').click(function () {
        $('#btn-cart').css({
          transform: 'scale(1.1)',
        });
        setTimeout(() => {
          $('#btn-cart').css({
            transform: 'scale(1)',
          });
        }, 200);
        if (localStorage.getItem('productList') == null) {
          let thisResponse = { ...data };
          let productList = [];
          thisResponse.count = 1;

          productList.push(thisResponse);
          localStorage.setItem('productList', JSON.stringify(productList));
        } else {
          let dataFromLocal = JSON.parse(localStorage.getItem('productList'));
          let found = false;
          for (var i = 0; i < dataFromLocal.length; i++) {
            if (dataFromLocal[i].id == data.id) {
              found = true;

              break;
            }
          }
          if (found) {
            dataFromLocal[i].count += 1;

            localStorage.setItem('productList', JSON.stringify(dataFromLocal));
          } else {
            let thisResponse = { ...data };
            thisResponse.count = 1;
            dataFromLocal.push(thisResponse);
            localStorage.setItem('productList', JSON.stringify(dataFromLocal));
          }
        }
        $('.cart-items').text(parseInt($('.cart-items').text()) + 1); 

        var dataFromLocal = JSON.parse(localStorage.getItem('productList'));    
        var totalCount = 0;      
        for(var i=0; i<dataFromLocal.length; i++) 
        { 
          totalCount = totalCount + dataFromLocal[i].count;     
         }
        $('.cart-items').html(totalCount);  
    

      });
      
    })
    
});
