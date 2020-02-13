$(document).ready(function () {
    $('#orderTable').DataTable({
        "lengthMenu": [5, 10, 20, 50],
        "pageLength": 5
    });
});
// ------------------- DELETE MODAL -------------------- //

$('#deleteOrderModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let id = button.data('id'); // Extract info from data-* attributes
    let modal = $(this);
    modal.find('.modal-footer #modalDeleteButton').attr("onclick", "deleteOrder('" + id + "')");
});

function deleteOrder(id) {
    $('#deleteOrderModal').modal('hide');
    $.ajax({
            type: 'DELETE',
            url: `/api/orders/${id}`,
        })
        .done(function (response) {
            window.location.reload();
        })
        .fail(function (err) {
            // Show alert message
            console.log(err);
        });
}

