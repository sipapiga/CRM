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

    $("html").on("mouseup", function (e) {
        var l = $(e.target);
        if (l[0].className.indexOf("popover") == -1) {
            $(".popover").each(function () {
                $(this).popover("hide");
            });
        }
    });


    $('#datetimepicker1').datetimepicker();
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
        clearModal();
    });
}

function clearModal(){
    $("#txtEvent").val("");
    $("#descriptionEvent").val("");
}
/*function createElementFromHTML(htmlString){
    try{
        for(item of list){
            let div = document.createElement("div");
            let string = htmlString.trim();
            string = string.slice(1,string.length -1);
            div.innerHTML = string;
            return div;
        } 
    }
    catch(e){
        return htmlString;
    }  
}*/

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
    testList.id = i;
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
    console.log("make elements");
    for(item of list){
        if(item.type == "calenderItem"){
            let el = document.createElement("li");
            el.classList.add("list-group-item","list-group-item-info");
            el.setAttribute("id", item.id);
            el.innerHTML = item.text;
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
        $(this).find("ul").empty();
        for(item of list){
            if(item.type == "calenderItem"){
                if((item.date.month == month)&&(item.date.year == year)&&(item.date.day == i-1)){
                    let clickItem = document.createElement("li");
                    clickItem.classList.add("list-group-item","list-group-item-info");
                    clickItem.innerHTML = "...";
                    let el;
                    jQuery.each(elements, function(){
                        if(item.id == ($(this)[0].id)){
                            el = $(this)[0].element;
                        }
                    })
                    $(this).find("ul").append(el,clickItem);
                }      
            } 
        }
        i++;
    })
    calenderPopover();
}

function calenderPopover(){
    $("table").find("li").each(function(){
        $(this).click(stopEvent);
        let i;
        if($(this)[0].id.length > 0){
            let el = this;
            console.log(list);
            for(item of list){
                if(item.id == el.id){
                    i = item;
                }
            }
            $(this).click(function(){
                $(this).popover("destroy");
                $(this).popover({
                    placement: "auto",
                    html : true, 
                    content: function(){
                        $(".calender-item-title").html(i.text);
                        $(".calender-item-text").html(i.description);
                        return $("#pop-calender").html();
                    }
                }).popover("toggle");
                $(".popover").off("click").on("click",stopEvent);
                $("#cancel").off("click").on("click", function(){
                    $(".popover").popover("toggle");
                 });
                $("#delCalenderItem").on("click",function(){
                    removeItem(el.id);
                })
            });
        }
        else if($(this)[0].id.length > 0 == 0){
            $(this).click(function(){
                let el = $(this);
                console.log(el.parent());
                $(this).popover({
                    placement: "auto",
                    html: true,
                    content: function(){
                        $(".calender-item-title").text(el.parent().id);
                        $(".calender-item-text").append("<ul><li>Just testing</li></ul>");
                        //$("#delCalenderItem").classList.add("hide");
                        return $("#pop-calender").html();
                    } 
                }).popover("toggle");
                $(".popover").off("click").on("click",stopEvent);
               // $("#cancel").off("click").on("click", stopEvent);
                $("#cancel").on("click", function(){
                   $(".popover").popover("toggle");
                });
            })
        }
    }) 
}


function popover(el,int){
    //console.log(el);
    /*console.log(el);
    if(int == 1){
        for(item of list){
            if(el.id == item.id){
                $(el).click(popover("show"));
                $(el).popover({
                    placement: "auto",
                    title: "Calender Item",
                    html: true,
                    content: function(){
                        $(".calender-item-title").html(item.text);
                        $(".calender-item-text").html(item.description);
                        return $("#pop-calender").html(); 
                    }
                }).click(stopEvent);
                $(el).popover().click(function(){
                    console.log($(this));
                    $("#delCalenderItem").click(stopEvent);
                    $("#delCalenderItem").click(function(){
                        removeItem(item.id);
                    })  
                    $("#cancel").click(stopEvent);
                    $("#cancel").click(function(){
                        $(".popover").popover("hide");
                    })
                })
                
            }
        }
    }
    else if(int == 0){
        console.log("do a thing");
    }
    /*else if(el.id.length == 0){
        for(item of list){
            $(el).popover({
                placement: "auto",
                /*title: function(){
                    return item.date.day;
                },*/
               // html: true,
               /* content: function(){
                    //$(".popover-header").text(item.day);
                   // $(".day-items").append("<li>Just testing</li>");
                    return $("#pop-calender").html();
                }
                /*function(){
                    for(item of list){
                        console.log(item);
                        if(item.type == "calenderItem"){
                            if(el.parentElement.id == item.day.date){
                                $(".day-items").html = el.parent;
                                return $("#pop-calender-day").html();
                            }
                        }
                    }
                }*/
           /* }).click(function(){
                $("#cancel").click(stopEvent);
                $("#cancel").click(function(){
                    $(this).popover("hide");
                })
                //console.log(parent);
                 //pop open TD element
                })
                $(el).popover("show");
            }
        }
        /*$("li").children().each(function(){
            console.log($(this));
            $(this).click(stopEvent);
            $(this).click(function(){
                console.log("tried to stop the modal but couldnt");
            })
        })*/

        /*$("table li").each(function(){
            if(this.id.length == 0){
                //console.log(this.parentElement.id);
                //console.log(el);
                console.log(this);
                console.log(el.parentElement);
                if(this.parentElement.id == el.parentElement.id){
                    console.log("these are equal" + el.parentElement.id, this.parentElement.id);
                    console.log(this);*/
                    
            
           // }
        //})
   // }
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
                console.log("removing id" + id);
                removeItem(id);
            })
        })
    });

    $(".listToDo").find("li").each(function(){
        $('<i class="fas fa-times todo float-right"></i>').appendTo(this);
        $("i.todo").each(function(){
            $(this).click(function(){
                let id = $(this).parent().attr("id");
                console.log("removing id" + id);
                removeItem(id);
            })
        })
    });
}

function stopEvent(ev){
    console.log("stopping modal from happening");
    ev.stopPropagation();
}
        //console.log(el);
        /*else{
            $(this).popover({
            placement: "top",
            title: function(){
                let day = item.date.day;
                return day;
            },
            html: true,
            content: function(){
                for(item of list){
                    if(item.type == "calenderItem"){
                        console.log(el);
                        if(el.parent.id == item.day.date){
                            $(".day-items").html = el.parent;
                            return $("#pop-calender-day").html();
                        }
                    }
                }
            }
        })
        /*.click(function(){
           //console.log(parent);
            //pop open TD element
                }
            }*/


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




    




