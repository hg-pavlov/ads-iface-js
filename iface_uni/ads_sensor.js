

var s_sensor_logic_pin = "L";
var s_sensor_logic_pin_state_on = "Да (замкнуто)";
var s_sensor_logic_pin_state_off = "Нет (разомкнуто)";
var s_sensor_logic_title = "";
var s_sensor_analog_pin = "A";
var s_sensor_device_name_title = "Изменение имени устройства";
var s_sensor_device_id_title = "ID устройства";
var s_sensor_block_datetime_header = "Дата и время устройства";
var s_sensor_block_digital_header = "Цифровые датчики";
var s_sensor_block_analog_header = "Аналоговые датчики";
var s_sensor_block_logic_header = "Логические датчики";
var s_sensor_date_title = "Дата устройства";
var s_sensor_time_title = "Время устройства";
var s_sensor_analog_title = "Калибровка датчика";
var s_sensor_digital_title = "";
var s_sensor_digital_id = "D";
var s_sensor_digital_name_title = "Изменение имени датчика";
var s_sensor_config_title = "Настроить датчики";
var s_sensor_edit_device_name_header = "Изменение название набора датчиков";
var s_sensor_edit_digital_name_header = "Изменение названия цифрового датчика";
var s_sensor_system_date = "Изменение даты устройства";
var s_sensor_system_time = "Изменение времени устройства";
var s_sensor_analog_config = "Настройка аналоговых входов";
var s_sensor_analog_type = "Тип:";
var s_sensor_analog_tempcomp = "Температурная компенсация:";
var s_sensor_analog_no_temp_comp = "Не требуется";
var s_sensor_analog_ppm_conv_factor = "Фактор конверсии PPM:";
var s_sensor_analog_pin_distance = "Расстояние между измер.пинами:";
var s_sensor_analog_ppm_conv_factor_hint = "стандарт: 500,640,700,720";
var s_sensor_analog_pin_distance_unit = "мм";
var s_sensor_logic_config = "Настройка логических входов";
var s_sensor_logic_on = "Вкл.";
var s_sensor_logic_off = "Выкл.";
var s_sensor_logic_off_title = "Включить";
var s_sensor_logic_on_title = "Выключить";
var s_sensor_calibr_config = "Калибровка датчика";
var s_btn_add_value_title = "Занести значение";
var s_btn_add_value = "Занести значение";
var s_btn_reset_calibr_title = "Сброс калибровки";
var s_btn_reset_calibr = "Сбросить";
var s_sensor_calibr_value_hint = "Занесите желаемое текущее значение"



function date_from_sensor_value (value)
{
	var d = new Date(value * 1000); // date returns LOCAL date from GMT+00 !!!
	var day = d.getDate(); var month = d.getMonth(); var year = d.getFullYear();
	var date = ('0'+day.toString()).slice(-2)+"."+('0'+(month+1).toString()).slice(-2)+"."+year.toString();

	return date;
}

function time_from_sensor_value (value)
{
	var d = new Date(); var tz = d.getTimezoneOffset()*60;
	var ss = ((value & 0x00FFFFFF) - tz); ss = ((ss > (3600*24))? (ss - (3600*24)) : ss);
	var hh = parseInt(ss/3600); var mm = parseInt((ss%3600)/60);
	var time = ('0'+hh.toString()).slice(-2) + ":" + ('0'+mm.toString()).slice(-2);

	return time;
}


function create_sensor_datetime_value (block_id, block_style, title, img_src, value, onclick, parent_el)
{
	var block = create_element_div(block_id, block_style, title, null, onclick, parent_el);
	if (!block) {
		console.log("cannot create sensor datetime value block");
		return null;
	}

	var img = create_element_img(block_id + "_img", "sensor_datetime_value_img", null, null, img_src, null, block);
	var val = create_element_div(block_id + "_val", "sensor_datetime_value_val", null, value, null, block);

	return block;
}

function create_sensor_block (block_id, block_style, header, config_func, parent_el)
{
	var block = create_element_div(block_id, block_style, null, null, null, parent_el);
	if (!block) {
		console.log("cannot create sensor block");
		return null;
	}

	var head = create_element_div(block_id + "_hdr", "sensor_block_header", null, header, null, block);

	if (typeof config_func === 'function' || typeof config_func === 'string') {
		create_element_img
		(
			block_id + "_img_config",
			"sensor_config_img",
			s_sensor_config_title,
			null,
			tar_get_image_src(img_prefix + "sensor_conf.png"),
			config_func,
			block
		);
	}

	block.appendChild(document.createElement("br"));

	return block;
}


