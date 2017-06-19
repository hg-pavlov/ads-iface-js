
var s_outlet_no_outlets			= "Электроприборов не обнаружено";
var s_outlet_outlet_img_title	= "Вкл./Выкл. выход";
var s_outlet_outlet_img_alt		= "вкл./выкл.";
var s_outlet_outlet_cfg_title	= "Настройка выхода";
var s_outlet_outlet_cfg_alt		= "настройка выхода";
var s_outlet_outlet_device_title	= "Изменение имени устройства";
var s_outlet_edit_device_name_header	= "Изменение названия набора выходов";
var s_outlet_change_name_title = "Изменить название выхода";
var s_outlet_change_name = "Изменение названия выхода";
var s_outlet_conf_header = "Настройка выхода";
var s_outlet_rule_edit_title = "Редактировать правило";
var s_outlet_rule_edit = "E";
var s_outlet_rule_delete_title = "Удалить правило";
var s_outlet_rule_delete = "X";
var s_outlet_rule_condition_form_close_title = "Закрыть";
var s_outlet_rule_condition_form_close = "X";
var s_outlet_rule_form_close_title = "Закрыть";
var s_outlet_rule_form_close = "X";
var s_outlet_btn_addrule_title = "Добавить новое правило";
var s_outlet_btn_addrule = "Новое правило";
var s_outlet_rule_header = "Настройка правила";
var s_outlet_for_outlet = "для выхода";
var s_outlet_rule_date_start_title = "Дата начала действия";
var s_outlet_rule_time_start_title = "Время начала действия";
var s_outlet_rule_start = "Старт";
var s_outlet_rule_date_stop_title = "Дата окончания действия";
var s_outlet_rule_time_stop_title = "Время окончания действия";
var s_outlet_rule_stop = "Стоп";
var s_outlet_btn_addcondition_title = "Создать новое условие";
var s_outlet_btn_addcondition = "Создать условие";
var s_outlet_rule_condition_list_on_header = "Включение<br />(подача питания)";
var s_outlet_rule_condition_list_off_header = "Выключение<br />(отключение питания)";
var s_outlet_rule_alert_date_start_less_stop = "Дата начала должна быть раньше даты окончания. (проверьте дату окончания)";
var s_outlet_rule_weekday_button_on_title = "Отключить";
var s_outlet_rule_weekday_button_on = "Да";
var s_outlet_rule_weekday_button_off_title = "Включить";
var s_outlet_rule_weekday_button_off = "Нет";
var s_outlet_rule_ctl_edit_title = "Редактировать условие";
var s_outlet_rule_ctl_edit = "E";
var s_outlet_rule_ctl_delete_title = "Удалить условие";
var s_outlet_rule_ctl_delete = "X";
var s_outlet_rule_no_conditions = "Нет ни одного условия";
var s_btn_close_corner = "X";
var s_outlet_rule_sensor_default_name = "Набор датчиков";
var s_outlet_rule_no_sensors = "Не выбран набор датчиков";
var s_outlet_rule_sensor_no_type = "Не выбран тип датчика";
var s_outlet_rule_alg_AND = "И";
var s_outlet_rule_alg_OR = "ИЛИ";
var s_outlet_rule_relation_more = "Более, чем";
var s_outlet_rule_relation_less = "Менее, чем";

var s_sensor_units_temperature = "&#8451;";
var s_sensor_units_humidity = "RH%";
var s_sensor_units_light_in = "lux";
var s_sensor_units_light_out = "lux";
var s_sensor_units_co2 = "";
var s_sensor_units_ec = "mSiemens/cm";
var s_sensor_units_tds = "ppm";
var s_sensor_units_ppm = "ppm";
var s_sensor_units_ph = "";
var s_sensor_units_raw = "/4096";
var s_sensor_units_pressure = "мм.рт.ст.";
var s_sensor_units_sea_pressure = "мм.рт.ст.";
var s_sensor_units_altitude = "м";
var s_sensor_units_gyro = "";
var s_sensor_units_compass = "";
var s_condition_value_beg = "в начале периода";
var s_condition_value_end = "в конце периода";
var s_outlet_for_rule = "для правила";
var s_outlet_rule_condition_on_header = "Настройка условия ВКЛЮЧЕНИЯ";
var s_outlet_rule_condition_off_header = "Настройка условия ВЫКЛЮЧЕНИЯ";

var s_outlet_rules_are_activated = "Выключатель управляется правилами. Пожалуйста, удалите их, прежде, чем продолжить.";
var s_outlet_delete_condition_confirm = "Вы действительно хотите удалить это условие ?";
var s_outlet_delete_rule_confirm = "Вы действительно хотите удалить правило ";

var temporary_rule = null;
var temporary_condition = null;




function outlet_page_update ()
{
	var outlet_list = document.getElementById("page_info");
	if (!outlet_list) {
		console.log("cannot update outlet page: no page_info element");
		return;
	}

	for (var i=outlet_list.childNodes.length-1; i>=0; i--) {
		outlet_list.removeChild(outlet_list.childNodes[i]);
	}

	if (!OUTLET || !OUTLET.outlet) {
		console.log("no OUTLET or OUTLET.outlet configurations");
		return;
	}


	var outlet_device_name = create_element_div(
				"outlet_device_name", "outlet_device_name", s_outlet_outlet_device_title, OUTLET.name, outlet_edit_device_name, outlet_list
	);
	outlet_list.appendChild(document.createElement("br"));


	if (OUTLET.outlet.length == 0) {
		create_element_div("no_outlets", "no_outlets", null, s_outlet_no_outlets, null, outlet_list);
		return;
	}

	for (var i=0; i<OUTLET.outlet.length; i++) {
		var uf_num = (i < 9)? '0' + (i + 1).toString() : (i + 1).toString();
		var outlet = create_element_div("outlet_ctl" + i.toString(), "outlet_ctl", null, null, null, outlet_list);
		var outlet_name = create_element_div("outlet_name" + i.toString(), "outlet_name", null, OUTLET.outlet[i].name, null, outlet);
		outlet.appendChild(document.createElement("br"));
		var outlet_num = create_element_div("outlet_num" + i.toString(), "outlet_num", null, uf_num, null, outlet);
		var outlet_img = create_element_img
						(
							"outlet_toggle" + i.toString(),
							"outlet_toggle",
							s_outlet_outlet_img_title + " №" + uf_num,
							s_outlet_outlet_img_alt,
							tar_get_image_src
							(
											img_prefix +
											OUTLET_CONSUMER_IMAGES[OUTLET.outlet[i].consumer] +
											((OUTLET.outlet[i].rule.length > 0)? "_rule" : "") +
											((OUTLET.outlet[i].state)? "_on":"_off") + ".png"
							),
							"outlet_toggle(" + i.toString() + ");",
							outlet
						);
		var outlet_cfg = create_element_img
						(
							"outlet_cfg" + i.toString(),
							"outlet_cfg",
							s_outlet_outlet_cfg_title + " №" + uf_num,
							s_outlet_outlet_cfg_alt,
							tar_get_image_src(img_prefix + "outlet_conf.png"),
							"outlet_config(" + i.toString() + ");",
							outlet
						);

		outlet_list.appendChild(document.createElement("br"));
	}

	copyright(outlet_list);
}

function outlet_edit_device_name ()
{
	edit_name
	(
		s_outlet_edit_device_name_header,

		OUTLET.name,

		function (name)
		{
			set_outlet_device_name(name, function() { remove_editor(); });
		},

		function ()
		{
			remove_editor();
		}
	);
}

function outlet_toggle (outlet_id)
{
	if (OUTLET.outlet[outlet_id].rule.length > 0) {
		alert(s_outlet_rules_are_activated);
		return;
	}

	var state = (OUTLET.outlet[outlet_id].state)? 0 : 1;
	set_outlet_state(outlet_id, state, function (oid, stat) {

		var outlet = document.getElementById("outlet_toggle"+outlet_id);
		if (outlet) {
			outlet.setAttribute
			(
				"src", 

				tar_get_image_src
				(
					img_prefix + OUTLET_CONSUMER_IMAGES[OUTLET.outlet[oid].consumer] + ((OUTLET.outlet[oid].state)? "_on":"_off") + ".png"
				)
			);
		}
		else {
		}
	});
}





