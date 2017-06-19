

var s_nav_btn_title_outlet	= "Перейти к выключателям";
var s_nav_btn_title_sensor	= "Перейти к датчикам";
var s_nav_btn_title_system	= "Перейти к общим настройкам";

var s_error_code = "Ошибка, устройство вернуло: ";

if (typeof under_controller == 'undefined') {
	under_controller = false;
}

var SERVICE_INTERVAL = (under_controller)? 5000 : 10000; // 10 sec.
var service_interval = null;
var service_function = null;
function start_service (func)
{
	service_function = func;
}
function stop_service (func)
{
	service_function = null;
}
function system_service ()
{
	if (service_function !== null) {
		service_function();
	}
}
function system_service_start ()
{
	if (service_interval) {
		clearInterval(service_interval);
		service_interval = null;
	}
	service_interval = setInterval(system_service, SERVICE_INTERVAL);
}



function copyright (el)
{
	var style = "margin:20px; font-size:30px; font-weight:bold; font-style:italic; color:#FFF;";
	var block = document.createElement("div");
	block.setAttribute("style", style);
	var ref = document.createElement("a");
	ref.setAttribute("href", "http://управляйка.рф");
	ref.setAttribute("target", "_blank");
	ref.setAttribute("style", style);
	ref.innerHTML = "Управляйка.РФ";
	block.innerHTML = "&copy;&emsp;";
	block.appendChild(ref);
	el.appendChild(block);
}

function is_logic_pin_enabled (pin, metric_logic_value)
{
	if (pin == null || pin < 0 || metric_logic_value == null) {
		return 0;
	}
	return ((metric_logic_value & ((1 << (pin%16)) << 16))? 1 : 0);
}

function is_local_logic_pin_enabled (logic_pin)
{
	if (!SENSOR || !SENSOR.stm32 || !SENSOR.stm32.logic || SENSOR.stm32.logic.length <= 0) {
		console.log("logic pins disabled at all!");
		return;
	}
	var en = (SENSOR.stm32.logic[parseInt(logic_pin/16)].flags & ((1 << (parseInt(logic_pin%16))) << 16));
	return en;
}


function string_to_buffer (DataViewDest, offset, maxlen, str)
{
	var buf = encodeUtf8(str);
	var u8a = new Uint8Array(buf);
	for (var i=0, n=offset; i<u8a.byteLength && i<maxlen-1; i++) {
		DataViewDest.setUint8(n, u8a[i], false); n+=1;
	}
}


var wait_for_response_limit = 0;
function wait_for_response (respid, callback)
{
	wait_for_response_limit = 0;

	var xreq = new XMLHttpRequest();
	xreq.open("GET", "q?response="+respid.toString(), true);
	xreq.responseType = "arraybuffer";

	xreq.timeout = 30000;

	xreq.onload = function (evt) {
		var response = new Uint32Array(xreq.response);
		if (response.byteLength == 0 && wait_for_response_limit < 60) {
			wait_for_response_limit++;
			setTimeout(function() { wait_for_response(respid, callback); }, 1000);
		}
		else if (callback) {
			console.log(" controller get response OK");
			callback(xreq);
		}
	};

	xreq.onerror = function (evt) {
		console.log(" controller get error");
		if (callback) { callback(null); }
	};

	xreq.send(null);	
}
function send_post (url, data, timeout, callback)
{
	var xreq = new XMLHttpRequest();
	xreq.open("POST", url, true);
	xreq.responseType = "arraybuffer";

	if (!timeout) {
		timeout = 30000;
	}
	xreq.timeout = timeout;

/*
	xreq.addEventListener("load", function (evt) {
		if (callback) {
			callback(xreq);
		}
	}, false);

	xreq.addEventListener("error", function (evt) {
		console.log(" post error");
		if (callback) callback(null);
	}, false);
*/

	xreq.onload = function (evt) {
		if (under_controller) {
			var response = new Uint32Array(xreq.response);
			if (response.byteLength == 4) {
				console.log("wait_for_response: error code returned: " + response[0]);
			}
			else if (response.byteLength == 8) {
				console.log("wait_for_response: response id returned: " + response[1]);
				setTimeout(function () { wait_for_response(response[1], callback); }, 1000);
			}
		}
		else
		if (callback) callback(xreq);
	};

	xreq.onerror = function (evt) {
		console.log(" post error");
		if (callback) callback(null);
	};

	xreq.send(data);
}
function send_get (url, data, timeout, callback)
{
	var xreq = new XMLHttpRequest();
	xreq.open("GET", url, true);
	xreq.responseType = "arraybuffer";

	if (!timeout) {
		timeout = 30000;
	}
	xreq.timeout = timeout;

/*
	xreq.addEventListener("load", function (evt) {
		if (callback) {
			callback(xreq);
		}
	}, false);

	xreq.addEventListener("error", function (evt) {
		console.log(" get error");
	}, false);

*/
	xreq.onload = function (evt) {
		if (callback) callback(xreq);
	};

	xreq.onerror = function (evt) {
		console.log(" get error");
	};

	xreq.send(data);
}



