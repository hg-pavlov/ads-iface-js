
var s_toggle_name_autonomus_mode = "режим";
var s_toggle_name_controller_mode = "шлюз";
var s_toggle_autonomus_mode_auto_title = "Перейти в автоматический режим";
var s_toggle_autonomus_mode_auto = "Авто";
var s_toggle_autonomus_mode_manual_title = "Перейти в ручной режим";
var s_toggle_autonomus_mode_manual = "Ручной";
var s_toggle_controller_mode_on_title = "Работать через шлюз";
var s_toggle_controller_mode_on = "Вкл.";
var s_toggle_controller_mode_off_title = "Перейти в автономный режим";
var s_toggle_controller_mode_off = "Выкл.";

var s_system_ctl_name_title = "Изменение адреса шлюза";
var s_system_ctl_edit_header = "Изменение адреса шлюза<br />"
								+ "<span style=\"font-size:24px;\">"
								+ "напр.: http://mygateway.com/path/to/gate/dir/<br />"
								+ "если имя домена не латинское, то заполняется в punycode виде"
								+ "</span>";
var s_system_no_controller = "Введите адрес шлюза";

var s_wifi_mode_ap = "Создать новую сеть (режим \"точки доступа\")";
var s_wifi_mode_sta = "Подключиться к сети (режим \"станция\")";
var s_wifi_ssid_hint = "введите имя (SSID) сети";
var s_wifi_pass_hint = "введите пароль сети";
var s_wifi_btn_connect_title = "Подключить";
var s_wifi_btn_connect = "Подключить";

var s_fill_all_fields_please = "Пожалуйста, заполните все поля, прежде чем попробовать снова.";
var s_find_device_on_another_net = "Устройство в этой сети не доступно. Ищите его в другой сети: ";
var s_error_wifi_reconnection = "К сожалению, произошла какая-то ошибка";

var s_system_update_interface_title = "Обновить интерфейс";
var s_system_update_interface = "Загрузить";


var s_system_wifi_container_header = "Изменение WI-FI подключения";
var s_system_interface_container_header = "Обновление интерфейса (опасно!)";
var s_system_controller_container_header = "Работа через шлюз";
var s_system_mode_container_header = "Режим работы устройства";
var s_system_info_runlog_header = "Информация о старте системы";
var s_system_info_errlog_header = "Информация об ошибках системы";
var s_system_info_mem_header = "Информация о доступной памяти на устройстве";
var s_system_get_info_title = "Подробная информация о системе";
var s_system_get_info = "Информация о системе";

var s_system_heap_free_ram = "Свободно RAM: ";
var s_fs_total_size = "Всего флэш: ";
var s_fs_used_avail = "Использовано/Доступно: ";
var s_system_should_not_turn_off_controller = "Нельзя отсоединить устройство от шлюза через шлюз. "
							+ "Это следует делать только при подключении к устройству напрямую. "
							+ "Иначе вы потеряете контроль над устройством.";

var wifi = {};

