let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = [31,28,31,30,31,31,30,31,30,31,30,31];

let month = new Date().getMonth();
let year = new Date().getFullYear();

displayMonth();

$(".icon").click(function(){
    if($(this).hasClass("next")){
        month++;
        if(month == months.length){
            month = 0;
            year++;
        }
        $("td").empty();
        displayMonth();
    }
    else if(($(this).hasClass("previous"))){
        month--;
        if(month == -1){
            month = months.length -1;
            year--;
        }
        $("td").empty();
        displayMonth();
    }
});

function daysOfMonth(month,year){
    if((month == 1)&&(year % 4 == 0)&&(year % 100 == 0)&&(year % 400 == 0)){
        return 29;
    }
    else{
        return days[month];
    }
}

function displayMonth(){
    let week = 0;
    let startDay = new Date(year,month,1).getDay() -1;
    if(startDay == -1){
        startDay = 6;
    }
    $(".month").html(months[month]); 
    $(".year").html(year);
    for(j = 0; j < daysOfMonth(month, year); j++){
        if((j+ new Date(year,month,1).getDay() -1) % 7 == 0){
            week++;
        }
        else if(($("._" + week).children()[startDay])==undefined){
            week ++;
        }

        let td = $("._"+ week).children()[startDay];
        td.innerHTML = j+1;
        /*let td = document.createElement("td");
        td.innerHTML = j+1;
        $("._"+ week).append(td);*/
        startDay++;
        if(startDay ==  7){
            startDay = 0 ;
        }
    }
    addList();
}

function addList(){
    let list = document.createElement("ul");
    $("table ul").addClass("list-group");

    let tds = $("td");
    for(td of tds){
        if(td.innerHTML.length != 0){
            td.append(list); 
            td.click(function(){
                let listItem = document.createElement("li");
                listItem.innerHTML="Test";
                //$("table li").addClass("list-group-item");   
                $(this).find("ul").append(listItem);
                }); 
            } 
        }
    }
    /*$("td").each(function(){
        console.log($(this).html().length);
        if($(this).html().length != 0){
            $(this).append(list); 
            $(this).click(function(){
                let listItem = document.createElement("li");
                listItem.innerHTML="Test";
                //$("table li").addClass("list-group-item");   
                $(this).find("ul").append(listItem);
                }); 
            } 
        });*/

//if
//console.log($("td").children().length);


/*if($("td").children().length != 0){
    $("td").append(list); 
    $("td").click(function(){
        let listItem = document.createElement("li");
        listItem.innerHTML="Test";
        //$("table li").addClass("list-group-item");   
        $(this).find("ul").append(listItem);
        }) 
    }  
}*/

/*if(($("td").html() !== null)||($("td").html() !== undefined)){
     
}*/
    