function outlet_rule_condition_create_daytime (variant)
{
	var daytime_editor = create_element_div("outlet_rule_condition_values", "outlet_rule_condition_values", null,null,null, null);

	var hh = 0; var mm = 0;
	if (temporary_condition.val_beg > 0) {
		if (variant == 0) { // daytime
			var d = new Date(temporary_condition.val_beg * 1000);
			hh = ('0'+d.getHours()).slice(-2);
			mm = ('0'+d.getMinutes()).slice(-2);
		}
		else if (variant == 1) { // interval
			hh = ('0'+parseInt(temporary_condition.val_beg/3600).toString()).slice(-2);
			mm = ('0'+parseInt((temporary_condition.val_beg%3600)/60).toString()).slice(-2);
		}
	}

	var img = create_element_img
	(
		"outlet_rule_condition_value_img",
		"outlet_rule_condition_value_img",
		null,
		null,
		tar_get_image_src(img_prefix + "clock.png"),
		null,
		daytime_editor
	);


	var val_container = create_element_div
	(
		"outlet_rule_condition_value_container", "outlet_rule_condition_value_container",
		null, null, null, daytime_editor
	);

	var hours = document.createElement("select");
	hours.setAttribute("id", "outlet_rule_condition_hh");
	hours.setAttribute("class", "outlet_rule_condition_hh");

	hours.addEventListener
	(
		"change",

		function ()
		{
			if (variant == 0) { // daytime
				var d = new Date(); var tz = d.getTimezoneOffset() * 60;
				var hhmm = ((parseInt(this.value) * 3600) + (temporary_condition.val_beg % 3600)) + tz;
				temporary_condition.val_beg = (hhmm < 0)? (24*3600)+hhmm : hhmm;
			}
			else if (variant == 1) { // interval
				temporary_condition.val_beg = ((parseInt(this.value) * 3600) + (temporary_condition.val_beg % 3600));
			}
		},

		false
	);

	val_container.appendChild(hours);
	for (var i=0; i<24; i++) {
		var opt = document.createElement("option");
		opt.setAttribute("value", i);
		if (i == hh) opt.setAttribute("selected", "true");
		opt.innerHTML = ('0'+i).slice(-2);
		hours.appendChild(opt);
	}

	var u = document.createElement("div"); u.innerHTML = " : ";
	val_container.appendChild(u);

	var minutes = document.createElement("select");
	minutes.setAttribute("id", "outlet_rule_condition_mm");
	minutes.setAttribute("class", "outlet_rule_condition_mm");

	minutes.addEventListener
	(
		"change",

		function ()
		{
			temporary_condition.val_beg = ((parseInt(this.value) * 60) + (parseInt(temporary_condition.val_beg / 3600) * 3600));
		},

		false
	);

	val_container.appendChild(minutes);
	for (var i=0; i<60; i++) {
		var opt = document.createElement("option");
		opt.setAttribute("value", i);
		if (i == mm) opt.setAttribute("selected", "true");
		opt.innerHTML = ('0'+i).slice(-2);
		minutes.appendChild(opt);
	}

	if ((temporary_rule.date.start >= 0 && temporary_rule.date.stop >= 0)
		&& (temporary_rule.date.start != temporary_rule.date.stop)) {

		var val_container_end = create_element_div
		(
			"outlet_rule_condition_value_container_end", "outlet_rule_condition_value_container",
			null, null, null, daytime_editor
		);

		hh = 0; mm = 0;
		if (temporary_condition.val_end > 0) {
			if (variant == 0) { // daytime
				var d = new Date(temporary_condition.val_end * 1000);
				hh = ('0'+d.getHours()).slice(-2);
				mm = ('0'+d.getMinutes()).slice(-2);
			}
			else if (variant == 1) { // interval
				hh = ('0'+parseInt(temporary_condition.val_end/3600).toString()).slice(-2);
				mm = ('0'+parseInt((temporary_condition.val_end%3600)/60).toString()).slice(-2);
			}
		}

		var hours_end = document.createElement("select");
		hours_end.setAttribute("id", "outlet_rule_condition_hh_end");
		hours_end.setAttribute("class", "outlet_rule_condition_hh");

		hours_end.addEventListener
		(
			"change",

			function ()
			{
				if (variant == 0) { // daytime
					var d = new Date(); var tz = d.getTimezoneOffset() * 60;
					var hhmm = ((parseInt(this.value) * 3600) + (temporary_condition.val_end % 3600)) + tz;
					temporary_condition.val_end = (hhmm < 0)? (24*3600)+hhmm : hhmm;
				}
				else if (variant == 1) { // interval
					temporary_condition.val_end = ((parseInt(this.value) * 3600) + (temporary_condition.val_end % 3600));
				}
			},

			false
		);

		val_container_end.appendChild(hours_end);
		for (var i=0; i<24; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", i);
			if (i == hh) opt.setAttribute("selected", "true");
			opt.innerHTML = ('0'+i).slice(-2);
			hours_end.appendChild(opt);
		}

		var u = document.createElement("div"); u.innerHTML = " : ";
		val_container_end.appendChild(u);

		var minutes_end = document.createElement("select");
		minutes_end.setAttribute("id", "outlet_rule_condition_mm_end");
		minutes_end.setAttribute("class", "outlet_rule_condition_mm");

		minutes_end.addEventListener
		(
			"change",

			function ()
			{
				temporary_condition.val_end = ((parseInt(this.value) * 60) + (parseInt(temporary_condition.val_end / 3600) * 3600));
			},

			false
		);

		val_container_end.appendChild(minutes_end);
		for (var i=0; i<60; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", i);
			if (i == mm) opt.setAttribute("selected", "true");
			opt.innerHTML = ('0'+i).slice(-2);
			minutes_end.appendChild(opt);
		}

		var u_start = document.createElement("div"); u_start.innerHTML = s_condition_value_beg;
		var u_stop = document.createElement("div"); u_stop.innerHTML = s_condition_value_end;
		val_container.appendChild(document.createElement("br")); val_container.appendChild(u_start);
		val_container_end.appendChild(document.createElement("br")); val_container_end.appendChild(u_stop);
	}

	return daytime_editor;
}

function outlet_rule_condition_create_logpin (pin)
{
	var logpin_value = create_element_div("outlet_rule_condition_values_" + pin, "outlet_rule_condition_values", null,null,null, null);

	var logpin = document.createElement("select");
	logpin.setAttribute("id", "outlet_rule_condition_logic_val_" + pin);
	logpin.setAttribute("class", "outlet_rule_condition_logic_val");

	logpin.addEventListener
	(
		"change",

		function ()
		{
			temporary_condition.flags &= ~(OUTLET_RULE_FLAG_ONOFF_ON | OUTLET_RULE_FLAG_ONOFF_OFF);
			temporary_condition.flags |= ((parseInt(this.value))? OUTLET_RULE_FLAG_ONOFF_ON : OUTLET_RULE_FLAG_ONOFF_OFF);
		},

		false
	);

	logpin_value.appendChild(logpin);

	var opt0 = document.createElement("option");
	opt0.setAttribute("value", 0);
	opt0.innerHTML = s_sensor_logic_pin_state_off;
	logpin.appendChild(opt0);

	var opt1 = document.createElement("option");
	opt1.setAttribute("value", 1);
	opt1.innerHTML = s_sensor_logic_pin_state_on;
	logpin.appendChild(opt1);

	if (temporary_condition.flags & OUTLET_RULE_FLAG_ONOFF_ON) {
		opt1.setAttribute("selected", "true");
	}
	else if (temporary_condition.flags & OUTLET_RULE_FLAG_ONOFF_OFF) {
		opt0.setAttribute("selected", "true");
	}
	else {
		// set default flag
		temporary_condition.flags |= OUTLET_RULE_FLAG_ONOFF_OFF;
	}

	return logpin_value;
}


