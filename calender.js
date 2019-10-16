class calenderItem { 
    constructor(text, dateTime, element){
        this.text = text;
        this.date = dateTime;
        this.element = element;
    }
}
class dateTime{
    constructor(day, month, year, hours, minutes){
        this.day = day; 
        this.month = month; 
        this.year = year; 
        this.hours = hours, 
        this.minutes = minutes; 
    }
}
let eventList = [];
    
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = [31,28,31,30,31,31,30,31,30,31,30,31];
    
let month = new Date().getMonth();
let year = new Date().getFullYear();
    

$(document).ready(function(){
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
    
    $("#save").click(function(){
        addEvent();
        showEvents();
        $("#myModal").modal("hide");
    });

    $("#addToDo").popover({
        placement: "bottom",
        title: "Add To Do Item",
        html: true,
        content: $("#formToDo").html()
    }).click(function(){
        $("#saveToDo").click(function(){
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = $("#toDo").val();
            $(".listToDo").append(li);
            $("#addToDo").popover("hide");
        })  
    })

    $("#addReminder").popover({
        placement: "bottom",
        title: "Add a reminder",
        html: true,
        content: $("#formReminder").html()
    }).click(function(){
        $("#saveReminder").click(function(){
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.innerHTML = $("#reminder").val();
            $(".listReminder").append(li);
            $("#addReminder").popover("hide");
        })  
    })

    $('#datetimepicker1').datetimepicker();
    $("#datetimepicker1").data("DateTimePicker").sideBySide(true).showClose(true);
    $('#datetimepicker1').data("DateTimePicker").format("DD/MM/YYYY, kk")
    console.log( $('#datetimepicker1').data("DateTimePicker").format());

    $(document).on("show.bs.modal", function(){
        clearModal();
        addEvent();
    });
    getData();
    displayMonth();

})




function addEvent(){
    
    let text = $("#txtEvent").val();
    let selectedDate = formatDate(new Date($("#date").val()));
    let li = document.createElement("li");
    li.innerHTML = text;
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-info");
    let x = new calenderItem(text,selectedDate,li);
    saveData(x);
} 
function clearModal(){
    $("#txtEvent").val("");
}

function formatDate(date){
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return new dateTime(day,month,year,hours,minutes);
}

function getData(){
    if(JSON.parse(localStorage.getItem("events")==null)){
        this.eventList = [];
    }
   else{
    this.eventList = JSON.parse(localStorage.getItem("events"));
   } 
}

function saveData(newEvent){
    getData();
    eventList.push(newEvent);
    localStorage.setItem("events", JSON.stringify(eventList));
}


function daysOfMonth(month,year){
    if((month == 1)&&(year % 4 == 0)&&(year % 100 == 0)&&(year % 400 == 0)){
        return 29;
    }
    else{
        return days[month];
    }
}

function showEvents(){
    let i = 1;
    $("td").each(function(){
        $(this).find("ul").empty();
        for(item of eventList){
            if((item.date.month==month)&&(item.date.year == year)){
                if(item.date.day == i){
                    $(this).find("ul").append(item.element);
                }
            }
        }
        i++;
    })
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
        //td.append(document.createElement("p").innerHTML = j+1);
        td.innerHTML = j+1;
        startDay++;
        if(startDay ==  7){
            startDay = 0 ;
        }
    } 
    fillTable();
    console.log(eventList);
    showEvents();
}

function fillTable(){
    $("td").each(function(){
        if($(this).html().length > 0){
            let ul = document.createElement("ul");
            ul.classList.add("list-group-flush")
            $(this).append(ul);
            $(this).click(function(){
                let clicked = $(this).text();
                console.log(clicked);
                $("#datetimepicker1").data("DateTimePicker").date(new Date(clicked,month,year));
                $("#myModal").modal({
                    backdrop: "static",
                    keyboard:true
                });
            })
        }
    });
}
/*  $(function) () {
                $('#datetimepicker1').datetimepicker({
                    dateFormat: "dd-mm-yyyy"}).datetimepicker("setDate", new Date(clicked,month,year));
                });
                });*/



    




