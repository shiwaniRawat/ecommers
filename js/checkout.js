$(document).ready(function() {
alert("ok");
    function CheckoutProductCard(obj) {
       

        var card = document.createElement('div');
        card.classList.add('checkout');

        var first_Div = document.createElement('div');
        var product_Img = document.createElement('img');
        product_Img.classList.add('checkout-product-img');
        product_Img.src = obj.preview;
        first_Div.appendChild(product_Img);

        var second_Div = document.createElement('div');
        var product_Name = document.createElement('h4');
        product_Name.innerHTML = obj.name;
        var product_Count = document.createElement('p');
        product_Count.innerHTML = 'x'+obj.count;
        var amount_Label = document.createElement('span');
        amount_Label.innerHTML = 'Amount: Rs ';
        var amount_span = document.createElement('span');
        amount_span.innerHTML = parseInt(obj.count) * parseInt(obj.price);
        var product_amount = document.createElement('p');
        product_amount.appendChild(amount_Label);
        product_amount.appendChild(amount_span);
        second_Div.appendChild(product_Name);
        second_Div.appendChild(product_Count);
        second_Div.appendChild(product_amount);

        card.appendChild(first_Div);
        card.appendChild(second_Div);

        return card;
    }

    var productList = window.localStorage.getItem('productList');
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

    // console.log(productList);
    var grandTotal = 0;
    for(var i=0; i<productList.length; i++) {
        $('#card-list').append(CheckoutProductCard(productList[i]));
      

        var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

        grandTotal = grandTotal + totalForCurrentProduct;

        // console.log('Total For Product '+ i + ' is=> ' + totalForCurrentProduct);
    }

    $('#item-count').html(productList.length);
    $('#total').html(grandTotal);

    $('#place-order').click(function() {

        var orderItemArr = [];
        for(var i=0; i<productList.length; i++) {
            var prodObj = {
                "id": productList[i].id,
                "brand": productList[i].brand,
                "name": productList[i].name,
                "price": productList[i].price,
                "preview": productList[i].preview,
                "isAccessory": productList[i].isAccessory
            }

            orderItemArr.push(prodObj);
        }

        // console.log(productList);
        // console.log(orderItemArr);

        var dataObj = {
            amount: grandTotal,
            products: orderItemArr
        }
        $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
            alert('Order Placed Successfully')
            localStorage.setItem('productList', []);

            location.assign('./thankyou.html');
        })
    })
})