function outlet_rule_condition_create_values (sensortype)
{
	if (!sensortype) return null;

	var values = create_element_div("outlet_rule_condition_values", "outlet_rule_condition_values", null,null,null, null);

	var image_src = "";
	var units = "";

	switch (parseInt(sensortype)) {

	case SENSOR_TYPE_TEMPERATURE:
		val_step = 0.1;
		val_max = 400;
		val_min = -100;
		image_src = "temp.png";
		units = s_sensor_units_temperature;
		break;

	case SENSOR_TYPE_SOLUTION_TEMP:
		val_step = 0.1;
		val_max = 100;
		val_min = -100;
		image_src = "sol_temp.png";
		units = s_sensor_units_temperature;
		break;

	case SENSOR_TYPE_HUMIDITY:
		val_step = 0.1;
		val_max = 100;
		val_min = 0;
		image_src = "humi.png";
		units = s_sensor_units_humidity;
		break;

	case SENSOR_TYPE_LIGHT_IN:
		val_step = 1;
		val_max = 100000;
		val_min = 0;
		image_src = "light_in.png";
		units = s_sensor_units_light_in;
		break;

	case SENSOR_TYPE_LIGHT_OUT:
		val_step = 1;
		val_max = 100000;
		val_min = 0;
		image_src = "light_out.png";
		units = s_sensor_units_light_out;
		break;

	case SENSOR_TYPE_CO2:
		val_step = 1;
		val_max = 100;
		val_min = 0;
		image_src = "co2.png";
		units = s_sensor_units_co2;
		break;

	case SENSOR_TYPE_EC:
		val_step = 0.1;
		val_max = 100000;
		val_min = 0;
		image_src = "ec.png";
		units = s_sensor_units_ec;
		break;

	case SENSOR_TYPE_TDS:
		val_step = 0.1;
		val_max = 1000000;
		val_min = 0;
		image_src = "tds.png";
		units = s_sensor_units_tds;
		break;

	case SENSOR_TYPE_PPM:
		val_step = 0.1;
		val_max = 1000000;
		val_min = 0;
		image_src = "ppm.png";
		units = s_sensor_units_ppm;
		break;

	case SENSOR_TYPE_PH:
		val_step = 0.1;
		val_max = 14;
		val_min = 0;
		image_src = "ph.png";
		units = s_sensor_units_ph;
		break;

	case SENSOR_TYPE_RAW:
		val_step = 1;
		val_max = 4096;
		val_min = 0;
		image_src = "raw.png";
		units = s_sensor_units_raw;
		break;

	case SENSOR_TYPE_DEW_POINT:
		val_step = 0.1;
		val_max = 100;
		val_min = -100;
		image_src = "dew.png";
		units = s_sensor_units_temperature;
		break;

	case SENSOR_TYPE_PRESSURE:
		val_step = 0.1;
		val_max = 10000;
		val_min = 0;
		image_src = "pres.png";
		units = s_sensor_units_pressure;
		break;

	case SENSOR_TYPE_SEA_LEVEL_PRESSURE:
		val_step = 0.1;
		val_max = 10000;
		val_min = 0;
		image_src = "spres.png";
		units = s_sensor_units_pressure;
		break;

	case SENSOR_TYPE_ALTITUDE:
		val_step = 1;
		val_max = 10000;
		val_min = -10000;
		image_src = "alti.png";
		units = s_sensor_units_altitude;
		break;

	case SENSOR_TYPE_GYRO:
		val_step = 1;
		val_max = 360;
		val_min = 0;
		image_src = "gyro.png";
		units = s_sensor_units_gyro;
		break;

	case SENSOR_TYPE_COMPASS:
		val_step = 1;
		val_max = 360;
		val_min = 0;
		image_src = "compass.png";
		units = s_sensor_units_compass;
		break;
	}


	var relation = document.createElement("select");
	relation.setAttribute("id", "outlet_rule_condition_relation");
	relation.setAttribute("class", "outlet_rule_condition_relation");

	relation.addEventListener
	(
		"change",

		function ()
		{
			temporary_condition.flags &= ~(OUTLET_RULE_FLAG_FALL | OUTLET_RULE_FLAG_RISE);

			if (parseInt(this.value) === OUTLET_RULE_FLAG_RISE) {
				temporary_condition.flags |= OUTLET_RULE_FLAG_RISE;
			}
			else if (parseInt(this.value) === OUTLET_RULE_FLAG_FALL) {
				temporary_condition.flags |= OUTLET_RULE_FLAG_FALL;
			}
		},

		false
	);
	
	values.appendChild(relation);

	var more = document.createElement("option");
	more.setAttribute("value", OUTLET_RULE_FLAG_RISE);
	more.innerHTML = s_outlet_rule_relation_more;
	if (temporary_condition.flags & OUTLET_RULE_FLAG_RISE) more.setAttribute("selected", "true");
	relation.appendChild(more);

	var less = document.createElement("option");
	less.setAttribute("value", OUTLET_RULE_FLAG_FALL);
	less.innerHTML = s_outlet_rule_relation_less;
	if (temporary_condition.flags & OUTLET_RULE_FLAG_FALL) less.setAttribute("selected", "true");
	relation.appendChild(less);

	values.appendChild(document.createElement("br"));


	var img = create_element_img
	(
		"outlet_rule_condition_value_img",
		"outlet_rule_condition_value_img",
		null,
		null,
		tar_get_image_src(img_prefix + image_src),
		null,
		values
	);


	var u = document.createElement("div");
	u.setAttribute("class", "outlet_condition_units");
	u.innerHTML = "&emsp;" + units;
	values.appendChild(u);
	values.appendChild(document.createElement("br"));

	var val_container = create_element_div
	(
		"outlet_rule_condition_value_container", "outlet_rule_condition_value_container",
		null, null, null, values
	);

	var value = document.createElement("input");
	value.setAttribute("id", "outlet_rule_condition_value");
	value.setAttribute("class", "outlet_rule_condition_value");
	value.setAttribute("type", "number");
	value.setAttribute("step", val_step);
	value.setAttribute("max", val_max);
	value.setAttribute("min", val_min);
	value.setAttribute("value", temporary_condition.val_beg);
	value.setAttribute("onchange", "outlet_rule_save_condition_value(this.value, null);");
	val_container.appendChild(value);

	if ((temporary_rule.date.start >= 0 && temporary_rule.date.stop >= 0)
		&& (temporary_rule.date.start != temporary_rule.date.stop)) {

		var val_container_end = create_element_div
		(
			"outlet_rule_condition_value_container_end", "outlet_rule_condition_value_container",
			null, null, null, values
		);

		var value_end = document.createElement("input");
		value_end.setAttribute("id", "outlet_rule_condition_value");
		value_end.setAttribute("class", "outlet_rule_condition_value");
		value_end.setAttribute("type", "number");
		value_end.setAttribute("step", val_step);
		value_end.setAttribute("max", val_max);
		value_end.setAttribute("min", val_min);
		value_end.setAttribute("value", temporary_condition.val_end);
		value_end.setAttribute("onchange", "outlet_rule_save_condition_value(null, this.value);");
		val_container_end.appendChild(value_end);

		var u0 = document.createElement("div");
		u0.innerHTML = s_condition_value_beg;
		val_container.appendChild(document.createElement("br"));
		val_container.appendChild(u0);

		var u1 = document.createElement("div");
		u1.innerHTML = s_condition_value_end;
		val_container_end.appendChild(document.createElement("br"));
		val_container_end.appendChild(u1);
	}

	return values;
}


function outlet_rule_save_condition_value (value_beg, value_end)
{
	if (value_beg !== null) {
		temporary_condition.val_beg = value_beg;

		if (temporary_rule.date.start == 0 || temporary_rule.date.stop == 0) {

			temporary_condition.val_end = value_beg;
		}
	}
	if (value_end !== null) {

		temporary_condition.val_end = value_end;
	}
}