function create_logic_value (pin, value, block_id, block_style, title, parent_el)
{
	var block = create_element_div(block_id, block_style, title, null, null, parent_el);
	if (!block) {
		console.log("cannot create sensor logic value block");
		return null;
	}

	var logpin_id = s_sensor_logic_pin + ('0'+(pin +1).toString()).slice(-2);
	var logpin_name = (SENSOR.logic_names.length > pin && SENSOR.logic_names[pin]) ? SENSOR.logic_names[pin] : "";
	var logpin_val = (value & (1 << pin))? s_sensor_logic_pin_state_on : s_sensor_logic_pin_state_off;
	var onoff = ((value & (1 << pin))? "_on" : "_off");
	var img_src = tar_get_image_src(img_prefix + "logic" + onoff + ".png");

	var num = create_element_div(block_id + "_num", "sensor_logic_value_num", null, logpin_id , null, block);
	var img = create_element_img(block_id + "_img", "sensor_logic_value_img", null, null, img_src, null, block);
	block.appendChild(document.createElement("br"));
	var name = create_element_div(block_id + "_name", "sensor_logic_value_name", null, logpin_name, null, block);
	block.appendChild(document.createElement("br"));
	var val = create_element_div(block_id + "_val", "sensor_logic_value_val", null, logpin_val, null, block);

	return block;
}

function create_sensor_logic_values (value, parent_el)
{
	if (typeof value !== 'number') {
		console.log("cannot create logic values from sensor value: invalid type of value");
		return;
	}

	for (var i=0; i<16; i++) {
		if (is_logic_pin_enabled(i, value)) {
			var sensor_logic = create_logic_value(i, value, "sensor_logic_" + i, "sensor_logic_value", s_sensor_logic_title, parent_el);
		}
	}
}