function decodeUtf8 (data)
{
	var result = "";
	var i = 0;
	var c = 0;
	var c1 = 0;
	var c2 = 0;

	// If we have a BOM skip it
	if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb && data[2] === 0xbf) {
		i = 3;
	}

	while (i < data.length) {
		c = data[i];

		if (c < 128) {
			result += String.fromCharCode(c);
			i++;
		}
		else if (c > 191 && c < 224) {
			if (i+1 >= data.length) {
				throw "UTF-8 Decode failed. Two byte character was truncated.";
			}
			c2 = data[i+1];
			result += String.fromCharCode(((c&31)<<6) | (c2&63));
			i += 2;
		}
		else {
			if (i+2 >= data.length) {
				throw "UTF-8 Decode failed. Multi byte character was truncated.";
			}
			c2 = data[i+1];
			c3 = data[i+2];
			result += String.fromCharCode(((c&15)<<12) | ((c2&63)<<6) | (c3&63));
			i += 3;
		}
	}
	return result;
}
function encodeUtf8 (str)
{
    if (/[\u0080-\uffff]/.test(str)) {
        var arr = new Array(str.length);
        for (var i=0, j=0, len=str.length; i<len; ++i) {
            var cc = str.charCodeAt(i);
            if (cc < 128) {
                //single byte
                arr[j++] = cc;
            }
			else {
                //UTF-8 multibyte
                if (cc < 2048) {
                    arr[j++] = (cc >> 6) | 192;
                }
				else {
                    arr[j++] = (cc >> 12) | 224;
                    arr[j++] = ((cc >> 6) & 63) | 128;
                }
                arr[j++] = (cc & 63) | 128;
            }
        }
        var byteArray = new Uint8Array(arr);
    }
	else {
        var byteArray = new Uint8Array(str.length);
        for (var i = str.length; i--;)
            byteArray[i] = str.charCodeAt(i);
    }
    return byteArray.buffer;
}


function create_element_img (id, style, title, alt, src, onclick, parent_el)
{
	if (!id || typeof id !== 'string') {
		console.log("cannot create IMG element: id is not string");
		return null;
	}

	var el = document.getElementById(id);
	if (!el) {
		el = document.createElement("img");
	}
	el.setAttribute("id", ((typeof id === 'string')? id : ""));
	el.setAttribute("class", ((typeof style === 'string')? style : ""));
	el.setAttribute("title", ((typeof title === 'string')? title : ""));
	el.setAttribute("alt", ((typeof alt === 'string')? alt : ""));
	el.setAttribute("src", ((typeof src === 'string')? src : ""));

	if (typeof onclick === 'function') {
		// onclick will be called as 'onclick(event);'
		el.addEventListener("click", onclick, false);
	}
	else if (typeof onclick === 'string') {
		el.setAttribute("onclick", onclick);
	}

	if (parent_el !== null && typeof parent_el === 'object') {
		parent_el.appendChild(el);
	}

	return el;
}

