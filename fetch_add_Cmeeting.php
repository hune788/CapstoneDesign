<?php
    header('Content-Type: application/json; charset=UTF-8');
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['category'])){
        $category = $input['category'];
    }
    else{
        $category = "";    
    }


    $connect = mysqli_connect("alan567.cafe24.com:3306","alan567","kw2001!!","alan567");
    $select = mysqli_select_db($connect, "alan567");

    $category_no = "";
    $sql = "Select category_no from category where category_name ='$category';";
    
    $result = mysqli_query($connect, $sql);
    if (isset($result->num_rows) && $result->num_rows >0){
        while($row = $result->fetch_assoc()){
            $category_no .= $row['category_no'];
        }
    }

    $sql = "Select meet_name, meet_desc from meet where category_no = '$category_no';";
    
    $print = "";
    $result = mysqli_query($connect, $sql);
    if (isset($result->num_rows) && $result->num_rows >0){
        while($row = $result->fetch_assoc()){
            $print .= $row['meet_name']."|".$row['meet_desc']."/";
        }
    }

    echo json_encode(['body' => $print]);
?>