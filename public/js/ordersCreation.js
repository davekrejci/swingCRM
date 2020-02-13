$("#addRowButton").click(function (event) {
  // prevent submitting form
  event.preventDefault();
  updateOrderLineTable();
  updateTotal();
});

$("#createOrderButton").click(function () {
  createOrder();
});

function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("orderLinesTable").deleteRow(i);
  updateTotal();
}

function updatePricePerUnit() {
  // Get current value from select
  let id = $('#productSelect option:selected').data('id');
  // Get product info from server
  $.ajax({
    type: 'GET',
    url: `/api/products/${id}`,
  })
  .done(function (product) {
    // Update ppu value
    $('#pricePerUnit').val(product.price);
  })
  .fail(function (err) {
      // Show alert message
      console.log(err);
  });
}

function updateTotal() {
  let total = 0;
  let table = $("#orderLinesTable tbody");
  
  table.find('tr').each(function (i, el) {
    let tds = $(this).find('td');
    let subtotal = parseInt(tds.eq(2).text());
    total += subtotal;
  });
  // update dom
  $('#total').val(total, '€');

}

function updateOrderLineTable() {
  // Get product name
  let product = $('#productSelect').val();
  if (!product) {
    swal({
      title: "Whoops!",
      text: "You must choose a product!",
      icon: "error",
    });
    return;
  }
  let id = $('#productSelect option:selected').data('id');  
  // Get quantity
  let quantity = $('#quantitySelect').val();
  if (!quantity || quantity == 0) {
    swal({
      title: "Whoops!",
      text: "You must enter a quantity!",
      icon: "error",
    });
    return;
  }
  // Get price per unit
  let price = $('#pricePerUnit').val();

  // Get a reference to the table
  let tableRef = document.querySelector("#orderLinesTable tbody");

  // Insert a row at the end of the table
  let newRow = tableRef.insertRow(-1);

  // Insert a cell in the row at index 0 - PRODUCT NAME
  let firstCell = newRow.insertCell(0);
  $(firstCell).append(product);
  $(firstCell).attr('product-id', id);

  // Insert a cell in the row at index 1 - QUANTITY
  let secondCell = newRow.insertCell(1);
  $(secondCell).append(quantity);

  // Insert a cell in the row at index 2 - SUBTOTAL
  let thirdCell = newRow.insertCell(2);
  $(thirdCell).append(quantity*price);

  // Insert a cell in the row at index 3 - REMOVE
  let fourthCell = newRow.insertCell(3);
  $(fourthCell).append('<button class="btn btn-danger w-75" onclick="deleteRow(this)">Remove &nbsp; <i class="fas fa-minus-circle"></i></button>');

}

function createOrder() {

  // Get customer
  let customerId = $("#customerSelect").val();
  if(!customerId) {
    swal({
      title: "Whoops!",
      text: "You must pick a customer!",
      icon: "error",
    });
    return;
  }

  // Get order lines
  let orderLines = [];
  let table = $("#orderLinesTable tbody");
  table.find('tr').each(function (i, el) {
    let tds = $(this).find('td');
    let product = tds.eq(0).attr('product-id');
    let quantity = tds.eq(1).text();
    orderLines.push({
      product: product,
      quantity: quantity
    });
  });

  if(orderLines.length === 0) {
    swal({
      title: "Whoops!",
      text: "Seems like you don't have anything in your basket yet!",
      icon: "error",
    });
    return;
  }

  let orderData= {
      customerId: customerId,
      orderLines: orderLines
  };

  $.ajax({
      type: 'POST',
      url: '/api/orders',
      data: orderData,
      success: function (res) {
        console.log(res);
        swal({
          title: "Success!",
          text: "Order has been created!",
          icon: "success",
        });
      },
      error: function(err) {
        swal({
          title: "Error",
          text: 'Something went wrong. Please try again.',
          icon: "error",
        });
     }
  });

} 