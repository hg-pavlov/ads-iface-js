

var day_onclick = null;

var month_list = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь"
];
var weekday_list = [
	"Пн.",
	"Вт.",
	"Ср.",
	"Чт.",
	"Пт.",
	"Сб.",
	"Вс."
];


function day_clicked (year, month, day)
{
	if (typeof day_onclick != "function") return;
	day_onclick((new Date(year, month, day).getTime())/1000);
}

function remove_calendar ()
{
	var bg = document.getElementById("calendar_bg");
	if (bg) {
		bg.parentNode.removeChild(bg);
	}
}

// onclick (UTC time);
function create_calendar (name, date_year, date_month, onclick)
{
	var bg = document.getElementById("calendar_bg");
	if (!bg) {
		bg = document.createElement("div");
		bg.setAttribute("id", "calendar_bg");
		bg.setAttribute("class", "calendar_bg");
		document.body.appendChild(bg);
	}
	else {
		for (var i=bg.childNodes.length-1; i>=0; i--) {
			bg.removeChild(bg.childNodes[i]);
		}
	}

	if (onclick) {
		day_onclick = onclick;
	}

	var date = new Date();
	var now_year = date.getFullYear();
	var now_month = date.getMonth();
	var now_day = date.getDate();
	var now_wday = date.getDay(); now_wday = ((now_wday > 0)? now_wday-1 : 6); // Sunday == 0, Monday == 1, e.g. ==> Sunday == 6, Monday == 0, e.g.

	var date_day = 1;
	if (date_year == null || date_month == null) {
		date = new Date();
		date_year = date.getFullYear();
		date_month = date.getMonth();
	}
	date = new Date(date_year, date_month, date_day);
	var wdaynum = date.getDay(); wdaynum = ((wdaynum > 0)? wdaynum-1 : 6); // Sunday == 0, Monday == 1, e.g. ==> Sunday == 6, Monday == 0, e.g.
	var day_max = new Date(date_year, date_month+1, 0).getDate();

	var calendar_name = document.createElement("div");
	calendar_name.setAttribute("id", "calendar_name");
	calendar_name.setAttribute("class", "calendar_name");
	calendar_name.innerHTML = name;

	var calendar_container = document.createElement("div");
	calendar_container.setAttribute("id", "calendar_container");
	calendar_container.setAttribute("class", "calendar_container");
	bg.appendChild(calendar_container);

	var calendar = document.createElement("table");
	calendar.setAttribute("id", "calendar");
	calendar.setAttribute("class", "calendar");

	var calendar_header_year = document.createElement("tr");
	calendar_header_year.setAttribute("id", "calendar_header_year");
	calendar_header_year.setAttribute("class", "calendar_header");
	var calendar_year_prev = document.createElement("td");
	calendar_year_prev.setAttribute("id", "calendar_year_prev");
	calendar_year_prev.setAttribute("class", "calendar_year_prev");
	calendar_year_prev.setAttribute("colspan", "1");
	calendar_year_prev.setAttribute("onclick", "create_calendar('"+name+"',"+(parseInt(date_year)-1).toString()+","+date_month.toString()+",null);");
	calendar_year_prev.innerHTML = "<";
	var calendar_year_name = document.createElement("td");
	calendar_year_name.setAttribute("id", "calendar_year_name");
	calendar_year_name.setAttribute("class", "calendar_year_name");
	calendar_year_name.setAttribute("colspan", "5");
	calendar_year_name.innerHTML = date.getFullYear().toString();
	var calendar_year_next = document.createElement("td");
	calendar_year_next.setAttribute("id", "calendar_year_next");
	calendar_year_next.setAttribute("class", "calendar_year_next");
	calendar_year_next.setAttribute("colspan", "2");
	calendar_year_next.setAttribute("onclick", "create_calendar('"+name+"',"+(parseInt(date_year)+1).toString()+","+date_month.toString()+",null);");
	calendar_year_next.innerHTML = ">";

	var calendar_header_month = document.createElement("tr");
	calendar_header_month.setAttribute("id", "calendar_header_month");
	calendar_header_month.setAttribute("class", "calendar_header");
	var calendar_month_prev = document.createElement("td");
	calendar_month_prev.setAttribute("id", "calendar_month_prev");
	calendar_month_prev.setAttribute("class", "calendar_month_prev");
	calendar_month_prev.setAttribute("colspan", "1");
	calendar_month_prev.setAttribute("onclick", "create_calendar('"+name+"',"+
				((date_month > 0)? date_year : date_year-1).toString()+","+((date_month > 0)? date_month-1 : 11).toString()+",null);");
	calendar_month_prev.innerHTML = "<";
	var calendar_month_name = document.createElement("td");
	calendar_month_name.setAttribute("id", "calendar_month_name");
	calendar_month_name.setAttribute("class", "calendar_month_name");
	calendar_month_name.setAttribute("colspan", "5");
	calendar_month_name.innerHTML = month_list[date.getMonth()];
	var calendar_month_next = document.createElement("td");
	calendar_month_next.setAttribute("id", "calendar_month_next");
	calendar_month_next.setAttribute("class", "calendar_month_next");
	calendar_month_next.setAttribute("colspan", "2");
	calendar_month_next.setAttribute("onclick", "create_calendar('"+name+"',"+
			((date_month < 11)? date_year : parseInt(date_year)+1).toString()+","+((date_month < 11)? parseInt(date_month)+1 : 0).toString()+",null);");
	calendar_month_next.innerHTML = ">";

	var calendar_space = document.createElement("tr");
	calendar_space.setAttribute("id", "calendar_space");
	calendar_space.setAttribute("class", "calendar_space");

	var calendar_weekdays = document.createElement("tr");
	calendar_weekdays.setAttribute("id", "calendar_weekdays");
	calendar_weekdays.setAttribute("class", "calendar_weekdays");
	var calendar_wnum = document.createElement("td");
	calendar_wnum.setAttribute("id", "calendar_wnum");
	calendar_wnum.setAttribute("class", "calendar_wnum");
	calendar_wnum.innerHTML = "Нед. №";

	var wn = 0;
	var calendar_mon = document.createElement("td");
	calendar_mon.setAttribute("id", "calendar_mon");
	calendar_mon.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_mon.innerHTML = weekday_list[wn]; wn++;
	var calendar_tue = document.createElement("td");
	calendar_tue.setAttribute("id", "calendar_tue");
	calendar_tue.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_tue.innerHTML = weekday_list[wn]; wn++;
	var calendar_wed = document.createElement("td");
	calendar_wed.setAttribute("id", "calendar_wed");
	calendar_wed.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_wed.innerHTML = weekday_list[wn]; wn++;
	var calendar_thr = document.createElement("td");
	calendar_thr.setAttribute("id", "calendar_thr");
	calendar_thr.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_thr.innerHTML = weekday_list[wn]; wn++;
	var calendar_fri = document.createElement("td");
	calendar_fri.setAttribute("id", "calendar_fri");
	calendar_fri.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_fri.innerHTML = weekday_list[wn]; wn++;
	var calendar_sat = document.createElement("td");
	calendar_sat.setAttribute("id", "calendar_sat");
	calendar_sat.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_sat.innerHTML = weekday_list[wn]; wn++;
	var calendar_sun = document.createElement("td");
	calendar_sun.setAttribute("id", "calendar_sun");
	calendar_sun.setAttribute("class", ((now_year == date_year && now_month == date_month && now_wday == wn)? "calendar_wday_now" : "calendar_wday"));
	calendar_sun.innerHTML = weekday_list[wn]; wn++;

	calendar_header_year.appendChild(calendar_year_prev);
	calendar_header_year.appendChild(calendar_year_name);
	calendar_header_year.appendChild(calendar_year_next);

	calendar_header_month.appendChild(calendar_month_prev);
	calendar_header_month.appendChild(calendar_month_name);
	calendar_header_month.appendChild(calendar_month_next);

	calendar_weekdays.appendChild(calendar_wnum);
	calendar_weekdays.appendChild(calendar_mon);
	calendar_weekdays.appendChild(calendar_tue);
	calendar_weekdays.appendChild(calendar_wed);
	calendar_weekdays.appendChild(calendar_thr);
	calendar_weekdays.appendChild(calendar_fri);
	calendar_weekdays.appendChild(calendar_sat);
	calendar_weekdays.appendChild(calendar_sun);

	calendar.appendChild(calendar_header_year);
	calendar.appendChild(calendar_header_month);
	calendar.appendChild(calendar_space);
	calendar.appendChild(calendar_weekdays);

	calendar_container.appendChild(calendar_name);
	calendar_container.appendChild(calendar);

	for (var w=0; w<6; w++) {
		if (((w*7)-wdaynum) >= day_max) {
			break;
		}

		var week = document.createElement("tr");
		week.setAttribute("id", "calendar_week"+w.toString());
		week.setAttribute("class", "calendar_week");
		var wnum = document.createElement("td");
		wnum.setAttribute("id", "calendar_wnum"+w.toString());
		wnum.setAttribute("class", "calendar_wnum");
		wnum.innerHTML = (w+1).toString();
		week.appendChild(wnum);
		for (var d=1; d<8; d++) {
			var day = document.createElement("td");
			day.setAttribute("id", "calendar_day"+d.toString());
			var dnum = ((w*7+d)-wdaynum);
			if (dnum > 0 && dnum <= day_max) {
				if (now_year == date_year && now_month == date_month && now_day == dnum) {
					day.setAttribute("class", "calendar_day_now");
				}
				else {
					day.setAttribute("class", "calendar_day");
				}
				day.setAttribute("onclick", "day_clicked("+date_year.toString()+", "+date_month.toString()+", this.innerHTML);");
				day.innerHTML = dnum.toString();
			}
			else {
				day.setAttribute("class", "calendar_day_inact");
			}
			week.appendChild(day);
		}

		calendar.appendChild(week);
	}


	var calendar_cancel = document.createElement("div");
	calendar_cancel.setAttribute("id", "calendar_cancel");
	calendar_cancel.setAttribute("class", "calendar_button");
	calendar_cancel.setAttribute("onclick", "remove_calendar();");
	calendar_cancel.innerHTML = s_btn_cancel;

	calendar_container.appendChild(calendar_cancel);
}
