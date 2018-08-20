<?php

    $startDate = $_REQUEST['startdate'];
    $endDate = $_REQUEST['enddate'];
    $favorites = $_REQUEST['favorites'];
    $title = $_REQUEST['title'];
    $body = $_REQUEST['body'];
    $sort = $_REQUEST['sort'];
    $sort_descending = $_REQUEST['sort_descending'];
    $limit = $_REQUEST['limit'];

    $response = file_get_contents('http://000.vlcnetworks.net/api/indirect/getposts.html.php?startdate=' . $startDate . '&enddate=' . $endDate . '&favorites=' . $favorites . '&title=' . $title . '&body=' . $body .'&limit=' . $limit . '&sort_descending=' . $sort_descending . '&sort=' . $sort);

    print($response);

?>