function outlet_create_condition_form (outlet_id, rule_id, condition_id, state)
{
	// get scroll position

	var scroll_top = null;
	var condition_editor = document.getElementById("outlet_rule_condition_form_" + state + "_" + condition_id);
	if (condition_editor) { scroll_top = condition_editor.scrollTop; }

	if (temporary_condition === null) {
		temporary_condition = outlet_create_condition_copy((temporary_rule.condition[condition_id])? temporary_rule.condition[condition_id] : null);
		temporary_condition.flags |= (state)? OUTLET_RULE_FLAG_ON : OUTLET_RULE_FLAG_OFF;
	}


	condition_editor = create_element_div
	(
		"outlet_rule_condition_form_" + state + "_" + condition_id,
		"outlet_rule_condition_form", null, null, null, document.body
	);


	// count apropriate conditions
	var cnt = 0;
	var flag = (state)? OUTLET_RULE_FLAG_ON : OUTLET_RULE_FLAG_OFF;
	for (var i=0; i<temporary_rule.condition.length && i<condition_id; i++) {
		if (temporary_rule.condition[i].flags & flag) { cnt++; }
	}


	var condition_header = create_element_div
	(
		"outlet_rule_condition_header_" + state,
		"outlet_condition_header",
		null,
		((state)?  s_outlet_rule_condition_on_header : s_outlet_rule_condition_off_header) + " №" + ('0'+(cnt+ 1).toString()).slice(-2)
					+ "<br />" + s_outlet_for_rule + " №" + ('0'+(parseInt(rule_id) +1).toString()).slice(-2)
					+ "&emsp;" + s_outlet_for_outlet + " №" + ('0'+(parseInt(outlet_id) +1).toString()).slice(-2),
		null,
		condition_editor
	);

	var sensor_editor = create_element_div
	(
		"outlet_rule_condition_sensor_" + state + "_" + condition_id,
		"outlet_rule_condition_sensor", null, null, null, condition_editor
	);

	// alg

	if (cnt > 0) {
		var alg = document.createElement("select");
		alg.setAttribute("id", "outlet_rule_condition_alg_" + state + "_" + condition_id);
		alg.setAttribute("class", "outlet_rule_condition_alg");
		alg.addEventListener
		(
			"change",

			function (evt)
			{
				temporary_condition.flags &= ~(OUTLET_RULE_FLAG_RULE_ALG_AND | OUTLET_RULE_FLAG_RULE_ALG_OR);
				temporary_condition.flags |= parseInt(this.value);
			},

			false
		);
		sensor_editor.appendChild(alg);

		var opt_and = document.createElement("option");
		opt_and.setAttribute("value", OUTLET_RULE_FLAG_RULE_ALG_AND);
		opt_and.innerHTML = s_outlet_rule_alg_AND;
		alg.appendChild(opt_and);
		var opt_or = document.createElement("option");
		opt_or.setAttribute("value", OUTLET_RULE_FLAG_RULE_ALG_OR);
		opt_or.innerHTML = s_outlet_rule_alg_OR;
		alg.appendChild(opt_or);

		if (temporary_condition.flags & OUTLET_RULE_FLAG_RULE_ALG_AND) opt_and.setAttribute("selected", "true");
		else if (temporary_condition.flags & OUTLET_RULE_FLAG_RULE_ALG_OR) opt_or.setAttribute("selected", "true");
		else temporary_condition.flags |= OUTLET_RULE_FLAG_RULE_ALG_AND;
	}
	else {
		temporary_condition.flags &= ~(OUTLET_RULE_FLAG_RULE_ALG_PRIO | OUTLET_RULE_FLAG_RULE_ALG_AND | OUTLET_RULE_FLAG_RULE_ALG_OR);
		temporary_condition.flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO;
	}


	// sensor set

	if (OUTLET.sensor_list && OUTLET.sensor_list.length > 0) {

		var sensorlist = document.createElement("select");
		sensorlist.setAttribute("id", "outlet_rule_condition_sensorlist_" + state + "_" + condition_id);
		sensorlist.setAttribute("class", "outlet_rule_condition_sensorlist");
		sensorlist.addEventListener
		(
			"change",

			function (evt)
			{
				if (this.value >= 0) {
					temporary_condition.sensor_id = [];
					for (var i=0; i<8; i++) {
						temporary_condition.sensor_id[i] = OUTLET.sensor_list[parseInt(this.value)].device_id[i];
					}
				}
				else {
					temporary_condition.sensor_id = [];
					temporary_condition.type = SENSOR_TYPE_NULL;
					temporary_condition.flags &= 0x00000000 | (OUTLET_RULE_FLAG_RULE_ALG_AND | OUTLET_RULE_FLAG_RULE_ALG_OR);
					temporary_condition.val_beg = 0x00000000;
					temporary_condition.val_end = 0x00000000;
				}

				outlet_create_condition_form(outlet_id, rule_id, condition_id, state);
			},

			false
		);

		sensor_editor.appendChild(sensorlist);

		var opt = document.createElement("option");
		opt.setAttribute("value", -1);
		opt.innerHTML = s_outlet_rule_no_sensors;
		sensorlist.appendChild(opt);

		for (var i=0; i<OUTLET.sensor_list.length; i++) {

			var opt = document.createElement("option");
			opt.setAttribute("value", i);
			if (typeof OUTLET.sensor_list[i].name === 'string' && OUTLET.sensor_list[i].name !== "") {
				opt.innerHTML = OUTLET.sensor_list[i].name;
			}
			else {
				opt.innerHTML = s_outlet_rule_sensor_default_name + "&emsp;";
				for (var n=0; n<OUTLET.sensor_list[i].device_id.length; n++) {
					opt.innerHTML += OUTLET.sensor_list[i].device_id[n].toString(16);
				}
			}

			if (temporary_condition && temporary_condition.sensor_id.length == 8) {
				var eq = true;
				for (var n=0; n<OUTLET.sensor_list[i].device_id.length; n++) {
					if (temporary_condition.sensor_id[n] !== OUTLET.sensor_list[i].device_id[n]) {
						eq = false;
						break;
					}
				}

				if (eq) opt.setAttribute("selected", "true");
			}

			sensorlist.appendChild(opt);
		}

		sensor_editor.appendChild(document.createElement("br"));

		// sensor type

		var sensor_ix = parseInt(sensorlist.value);
		if (sensor_ix >= 0) {

			var sensortypes = document.createElement("select");
			sensortypes.setAttribute("id", "outlet_rule_condition_sensortype_" + state + "_" + condition_id);
			sensortypes.setAttribute("class", "outlet_rule_condition_sensortype");
			sensortypes.addEventListener
			(
				"change",

				function (evt)
				{
					var flags_init = temporary_condition.flags &
						~(OUTLET_RULE_FLAG_TIME_EXACT | OUTLET_RULE_FLAG_TIME_INTERVAL | OUTLET_RULE_FLAG_ONOFF_ON | OUTLET_RULE_FLAG_ONOFF_OFF);

					if (this.value && parseInt(this.value) > 0) {

						var stype = parseInt(this.value);
						var sensor_type = (stype & SENSOR_TYPE_MASK);

						if (sensor_type === SENSOR_TYPE_DAYTIME) {
							var subtype = parseInt(this.value.substr(this.value.indexOf(".") +1));
							if (subtype == 0) {
								temporary_condition.flags = flags_init | OUTLET_RULE_FLAG_TIME_EXACT;
							}
							else if (subtype == 1) {
								temporary_condition.flags = flags_init | OUTLET_RULE_FLAG_TIME_INTERVAL;
							}
						}
						else if (sensor_type === SENSOR_TYPE_ONOFF) {
							temporary_condition.val_beg = (1 << parseInt(this.value.substr(this.value.indexOf(".") +1)));
							temporary_condition.val_end = 0x00000000;
						}
						temporary_condition.type = stype;
					}
					else {
						temporary_condition.type = SENSOR_TYPE_NULL;
						temporary_condition.flags = flags_init;
					}

					outlet_create_condition_form(outlet_id, rule_id, condition_id, state);
				},

				false
			);

			sensor_editor.appendChild(sensortypes);

			var opt = document.createElement("option");
			opt.setAttribute("value", -1);
			opt.innerHTML = s_outlet_rule_sensor_no_type;
			sensortypes.appendChild(opt);

			for (var i=0; i<OUTLET.sensor_list[sensor_ix].sensor_count; i++) {

				var stype = OUTLET.sensor_list[sensor_ix].metric[i].type;
				var sensor_type = (stype & SENSOR_TYPE_MASK);
				var sensor_group = (stype & SENSOR_GROUP_MASK);
				var sensor_group_num = (sensor_group >> 24);
				var sensor_pinid = ((stype & SENSOR_COUNT_MASK) >> 16);

				var sensor_pin_str = SENSOR_GROUP_NAMES[sensor_group_num];
				if ((sensor_group == STM32_BME280_BUS1_GROUP || sensor_group == STM32_BME280_BUS2_GROUP)
					|| (sensor_group == STM32_BH1750_BUS1_GROUP || sensor_group == STM32_BH1750_BUS2_GROUP)) {
					sensor_pin_str += " (" + s_sensor_digital_id + ('0'+(parseInt(sensor_pinid) +1).toString()).slice(-2) + ") ";
				}
				else if (sensor_group == STM32_ADC1_GROUP || sensor_group == STM32_ADC2_GROUP) {
					sensor_pin_str += " (" + s_sensor_analog_pin + ('0'+(parseInt(sensor_pinid) +1).toString()).slice(-2) + ") ";
				}

				if (sensor_type === SENSOR_TYPE_DATE) continue;

				if (sensor_type === SENSOR_TYPE_DAYTIME) {

					var opt0 = document.createElement("option");
					opt0.setAttribute("value", stype + '.0');
					opt0.innerHTML = SENSOR_DAYTIME_TYPE_NAMES[0];
					sensortypes.appendChild(opt0);

					var opt1 = document.createElement("option");
					opt1.setAttribute("value", stype + '.1');
					opt1.innerHTML = SENSOR_DAYTIME_TYPE_NAMES[1];
					sensortypes.appendChild(opt1);

					if (temporary_condition && ((temporary_condition.type & SENSOR_TYPE_MASK) == sensor_type)) {
						if (temporary_condition.flags & OUTLET_RULE_FLAG_TIME_EXACT) {
							opt0.setAttribute("selected", "true");
						}
						else if (temporary_condition.flags & OUTLET_RULE_FLAG_TIME_INTERVAL) {
							opt1.setAttribute("selected", "true");
						}
					}
				}
				else if (parseInt(sensor_type) === SENSOR_TYPE_ONOFF) {

					for (var l=0; l<16; l++) {
						if (is_logic_pin_enabled(l, OUTLET.sensor_list[sensor_ix].metric[i].value)) {

							var pin_str = "";
							if (sensor_group == STM32_MCP23017_BUS1_GROUP || sensor_group == STM32_MCP23017_BUS2_GROUP) {
								pin_str = " (" + s_sensor_logic_pin + ('0'+(parseInt(l) +1).toString()).slice(-2) + ") ";
							}

							var opt = document.createElement("option");
							opt.setAttribute("value", stype + "." + l);
							opt.innerHTML = sensor_pin_str + pin_str + SENSOR_TYPE_NAMES[sensor_type];
							sensortypes.appendChild(opt);

							if (temporary_condition && ((temporary_condition.type & SENSOR_TYPE_MASK) == sensor_type)) {
								if (temporary_condition.val_beg & (1 << l)) {
									opt.setAttribute("selected", "true");
								}
							}
						}
					}
				}
				else if (parseInt(sensor_type) === SENSOR_TYPE_ONOFF_CHANGED) {
				}
				else {
					var opt = document.createElement("option");
					opt.setAttribute("value", stype);
					opt.innerHTML = sensor_pin_str + SENSOR_TYPE_NAMES[sensor_type];
					sensortypes.appendChild(opt);

					if (temporary_condition && ((temporary_condition.type & SENSOR_TYPE_MASK) == sensor_type)) {
						opt.setAttribute("selected", "true");
					}
				}

			}

			// sensor values

			if (sensortypes.value != -1) {

				var stype = (parseInt(sensortypes.value) & SENSOR_TYPE_MASK);

				if (stype === SENSOR_TYPE_DAYTIME) { 	// exact/interval time

					var variant = parseInt(sensortypes.value.substr(sensortypes.value.indexOf(".") +1));
					var values = outlet_rule_condition_create_daytime(variant);
					condition_editor.appendChild(values);
				}
				else if (stype === SENSOR_TYPE_ONOFF) {

					var pin = parseInt(sensortypes.value.substr(sensortypes.value.indexOf(".") +1));
					var values = outlet_rule_condition_create_logpin(pin);
					condition_editor.appendChild(values);
				}
				else if (stype === SENSOR_TYPE_ONOFF_CHANGED) {
				}
				else {

					if (stype == SENSOR_TYPE_TEMPERATURE) {
					}
					else if (stype == SENSOR_TYPE_SOLUTION_TEMP) {
					}
					else if (stype == SENSOR_TYPE_HUMIDITY) {
					}
					else if (stype == SENSOR_TYPE_LIGHT_IN) {
					}
					else if (stype == SENSOR_TYPE_LIGHT_OUT) {
					}
					else if (stype == SENSOR_TYPE_CO2) {
					}
					else if (stype == SENSOR_TYPE_EC) {
					}
					else if (stype == SENSOR_TYPE_TDS) {
					}
					else if (stype == SENSOR_TYPE_PPM) {
					}
					else if (stype == SENSOR_TYPE_PH) {
					}
					else if (stype == SENSOR_TYPE_RAW) {
					}
					else if (stype == SENSOR_TYPE_DEW_POINT) {
					}
					else if (stype == SENSOR_TYPE_PRESSURE) {
					}
					else if (stype == SENSOR_TYPE_SEA_LEVEL_PRESSURE) {
					}
					else if (stype == SENSOR_TYPE_ALTITUDE) {
					}
					else if (stype == SENSOR_TYPE_GYRO) {
					}
					else if (stype == SENSOR_TYPE_COMPASS) {
					}

					var values = outlet_rule_condition_create_values(stype);
					condition_editor.appendChild(values);
				}
				values.appendChild(document.createElement("br"));
			}

			// controls

			var btn_cancel = create_element_div("btn_cancel_" + outlet_id + "_" + rule_id + "_" + condition_id, "btn_cancel",
				s_btn_cancel_title, s_btn_cancel,

				function ()
				{
					temporary_condition = null;
					remove_element("outlet_rule_condition_form_" + state + "_" + condition_id);
				},

				values
			);

			var btn_save = create_element_div("btn_save_" + outlet_id + "_" + rule_id + "_" + condition_id, "btn_save",
				s_btn_save_title, s_btn_save,

				function ()
				{
					temporary_rule.condition[condition_id] = temporary_condition;
					temporary_rule.condition_count = temporary_rule.condition.length;
					remove_element("outlet_rule_condition_form_" + state + "_" + condition_id);
					temporary_condition = null;
					outlet_create_rule_form(outlet_id, rule_id);
				},

				values
			);
		}
	}
	else {
		// no sensors are available
	}

	create_element_div
	(
		"outlet_rule_condition_form_close" + outlet_id + "_" + rule_id,
		"outlet_rule_condition_form_close",
		s_outlet_rule_condition_form_close_title,
		s_outlet_rule_condition_form_close,
		function ()
		{
			temporary_condition = null;
			remove_element("outlet_rule_condition_form_" + state + "_" + condition_id);
		},
		condition_editor
	);

	// scroll

	if (scroll_top != null) { condition_editor.scrollTop = scroll_top; }
}



