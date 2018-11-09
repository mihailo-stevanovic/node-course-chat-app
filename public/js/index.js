jQuery(document).ready(function ($) {
    var socket = io();
    socket.on('signUp', function(activeRooms) {
        if (activeRooms.length > 0) {
            var dropdown = $('#room-name-select');
            activeRooms.forEach(function (room) {
                dropdown.append($('<option></option>').text(room.toUpperCase()).attr('value', room));
            });
        } else {
            $('#room-name-select').attr("disabled", "disabled");
        } 
        
    });
            // Remove empty fields from GET forms
            // Author: Bill Erickson
            // URL: http://www.billerickson.net/code/hide-empty-fields-get-form/

            // Change 'form' to class or ID of your specific form
            $(".centered-form__form form").submit(function () {
                $(this).find(":input").filter(function () {
                    return !this.value;
                }).attr("disabled", "disabled");                
                $('#room-name-select').filter(function () {                    
                    if(this.value){                        
                        $('#room-name-text').attr("disabled", "disabled");
                    }
                });
                return true; // ensure form still submits
            });

            // Un-disable form fields when page loads, in case they click back after submission
            // $(".centered-form__form form").find(":input").removeAttr("disabled");
            

            // Change 'form' to class or ID of your specific form
            // $(".centered-form__form form").submit(function () {
                
            //     return true; // ensure form still submits
            // });

            // Un-disable form fields when page loads, in case they click back after submission
            

            

        });