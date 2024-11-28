<?php
    header('Content-Type: application/json; charset=UTF-8');
    //$input = json_decode(file_get_contents('php://input'), true);

    
    $connect = mysqli_connect("alan567.cafe24.com:3306","alan567","kw2001!!","alan567");

    $select = mysqli_select_db($connect, "alan567");
    
    $print = "";
    $sql = "Select category_name from category;";
    $result = mysqli_query($connect, $sql);
    if (isset($result->num_rows) && $result->num_rows >0){
        while($row = $result->fetch_assoc()){
            $print .= $row['category_name']."|";
        }
    }

    echo json_encode(['body' => $print]);
    //echo json_encode(['body' => $img]);
?>