function create_condition_element (outlet_id, rule_id, condition_id, state, parent_el)
{
	var condition_descr = print_outlet_rule_condition_element(temporary_rule, condition_id, state);
	var condition = create_element_div
	(
		"outlet_rule_condition_" + outlet_id + "_" + rule_id + "_" + state + "_" + condition_id, "outlet_rule_condition",
		null, condition_descr, null, parent_el
	);

	var condition_ctl = create_element_div
	(
		"outlet_rule_condition_ctl_" + outlet_id + "_" + rule_id + "_" + state + "_" + condition_id, "outlet_rule_condition_ctl",
		null, null, null, condition
	);

	create_element_div
	(
		"outlet_rule_condition_ctl_edit_" + outlet_id + "_" + rule_id + "_" + state + "_" + condition_id, "outlet_rule_condition_ctl_edit",
		s_outlet_rule_ctl_edit_title, s_outlet_rule_ctl_edit,

		function ()
		{
			outlet_create_condition_form(outlet_id, rule_id, condition_id, state);
		},

		condition_ctl
	);

	create_element_div
	(
		"outlet_rule_condition_ctl_delete_" + outlet_id + "_" + rule_id + "_" + state + "_" + condition_id, "outlet_rule_condition_ctl_delete",
		s_outlet_rule_ctl_delete_title, s_outlet_rule_ctl_delete,

		function ()
		{
			if (!confirm(s_outlet_delete_condition_confirm)) return;

			temporary_rule.condition.splice(condition_id, 1);
			temporary_rule.condition_count = temporary_rule.condition.length;
			if (temporary_rule.condition_count > 0) {
				temporary_rule.condition[0].flags &= ~(OUTLET_RULE_FLAG_RULE_ALG_PRIO | OUTLET_RULE_FLAG_RULE_ALG_AND | OUTLET_RULE_FLAG_RULE_ALG_OR);
				temporary_rule.condition[0].flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO;
			}
			outlet_create_rule_form(outlet_id, rule_id);
		},

		condition_ctl
	);
}



function create_rule_date_element (id, style, title, value, callback, parent_el)
{
	var date = create_element_div(id, style, title, null, callback, parent_el);
	var date_img = create_element_img(id + "_img", null, title, null, tar_get_image_src(img_prefix + "calendar.png"), null, date);
	var date_val = create_element_div(id + "_val", "outlet_rule_datetime_value_val", title, value, null, date);

	return date;
}

function create_rule_time_element (id, style, title, value, callback, parent_el)
{
	var time = create_element_div(id, style, title, null, callback, parent_el);
	var time_img = create_element_img(id + "_img", null, title, null, tar_get_image_src(img_prefix + "clock.png"), null, time);
	var time_val = create_element_div(id + "_val", "outlet_rule_datetime_value_val", title, value, null, time);

	return time;
}



function weekday_clicked (weekday, outlet_id, rule_id)
{
	if (temporary_rule.date.week_days & (1 << weekday)) {
		temporary_rule.date.week_days &= ~(1 << weekday);
	}
	else {
		temporary_rule.date.week_days |= (1 << weekday);
	}

	if ((0x7F & temporary_rule.date.week_days) == 0x7F) {
		// clear week flag when all week days are activated !!!
		temporary_rule.date.flags &= ~(OUTLET_RULE_FLAG_WEEK_ENABLE);
	}
	else {
		temporary_rule.date.flags |= OUTLET_RULE_FLAG_WEEK_ENABLE;
	}

	outlet_create_rule_form(outlet_id, rule_id);
}

