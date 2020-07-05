
$(document).ready(function() {

  function createCard(data) {
   
    var oneDiv = document.createElement('div');
    oneDiv.classList.add('card');

    var product_link = document.createElement('a');
    product_link.href = 'detail.html?p='+data.id;

    var product_image = document.createElement('img');
    product_image.classList.add('item-image');
    product_image.src = data.preview;
    product_image.alt = data.name + ' Pic';

    product_link.appendChild(product_image);

    var innerDiv = document.createElement('div');
    innerDiv.classList.add('product');

    var product_name = document.createElement('h4');
    var product_text = document.createTextNode(data.name);
    product_name.appendChild(product_text);

    var product_brand = document.createElement('h5');
    var product_brand_text = document.createTextNode(data.brand);
    product_brand.appendChild(product_brand_text);

    var product_price = document.createElement('p');
    var product_text = document.createTextNode('Rs ' + data.price);
    product_price.appendChild(product_text);

    innerDiv.appendChild(product_name);
    innerDiv.appendChild(product_brand);
    innerDiv.appendChild(product_price);

    oneDiv.appendChild(product_link);
    oneDiv.appendChild(innerDiv);

    return oneDiv;
  }

  $.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product', function(data, status) {
    var response = data;

    for(var i=0; i<response.length; i++) {
      if(response[i].isAccessory) {
        $('#accessory-item').append(createCard(response[i]))
      } 
      else {
        $('#clothing-item').append(createCard(response[i]))
      }
    }
  })
});
   