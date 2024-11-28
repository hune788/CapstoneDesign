function showPopUp(){
    var elem = document.getElementById("create_frame");
    elem.style.display = 'block';
}

function shutdown(){
    var elem = document.getElementById("create_frame");
    elem.style.display = 'none';
}

function removeDiv(remove_div){
    const div_top = document.getElementById(remove_div);
    div_top.innerHTML = '';
}

function categoryOpen(){
    fetch('./fetch_add.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var list = data.body.split('|');
        for (let i = 0; i < list.length; i++)
        {
            createContent(list[i]);
        }
    })
    .catch(function(error){
        console.error('Error:', error);
    });

}

function categoryMeeting(meet_name, meet_desc){
    const tag = document.getElementById('categoryMeet');
    const newDiv = document.createElement('div');

    newDiv.innerHTML = "<img style='width: 300px; height: 100px;' src='./image/null.png'><h3 style='margin-top: -10px;'>"+meet_name+"</h3><textarea style='width: 300px; height: 100px; resize: none; border: none;'>"+meet_desc+"</textarea><br><button style='margin-top: -30px; width: 300px; height: 30px; border: none; color: white; background-color: RGB(0,178,70); border-radius: 30px;'>참가신청</button>";
    newDiv.style.display = "inline-block";
    tag.appendChild(newDiv);
}

function showCategory_meet(value){
    removeDiv('categoryMeet');

    var rMeet = document.getElementById("recommendMeet");
    var rLabel = document.getElementById("recommendLabel");
    var pMeet = document.getElementById("popularMeet");
    var pLabel = document.getElementById("popularLabel");
    var cMeet = document.getElementById("categoryMeet");
    var cLabel = document.getElementById("categoryLabel");
    
    rMeet.style.display = 'none';
    rLabel.style.display = 'none';
    pMeet.style.display = 'none';
    pLabel.style.display = 'none';

    cLabel.innerHTML = value;

    var data = {category: value };
    fetch('./fetch_add_Cmeeting.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var list = data.body.split('/');
        for(let i = 0; i < list.length; i++){
            if (list[i] != '')
            {
                var words = list[i].split('|');
                categoryMeeting(words[0], words[1]);
            }
        }
        //console.log(data.body);


    })
    .catch(function(error){
        console.error('Error:', error);
    });



    //alert(value);
}

function insertMeet(){
    var name = document.getElementById("input_name");
    var category = document.getElementById("input_category");
    var desc = document.getElementById("input_desc");
    var maxNum = document.getElementById("input_maxNum");
    var img = document.getElementById("input_img");

    var data = {name : name.value, category: category.value, desc: desc.value, maxNum: maxNum.value };
    fetch('./fetch_add_meet.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data.body);
    })
    .catch(function(error){
        console.error('Error:', error);
    });

    shutdown();

}

function createContent(value){
    const tag = document.getElementById('category');
    const newDiv = document.createElement('div');
    const BR = document.createElement('br');
    const name = JSON.stringify(value);
    newDiv.innerHTML = "<button style='border: none' onclick='showCategory_meet("+name+")'>"+value+"</button>";
    tag.appendChild(newDiv);
    tag.appendChild(BR);
}


// fetch 예시
/*
fetch('./fetch_add.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data)
})
.then(function(response){
return response.json();
})
.then(function(data){
})
.catch(function(error){
    console.error('Error:', error);
});
*/