function outlet_create_rule_form (outlet_id, rule_id)
{
	if (typeof outlet_id !== 'number' || outlet_id < 0 || outlet_id >= OUTLET.outlet.length) {
		console.log("invalid outlet id for edit rule");
		return;
	}

	if (typeof rule_id !== 'number') {
		rule_id = 0;
		if (OUTLET.outlet[outlet_id].rule.length > 0) {
			var i = 0;
			for (i=0; i<OUTLET.outlet[outlet_id].rule.length; i++) {
				if (
					!OUTLET.outlet[outlet_id].rule[i]
					|| typeof OUTLET.outlet[outlet_id].rule[i] !== 'object'
					|| OUTLET.outlet[outlet_id].rule[i] == null
				) {
					break;
				}
			}
			rule_id = i;
		}
	}


	// get scroll position

	var scroll_top = null;
	var rule_editor = document.getElementById("outlet_rule_form_" + outlet_id + "_" + rule_id);
	if (rule_editor) { scroll_top = rule_editor.scrollTop; }



	rule_editor = create_element_div("outlet_rule_form_" + outlet_id + "_" + rule_id, "outlet_rule_form", null, null, null, document.body);
	if (!rule_editor) {
		console.log("outlet rule");
		return;
	}

	var outlet_rule_hdr = create_element_div
					(
						"outlet_rule_header_" + outlet_id + "_" + rule_id,
						"outlet_rule_header",
						null,
						s_outlet_rule_header + " №" + ('0'+(rule_id+ 1).toString()).slice(-2)
											+ "<br />" + s_outlet_for_outlet + " №" + ('0'+(parseInt(outlet_id) +1).toString()).slice(-2),
						null,
						rule_editor
					);



	if (temporary_rule === null) temporary_rule = outlet_create_rule_copy(outlet_id, rule_id);

	var d = new Date(temporary_rule.date.start * 1000);
	var rule_date_start = (temporary_rule.date.start > 0)?
						('0'+d.getDate()).slice(-2) + "/" + ('0'+(parseInt(d.getMonth()) +1).toString()).slice(-2) + "/" + d.getFullYear() :
						"--/--/----";
	var rule_time_start = (temporary_rule.date.start > 0)?  ('0'+d.getHours()).slice(-2) + ":" + ('0'+d.getMinutes()).slice(-2) : "--:--";

	d = new Date(temporary_rule.date.stop * 1000);
	var rule_date_stop = (temporary_rule.date.stop > 0)?
						('0'+d.getDate()).slice(-2) + "/" + ('0'+(parseInt(d.getMonth()) +1).toString()).slice(-2) + "/" + d.getFullYear() :
						"--/--/----";
	var rule_time_stop = (temporary_rule.date.stop > 0)?  ('0'+d.getHours()).slice(-2) + ":" + ('0'+d.getMinutes()).slice(-2) : "--:--";


	var datetime_block = create_element_div
					(
						"outlet_rule_datetime_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_block", null, null, null, rule_editor
					);

	var datetime_start = create_element_div
					(
						"outlet_rule_datetime_start_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_container",
						null, s_outlet_rule_start + "&emsp;", null, datetime_block
					);

	var date_start = create_rule_date_element
					(
						"outlet_rule_date_start_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_value",
						s_outlet_rule_date_start_title,
						rule_date_start,

						function ()
						{
							create_calendar(s_outlet_rule_time_start_title, null, null, function (datetime) {

								temporary_rule.date.flags |= OUTLET_RULE_FLAG_DATE_ENABLE;
								temporary_rule.date.start = datetime;
								outlet_create_rule_form(outlet_id, rule_id);
								remove_calendar();
							});
						},

						datetime_start
					);

	var time_start = create_rule_time_element
					(
						"outlet_rule_time_start_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_value",
						s_outlet_rule_time_start_title,
						rule_time_start,

						function ()
						{
							edit_time
							(
								s_outlet_rule_time_start_title, temporary_rule.date.start, null,

								function (datetime)
								{
									temporary_rule.date.flags |= OUTLET_RULE_FLAG_DATE_ENABLE;
									temporary_rule.date.start = datetime;
									outlet_create_rule_form(outlet_id, rule_id);
									remove_editor();
								},

								function ()
								{
									remove_editor();
								}
							);
						},

						datetime_start
					);




	var datetime_stop = create_element_div
					(
						"outlet_rule_datetime_stop_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_container",
						null, s_outlet_rule_stop + "&emsp;", null, datetime_block
					);

	var date_stop = create_rule_date_element
					(
						"outlet_rule_date_stop_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_value",
						s_outlet_rule_date_stop_title,
						rule_date_stop,

						function ()
						{
							create_calendar(s_outlet_rule_time_stop_title, null, null, function (datetime) {

								temporary_rule.date.flags |= OUTLET_RULE_FLAG_DATE_ENABLE;
								temporary_rule.date.stop = datetime;
								outlet_create_rule_form(outlet_id, rule_id);
								remove_calendar();
							});
						},

						datetime_stop
					);

	var time_stop = create_rule_time_element
					(
						"outlet_rule_time_stop_" + outlet_id + "_" + rule_id, "outlet_rule_datetime_value",
						s_outlet_rule_time_stop_title,
						rule_time_stop,

						function ()
						{
							edit_time
							(
								s_outlet_rule_time_stop_title, temporary_rule.date.stop, null,

								function (datetime)
								{
									temporary_rule.date.flags |= OUTLET_RULE_FLAG_DATE_ENABLE;
									temporary_rule.date.stop = datetime;
									outlet_create_rule_form(outlet_id, rule_id);
									remove_editor();
								},

								function ()
								{
									remove_editor();
								}
							);
						},

						datetime_stop
					);


	// week days

	var weekdays_container = create_element_div
					(
						"outlet_rule_weekdays_container_" + outlet_id + "_" + rule_id, "outlet_rule_weekdays_container",
						null, null, null, datetime_block
					);

	for (var i=0; i<7; i++) {

		var weekday_container = create_element_div
					(
						"weekday_container" + outlet_id + "_" + rule_id + "_" + i, "outlet_rule_weekday_container",
						null, weekday_list[i] + "<br />", null, weekdays_container
					);

		var title = (temporary_rule.date.week_days & (1 << i))? s_outlet_rule_weekday_button_on_title : s_outlet_rule_weekday_button_off_title;
		var inner = (temporary_rule.date.week_days & (1 << i))? s_outlet_rule_weekday_button_on : s_outlet_rule_weekday_button_off;
		var style = (temporary_rule.date.week_days & (1 << i))? "outlet_rule_weekday_button_on" : "outlet_rule_weekday_button_off";
		var weekday_button = create_element_div
					(
						"weekday_" + outlet_id + "_" + rule_id + "_" + i, style, title, inner,
						"weekday_clicked("+i+","+outlet_id+","+rule_id+");", weekday_container
					);
	}



	var condition_list_on_container = create_element_div
					(
						"outlet_rule_condition_list_on_container_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list_container_on",
						null, null, null, rule_editor
					);

	var condition_list_on_header = create_element_div
					(
						"outlet_rule_condition_list_on_header_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list_header_on",
						null, s_outlet_rule_condition_list_on_header, null, condition_list_on_container
					);

	var condition_list_on = create_element_div
					(
						"outlet_rule_condition_list_on_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list",
						null, null, null, condition_list_on_container
					);

	var cnt = 0;
	for (var i=0; i<temporary_rule.condition.length; i++) {

		if (temporary_rule.condition[i].flags & OUTLET_RULE_FLAG_ON) {
			create_condition_element(outlet_id, rule_id, i, 1, condition_list_on); cnt++;
		}
	}

	if (cnt == 0) {
		condition_list_on.innerHTML = s_outlet_rule_no_conditions;
	}


	create_element_div
	(
		"outlet_btn_add_on_" + outlet_id + "_" + rule_id,
		"outlet_btn_add", s_outlet_btn_addcondition_title, s_outlet_btn_addcondition,

		function ()
		{
			outlet_create_condition_form(outlet_id, rule_id, (temporary_rule.condition.length > 0)? temporary_rule.condition.length : 0, 1);
		},

		condition_list_on_container
	);


	var condition_list_off_container = create_element_div
					(
						"outlet_rule_condition_list_off_container_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list_container_off",
						null, null, null, rule_editor
					);

	var condition_list_off_header = create_element_div
					(
						"outlet_rule_condition_list_off_header_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list_header_off",
						null, s_outlet_rule_condition_list_off_header, null, condition_list_off_container
					);

	var condition_list_off = create_element_div
					(
						"outlet_rule_condition_list_off_" + outlet_id + "_" + rule_id, "outlet_rule_condition_list",
						null, null, null, condition_list_off_container
					);


	var cnt = 0;
	for (var i=0; i<temporary_rule.condition.length; i++) {

		if (temporary_rule.condition[i].flags & OUTLET_RULE_FLAG_OFF) {
			create_condition_element(outlet_id, rule_id, i, 0, condition_list_off); cnt++;
		}
	}

	if (cnt == 0) {
		condition_list_off.innerHTML = s_outlet_rule_no_conditions;
	}


	create_element_div
	(
		"outlet_btn_add_off_" + outlet_id + "_" + rule_id,
		"outlet_btn_add", s_outlet_btn_addcondition_title, s_outlet_btn_addcondition,

		function ()
		{
			outlet_create_condition_form(outlet_id, rule_id, (temporary_rule.condition.length > 0)? temporary_rule.condition.length : 0, 0);
		},

		condition_list_off_container
	);

	create_element_div
	(
		"outlet_rule_form_close" + outlet_id + "_" + rule_id,
		"outlet_rule_form_close",
		s_outlet_rule_form_close_title,
		s_outlet_rule_form_close,
		function ()
		{
			temporary_rule = null;
			remove_element("outlet_rule_form_" + outlet_id + "_" + rule_id);
		},
		rule_editor
	);


	var btn_cancel = create_element_div
	(
		"btn_cancel",
		"btn_cancel",
		s_btn_cancel_title,
		s_btn_cancel,
		function ()
		{
			temporary_rule = null;
			remove_element("outlet_rule_form_" + outlet_id + "_" + rule_id);
		},
		rule_editor
	);

	var btn_save = create_element_div
	(
		"btn_save",
		"btn_save",
		s_btn_save_title,
		s_btn_save,

		function ()
		{
			if (temporary_rule.condition.length > 0) {
				set_outlet_rule 
				(
					outlet_id,
					rule_id,
					((typeof OUTLET.outlet[outlet_id].rule[rule_id] === 'object') && (OUTLET.outlet[outlet_id].rule[rule_id] !== null))?
							"replace" : "append",
					((OUTLET.outlet[outlet_id].rule.length > 0 && rule_id > 0)? "and" : "prio"),
					temporary_rule.date,
					temporary_rule.condition,
					function (oid, state)
					{
						if (state == 0) {
							temporary_rule = null;
							outlet_config(outlet_id);
							remove_element("outlet_rule_form_" + outlet_id + "_" + rule_id);
						}
						else {
							alert ("ERROR: code " + state);
						}
					}
				);
			}
			else {
				alert ("NO CONDITIONS");
			}
		},

		rule_editor
	);


	// scroll

	if (scroll_top != null) { rule_editor.scrollTop = scroll_top; }
}

function outlet_rule_delete (outlet_id, rule_id)
{
	if (!confirm(s_outlet_delete_rule_confirm + " №" + (rule_id + 1).toString() + " ?")) return;

	console.log("delete "+outlet_id+" "+rule_id);

	delete_outlet_rule(outlet_id, rule_id, function (state) {

		if (state == 0) {
			console.log("rule deleted");
			outlet_update_rules(outlet_id);
		}
		else {
			console.log("rule is not deleted");
		}
	});

	return false;
}