function system_page_update ()
{
	var system_page_info = document.getElementById("page_info");
	if (!system_page_info) {
		console.log("cannot update system page: no page_info element");
		return;
	}

	for (var i=system_page_info.childNodes.length-1; i>=0; i--) {
		system_page_info.removeChild(system_page_info.childNodes[i]);
	}


	// wifi config

	wifi.mode = "ap";
	wifi.ssid = "";
	wifi.pass = "";

	var system_wifi = create_element_div("system_wifi_container", "system_wifi_container", null, null, null, system_page_info);
	system_page_info.appendChild(document.createElement("br"));

	create_element_div("system_header_wifi", "system_header", null, s_system_wifi_container_header, null, system_wifi);
	system_wifi.appendChild(document.createElement("br"));


	var system_wifi_mode = document.createElement("select");
	system_wifi_mode.setAttribute("id", "system_wifi_mode");
	system_wifi_mode.setAttribute("class", "system_wifi_mode");
	system_wifi_mode.addEventListener
	(
		"change",

		function (evt)
		{
			wifi.mode = this.value;
		},

		false
	);

	var modeAP = document.createElement("option");
	modeAP.setAttribute("value", "ap");
	modeAP.innerHTML = s_wifi_mode_ap;
	system_wifi_mode.appendChild(modeAP);

	var modeSTA = document.createElement("option");
	modeSTA.setAttribute("value", "sta");
	modeSTA.innerHTML = s_wifi_mode_sta;
	system_wifi_mode.appendChild(modeSTA);

	system_wifi.appendChild(system_wifi_mode);


	var ssid = document.createElement("input");
	ssid.setAttribute("id", "ssid");
	ssid.setAttribute("class", "wifi_input");
	ssid.setAttribute("type", "text");
	ssid.setAttribute("value", "");
	ssid.setAttribute("placeholder", s_wifi_ssid_hint);
	ssid.addEventListener
	(
		"change",

		function (evt)
		{
			wifi.ssid = this.value;
		},

		false
	);

	system_wifi.appendChild(ssid);

	var pass = document.createElement("input");
	pass.setAttribute("id", "pass");
	pass.setAttribute("class", "wifi_input");
	pass.setAttribute("type", "password");
	pass.setAttribute("value", "");
	pass.setAttribute("placeholder", s_wifi_pass_hint);
	pass.addEventListener
	(
		"change",

		function (evt)
		{
			wifi.pass = this.value;
		},

		false
	);

	system_wifi.appendChild(pass);


	var btn_connect = create_element_div
	(
		"btn_connect",
		"btn_save",
		s_wifi_btn_connect_title,
		s_wifi_btn_connect,

		function ()
		{
			if (wifi.mode == "" || wifi.ssid == "" || wifi.pass == "") {
				alert(s_fill_all_fields_please);
				return;
			}

			var time = setTimeout(function(){ alert(s_find_device_on_another_net + "\"" + wifi.ssid + "\""); time = null; }, 4000);

			wifi_config
			(
				wifi.mode, wifi.ssid, wifi.pass, null, null, null, null, 1, 0,

				function (state)
				{
					if (time) {
						clearTimeout(time);
						alert(s_error_wifi_reconnection);
						return;
					}
				}
			);
		},

		system_wifi
	);




	// system control

	var system_ctl = create_element_div("system_ctl_container", "system_ctl_container", null, null, null, system_page_info);
	system_page_info.appendChild(document.createElement("br"));



	var device_mode = (DEVICE && DEVICE.state)? DEVICE.state & DEVICE_STATE_MODE_MASK : 0x00000000;

	var device_toggle_ctl_on_style = (device_mode & DEVICE_STATE_MODE_CTL)? "toggle_btn_active" : "toggle_btn_inactive";
	var device_toggle_ctl_off_style = (device_mode & DEVICE_STATE_MODE_CTL)? "toggle_btn_inactive" : "toggle_btn_active";
	var device_toggle_auto_style = (device_mode & DEVICE_STATE_MODE_AUTO)?  "toggle_btn_active" : "toggle_btn_inactive";
	var device_toggle_manual_style = (device_mode & DEVICE_STATE_MODE_AUTO)? "toggle_btn_inactive" : "toggle_btn_active";


	var system_autonomus = create_element_div("system_autonomus_container", "system_autonomus_container", null, null, null, system_ctl);
	system_ctl.appendChild(document.createElement("br"));

	create_element_div("system_header_mode", "system_header", null, s_system_mode_container_header, null, system_autonomus);
	system_autonomus.appendChild(document.createElement("br"));

	create_toggle_mode
	(
		s_toggle_name_autonomus_mode, "autonomous",

		"toggle_autonomus_auto", device_toggle_auto_style, s_toggle_autonomus_mode_auto_title, s_toggle_autonomus_mode_auto,

		function ()
		{
			set_system_mode
			(
				"autonomus_auto",
				function (state)
				{
					if (state == 0) {
						console.log("system toggle OK");
						system_page_update();
					}
					else {
						console.log("system toggle ERROR");
					}
				}
			);
		},

		"toggle_autonomus_manual", device_toggle_manual_style, s_toggle_autonomus_mode_manual_title, s_toggle_autonomus_mode_manual,

		function ()
		{
			set_system_mode
			(
				"autonomus_manual",
				function (state)
				{
					if (state == 0) {
						console.log("system toggle OK");
						system_page_update();
					}
					else {
						console.log("system toggle ERROR");
					}
				}
			);
		},

		system_autonomus
	);

	var system_controller = create_element_div("system_controller_container", "system_controller_container", null, null, null, system_ctl);
	system_ctl.appendChild(document.createElement("br"));

	create_element_div("system_header_controller", "system_header", null, s_system_controller_container_header, null, system_controller);
	system_controller.appendChild(document.createElement("br"));


	var device_controller = "";
	if (DEVICE && DEVICE.controller) {
		var prot = (DEVICE.controller.port == 80)? "http://" : "";
		device_controller = prot + DEVICE.controller.name + "/" + DEVICE.controller.path
	}

	var system_ctl_name = create_element_div(
				"system_controller_name", "system_controller_name", s_system_ctl_name_title, device_controller, system_edit_ctl_name, system_controller
	);
	system_controller.appendChild(document.createElement("br"));


	create_toggle_mode
	(
		s_toggle_name_controller_mode, "controller",

		"toggle_controller_on", device_toggle_ctl_on_style, s_toggle_controller_mode_on_title, s_toggle_controller_mode_on,

		function ()
		{
			set_system_mode
			(
				"controller_on",
				function (state)
				{
					if (state == 0) {
						console.log("system toggle OK");
						system_page_update();
					}
					else {
						console.log("system toggle ERROR");
					}
				}
			);
		},

		"toggle_controller_off", device_toggle_ctl_off_style, s_toggle_controller_mode_off_title, s_toggle_controller_mode_off,

		function ()
		{
			if (under_controller) {
				alert(s_system_should_not_turn_off_controller);
				return;
			}

			set_system_mode
			(
				"controller_off",
				function (state)
				{
					if (state == 0) {
						console.log("system toggle OK");
						system_page_update();
					}
					else {
						console.log("system toggle ERROR");
					}
				}
			);
		},

		system_controller
	);



	var system_interface = create_element_div("system_interface_container", "system_interface_container", null, null, null, system_ctl);
	system_ctl.appendChild(document.createElement("br"));

	create_element_div("system_header_interface", "system_header", null, s_system_interface_container_header, null, system_interface);
	system_interface.appendChild(document.createElement("br"));


	var iface_file = document.createElement("input");
	iface_file.setAttribute("class", "select_interface");
	iface_file.setAttribute("type", "file");
	iface_file.setAttribute("name", "iface");
	system_interface.appendChild(iface_file);

	var iface_load = create_element_div
	(
		"iface_load_btn",

		"btn_save",

		s_system_update_interface_title,

		s_system_update_interface,

		function (evt)
		{
			load_new_interface
			(
				iface_file.files[0],
				function(state)
				{
					if (state == 0) alert("Интерфейс успешно обновлен");
					else alert("ошибка " + state);
				}
			);
		},

		system_interface
	);
	system_ctl.appendChild(document.createElement("br"));



	// system information

	var sysinfo = create_element_div
	(
		"sysinfo",

		"btn_get_info",

		s_system_get_info_title,

		s_system_get_info,

		function (evt)
		{
			get_system_information();
		},

		system_page_info
	);
	system_page_info.appendChild(document.createElement("br"));



	copyright(system_page_info);
}