function create_element_div (id, style, title, inner, onclick, parent_el)
{
	if (!id || typeof id !== 'string') {
		console.log("cannot create DIV element: id is not string");
		return null;
	}

	var el = document.getElementById(id);
	if (el) {
		for (var i=el.childNodes.length-1; i>=0; i--) {
			el.removeChild(el.childNodes[i]);
		}
	}
	else {
		el = document.createElement("div");
	}
	el.setAttribute("id", ((typeof id === 'string')? id : ""));
	el.setAttribute("class", ((typeof style === 'string')? style : ""));
	el.setAttribute("title", ((typeof title === 'string')? title : ""));
	el.innerHTML = ((typeof inner === 'string')? inner : "");

	if (typeof onclick === 'function') {
		// onclick will be called as 'onclick(event);'
		el.addEventListener("click", onclick, false);
	}
	else if (typeof onclick === 'string') {
		el.setAttribute("onclick", onclick);
	}

	if (parent_el !== null && typeof parent_el === 'object') {
		parent_el.appendChild(el);
	}

	return el;
}
function remove_element (id)
{
	if (!id || typeof id !== 'string') {
		console.log("cannot remove element: id is not string");
		return false;
	}

	var el = document.getElementById(id);
	if (el) {
		el.parentNode.removeChild(el);

		return true;
	}

	return false;
}





function create_progress ()
{
	create_element_div("progress_background", "progress_background", null, "<h1>Подождите ...</h1>", null, document.body);
}
function remove_progress ()
{
	remove_element("progress_background");
}

function get_image_src (device_type)
{
	if (typeof device_type !== 'number') {
		console.log("cannot get image source from unknown device type: device type is not a number");
		return null;
	}

	switch (device_type) {
	case DEVICE_TYPE_OUTLET: return tar_get_image_src(img_prefix + "outlets_page.png");
	case DEVICE_TYPE_SENSOR: return tar_get_image_src(img_prefix + "sensors_page.png");
	case 0: return tar_get_image_src(img_prefix + "system_page.png");
	}

	console.log("cannot get image source from unknown device type: unknown type of device");
	return null;
}



function create_navigation_panel (device_type)
{
	if (typeof device_type !== 'number') {
		console.log("cannot create navigation panel for unknown device type (device_type is not a number)");
		return null;
	}
	var nav = create_element_div("navigation_panel", "navigation_panel", null, null, null, null);
	if (!nav) return null;


	if (device_type & DEVICE_TYPE_OUTLET) {
		var btn = create_element_div("navigation_btn_outlet", "navigation_btn", null, null, outlet_update, nav);
		if (btn) {
			var img = create_element_img(
											"navigation_img_outlet", "navigation_img", s_nav_btn_title_outlet, "outlets page",
											get_image_src(DEVICE_TYPE_OUTLET), null, btn
			);
			if (!img) {
				console.log("cannot create navigation button image: outlet");
			}
		}
		else {
			console.log("cannot create navigation button: outlet");
		}
	}
	if (device_type & DEVICE_TYPE_SENSOR) {
		var btn = create_element_div("navigation_btn_sensor", "navigation_btn", null, null, sensor_update, nav);
		if (btn) {
			var img = create_element_img(
											"navigation_img_sensor", "navigation_img", s_nav_btn_title_sensor, "sensors page",
											get_image_src(DEVICE_TYPE_SENSOR), null, btn
			);
			if (!img) {
				console.log("cannot create navigation button image: sensor");
			}
		}
		else {
			console.log("cannot create navigation button: sensor");
		}
	}

	var btn = create_element_div("navigation_btn_system", "navigation_btn", null, null, system_update, nav);
	if (btn) {
		var img = create_element_img("navigation_img_system", "navigation_img", s_nav_btn_title_system, "system page", get_image_src(0), null, btn);
		if (!img) {
			console.log("cannot create navigation button image: system");
		}
	}
	else {
		console.log("cannot create navigation button: system");
	}

	return nav;
}

function navigation_page_select (id)
{
	var btn; var bid;

	bid = "navigation_btn_outlet";
	btn = document.getElementById(bid);
	if (id === bid) btn.setAttribute("class", "navigation_btn_selected");
	else btn.setAttribute("class", "navigation_btn");

	bid = "navigation_btn_sensor";
	btn = document.getElementById(bid);
	if (id === bid) btn.setAttribute("class", "navigation_btn_selected");
	else btn.setAttribute("class", "navigation_btn");

	bid = "navigation_btn_system";
	btn = document.getElementById(bid);
	if (id === bid) btn.setAttribute("class", "navigation_btn_selected");
	else btn.setAttribute("class", "navigation_btn");
}


function outlet_update ()
{
	navigation_page_select("navigation_btn_outlet");
	outlet_page_create();
}