function print_outlet_rule_condition_element (rule, condition_id, state)
{
	var condition_descr = "";
	var condition = rule.condition[condition_id];
	// type
	var sensor_type = condition.type & SENSOR_TYPE_MASK;
	var sensor_group = condition.type & SENSOR_GROUP_MASK;
	var sensor_pinid = ((condition.type & SENSOR_COUNT_MASK) >> 16);
	var sensor_flags = condition.flags;
	var sensor_valbeg = condition.val_beg;
	var sensor_valend = condition.val_end;

	if (state === 1 && (sensor_flags & OUTLET_RULE_FLAG_ON)) {
	}
	else if (state === 0 && (sensor_flags & OUTLET_RULE_FLAG_OFF)) {
	}
	else {
		return "";
	}

	if (sensor_flags & OUTLET_RULE_FLAG_RULE_ALG_PRIO) {
		condition_descr += "=";
	}
	else if (sensor_flags & OUTLET_RULE_FLAG_RULE_ALG_AND) {
		condition_descr += "&";
	}
	else if (sensor_flags & OUTLET_RULE_FLAG_RULE_ALG_OR) {
		condition_descr += "|";
	}

	// name
	var sensor_name = null;
	for (var s=0; s<OUTLET.sensor_list.length; s++) {
		var e = 0; for (e=0; e<8; e++) { if (OUTLET.sensor_list[s].device_id[e] != condition.sensor_id[e]) break; }
		if (e == 8) { sensor_name = OUTLET.sensor_list[s].name; break; }
	}
	if (sensor_name === null) {
		var sensor_id = "";
		for (var id=0; id<8; id++) { sensor_id += condition.sensor_id[id].toString(16); }
		sensor_name = "набор датчиков:&emsp;" + sensor_id;
	}
	condition_descr += "&emsp;" + sensor_name + "&emsp;";


	condition_descr += "<div class=\"outlet_rule_condition_value\">";
	if (sensor_type == SENSOR_TYPE_ONOFF) {
		var val = "unknown";
		var a = 0;
		if (sensor_flags & OUTLET_RULE_FLAG_ONOFF_ON) { val = "ON"; }
		else if (sensor_flags & OUTLET_RULE_FLAG_ONOFF_OFF) { val = "OFF"; }
		condition_descr += "(" + SENSOR_TYPE_NAMES[parseInt(sensor_type)] + ": (";
		for (var l=0; l<16; l++) {
			var sid = s_sensor_logic_pin + ('0'+(parseInt(l) +1).toString()).slice(-2);
			if (sensor_valbeg & (1 << l)) {
				condition_descr += ((a > 0)? "," : "") + sid
				a++;
			}
		}
		condition_descr += ") == " + val + ")";
		condition_descr += "<br />";
	}
	else if (sensor_type == SENSOR_TYPE_DAYTIME) {
		if (sensor_flags & OUTLET_RULE_FLAG_TIME_EXACT) {
			condition_descr += "(" + SENSOR_DAYTIME_TYPE_NAMES[0] + ") ";

			var d0 = new Date(sensor_valbeg * 1000);
			condition_descr += ('0'+d0.getHours()).slice(-2) + ":" + ('0'+d0.getMinutes()).slice(-2);
			if (rule.date.flags & OUTLET_RULE_FLAG_DATE_ENABLE) {
				var d1 = new Date(sensor_valend * 1000);
				condition_descr += "(" + ('0'+d1.getHours()).slice(-2) + ":" + ('0'+d1.getMinutes()).slice(-2) + ")";
			}
		}
		else if (sensor_flags & OUTLET_RULE_FLAG_TIME_INTERVAL) {
			condition_descr += "(" + SENSOR_DAYTIME_TYPE_NAMES[1] + ") ";

			condition_descr += ('0'+parseInt(sensor_valbeg/3600).toString()).slice(-2) + ":"
							+ ('0'+parseInt((sensor_valbeg%3600)/60).toString()).slice(-2);
			if (rule.date.flags & OUTLET_RULE_FLAG_DATE_ENABLE) {
				condition_descr += ('0'+parseInt(sensor_valend/3600).toString()).slice(-2) + ":"
								+ ('0'+parseInt((sensor_valend%3600)/60).toString()).slice(-2);
			}
		}
		condition_descr += "<br />";
	}
	else {
		var sid = ('0'+(parseInt(sensor_pinid) +1).toString()).slice(-2);
		if (
			(sensor_group == STM32_BME280_BUS1_GROUP) || (sensor_group == STM32_BME280_BUS2_GROUP)
			|| (sensor_group == STM32_BH1750_BUS1_GROUP) || (sensor_group == STM32_BH1750_BUS2_GROUP)
		) {
			sid = s_sensor_digital_id + sid;
		}
		else if ((sensor_group == STM32_ADC1_GROUP) || (sensor_group == STM32_ADC2_GROUP)) {
			sid = s_sensor_analog_pin + sid;
		}

		var units = "";

		switch (parseInt(sensor_type)) {

		case SENSOR_TYPE_TEMPERATURE: units = s_sensor_units_temperature; break;

		case SENSOR_TYPE_SOLUTION_TEMP: units = s_sensor_units_temperature; break;

		case SENSOR_TYPE_HUMIDITY: units = s_sensor_units_humidity; break;

		case SENSOR_TYPE_LIGHT_IN: units = s_sensor_units_light_in; break;

		case SENSOR_TYPE_LIGHT_OUT: units = s_sensor_units_light_out; break;

		case SENSOR_TYPE_CO2: units = s_sensor_units_co2; break;

		case SENSOR_TYPE_EC: units = s_sensor_units_ec; break;

		case SENSOR_TYPE_TDS: units = s_sensor_units_tds; break;

		case SENSOR_TYPE_PPM: units = s_sensor_units_ppm; break;

		case SENSOR_TYPE_PH: units = s_sensor_units_ph; break;

		case SENSOR_TYPE_RAW: units = s_sensor_units_raw; break;

		case SENSOR_TYPE_DEW_POINT: units = s_sensor_units_temperature; break;

		case SENSOR_TYPE_PRESSURE: units = s_sensor_units_pressure; break;

		case SENSOR_TYPE_SEA_LEVEL_PRESSURE: units = s_sensor_units_pressure; break;

		case SENSOR_TYPE_ALTITUDE: units = s_sensor_units_altitude; break;

		case SENSOR_TYPE_GYRO: units = s_sensor_units_gyro; break;

		case SENSOR_TYPE_COMPASS: units = s_sensor_units_compass; break;

		}

		condition_descr += "((" + sid + ") " + SENSOR_TYPE_NAMES[parseInt(sensor_type)] + ")";
		condition_descr += ((sensor_flags & OUTLET_RULE_FLAG_RISE)? " > " : " < ") + Math.round(sensor_valbeg*100)/100;
		condition_descr += (rule.date.flags & OUTLET_RULE_FLAG_DATE_ENABLE)? "(" + sensor_valend + ")" : "";
		condition_descr += " " + units + "<br />";
	}
	condition_descr += "</div><br />";

	return condition_descr;
}

