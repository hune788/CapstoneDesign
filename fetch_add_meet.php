<?php
    header('Content-Type: application/json; charset=UTF-8');
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['name'])){
        $name = $input['name'];
    }
    else{
        $name = "";    
    }
    
    if (isset($input['category'])){
        $category = $input['category'];
    }
    else{
        $category = "";    
    }

    if (isset($input['desc'])){
        $desc = $input['desc'];
    }
    else{
        $desc = "";    
    }    

    if (isset($input['maxNum'])){
        $maxNum = $input['maxNum'];
    }
    else{
        $maxNum = "";    
    }

    //$result = $name."|".$category."|".$desc."|".$maxNum;
    
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

    
    $now = date("Y-m-d H:i:s", time());

    $query = "insert into meet(meet_name, meet_desc, max_count, category_no, created_date) values('$name', '$desc', '$maxNum', '$category_no', '$now')";
    $result = mysqli_query($connect, $query);

    echo json_encode(['body' => $result]);

    /*
    $sql = "Select meet_no, meet_name, meet_desc, max_count, member_count, category_no, created_date from meet;";
    
    $print = "";
    $result = mysqli_query($connect, $sql);
    if (isset($result->num_rows) && $result->num_rows >0){
        while($row = $result->fetch_assoc()){
            $print .= $row['meet_no'].",".$row['meet_name']$row['meet_desc'].",".$row['max_count'].",".$row['member_count'].",".$row['category_no'].",".$row['created_data']."/";
        }
    }

    echo json_encode(['body' => $print]);
    */
?>