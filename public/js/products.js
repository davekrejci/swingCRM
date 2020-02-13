$(document).ready(function () {
    $('#productTable').DataTable({
        "lengthMenu": [5, 10, 20, 50],
        "pageLength": 5
    });
});
// ------------------- DELETE MODAL -------------------- //

$('#deleteProductModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let id = button.data('id'); // Extract info from data-* attributes
    let name = button.data('name');
    let modal = $(this);
    modal.find('.modal-footer #modalDeleteButton').attr("onclick", "deleteProduct('" + id + "')");
    modal.find('#productName').html(name);
});

function deleteProduct(id) {
    $('#deleteProductModal').modal('hide');
    $.ajax({
            type: 'DELETE',
            url: `/api/products/${id}`,
        })
        .done(function (response) {
            window.location.reload();
        })
        .fail(function (err) {
            // Show alert message
            console.log(err);
        });
}

// ------------------- EDIT MODAL -------------------- //

$('#editProductModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let id = button.data('id'); // Extract info from data-* attributes
    let sku = button.data('sku');
    let name = button.data('name');
    let price = button.data('price');
    let modal = $(this);
    // insert current data into form
    modal.find('#editId').val(id);
    modal.find('#productSKU').val(sku);
    modal.find('#productName').val(name);
    modal.find('#productPrice').val(price);
});

function editProduct(){
    let form = $('#editForm');
    let id = $('#editId').val();
    var formData = $(form).serialize();
    $('#editProductModal').modal('hide');
    
    $.ajax({
        type: 'PUT',
        url: `/api/products/${id}`,
        data: formData
    })
    .done(function(response) {    
        window.location.reload();
    })
    .fail(function(err) {
        console.log(err);
    });
}