function create_toggle_mode
(
	toggle_name, id,
	left_id, left_style, left_title, left_inner, left_onclick,
	right_id, right_style, right_title, right_inner, right_onclick,
	parent_el
) {
	var left = create_element_div(left_id, "mode_switcher_left " + left_style, left_title, left_inner, left_onclick, parent_el);
	var center = create_element_div(id + "_mode_switcher", "toggle_mode_name", null, toggle_name ,null,parent_el);
	var right = create_element_div(right_id, "mode_switcher_right " + right_style, right_title, right_inner, right_onclick, parent_el);
}


function system_edit_ctl_name ()
{
	var device_controller = "";
	if (DEVICE && DEVICE.controller) {
		var prot = (DEVICE.controller.port == 80)? "http://" : "";
		device_controller = prot + DEVICE.controller.name + "/" + DEVICE.controller.path
	}
	else {
		device_controller = s_system_no_controller;
	}


	edit_name
	(
		s_system_ctl_edit_header,

		device_controller,

		function (name)
		{
			set_system_controller
			(
				name,

				function (state)
				{
					if (state == 0) {
						var name = document.getElementById("system_controller_name");
						var prot = (DEVICE.controller.port == 80)? "http://" : "";
						name.innerHTML = prot + DEVICE.controller.name + "/" + DEVICE.controller.path;
					}
					remove_editor();
				}
			);
		},

		function ()
		{
			remove_editor();
		}
	);
}


