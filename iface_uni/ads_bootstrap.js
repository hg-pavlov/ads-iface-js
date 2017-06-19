
//var iface				= "iface.tar";
var iface				= "iface.gz";
var img_prefix			= "img/";
var style_prefix		= "";
var js_prefix			= "";

var s_loading_resources = "<br />Пожалуйста подождите,<br />идёт загрузка ресурсов ...<br />";

var s_loaded = "загружено";
var s_from = "из";


//===============================================
//============= LOADING RESOURCES ===============
//===============================================

var BLOCK_SIZE = 512;
var RESOURCES = [];

function wait_download_get_create ()
{
	var pb = document.getElementById("boot_progress");
	if (!pb) {
		pb = document.createElement("div");
		pb.setAttribute("id", "boot_progress");
		pb.setAttribute
		(
			"style",

			"margin:0;" +
			"position:fixed;" +
			"width:100%;" +
			"height:100%;" +
			"z-index:100;" +
			"background-color:rgba(250, 250, 250, 0.9);" +
			"color:#030303;" +
			"text-align:center;" +
			"font-size:60px;" +
			""
		);
		document.body.appendChild(pb);
	}
	else {
		for (var i=pb.childNodes.length-1; i>=0; i--) {
			pb.removeChild(pb.childNodes[i]);
		}
	}
}
function wait_download_get_progress (progress_evt, length)
{
	var progress = "";

	if (progress_evt.lengthComputable) {

		var percentage = -1;
		percentage = parseInt((progress_evt.loaded/progress_evt.total)*100);
		progress = ((percentage >= 0)? percentage.toString() +"%" : "");
	}
	else {
		if (typeof progress_evt.loaded !== 'undefined') {

			progress = s_loaded + " " + progress_evt.loaded + " " + s_from + " " + length;
		}
	}

	var bg = document.getElementById("boot_progress");
	if (bg) bg.innerHTML = s_loading_resources + progress;
}
function wait_download_get_remove ()
{
	remove_element("boot_progress");
}

function tar_get (url, data, callback)
{
	wait_download_get_create();

	var xreq = new XMLHttpRequest();
	xreq.open("GET", url, true);
	xreq.responseType = "arraybuffer";

	xreq.addEventListener("progress", function (evt) {

			var length = xreq.getResponseHeader("Content-Length");
			wait_download_get_progress(evt, length);
		}
	);

	xreq.addEventListener("load", function (evt) {
		if (callback) {
			callback(xreq);
		}
		wait_download_get_remove();
	}, false);

	xreq.addEventListener("error", function (evt) {
		console.log(" get error");
		wait_download_get_remove();
	}, false);

/*
	xreq.onprogress = wait_download_get_progress;

	xreq.onload = function (evt) {
		if (callback) {
			callback(xreq);
		}
		wait_download_get_remove();
	};

	xreq.onerror = function (evt) {
		console.log(" get error");
		wait_download_get_remove();
	};
*/
	xreq.send(data);
}


function tar_get_image_src (fname)
{
	var src = null;
	for (var i=0; i<RESOURCES.length; i++) {
		if (RESOURCES[i].name == fname) {
//			src = "data:image/png;base64," + btoa(String.fromCharCode.apply(null, RESOURCES[i].body));
			src = RESOURCES[i].src;
			break;
		}
	}
	return src;
}
function tar_get_file (fname)
{
	var src = null;
	for (var i=0; i<RESOURCES.length; i++) {
		if (RESOURCES[i].name == fname) {
//			body = String.fromCharCode.apply(null, RESOURCES[i].body);
			src = decodeUtf8(RESOURCES[i].body);
			break;
		}
	}
	return src;
}
function tar_parse (xreq)
{
	if (xreq.response) {
		var resp_data = new Uint8Array(xreq.response);
		var tar = new DataView(resp_data.buffer);

		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

		document.body.innerHTML = "";

		var i = 0, n = 0;
		while (i < tar.byteLength) {
			RESOURCES[n] = {};
			var name, size, len;
			name = new Uint8Array(resp_data.buffer, i, 100);
			len = 0; while (len<100 && name[len]!=0) len++;
			name = String.fromCharCode.apply(null, new Uint8Array(resp_data.buffer, i, len));
			RESOURCES[n].name = name;
			RESOURCES[n].ext = RESOURCES[n].name.split('.').pop();

			size = new Uint8Array(resp_data.buffer, i+124, 12);
			len = 0; while (len<100 && size[len]!=0) len++;
			size = String.fromCharCode.apply(null, new Uint8Array(resp_data.buffer, i+124, len));
			RESOURCES[n].size = parseInt(size, 8);
			RESOURCES[n].body = new Uint8Array(resp_data.buffer, i+BLOCK_SIZE, RESOURCES[n].size);

			var ftype = null;
			switch (RESOURCES[n].ext) {
			case 'js':
				ftype = "text/javascript";
				RESOURCES[n].body = decodeUtf8(RESOURCES[n].body);
				break;
			case 'css':
				ftype = "text/css";
				RESOURCES[n].body = decodeUtf8(RESOURCES[n].body);
				break;
			case 'png':
				ftype = "image/png";
				break;
			}

			RESOURCES[n].src = window.URL.createObjectURL(new Blob([RESOURCES[n].body], {type: ftype}));

			i += (BLOCK_SIZE + parseInt((RESOURCES[n].size + (BLOCK_SIZE - 1)) & ~(BLOCK_SIZE - 1)));
			n++;

			var p = i; while(resp_data[p] == 0x00) p++;
			if ((p - i) >= BLOCK_SIZE*2) {
				break;
			}
		}
	}
	else {
		console.log(" no tar file now");
	}
}



/*
================================================
********** START NOW ***************************
================================================
*/
function tar_load_complete (response) {
	tar_parse(response);

	// load and run interface
/*
	var outlet_api = document.createElement("script");
	outlet_api.setAttribute("type", "text/javascript");
	outlet_api.setAttribute("charset", "utf-8");
	outlet_api.innerHTML = tar_get_file(js_prefix + "outlet_interface.js");
	document.head.appendChild(outlet_api);
*/

	for (var i=0; i<RESOURCES.length; i++) {
		var el_obj = null;
		var el_type = null;
		switch(RESOURCES[i].ext) {
		case 'js':
			el_obj = "script";
			el_type = "text/javascript";
			break;
		case 'css':
			el_obj = "style";
			el_type = "text/css";
			break;
		}
		if (el_type == null || el_obj == null) continue;

		var el = document.createElement(el_obj);
		el.setAttribute("type", el_type);
		el.setAttribute("charset", "utf-8");
	//	el.setAttribute("src", RESOURCES[i].src);
		el.innerHTML = RESOURCES[i].body;
		document.head.appendChild(el);
	}


	outlet_update_info
	(
		function()
		{
			sensor_update_info
			(
				function ()
				{
					system_update_info(null);
				}
			);
			var nav = create_navigation_panel(3);
			document.body.appendChild(nav);
			system_service_start();
		}
	);

}


tar_get(iface, null, tar_load_complete);



