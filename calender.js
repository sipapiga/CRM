class calenderItem { 
    constructor(id,text, description, date){
        this.id = id;
        this.type = "calenderItem";
        this.text = text;
        this.description = description;
        this.date = date;
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
    constructor(id,text){
        this.id = id;
        this.type = "reminder";
        this.text = text;
    }
}

class toDo{
    constructor(id,text){
        this.id = id;
        this.type = "toDo";
        this.text = text;
    }
}
class eventList{
    constructor() {
        this.list = [];
        this.id = 1;
    }
}
class element{
    constructor(id,element){
        this.id = id;
        this.element = element;
    }
}

this.elements = [];

let testList = new eventList();
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let days = [31,28,31,30,31,31,30,31,30,31,30,31];
    
let month = new Date().getMonth();
let year = new Date().getFullYear();
    

$(document).ready(function(){
    
    $("#addToDo").popover({
        placement: "bottom",
        title: "Add To Do Item",
        html: true,
        content: $("#formToDo").html()
    }).click(function(){
        $("#saveToDo").click(function(){
            let x = new toDo(testList.id, $("#toDo").val());
            saveData(x);
            $(".popover").popover("hide");
        })  
        $("#cancelToDo").click(function(){
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
            let x = new reminder(testList.id, $("#reminder").val());
            saveData(x);
            $(".popover").popover("hide");
        }) 
        $("#cancelReminder").click(function(){
            $(".popover").popover("hide");
        });  
    })

    $("#datetimepicker1").datetimepicker();
    $("#datetimepicker1").data("DateTimePicker").sideBySide(true).showClose(true);
  
    displayMonth();
    scrollMonth();
    saveData();
    modal();
})

function scrollMonth(){
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
}

function modal(){
    $("#save").click(function(){
        addEvent();
        $("#myModal").modal("hide");
    });

    $(document).on("show.bs.modal", function(){
        $("#txtEvent").val("Enter Event Title");
        $("#txtEvent").click(function(){
            $(this).val("");
        });
        $("#descriptionEvent").val("");
    });
}

function removeItem(id){
    for(item of list){
        if(id == item.id){
            let place = list.indexOf(item);
            list.splice(place, 1);
            elements.splice(place,1);
        }
    } 
    setID();
    localStorage.setItem("ID", JSON.stringify(testList.id));
    localStorage.setItem("events", JSON.stringify(this.list));
    saveData();
}

function setID(){
    let i = 1;
    for(item of list){
        for(el of elements){
            if(el.id == item.id){
                el.id = i;
            }
        }
        item.id = i;
        i++;
    }
    testList.id = i -1;
}

function addEvent(){
    let selectedDate = formatDate(($("#date").val()));
    let x = new calenderItem(testList.id,$("#txtEvent").val(),$("#descriptionEvent").val(),selectedDate);
    saveData(x);
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
    if((newEvent != undefined)&&(newEvent.text != "")){
        list.push(newEvent);
    }
    localStorage.setItem("ID", JSON.stringify(testList.id));
    localStorage.setItem("events", JSON.stringify(this.list));
    makeElements();
}

function makeElements(){
    elements = [];
    for(item of list){
        if(item.type == "calenderItem"){
            let el = document.createElement("li");
            el.classList.add("list-group-item","list-group-item-info","py-1");
            el.setAttribute("id", item.id);
            if(item.text.length > 10){
                el.innerHTML = item.date.hours + ":" + item.date.minutes + " " + item.text.slice(0,15) + "...";
            }
           else{
            el.innerHTML = item.date.hours + ":" + item.date.minutes + " " + item.text;
           }
            elements.push(new element(item.id, el));
        }
        else if(item.type == "reminder"){
            let div = document.createElement("div");
            let el = document.createElement("li");
            el.classList.add("list-group-item","list-group-item-info");
            el.setAttribute("id", item.id);
            el.innerHTML = item.text;
            div.append(el);
            elements.push(new element(item.id, div));
        }
        else if(item.type == "toDo"){
            let div = document.createElement("div");
            let el = document.createElement("li");
            el.classList.add("list-group-item","list-group-item-info");
            el.setAttribute("id", item.id);
            el.innerHTML = item.text;
            div.append(el);
            elements.push(new element(item.id, div));
        }
    }
    showLists();
    removeListItem();
    showCalItems();
}

function daysOfMonth(month,year){
    if((month == 1)&&(year % 4 == 0)&&(year % 100 == 0)&&(year % 400 == 0)){
        return 29;
    }
    else{
        return days[month];
    }
}

function showCalItems(){
    let i = 1;
    $("td").each(function(){
        let ul = $(this).find("ul")
        ul.empty();
        let more = document.createElement("li");
        more.classList.add("list-group-item","list-group-item-info","py-1");
        more.innerHTML = "...";
        let oldHours;
        let oldMinutes
        for(item of list){
            if(item.type == "calenderItem"){
                if((item.date.month == month)&&(item.date.year == year)&&(item.date.day == i-1)){
                    if(ul.children().length > 2){
                        ul.append(more);
                    }
                    else{
                        let li;
                        jQuery.each(elements, function(){
                            if(item.id == ($(this)[0].id)){
                                li = $(this)[0].element;
                            }
                            if(item.date.hours < oldHours){
                                ul.prepend(li);
                            }
                            else if(item.date.hours == oldHours){    
                                if(item.date.minutes < oldMinutes){
                                    //console.log("this is smaller");
                                    ul.prepend(li);
                                }
                                else{
                                    ul.append(li);
                                }
                            }
                            else{
                                ul.append(li);
                            }
                            
                        })
                        oldMinutes = item.date.minutes;
                        oldHours = item.date.hours;
                    }
                }
            } 
        }
        i++;
    })
    calItemClick();
}

function calItemClick(){
    $("table").find("li").each(function(){
        $(this).click(stopEvent);
        let i;
        if($(this)[0].id.length > 0){
            let el = this;
            for(item of list){
                if(item.id == el.id){
                    i = item;
                }
            }
            $(this).click(function(){
                $("#myModal2").on("show.bs.modal",function(){
                    $(".calender-items").empty();
                    let modal = $(this);
                    $(".modal-title-calender").html("Title : " + i.text);
                    $(".calender-date").html("Date : " +  i.date.day + " " + months[i.date.month]+ " " + i.date.year);
                    $(".calender-time").html("Time : " + i.date.hours + ":" + i.date.minutes);
                    $(".calender-item-text").html("Description : <br>" + i.description);
                    $("#delete").css("visibility","visible");
                    $("#delete").on("click",function(){
                        modal.modal("hide");
                        removeItem(el.id);
                    });
                }).modal("show");
            });
        }
        else if($(this)[0].id.length == 0){
            $(this).click(function(){
                let el = $(this);
                $("#myModal2").on("show.bs.modal",function(){
                    showDay(el);
                }).modal("show");
                $(".calender-items").find("li").each(function(){
                    $(this).click(function(){
                        showItem(this);
                    })
                })
            })
        }
    }) 
}     
function showDay(el){
    $(".calender-items").empty();
    $(".modal-title-calender").html(el.parent()[0].id + " " + months[month]);
    $(".calender-item-title").html("");
    $(".calender-item-text").html("");
    $(".calender-date").html("");
    $(".calender-time").html("");
    $(".calender-items").empty();
    for(item of list){
        if(item.type == "calenderItem"){
            if((item.date.month == month)&&(item.date.year == year)&&(item.date.day == el.parent()[0].id)){
                let li;
                jQuery.each(elements, function(){
                    if(item.id == ($(this)[0].id)){
                        li = ($(this)[0].element);
                        li = li.cloneNode(true);
                        li.innerHTML =  item.date.hours + ":" + item.date.minutes + " " + item.text;
                    }
                });
                $(".calender-items").append(li);
            }      
        } 
    }
    $("#delete").css("visibility","hidden");
}   

function showItem(test){
    let i;
    $(".calender-items").empty();
        let el = test;
        //console.log("clicked li");
        //console.log(el.id);
        for(item of list){
            if(item.id == el.id){
            i = item;
            }
        }

        $(".modal-title-calender").html("Title : " + i.text);
        $(".calender-date").html("Date : " +  i.date.day + " " + months[i.date.month] + " " + i.date.year);
        $(".calender-time").html("Time : " + i.date.hours + ":" + i.date.minutes);
        $(".calender-item-text").html("Description : <br>" + i.description);
        $("#delete").css("visibility","visible");
        $("#delete").on("click",function(){
            removeItem(el.id);
            $(".calender-item-title").html("");
            $(".calender-item-text").html("");
        });
        /*$("#back").removeClass("hide");
        $("#back").on("click",function(){
            console.log(el = jQuery(el));
            console.log(el.parent());
            //$("#back").addClass("hide");
            //showDay(el = jQuery(el));
        })*/
}

function showLists(){
    $(".listToDo").empty();
    $(".listReminder").empty();
    for(item of list){
        if(item.type == "toDo"){
            jQuery.each(elements, function(){
                if(item.id == ($(this)[0].id)){
                    $(".listToDo").append($(this)[0].element);
                }
            })      
        }
        else if(item.type == "reminder"){
            jQuery.each(elements, function(){
                if(item.id == ($(this)[0].id)){
                    $(".listReminder").append($(this)[0].element);
                }
            })    
        }
    }
}

function removeListItem(){
    $(".listReminder").find("li").each(function(){
        $('<i class="fas fa-times reminder float-right"></i>').appendTo(this);
        $("i.reminder").each(function(){
            $(this).click(function(){
                let id = $(this).parent().attr("id");
                removeItem(id);
            })
        })
    });

    $(".listToDo").find("li").each(function(){
        $('<i class="fas fa-times todo float-right"></i>').appendTo(this);
        $("i.todo").each(function(){
            $(this).click(function(){
                let id = $(this).parent().attr("id");
                removeItem(id);
            })
        })
    });
}

function stopEvent(ev){
    ev.stopPropagation();
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
}

function fillTable(){
    $("td").each(function(){
        if($(this).html().length > 0){
            let ul = document.createElement("ul");
            ul.classList.add("list-group-flush");
            ul.setAttribute("id", this.innerHTML);
            $(this).append(ul);
            $(this).on("click",function(){
                //let clicked = $(this).text();
                //$("#datetimepicker1").data("DateTimePicker").date(new Date(year,month,clicked));
               
                $("#myModal").modal({
                    backdrop: "static",
                    keyboard:true
                }).modal("show");
            })
        }
        /*else{
            $(this).css("visibility","hidden");
        }*/
    });
}




    