function get_system_information ()
{
	get_system_info(function(){get_system_runlog(function(){get_system_errlog(

		function()
		{

	// system information

	var system_info = create_element_div("system_info_container", "system_info_container", null, null, null, document.body);

	if (typeof DEVICE.runlog !== 'undefined') {

		create_element_div("system_header_info_runlog", "system_header", null, s_system_info_runlog_header, null, system_info);
		system_info.appendChild(document.createElement("br"));

		var table_rl = document.createElement("table");
		table_rl.setAttribute("class", "system_info");
		system_info.appendChild(table_rl);

		for (var i=0; i<DEVICE.runlog.length; i++) {
			var tr = document.createElement("tr");
			table_rl.appendChild(tr);
			var td_time = document.createElement("td");
			td_time.setAttribute("class", "info_left");
			tr.appendChild(td_time);
			td_time.innerHTML = DEVICE.runlog[i].datetime;
			var td_val = document.createElement("td");
			td_val.setAttribute("class", "info_right");
			tr.appendChild(td_val);
			td_val.innerHTML = '0x' + DEVICE.runlog[i].reason.toString(16);
		}
	}



	if (typeof DEVICE.errlog !== 'undefined') {

		create_element_div("system_header_info_errlog", "system_header", null, s_system_info_errlog_header, null, system_info);
		system_info.appendChild(document.createElement("br"));

		var table_el = document.createElement("table");
		table_el.setAttribute("class", "system_info");
		system_info.appendChild(table_el);

		for (var i=0; i<DEVICE.errlog.length; i++) {
			var tr = document.createElement("tr");
			table_el.appendChild(tr);
			var td_time = document.createElement("td");
			td_time.setAttribute("class", "info_left");
			tr.appendChild(td_time);
			td_time.innerHTML = DEVICE.errlog[i].datetime;
			var td_val = document.createElement("td");
			td_val.setAttribute("class", "info_right");
			tr.appendChild(td_val);
			td_val.innerHTML = '0x' + DEVICE.errlog[i].errcode.toString(16);
		}
	}



	create_element_div("system_header_info_mem", "system_header", null, s_system_info_mem_header, null, system_info);
	system_info.appendChild(document.createElement("br"));

	var table_info = document.createElement("table");
	table_info.setAttribute("class", "system_info");
	system_info.appendChild(table_info);

	var tr = document.createElement("tr");
	table_info.appendChild(tr);
	var td_heap = document.createElement("td");
	td_heap.setAttribute("colspan", "2");
	td_heap.setAttribute("style", "width:100%;");
	tr.appendChild(td_heap);
	td_heap.innerHTML = s_system_heap_free_ram + DEVICE.info.heap_size + " Bytes";


	var tr = document.createElement("tr");
	table_info.appendChild(tr);
	var td_total = document.createElement("td");
	td_total.setAttribute("class", "info_left");
	tr.appendChild(td_total);
	td_total.innerHTML = s_fs_total_size + DEVICE.info.fs.fs_total + " Bytes";

	var td_state = document.createElement("td");
	td_state.setAttribute("class", "info_right");
	tr.appendChild(td_state);
	td_state.innerHTML = s_fs_used_avail + DEVICE.info.fs.fs_used + "/" + DEVICE.info.fs.fs_avail + " Bytes";


	for (var i=0; i<DEVICE.info.fs.file_count; i++) {
		var tr = document.createElement("tr");
		table_info.appendChild(tr);
		var td_name = document.createElement("td");
		td_name.setAttribute("class", "info_left");
		tr.appendChild(td_name);
		td_name.innerHTML = DEVICE.info.fs.file[i].name;

		var td_size = document.createElement("td");
		td_size.setAttribute("class", "info_right");
		tr.appendChild(td_size);
		td_size.innerHTML = DEVICE.info.fs.file[i].size + " Bytes";
	}

	create_element_div
	(
		"system_info_btn_close_corner",
		"btn_close_corner",
		s_btn_close_title,
		s_btn_close_corner,
		function ()
		{
			remove_element("system_info_container");
		},
		system_info
	);

		}

	);});});
}



function system_page_service ()
{
}

function system_page_create ()
{
	var outlet_list = create_element_div("page_info", "page_info", null, null, null, document.body);
	if (!outlet_list) {
		return;
	}

	system_page_service();
	start_service(system_page_service);

	system_page_update();
}
function system_update_info (callback)
{
	get_system_device_config(function(){if (callback) callback();});
}