function outlet_create_rule_element (outlet_id, rule_id, outlet_rule_list)
{
	var element_id = "outlet_rule_element_" + outlet_id + "_" + rule_id;
	var rule_element = document.getElementById(element_id);
	if (!rule_element) {
		rule_element = create_element_div
		(
			element_id,
			"outlet_rule_element",
			null,
			null,
			null, // "outlet_create_rule_form("+outlet_id+", "+rule_id+");",
			outlet_rule_list
		);
		if (!rule_element) {
			console.log("outlet create rule element");
			return;
		}
	}



	var rule_flags = OUTLET.outlet[outlet_id].rule[rule_id].flags;
	if (rule_flags & OUTLET_RULE_FLAG_RULE_ALG_PRIO) {
		rule_element.innerHTML += "=";
	}
	else if (rule_flags & OUTLET_RULE_FLAG_RULE_ALG_AND) {
		rule_element.innerHTML += "&";
	}
	else if (rule_flags & OUTLET_RULE_FLAG_RULE_ALG_OR) {
		rule_element.innerHTML += "|";
	}
	rule_element.innerHTML += "&emsp;Правило №" + (rule_id + 1).toString() + ": ";
	rule_element.innerHTML += "<br />";


	var date_start = null;
	var date_stop = null;
	var week_days = null;
	var date_flags = OUTLET.outlet[outlet_id].rule[rule_id].date.flags;
	if (date_flags & OUTLET_RULE_FLAG_DATE_ENABLE) {
		date_start = OUTLET.outlet[outlet_id].rule[rule_id].date.start;
		date_stop = OUTLET.outlet[outlet_id].rule[rule_id].date.stop;
		var dstart = new Date(date_start * 1000);
		var dstop = new Date(date_stop * 1000);
		rule_element.innerHTML += "действие:&emsp;"
					+ ('0'+dstart.getHours()).toString().slice(-2) + ":" + ('0'+dstart.getMinutes()).toString().slice(-2) + " "
					+ ('0'+dstart.getDate()).toString().slice(-2) + "/"
					+ ('0'+(parseInt(dstart.getMonth()) + 1).toString()).slice(-2)
					+ "/" + dstart.getFullYear()
					+ " - "
					+ ('0'+dstop.getHours()).toString().slice(-2) + ":" + ('0'+dstop.getMinutes()).toString().slice(-2) + " "
					+ ('0'+dstop.getDate()).toString().slice(-2) + "/"
					+ ('0'+(parseInt(dstop.getMonth()) + 1).toString()).slice(-2) + "/"
					+ dstop.getFullYear();
	}
	else {
		rule_element.innerHTML += "";
	}
	rule_element.innerHTML += "<br />";

	if (date_flags & OUTLET_RULE_FLAG_WEEK_ENABLE) {
		week_days = OUTLET.outlet[outlet_id].rule[rule_id].date.week_days;
		rule_element.innerHTML += "дни недели:&emsp;";
		if (week_days & 0x01) rule_element.innerHTML += "Пн.";
		if (week_days & 0x02) rule_element.innerHTML += "Вт.";
		if (week_days & 0x04) rule_element.innerHTML += "Ср.";
		if (week_days & 0x08) rule_element.innerHTML += "Чт.";
		if (week_days & 0x10) rule_element.innerHTML += "Пт.";
		if (week_days & 0x20) rule_element.innerHTML += "Сб.";
		if (week_days & 0x40) rule_element.innerHTML += "Вс.";
		rule_element.innerHTML += "<br /><br />";
	}


	var conditions_on = "";
	var conditions_off = "";
	for (var i=0; i<OUTLET.outlet[outlet_id].rule[rule_id].condition_count; i++) {

		conditions_on += print_outlet_rule_condition_element(OUTLET.outlet[outlet_id].rule[rule_id], i, 1 /* state == ON */);
		conditions_off += print_outlet_rule_condition_element(OUTLET.outlet[outlet_id].rule[rule_id], i, 0 /* state == OFF */);
	}
	rule_element.innerHTML += "ON:<br />" + conditions_on + "<br />";
	rule_element.innerHTML += "OFF:<br />" + conditions_off + "<br />";


	var rule_control = create_element_div
	(
		"outlet_rule_control_" + outlet_id + "_" + rule_id,
		"outlet_rule_control",
		null,
		null,
		null,
		rule_element
	);

	create_element_div
	(
		"outlet_rule_edit_" + outlet_id + "_" + rule_id,
		"outlet_rule_edit",
		s_outlet_rule_edit_title,
		s_outlet_rule_edit,
		"outlet_create_rule_form("+outlet_id+", "+rule_id+");",
		rule_control
	);

	create_element_div
	(
		"outlet_rule_delete_" + outlet_id + "_" + rule_id,
		"outlet_rule_delete",
		s_outlet_rule_delete_title,
		s_outlet_rule_delete,
		"outlet_rule_delete("+outlet_id+","+rule_id+");",
		rule_control
	);
}


function outlet_update_rules (outlet_id)
{
	var outlet_rule_list = document.getElementById("outlet_rule_list_" + outlet_id);
	if (!outlet_rule_list) {
		console.log("outlet update rules: no outlet rule list element");
		return;
	}

	// clear list
	for (var i=outlet_rule_list.childNodes.length-1; i>=0; i--) {
		outlet_rule_list.removeChild(outlet_rule_list.childNodes[i]);
	}


	if (!OUTLET.outlet[outlet_id].rule || OUTLET.outlet[outlet_id].rule.length == 0) {
		// NO RULES
		return;
	}

	for (var i=0; i<OUTLET.outlet[outlet_id].rule.length; i++) {
		outlet_create_rule_element(outlet_id, i, outlet_rule_list);
	}
}

function outlet_name_edit (outlet_id)
{
	var outlet_name_el = document.getElementById("outlet_name_" + outlet_id);
	var outlet_consumer_el = document.getElementById("outlet_consumer_" + outlet_id);

	if (!outlet_name_el || !outlet_consumer_el) {
		console.log("outlet_name_edit: no outlet config element");
		return;
	}

	edit_name
	(
		s_outlet_change_name + " №" + ('0'+(outlet_id+ 1).toString()).slice(-2),

		OUTLET.outlet[outlet_id].name,

		function (name)
		{
			var state = OUTLET.outlet[outlet_id].state;
			set_outlet_config(outlet_id, outlet_consumer_el.value, state, name, function() { outlet_name_el.innerHTML = name; remove_editor(); });
		},

		function ()
		{
			remove_editor();
		}
	);
}



function outlet_config (outlet_id)
{
	// get scroll position

	var scroll_top = null;
	var config = document.getElementById("outlet_config_page");
	if (config) { scroll_top = config.scrollTop; }


	config = create_element_div("outlet_config_page", "outlet_config_page", null, null, null, document.body);
	if (!config) {
		console.log("outlet config");
		return;
	}

	var outlet_conf_hdr = create_element_div
					(
						"outlet_conf_header" + outlet_id, "outlet_conf_header",
						null, s_outlet_conf_header + " №" + ('0'+(outlet_id+ 1).toString()).slice(-2), null, config
					);

	var outlet_name = create_element_div
					(
						"outlet_name_" + outlet_id, "outlet_name_edit",
						s_outlet_change_name_title + " №" + ('0'+(outlet_id+ 1).toString()).slice(-2),
						OUTLET.outlet[outlet_id].name, "outlet_name_edit("+outlet_id+");", config
					);

	var outlet_consumer = document.createElement("select");
	outlet_consumer.setAttribute("id", "outlet_consumer_" + outlet_id);
	outlet_consumer.setAttribute("class", "outlet_consumer");
	for (var i=0; i<1 /* OUTLET_CONSUMER_MAX */; i++) {
		var opt = document.createElement("option");
		opt.setAttribute("value", i.toString());
		if (OUTLET.outlet[outlet_id].consumer == i) opt.setAttribute("selected", "true");
		opt.innerHTML = OUTLET_CONSUMER_NAMES[i];
		outlet_consumer.appendChild(opt);
	}
	config.appendChild(outlet_consumer);
	config.appendChild(document.createElement("br"));

	var outlet_rules = create_element_div
					(
						"outlet_rule_list_" + outlet_id, "outlet_rule_list",
						null, null, null, config
					);
	config.appendChild(document.createElement("br"));

	outlet_update_rules(outlet_id);

	var btn_close = create_element_div("btn_close", "btn_close", s_btn_close_title, s_btn_close,

		function ()
		{
			remove_element("outlet_config_page");
		},

		config
	);

	var btn_close_corner = create_element_div("btn_close_corner", "btn_close_corner", s_btn_close_title, s_btn_close_corner,

		function ()
		{
			remove_element("outlet_config_page");
		},

		config
	);


	var btn_addrule = create_element_div("outlet_btn_add_" + outlet_id, "outlet_btn_add", s_outlet_btn_addrule_title, s_outlet_btn_addrule,

		function ()
		{
			outlet_create_rule_form(outlet_id,null);
		},

		config
	);


	// scroll

	if (scroll_top != null) { config.scrollTop = scroll_top; }
}



function outlet_page_create ()
{
	var outlet_list = create_element_div("page_info", "page_info", null, null, null, document.body);
	if (!outlet_list) {
		return;
	}

	outlet_service();
	start_service(outlet_service);

	outlet_page_update();
}




function outlet_update_info (callback)
{
	get_outlet_device_config
	(
		function (state)
		{
			get_outlet_count
			(
				function (state)
				{
					if (state == 0) {

						if (OUTLET.count <= 0) {
							console.log("no outlets found");
							if (callback) callback();
							return;
						}

						get_outlet_config
						(
							0, OUTLET.count,

							function (state)
							{
								if (state == 0) {
									get_outlet_sensor_list
									(
										function (state)
										{
											outlet_get_next_outlet_rules(-1, 0);

											if (callback) callback();
											outlet_update();
										}
									);
								}
								else {
									alert("ERROR: get outlet config: code " + state);
								}
							}
						);
					}
					else {
						alert("ERROR: get outlet count: code " + state);
					}
				}
			);
		}
	);
}

function outlet_get_next_outlet_rules (outlet_id, state)
{
	if (state != 0) {
		console.log("error: cannot get rules: code " + state);
		return;
	}

	outlet_id++;

	if (outlet_id >= OUTLET.count) {
		console.log("get rules: end of outlets");
		return;
	}

	get_outlet_rules(outlet_id, 0, 100, outlet_get_next_outlet_rules);
}

var sensor_list_time = 0;
function outlet_service ()
{
	sensor_list_time++;

	get_outlet_count
	(
		function (state)
		{
			get_outlet_config
			(
				0, OUTLET.count,

				function (state)
				{
					if (sensor_list_time >= 5) {
						get_outlet_sensor_list
						(
							function (state)
							{
								if (under_controller) outlet_get_next_outlet_rules(-1, 0);
							}
						);
						sensor_list_time = 0;
					}
					outlet_page_update();
				}
			);
		}
	);
}