function sensor_update ()
{
	navigation_page_select("navigation_btn_sensor");
	sensor_page_create();
}

function system_update ()
{
	navigation_page_select("navigation_btn_system");
	system_page_create();
}






var s_btn_save_title	= "Сохранить";
var s_btn_save			= "Сохранить";
var s_btn_close_title	= "Закрыть окно";
var s_btn_close			= "Закрыть";
var s_btn_cancel_title	= "Отмена";
var s_btn_cancel		= "Отмена";

function create_editor (header)
{
	var editor = create_element_div("editor", "editor", null, null, null, document.body);
	if (!editor) {
		console.log("editor");
		return;
	}


	var hdr = create_element_div("editor_header", "editor_header", null, header, null, editor);

	return editor;
}

function remove_editor ()
{
	remove_element("editor");
}


function edit_name (header, value, onsave, oncancel)
{
	var editor = create_editor(header);

	var input_name = document.createElement("input");
	input_name.setAttribute("id", "editor_name");
	input_name.setAttribute("type", "text");
	input_name.setAttribute("class", "editor_name");
	input_name.setAttribute("value", value);

	editor.appendChild(input_name);

	var btn_cancel = create_element_div("btn_cancel", "btn_cancel", s_btn_cancel_title, s_btn_cancel, oncancel, editor);

	var btn_save = create_element_div
	(
		"btn_save",
		"btn_save",
		s_btn_save_title,
		s_btn_save,

		function ()
		{
			var name = document.getElementById("editor_name").value;
			onsave(name);
		},

		editor
	);

	input_name.focus();
}


function edit_time (header, datetime, now_tz, onsave, oncancel)
{
	var editor = create_editor(header);

	var d = new Date();
	if (typeof tz !== 'number') { now_tz = d.getTimezoneOffset()*60; }
	if (typeof datetime !== 'number' || datetime < 0) { datetime = ((d.getTime() - now_tz)/1000); }

	d = new Date(datetime * 1000);
	var now_hh = d.getHours(); // local
	var now_mm = d.getMinutes(); // local
	// we have an GMT timezone in date00 !!!
	var date00 = datetime - ((now_hh*3600 + now_mm*60) + now_tz);


	var input_tz = document.createElement("select");
	input_tz.setAttribute("id", "editor_tz");
	input_tz.setAttribute("class", "editor_tz");
	for (var i=0; i<27; i++) {
		var opt = document.createElement("option");
		var tz = ((-14 + i)*3600);
		opt.setAttribute("value", tz);
		if (parseInt(tz) == parseInt(now_tz)) opt.setAttribute("selected", "true");
		opt.innerHTML = "GMT "+((tz < 0)? "+" : "")+(-tz/3600).toString();
		input_tz.appendChild(opt);
	}
	editor.appendChild(input_tz);


	var input_hh = document.createElement("select");
	input_hh.setAttribute("id", "editor_hh");
	input_hh.setAttribute("class", "editor_hh");
	for (var i=0; i<24; i++) {
		var opt = document.createElement("option");
		var hh = ('0'+i.toString()).slice(-2);
		opt.setAttribute("value", hh);
		if (parseInt(hh) == parseInt(now_hh)) opt.setAttribute("selected", "true");
		opt.innerHTML = hh;
		input_hh.appendChild(opt);
	}
	editor.appendChild(input_hh);

	editor.innerHTML += "<b> : </b>"

	var input_mm = document.createElement("select");
	input_mm.setAttribute("id", "editor_mm");
	input_mm.setAttribute("class", "editor_mm");
	for (var i=0; i<60; i++) {
		var opt = document.createElement("option");
		var mm = ('0'+i.toString()).slice(-2);
		opt.setAttribute("value", mm);
		if (parseInt(mm) == parseInt(now_mm)) opt.setAttribute("selected", "true");
		opt.innerHTML = mm;
		input_mm.appendChild(opt);
	}
	editor.appendChild(input_mm);

	editor.appendChild(document.createElement("br"));

	var btn_cancel = create_element_div("btn_cancel", "btn_cancel", s_btn_cancel_title, s_btn_cancel, oncancel, editor);

	var btn_save = create_element_div
	(
		"btn_save",
		"btn_save",
		s_btn_save_title,
		s_btn_save,

		function ()
		{
			var tz = document.getElementById("editor_tz").value;
			var hh = document.getElementById("editor_hh").value;
			var mm = document.getElementById("editor_mm").value;
			var datetime = (parseInt(date00) + ((parseInt(hh)*3600 + parseInt(mm)*60) + parseInt(tz)));
			if (datetime < 0) datetime = 0;
			onsave(datetime);
		},

		editor
	);
}



