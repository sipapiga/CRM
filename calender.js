class calenderItem { 
    constructor(id,text, description, date, element){
        this.id = id;
        this.type = "calenderItem";
        this.text = text;
        this.description = description;
        this.date = date;
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
class reminder{
    constructor(id,text,element){
        this.id = id;
        this.type = "reminder";
        this.text = text;
        this.element = element;
    }
}

class toDo{
    constructor(id,text,element){
        this.id = id;
        this.type = "toDo";
        this.text = text;
        this.element = element;
    }
}
class eventList{
    constructor() {
        this.list = [];
        this.id = 1;
    }
}

let testList = new eventList();
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
            let li = makeListItem(2); 
            /*let button = document.createElement("button");
            button.classList.add("btn", "btn-danger");
            button.html = "X";
            li.append(button);*/
            $(".listToDo").append(li);
            showEvents();
            $("#addToDo").popover("hide");
        })  
        $("#cancelToDo").click(function(){
            console.log("clicked to do")
            $(".popover").popover("hide");
        });  
    
    })

    $("#addReminder").popover({
        placement: "bottom",
        title: "Add a reminder",
        html: true,
        content: $("#formReminder").html()
    }).click(function(){
        $("#saveReminder").click(function(){
            let li = makeListItem(1);
            $(".listReminder").append(li);
            showEvents();
            $("#addReminder").popover("hide");
        }) 
        $("#cancelReminder").click(function(){
            console.log("clicked reminder");
            $(".popover").popover("hide");
        });  
    
    })

    $('#datetimepicker1').datetimepicker();
    $("#datetimepicker1").data("DateTimePicker").sideBySide(true).showClose(true);

    $(document).on("show.bs.modal", function(){
        clearModal();
    });

    getData();
    displayMonth();
})

function createElementFromHTML(htmlString){
    for(item of list){
        var div = document.createElement("div");
        div.innerHTML = htmlString.trim();
    }
    return div;
}

function makeListItem(int){
    let div = document.createElement("div");
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    if(int == 1){
        div.append(li);
        li.innerHTML = $("#reminder").val();
        let x = new reminder(testList.id,li.innerHTML,div.innerHTML);
        saveData(x);
    }
    else{
        div.append(li);
        li.innerHTML = $("#toDo").val();
        let x = new toDo(testList.id,li.innerHTML,div.innerHTML);
        saveData(x);
    }
    return div;
}

function removeItem(item){
    console.log(item.parent());
}

function addEvent(){
    let selectedDate = formatDate(($("#date").val()));
    let div = document.createElement("div");
    let li = document.createElement("li");
    li.innerHTML = $("#txtEvent").val();
    li.classList.add("list-group-item","list-group-item-info");
    li.setAttribute("id", testList.id);
    console.log(createElementFromHTML(div.innerHTML));
    div.append(li);
    let x = new calenderItem(testList.id,$("#txtEvent").val(),$("#descriptionEvent").val(),selectedDate,div.innerHTML);
    console.log(x);
    saveData(x);
} 
function clearModal(){
    $("#txtEvent").val("");
    $("#descriptionEvent").val("");
}

function formatDate(date){
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return new dateTime(day,month,year,hours,minutes);
}

function getData(){
    if(((JSON.parse(localStorage.getItem("events"))!= null)&&(JSON.parse(localStorage.getItem("ID")!=null)))){
        this.list = JSON.parse(localStorage.getItem("events"));
        testList.id = JSON.parse(localStorage.getItem("ID"));
    }
    else{
        this.list = [];
    }
    return this.list;
}

function saveData(newEvent){
    this.list = getData();
    testList.id ++;
    if(newEvent.text != ""){
        this.list.push(newEvent);
    }
    localStorage.setItem("ID", JSON.stringify(testList.id));
    console.log(testList.id);
    console.log(this.list);
    localStorage.setItem("events", JSON.stringify(this.list));
}

function removeData(event){
    //remove event from list with ID 
    localStorage.setItem("events", JSON.stringify(this.list));
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
        for(item of list){
            if(item.type == "calenderItem"){
                if((item.date.month == month)&&(item.date.year == year)&&(item.date.day == i-1)){
                    let element = createElementFromHTML(item.element);
                    $(this).find("ul").append(element);
                }
            } 
        }
        i++;
    })
    addClick();
}
function addClick(){
    $(".listToDo").empty();
    $(".listReminder").empty();
    for(item of list){
        if(item.type == "toDo"){
            console.log(item);
            let element = createElementFromHTML(item.element);
            $(".listToDo").append(element);
        }
        if(item.type == "reminder"){
            console.log(item);
            let element = createElementFromHTML(item.element);
            console.log(element);
            element.click(function(){
                console.log("clicked reminder");
            })
            $(".listReminder").append(element);
        }
    }
    $(".listReminder").find("li").each(function(){
        $('<i class="fas fa-times reminder float-right"></i>').appendTo(this);
        $("i.reminder").each(function(){
            $(this).click(function(){
                console.log("remove list item");
                console.log(this); //this is list item
            })
        })
    });
    $(".listToDo").find("li").each(function(){
        $('<i class="fas fa-times todo float-right"></i>').appendTo(this);
        $("i.todo").each(function(){
            $(this).click(function(){
                console.log("remove to do item");
            })
        })
    });
    $("table").find("li").each(function(){
        $(this).click(stopEvent);
        $(this).click(function(){
            $(".popover").popover("hide");
        });
        popover(this);
    })

}
function stopEvent(ev){
    ev.stopPropagation();
}

function popover(el){
    let calItem;
    for(item of list){
        if(el.id == item.id){
           calItem = item;
        }
    }
    $(el).popover({
        placement: "right",
        title: "Calender Item",
        html: true,
        content: function(){
            console.log(calItem);
            $(".calender-item-title").html(calItem.text);
            $(".calender-item-text").html(calItem.description);
            return $("#pop-calender-item").html();
        }
        
    }).click(function(){
        $("#delCalenderItem").click(stopEvent);
        $("#delCalenderItem").click(function(){
            console.log(list);
            console.log(list[calItem.id -1]);
        })  
        $("#cancel").click(stopEvent);
        $("#cancel").click(function(){
            $(".popover").popover("hide");
        }); 
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
        td.innerHTML = j+1;
        startDay++;
        if(startDay ==  7){
            startDay = 0 ;
        }
    } 
    fillTable();
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
                $("#datetimepicker1").data("DateTimePicker").date(new Date(year,month,clicked));
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



    




