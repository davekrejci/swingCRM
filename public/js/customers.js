$(document).ready(function () {
    $('#customerTable').DataTable({
        "lengthMenu": [5, 10, 20, 50],
        "pageLength": 5
    });
});
// ------------------- DELETE MODAL -------------------- //

$('#deleteCustomerModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let id = button.data('id'); // Extract info from data-* attributes
    let name = button.data('name');
    let modal = $(this);
    modal.find('.modal-footer #modalDeleteButton').attr("onclick", "deleteCustomer('" + id + "')");
    modal.find('#customerName').html(name);
});

function deleteCustomer(id) {
    $('#deleteCustomerModal').modal('hide');
    $.ajax({
            type: 'DELETE',
            url: `/api/customers/${id}`,
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

$('#editCustomerModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let id = button.data('id'); // Extract info from data-* attributes
    let name = button.data('name');
    let email = button.data('email');
    let address = button.data('address');
    let phone = button.data('phone');
    let discount = button.data('discount');
    let modal = $(this);
    modal.find('#editId').val(id);
    modal.find('#customerName').val(name);
    modal.find('#customerEmail').val(email);
    modal.find('#customerAddress').val(address);
    modal.find('#customerPhone').val(phone);
    modal.find('#customerDiscount').val(discount);
    
});

function editCustomer(){
    let form = $('#editForm');
    let id = $('#editId').val();
    var formData = $(form).serialize();
    $('#editCustomerModal').modal('hide');
    
    $.ajax({
        type: 'PUT',
        url: `/api/customers/${id}`,
        data: formData
    })
    .done(function(response) {    
        window.location.reload();
    })
    .fail(function(err) {
        console.log(err);
    });
}