function get_sensor_view (sensor_type, value)
{
	var img = "";
	var val = "";

	switch (sensor_type) {

	case SENSOR_TYPE_LIGHT_IN:
		img = tar_get_image_src(img_prefix + "light_in.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_LIGHT_OUT:
		img = tar_get_image_src(img_prefix + "light_out.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_TEMPERATURE:
		img = tar_get_image_src(img_prefix + "temp.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_HUMIDITY:
		img = tar_get_image_src(img_prefix + "humi.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_DEW_POINT:
		img = tar_get_image_src(img_prefix + "dew.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_PRESSURE:
		img = tar_get_image_src(img_prefix + "pres.png");
		val = (Math.round(value * 0.750061561303 * 100)/100).toString();
		break;

	case SENSOR_TYPE_ALTITUDE:
		img = tar_get_image_src(img_prefix + "alti.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_SEA_LEVEL_PRESSURE:
		img = tar_get_image_src(img_prefix + "spres.png");
		val = (Math.round(value * 0.750061561303 * 100)/100).toString();
		break;

	case SENSOR_TYPE_SOLUTION_TEMP:
		img = tar_get_image_src(img_prefix + "sol_temp.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_EC:
		img = tar_get_image_src(img_prefix + "ec.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_PH:
		img = tar_get_image_src(img_prefix + "ph.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_TDS:
		img = tar_get_image_src(img_prefix + "tds.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_PPM:
		img = tar_get_image_src(img_prefix + "ppm.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_CO2:
		img = tar_get_image_src(img_prefix + "co2.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_GYRO:
		img = tar_get_image_src(img_prefix + "gyro.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_COMPASS:
		img = tar_get_image_src(img_prefix + "compass.png");
		val = (Math.round(value * 100)/100).toString();
		break;

	case SENSOR_TYPE_RAW:
		img = tar_get_image_src(img_prefix + "raw.png");
		val = parseInt(value).toString();
		break;

	default:
		console.log("sensor type is not supported");
		return;
	}

	return [ img, val ];
}

function create_sensor_analog_value (pin, sensor_type, block_id, block_style, title, value, onclick, parent_el)
{
	var analog_id = s_sensor_analog_pin + ('0'+(pin + 1).toString()).slice(-2);
	var analog_name = (SENSOR.adc_names.length > pin && SENSOR.adc_names[pin]) ? SENSOR.adc_names[pin] : "";

	var block = create_element_div(block_id, block_style, title, null, onclick, parent_el);
	if (!block) {
		console.log("cannot create sensor analog value block");
		return null;
	}

	var view = get_sensor_view(sensor_type, value);
	var snum = create_element_div(block_id + "_num", "sensor_analog_value_num", null, analog_id , null, block);
	var sname = create_element_div(block_id + "_name", "sensor_analog_value_name", null, analog_name, null, block);
	block.appendChild(document.createElement("br"));
	var simg = create_element_img(block_id + "_img", "sensor_analog_value_img", null, null, view[0], null, block);
	var sval = create_element_div(block_id + "_val", "sensor_analog_value_val", null, view[1], null, block);

	return block;
}


function create_sensor_digital_value (digital_id, sensor_type, block_id, block_style, title, value, onclick, parent_el)
{
	var block = create_element_div(block_id, block_style, title, null, onclick, parent_el);
	if (!block) {
		console.log("cannot create sensor digital value block");
		return null;
	}

	var view = get_sensor_view(sensor_type, value);
	var simg = create_element_img(block_id + "_img", "sensor_digital_value_img", null, null, view[0], null, block);
	var sval = create_element_div(block_id + "_val", "sensor_digital_value_val", null, view[1], null, block);

	return block;
}



function sensor_page_update ()
{
	var sensor_list = document.getElementById("page_info");
	if (!sensor_list) {
		console.log("cannot update sensor page: no page_info element");
		return;
	}

	for (var i=sensor_list.childNodes.length-1; i>=0; i--) {
		sensor_list.removeChild(sensor_list.childNodes[i]);
	}

	if (!SENSOR) {
		console.log("no SENSOR configurations");
		return;
	}


	var sensor_device_name = create_element_div(
				"sensor_device_name", "sensor_device_name", s_sensor_device_name_title, SENSOR.name, sensor_edit_device_name, sensor_list
	);
	sensor_list.appendChild(document.createElement("br"));

	var device_id = "ID: ";
	for (var i=0; i<SENSOR.device_id.length; i++) {
		device_id += ((i > 0 && !(i%2))? " " : "") + ('0'+SENSOR.device_id[i].toString(16)).slice(-2);
	}
	var sensor_device_id = create_element_div(
				"sensor_device_id", "sensor_device_id", s_sensor_device_id_title, device_id, sensor_device_cfg, sensor_list
	);
	sensor_list.appendChild(document.createElement("br"));


	// DATE & TIME

	var sensor_block_datetime = create_sensor_block("sensor_block_datetime", "sensor_block_datetime", s_sensor_block_datetime_header, null, sensor_list);


	// DIGITAL

	var sensor_digital = create_sensor_block("sensor_block_digital", "sensor_block_digital", s_sensor_block_digital_header, null, sensor_list);


	// ANALOG

	var sensor_analog = create_sensor_block("sensor_block_analog", "sensor_block_analog", s_sensor_block_analog_header, sensor_analog_config, sensor_list);


	// LOGIC

	var sensor_logic = create_sensor_block("sensor_block_logic", "sensor_block_logic", s_sensor_block_logic_header, sensor_logic_config, sensor_list);




	for (var i=0; i<SENSOR.sensor_bcast.sensor_count; i++) {

		var stype = (SENSOR.sensor_bcast.metric[i].type & SENSOR_TYPE_MASK);
		var sgrp = (SENSOR.sensor_bcast.metric[i].type & SENSOR_GROUP_MASK);
		var sval = SENSOR.sensor_bcast.metric[i].value;

		if (stype == SENSOR_TYPE_DATE) {
			var sensor_date = create_sensor_datetime_value(
						"sensor_date", "sensor_datetime_value", s_sensor_date_title,
						tar_get_image_src(img_prefix + "calendar.png"),
						date_from_sensor_value(sval), sensor_change_date, sensor_block_datetime
			);
		}
		else if (stype == SENSOR_TYPE_DAYTIME) {
			var sensor_time = create_sensor_datetime_value(
						"sensor_time", "sensor_datetime_value", s_sensor_time_title,
						tar_get_image_src(img_prefix + "clock.png"),
						time_from_sensor_value(sval), sensor_change_time, sensor_block_datetime
			);
		}
		else if (stype == SENSOR_TYPE_ONOFF) {
			create_sensor_logic_values(sval, sensor_block_logic);
		}
		else if (stype == SENSOR_TYPE_ONOFF_CHANGED) {
			// NOT NOW
		}
		else {
			var pin_id = ((SENSOR.sensor_bcast.metric[i].type & SENSOR_COUNT_MASK) >> 16);

			if (sgrp == STM32_ADC1_GROUP || sgrp == STM32_ADC2_GROUP) {
				var sensor_adc = create_sensor_analog_value
				(
							pin_id, stype,
							"sensor_analog_" + pin_id + "_" + stype,
							"sensor_analog_value",
							s_sensor_analog_title,
							sval,
							"sensor_analog_calibr("+pin_id+");",
							sensor_block_analog
				);
			}
			else if (sgrp == STM32_BME280_BUS1_GROUP || sgrp == STM32_BME280_BUS2_GROUP ||
						sgrp == STM32_BH1750_BUS1_GROUP || sgrp == STM32_BH1750_BUS2_GROUP) {
				var block = document.getElementById("sensor_block_digital_" + pin_id);
				if (!block) {
					block = create_element_div("sensor_block_digital_" + pin_id, "sensor_block_digital_id", null, null, null, sensor_block_digital);
					var sensor_name = s_sensor_digital_id + (pin_id + 1).toString() + ": " + SENSOR.digital_names[pin_id];
					create_element_div
					(
						"sensor_block_digital_" + pin_id + "_name",
						"sensor_digital_name",
						s_sensor_digital_name_title,
						sensor_name,
						"sensor_edit_digital_name(" + pin_id + ");",
						block
					);
				}
				var sensor_digital = create_sensor_digital_value(
					pin_id, stype, "sensor_digital_" + pin_id + "_" + stype, "sensor_digital_value", s_sensor_digital_title, sval, null, block
				);
			}
		}
	}

	copyright(sensor_list);
}


function sensor_page_create ()
{
	var sensor_list = create_element_div("page_info", "page_info", null, null, null, document.body);
	if (!sensor_list) {
		return;
	}

	get_sensor_config
	(
		function ()
		{
			sensor_service();
			start_service(sensor_service);
		}
	);

	sensor_page_update();
}









function sensor_edit_device_name ()
{
	edit_name
	(
		s_sensor_edit_device_name_header,

		SENSOR.name,

		function (name)
		{
			set_sensor_device_name(name, function() { remove_editor(); });
		},

		function ()
		{
			remove_editor();
		}
	);
}


function sensor_edit_digital_name (id)
{
	edit_name
	(
		s_sensor_edit_digital_name_header + " №" + (parseInt(id) + 1).toString(),

		SENSOR.digital_names[id],

		function (name)
		{
			set_digital_sensor_name(id, name, function() { remove_editor(); });
		},

		function ()
		{
			remove_editor();
		}
	);
}


function sensor_adc_pin_type_changed (pin)
{
	var form_id = "adcpin_" + pin;
	var type_el = document.getElementById(form_id + "_type");
	var name_el = document.getElementById(form_id + "_name");
	var tempcomp_el = document.getElementById(form_id + "_tempcomp");

	create_adc_editor_form(pin, type_el.value, tempcomp_el.value, name_el.value, null);
}

function create_adc_editor_form (pin, sensor_type, temp_compensate_adc_pin, name, parent_el)
{
	var form_id = "adcpin_" + pin;
	var adc_form = create_element_div(form_id, "sensor_analog_pin_form", null, null, null, parent_el);

	var analog_id = s_sensor_analog_pin + ('0'+(pin + 1).toString()).slice(-2);
	var adc_num = create_element_div(form_id + "_num", "sensor_analog_pin_num", null, analog_id, null, adc_form);

	adc_form.innerHTML += s_sensor_analog_type;

	if (!sensor_type) sensor_type = SENSOR.stm32.adc[pin].type;
	if (!temp_compensate_adc_pin) temp_compensate_adc_pin = SENSOR.stm32.adc[pin].temp_compensate_adc_pin;
	if (!name) name = SENSOR.adc_names[pin];

	var select_type = document.createElement("select");
	select_type.setAttribute("id", form_id + "_type");
	select_type.setAttribute("class", "sensor_analog_pin_type");
	select_type.setAttribute("onchange", "sensor_adc_pin_type_changed("+pin+");");
	for (var i=0; i<SENSOR_ANALOG_TYPES.length; i++) {
		var opt = document.createElement("option");
		opt.setAttribute("value", SENSOR_ANALOG_TYPES[i][0]);
		if ((sensor_type & SENSOR_TYPE_MASK) == SENSOR_ANALOG_TYPES[i][0]) opt.setAttribute("selected", "true");
		opt.innerHTML = SENSOR_ANALOG_TYPES[i][1];
		select_type.appendChild(opt);
	}
	adc_form.appendChild(select_type);
	adc_form.appendChild(document.createElement("br"));


	if (sensor_type == SENSOR_TYPE_EC) {

		var ppm_conv_factor = (SENSOR.stm32.adc[pin].ex && SENSOR.stm32.adc[pin].ex.ec)?
								SENSOR.stm32.adc[pin].ex.ec.ppm_conv_factor : EC_PPM_CONVERSION_FACTOR_MIN;
		var pin_distance = (SENSOR.stm32.adc[pin].ex && SENSOR.stm32.adc[pin].ex.ec)?
								SENSOR.stm32.adc[pin].ex.ec.pin_distance : 1;

		adc_form.innerHTML += s_sensor_analog_ppm_conv_factor;
		var ppm_conv_factor_el = document.createElement("input");
		ppm_conv_factor_el.setAttribute("id", form_id + "_ppm_conv_factor");
		ppm_conv_factor_el.setAttribute("class", "sensor_analog_pin_ppm_conv_factor");
		ppm_conv_factor_el.setAttribute("type", "number");
		ppm_conv_factor_el.setAttribute("min", EC_PPM_CONVERSION_FACTOR_MIN.toString());
		ppm_conv_factor_el.setAttribute("max", "1000");
		ppm_conv_factor_el.setAttribute("value", ppm_conv_factor);
		adc_form.appendChild(ppm_conv_factor_el);
		adc_form.innerHTML += s_sensor_analog_ppm_conv_factor_hint;
		adc_form.appendChild(document.createElement("br"));

		adc_form.innerHTML += s_sensor_analog_pin_distance;
		var pin_distance_el = document.createElement("input");
		pin_distance_el.setAttribute("id", form_id + "_pin_distance");
		pin_distance_el.setAttribute("class", "sensor_analog_pin_distance");
		pin_distance_el.setAttribute("type", "number");
		pin_distance_el.setAttribute("min", "1");
		pin_distance_el.setAttribute("max", "100");
		pin_distance_el.setAttribute("value", pin_distance * 10);
		adc_form.appendChild(pin_distance_el);
		adc_form.innerHTML += s_sensor_analog_pin_distance_unit;
		adc_form.appendChild(document.createElement("br"));
	}


	adc_form.innerHTML += s_sensor_analog_tempcomp;

	var select_tempcomp = document.createElement("select");
	select_tempcomp.setAttribute("id", form_id + "_tempcomp");
	select_tempcomp.setAttribute("class", "sensor_analog_pin_temp_comp");
	for (var i=0; i<SUPPORTED_ADC_PINS; i++) {
		var opt = document.createElement("option");
		opt.setAttribute("value", i.toString());
		if (temp_compensate_adc_pin == i) opt.setAttribute("selected", "true");
		if (i == 0) opt.innerHTML = s_sensor_analog_no_temp_comp;
		else opt.innerHTML = s_sensor_analog_pin + ('0' + i.toString()).slice(-2);
		select_tempcomp.appendChild(opt);
	}
	adc_form.appendChild(select_tempcomp);
	adc_form.appendChild(document.createElement("br"));


	var input_name = document.createElement("input");
	input_name.setAttribute("id", form_id + "_name");
	input_name.setAttribute("type", "text");
	input_name.setAttribute("class", "sensor_analog_pin_name");
	input_name.value = name;
	adc_form.appendChild(input_name);
}

function sensor_analog_config_save (adc_pin, state)
{
	if (state != 0) {
		console.log("sensor analog config save error on adc pin "+adc_pin);
		return;
	}

	adc_pin++;

	while (adc_pin < SUPPORTED_ADC_PINS) {

		var form_id = "adcpin_" + adc_pin;
		var type_el = document.getElementById(form_id + "_type");
		var name_el = document.getElementById(form_id + "_name");
		var tempcomp_el = document.getElementById(form_id + "_tempcomp");

		if (!type_el || !name_el || !tempcomp_el) {
			console.log("sensor analog config save: no elements with data");
			return;
		}

		var sensor_type = type_el.value;
		var state = ((sensor_type & SENSOR_TYPE_MASK) == SENSOR_TYPE_NULL)? false : true;

		var temp_compensate_adc_pin = tempcomp_el.value;
		var adc_pin_name = name_el.value;

		var ppm_conv_factor = -1;
		var pin_distance = -1;

		var ec_changed = false;

		if (sensor_type == SENSOR_TYPE_EC) {
			var ppm_conv_factor_el = document.getElementById(form_id + "_ppm_conv_factor");
			var pin_distance_el = document.getElementById(form_id + "_pin_distance");

			if (!ppm_conv_factor_el || !pin_distance_el) {
				console.log("sensor analog congfig save: no element of EC");
				return;
			}
			ppm_conv_factor = ppm_conv_factor_el.value;
			pin_distance = pin_distance_el.value;

			if (
				!SENSOR.stm32.adc[adc_pin].ex
				|| !SENSOR.stm32.adc[adc_pin].ex.ec
				|| SENSOR.stm32.adc[adc_pin].ex.ec.pin_distance != (pin_distance * 10)
				|| SENSOR.stm32.adc[adc_pin].ex.ec.ppm_conv_factor != ppm_conv_factor
			) {
				// if no object of EC and type == EC then EC is changed
				ec_changed = true;
			}
		}

		if (
			SENSOR.stm32.adc[adc_pin].type != sensor_type
			|| SENSOR.stm32.adc[adc_pin].temp_compensate_adc_pin != temp_compensate_adc_pin
			|| SENSOR.adc_names[adc_pin] != adc_pin_name
			|| ec_changed
		) {
			if (sensor_type == SENSOR_TYPE_NULL) sensor_type = SENSOR.stm32.adc[adc_pin].type;

			set_adc_pin
			(
				adc_pin, sensor_type, temp_compensate_adc_pin, state, ppm_conv_factor, pin_distance,

				function (pin, s)
				{
					if (SENSOR.adc_names[adc_pin] != adc_pin_name || !state) {
						set_adc_sensor_name(adc_pin, (!state)? "" : adc_pin_name, sensor_analog_config_save);
					}
					else {
						sensor_analog_config_save(pin, s);
					}
				}
			);
			break;
		}

		adc_pin++;
	}

	if (adc_pin >= SUPPORTED_ADC_PINS) {
		remove_element("sensor_analog_editor");
	}
}

function sensor_analog_config ()
{
	var editor = create_element_div("sensor_analog_editor", "sensor_analog_editor", null, null, null, document.body);
	if (!editor) {
		console.log("analog editor");
		return;
	}

	var hdr = create_element_div("sensor_analog_editor_header", "sensor_analog_editor_header", null, s_sensor_analog_config, null, editor);

	for (var i=0; i<SUPPORTED_ADC_PINS; i++) {
		create_adc_editor_form(i, null, null, null, editor);
	}

	var btn_cancel = create_element_div("btn_cancel", "btn_cancel", s_btn_cancel_title, s_btn_cancel,

		function ()
		{
			remove_element("sensor_analog_editor");
		},

		editor
	);
	var btn_save = create_element_div("btn_save", "btn_save", s_btn_save_title, s_btn_save,

		function ()
		{
			sensor_analog_config_save(-1, 0);
		},

		editor
	);
}


function sensor_logic_pin_changed (pin)
{
	var form_id = "logpin_" + pin;
	var enabled_el = document.getElementById(form_id + "_enabled");
	if (!enabled_el) {
		console.log("sensor logic pin changed: no element");
		return;
	}

	var state = s_sensor_logic_off;
	var title = s_sensor_logic_off_title;
	var style = "sensor_logic_pin_disabled";
	if (enabled_el.getAttribute("class") == "sensor_logic_pin_disabled") {
		state = s_sensor_logic_on;
		title = s_sensor_logic_on_title;
		style = "sensor_logic_pin_enabled";
	}

	enabled_el.setAttribute("class", style);
	enabled_el.setAttribute("title", title);
	enabled_el.innerHTML = state;
}
	


function create_logic_editor_form (pin, parent_el)
{
	var form_id = "logpin_" + pin;
	var log_form = create_element_div(form_id, "sensor_logic_pin_form", null, null, null, parent_el);

	var log_id = s_sensor_logic_pin + ('0'+(pin + 1).toString()).slice(-2);
	var log_num = create_element_div(form_id + "_num", "sensor_logic_pin_num", null, log_id, null, log_form);

	var state = s_sensor_logic_off;
	var title = s_sensor_logic_off_title;
	var style = "sensor_logic_pin_disabled";
	if (is_local_logic_pin_enabled(pin)) {
		state = s_sensor_logic_on;
		title = s_sensor_logic_on_title;
		style = "sensor_logic_pin_enabled";
	}
	var log_enabled = create_element_div(form_id + "_enabled", style, title, state, "sensor_logic_pin_changed("+pin+");", log_form);
	log_form.appendChild(document.createElement("br"));


	var input_name = document.createElement("input");
	input_name.setAttribute("id", form_id + "_name");
	input_name.setAttribute("type", "text");
	input_name.setAttribute("class", "sensor_logic_pin_name");
	input_name.value = SENSOR.logic_names[pin];
	log_form.appendChild(input_name);
}

function sensor_logic_config_save (pin, state)
{
	if (state != 0) {
		console.log("sensor logic config save error on logic pin "+pin);
		return;
	}

	pin++;

	while (pin < SUPPORTED_MCP23017_SENSORS/2) {

		var form_id = "logpin_" + pin;
		var state_el = document.getElementById(form_id + "_enabled");
		var name_el = document.getElementById(form_id + "_name");

		if (!state_el || !name_el) {
			console.log("sensor logic config save: no elements with data");
			return;
		}

		if (
			(state_el.getAttribute("class") == "sensor_logic_pin_enabled" && !is_local_logic_pin_enabled(pin))
			|| (state_el.getAttribute("class") == "sensor_logic_pin_disabled" && is_local_logic_pin_enabled(pin))
			|| (SENSOR.logic_names[pin] != name_el.value)
		) {
			if (state_el.getAttribute("class") == "sensor_logic_pin_disabled") name_el.value = "";
			set_logic_pin(pin, name_el.value, (state_el.getAttribute("class") == "sensor_logic_pin_enabled"), sensor_logic_config_save);
			break;
		}

		pin++;
	}

	if (pin >= SUPPORTED_MCP23017_SENSORS/2) {
		remove_element("sensor_logic_editor");
	}
}

function sensor_logic_config ()
{
	var editor = create_element_div("sensor_logic_editor", "sensor_logic_editor", null, null, null, document.body);
	if (!editor) {
		console.log("logic editor");
		return;
	}

	var hdr = create_element_div("sensor_logic_editor_header", "sensor_logic_editor_header", null, s_sensor_logic_config, null, editor);

	for (var i=0; i<SUPPORTED_MCP23017_SENSORS/2; i++) {
		create_logic_editor_form(i, editor);
	}

	var btn_cancel = create_element_div("btn_cancel", "btn_cancel", s_btn_cancel_title, s_btn_cancel,

		function ()
		{
			remove_element("sensor_logic_editor");
		},

		editor
	);
	var btn_save = create_element_div("btn_save", "btn_save", s_btn_save_title, s_btn_save,

		function ()
		{
			sensor_logic_config_save(-1, 0);
		},

		editor
	);
}


function sensor_change_date ()
{
	var d = new Date(); var tz = d.getTimezoneOffset()*60;
	var ss = d.getTime();
	var date = new Date();

	for (var i=0; i<SENSOR.sensor_bcast.sensor_count; i++) {
		var stype = (SENSOR.sensor_bcast.metric[i].type & SENSOR_TYPE_MASK);
		if (stype == SENSOR_TYPE_DATE) {
			date = new Date((SENSOR.sensor_bcast.metric[i].value - tz)* 1000);
		}
		else if (stype == SENSOR_TYPE_DAYTIME) {
			ss = ((SENSOR.sensor_bcast.metric[i].value & 0x00FFFFFF) - tz); ss = ((ss > (3600*24))? (ss - (3600*24)) : ss);
		}
	}

	create_calendar
	(
		s_sensor_system_date,

		date.getFullYear(),

		date.getMonth(),

		function (datetime)
		{
			datetime = parseInt(datetime) + parseInt(ss);
			var tz = new Date().getTimezoneOffset()*60;
			set_system_datetime(datetime, tz, function() { remove_calendar(); });
		}
	);
}

function sensor_change_time ()
{
	var d = new Date(); var tz = d.getTimezoneOffset()*60;
	var ss = d.getTime();
	var date = new Date();

	for (var i=0; i<SENSOR.sensor_bcast.sensor_count; i++) {
		var stype = (SENSOR.sensor_bcast.metric[i].type & SENSOR_TYPE_MASK);
		if (stype == SENSOR_TYPE_DATE) {
			date = new Date((SENSOR.sensor_bcast.metric[i].value)* 1000);
		}
		else if (stype == SENSOR_TYPE_DAYTIME) {
			ss = ((SENSOR.sensor_bcast.metric[i].value & 0x00FFFFFF) - tz); ss = ((ss > (3600*24))? (ss - (3600*24)) : ss);
		}
	}

	edit_time
	(
		s_sensor_system_time,

		date.getTime()/1000,

		tz,

		function (datetime)
		{
			set_system_datetime
			(
				parseInt(datetime), parseInt(tz),

				function (state)
				{
					if (!state) remove_editor();
					else alert(s_error_code + state);
				}
			);
		},

		function ()
		{
			remove_editor();
		}
	);
}




function sensor_analog_calibr (adc_pin)
{
	var editor = create_element_div("sensor_calibr_editor", "sensor_calibr_editor", null, null, null, document.body);
	if (!editor) {
		console.log("calibr editor");
		return;
	}

	var hdr = create_element_div("sensor_calibr_editor_header", "sensor_calibr_editor_header", null, s_sensor_calibr_config, null, editor);

	var view = get_sensor_view((SENSOR.stm32.adc[adc_pin].type & SENSOR_TYPE_MASK), 0);
	var analog_id = s_sensor_analog_pin + ('0'+(adc_pin + 1).toString()).slice(-2);
	var adc_num = create_element_div("sensor_calibr_num", "sensor_analog_pin_num", null, analog_id, null, hdr);
	var simg = create_element_img("sensor_calibr_img", "sensor_analog_value_img", null, null, view[0], null, hdr);


	var form = create_element_div("sensor_clibr_editor_form", "sensor_calibr_editor_form", null, s_sensor_calibr_value_hint, null, editor);
	form.appendChild(document.createElement("br"));

	var value = document.createElement("input");
	value.setAttribute("id", "sensor_calibr_value");
	value.setAttribute("type", "number");
	value.setAttribute("min", "-999999.99");
	value.setAttribute("max", "999999.99");
	value.setAttribute("step", "any");
	value.setAttribute("class", "sensor_calibr_value");
	form.appendChild(value);


	var phase = "start";
	var calibr_count = 0;

	var btn_add_value = create_element_div("btn_add_value", "btn_add_value", s_btn_add_value_title, s_btn_add_value,

		function ()
		{
			if (calibr_count == 19) phase = "finish";
			else if (calibr_count > 19) alert("maximum 20 values is already written");

			var val = document.getElementById("sensor_calibr_value");
			var cnter = document.getElementById("sensor_calibr_editor_counter");

			set_adc_calibr
			(
				adc_pin, val.value, phase,

				function (state)
				{
					if (state == 0) {
						console.log("OK");
						if (phase == "start") phase = null;
						calibr_count++;
					//	val.value = '';
						val.focus();
						cnter.innerHTML = calibr_count+"/20";
					}
					else {
						alert("status: "+state);
					}
				}
			);
		},

		form
	);
	form.appendChild(document.createElement("br"));

	var counter = create_element_div("sensor_calibr_editor_counter", "sensor_calibr_editor_counter", null, "0/20", null, form);
	form.appendChild(document.createElement("br"));

	var btn_reset = create_element_div("btn_reset", "btn_reset", s_btn_reset_calibr_title, s_btn_reset_calibr,

		function ()
		{
			set_adc_calibr
			(
				adc_pin, null, "clear",

				function (state)
				{
					if (state == 0) {
						var cnter = document.getElementById("sensor_calibr_editor_counter");
						cnter.innerHTML = "20/20";
					}
					else {
						alert("status: "+state);
					}
				}
			);
		},

		form
	);


	var btn_cancel = create_element_div("btn_cancel", "btn_cancel", s_btn_cancel_title, s_btn_cancel,

		function ()
		{
			remove_element("sensor_calibr_editor");
		},

		editor
	);

	var btn_save = create_element_div("btn_save", "btn_save", s_btn_save_title, s_btn_save,

		function ()
		{
			set_adc_calibr
			(
				adc_pin, null, "finish",

				function (state)
				{
					if (state == 0) {
						remove_element("sensor_calibr_editor");
					}
					else {
						alert("status: "+state);
					}
				}
			);
		},

		editor
	);
}



function sensor_device_cfg ()
{
	console.log("sensor devcie cfg");
}





function sensor_update_info (callback)
{
	get_sensor_config
	(
		function (state)
		{
			get_sensor_metric
			(
				function ()
				{
					if (callback) callback();
				}
			);
		}
	);
}


var info_time = 0;
function sensor_service ()
{
	get_sensor_metric
	(
		function (state)
		{
			if (info_time >= 10 || under_controller) {
				info_time = 0;
				get_sensor_config(null);
			}
			else {
				info_time++;
			}
			sensor_page_update();
		}
	);
}


