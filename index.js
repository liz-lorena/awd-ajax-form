$(document).ready(function() {

    $("#getposts_form").submit(function(event) {
        event.preventDefault();

        // Make quick references to our fields
        var startdate = $('#startdate').val();
        var enddate = $('#enddate').val();
        var favorites = $('#favorites').val();
        var title = $('#title').val();
        var limit = $('#limit').val();
        var body = $('#body').val();
        var sort = $('#sort').val();
        var sort_descending = $('#sort_descending').val();

        //Regular Expression for Date Validation. Format in mm/dd/yyyy, m/d/yyyy, mm/d/yyyy, or m/dd/yyyy
        var dateRegExp = /^([0][1-9]|[1-9]|[1][0-2])\/([0][1-9]|[1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([2][0][0-9][0-9])$/; 

        //Clear the errors and output 
        $('#errors').empty();
        $('#output').empty();
        
        //Validate Dates
        var error = false;

        if (!dateRegExp.test(startdate)) { //Appends the error to the page at the error id for invalid start date input
            $('#errors').append('<p>Error: Start date must be in valid format</p>');
            error = true;
        }
        if (!dateRegExp.test(enddate)) { ///Appends the error to the page at the error id for invalid end date input
            $('#errors').append('<p>Error: End date must be in valid format</p>');
            error = true;
        }

        if (error == true) { //if there's an error, return false
            return false;
        }
        
        //shows the loading gif modal to show something is happening
        $("#ajaxIndicator").modal('show');
        
        //Ajax call to proxy.php file
        $.ajax({
            url: 'proxy.php',
            datatype: 'HTML',
            type: 'GET',
            data: {
                startdate: startdate,
                enddate: enddate,
                favorites: favorites,
                sort: sort,
                sort_descending: sort_descending,
                title: title,
                body: body,
                limit: limit
            },
            success: function(serverResponse) { //output on success
                $('#output').append(serverResponse);
             },
            error: function(jqXHR, textStatus, errorThrown) { //outputs errors on failure
                if (errorThrown == 'Service Unavailable') {
                    $('#errors').append('<p>Your Cloud9 isn\'t running!</p>');
                } else {
                    $('#errors').append('<p>An unknown error ocurred: ' + errorThrown + '!</p>');
                }
                $("#ajaxIndicator").modal('hide');
            },
            complete: function() { //hide loading gif modal when call is complete
                $("#ajaxIndicator").modal('hide');
            }
        });

    });

});