function outlet_create_rule_copy (outlet_id, rule_id)
{
	var old_rule = null;

	if (
		(typeof outlet_id === 'number' && outlet_id >= 0 && outlet_id < OUTLET.outlet.length)
		&& (typeof rule_id === 'number' && rule_id >= 0 && rule_id < OUTLET.outlet[outlet_id].rule.length)
	) {
		old_rule = OUTLET.outlet[outlet_id].rule[rule_id];
	}


	var rule = {};

	rule.flags			= 0x00000000;
	rule.condition_count	= 0;
	rule.condition			= [];

	rule.date = {};
	rule.date.flags	= 0x00000000;
	rule.date.start	= 0x00000000;
	rule.date.stop	= 0x00000000;
	rule.date.week_days	= 0x0000007F;

	if (old_rule) {
		rule.flags			= old_rule.flags;
		rule.condition_count	= old_rule.condition_count;

		rule.date.flags	= old_rule.date.flags;
		rule.date.start	= old_rule.date.start;
		rule.date.stop	= old_rule.date.stop;
		rule.date.week_days	= old_rule.date.week_days;

		for (var c=0; c<rule.condition_count; c++) {
			rule.condition[c] = {};
			rule.condition[c].sensor_id = [];
			for (var i=0; i<old_rule.condition[c].sensor_id.length; i++) {
				rule.condition[c].sensor_id[i] = old_rule.condition[c].sensor_id[i];
			}
			rule.condition[c].type		= old_rule.condition[c].type;
			rule.condition[c].flags		= old_rule.condition[c].flags;
			rule.condition[c].val_beg	= old_rule.condition[c].val_beg;
			rule.condition[c].val_end	= old_rule.condition[c].val_end;
		}
	}

	return rule;
}

function outlet_create_condition_copy (condition)
{
	var cond = {};
	cond.sensor_id = [];
	cond.type = SENSOR_TYPE_NULL;
	cond.flags = 0x00000000;
	cond.val_beg = 0x00000000;
	cond.val_end = 0x00000000;

	if (typeof condition === 'object' && condition !== null) {
		for (var i=0; i<8; i++) {
			cond.sensor_id[i] = condition.sensor_id[i];
		}
		cond.type = condition.type;
		cond.flags = condition.flags;
		cond.val_beg = condition.val_beg;
		cond.val_end = condition.val_end;
	}

	return cond;
}

function system_create_device_config_copy (config)
{
	device_config = {};
	device_config.id = [];

	if (typeof config === 'object' && config !== null) {

		for (var i=0; i<8; i++) {
			device_config.id[i] = config.id[i];
		}
		device_config.type = config.type;
		device_config.state = config.state;
		device_config.name = config.name;
		device_config.http_port = config.http_port;
		device_config.metric_port = config.metric_port;
		device_config.ap_name_port = config.ap_name_port;
		device_config.sta_name_port = config.sta_name_port;
		device_config.work_interval = config.work_interval;
		device_config.controller = {};
		device_config.controller.ipaddr = [];
		for (var i=0; i<16; i++) {
			device_config.controller.ipaddr[i] = config.controller.ipaddr[i];
		}
		device_config.controller.port = config.controller.port;
		device_config.controller.name = config.controller.name;
		device_config.controller.path = config.controller.path;
	}
	else {
		device_config.type = 0x00000000;
		device_config.state = 0x00000000;
		device_config.name = "";
		device_config.http_port = 0x0000;
		device_config.metric_port = 0x0000;
		device_config.ap_name_port = 0x0000;
		device_config.sta_name_port = 0x0000;
		device_config.work_interval = 0x0000;
		device_config.controller = {};
		device_config.controller.ipaddr = [];
		device_config.controller.port = 0x0000;
		device_config.controller.name = "";
		device_config.controller.path = "";
	}

	return device_config;
}



