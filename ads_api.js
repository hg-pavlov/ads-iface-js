
/*
var rule = {};
function sendrule(){
rule.date = set_rule_date(4000000000,4100000000,[true,true,true,true,false,false,false]);
rule.cond = add_rule_time(null, 'or', [1,2,3,4,5,6,7,8], 'exact', 0, 3600, 'on');
rule.cond = add_rule_time(rule.cond, 'or', [1,2,3,4,5,6,7,8], 'exact', 3600, 36000, 'off');
rule.cond = add_rule_sensor(rule.cond, 'and', SENSOR_TYPE_ALTITUDE, [1,2,3,4,5,6,7,8], 10, 100, 'on', 'up');
rule.cond = add_rule_sensor(rule.cond, 'and', SENSOR_TYPE_ALTITUDE, [1,2,3,4,5,6,7,8], 10, 100, 'off', 'down');
set_outlet_rule(0,0,'append','and',rule.date,rule.cond,null);
}
*/


var DEVICE_TYPE_UNKNOWN			=0x00000000;
var DEVICE_TYPE_SENSOR			=0x00000001;
var DEVICE_TYPE_OUTLET			=0x00000002;
var DEVICE_TYPE_STEPPER			=0x00000004;
var DEVICE_TYPE_ENGINE			=0x00000008;


var DEVICE_STATE_MODE_MASK			=0x000000F0;
var DEVICE_STATE_MODE_CTL			=0x00000010;
var DEVICE_STATE_MODE_AUTO			=0x00000020;


/*
**********************************************************************
 *
 * Outlet consumer IDs :	constants that define consumer on outlet.
 * Why                 :	for script using
 *
**********************************************************************
*/

var OUTLET_CONSUMER_DEFAULT	=0;
var OUTLET_CONSUMER_LIGHT	=1;
var OUTLET_CONSUMER_WATER	=2;
var OUTLET_CONSUMER_HEATER	=3;
var OUTLET_CONSUMER_COOLER	=4;
var OUTLET_CONSUMER_OXYGEN	=5;
var OUTLET_CONSUMER_CO2		=6;
var OUTLET_CONSUMER_WIND	=7;
var OUTLET_CONSUMER_MAX 	=7;

var OUTLET_CONSUMER_NAMES = [
	"Розетка",
	"Освещение",
	"Полив",
	"Отопление",
	"Охлаждение",
	"Вентиляция",
	"Углекислый газ",
	"Обдув"
];
var OUTLET_CONSUMER_IMAGES = [
	"outlet",
	"light",
	"water",
	"heater",
	"cooler",
	"oxygen",
	"co2",
	"wind"
];


var OUTLET_RULE_APPEND				=0x00000001;
var OUTLET_RULE_INSERT				=0x00000100;
var OUTLET_RULE_INSERT_BEFORE		=0x00000300;
var OUTLET_RULE_INSERT_AFTER		=0x00000500;
var OUTLET_RULE_REPLACE				=0x00010000;
var OUTLET_RULE_DELETE				=0x01000000;

var OUTLET_RULE_FLAG_RULE_ALG_OR	=0x00000001;
var OUTLET_RULE_FLAG_RULE_ALG_AND	=0x00000002;
var OUTLET_RULE_FLAG_RULE_ALG_PRIO	=0x00000004;

var OUTLET_RULE_FLAG_RISE			=0x00000010;
var OUTLET_RULE_FLAG_FALL			=0x00000020;
var OUTLET_RULE_FLAG_ONOFF_ON		=0x00000010;
var OUTLET_RULE_FLAG_ONOFF_OFF		=0x00000020;
var OUTLET_RULE_FLAG_DATE_ENABLE	=0x10000000;
var OUTLET_RULE_FLAG_WEEK_ENABLE	=0x20000000;
var OUTLET_RULE_FLAG_TIME_EXACT		=0x20000000;
var OUTLET_RULE_FLAG_TIME_INTERVAL	=0x40000000;
var OUTLET_RULE_FLAG_ON				=0x00000100;
var OUTLET_RULE_FLAG_OFF			=0x00000200;

var OUTLET_RULE_CONDITION_COUNT_MAX	=10;


var SENSOR_TYPE_MASK	=(0x0000FFFF);
var SENSOR_GROUP_MASK	=(0xFF000000);
var SENSOR_COUNT_MASK	=(0x00FF0000);
var SENSOR_DAYTIME_MASK	=(0x00FFFFFF);
var SENSOR_WEEKDAY_MASK	=(0xFF000000);

// SENSORS GROUPS
var STM32_ADC1_GROUP				=0x01000000;
var STM32_ADC2_GROUP				=0x02000000;
var STM32_BME280_BUS1_GROUP			=0x03000000;
var STM32_BME280_BUS2_GROUP			=0x04000000;
var STM32_MCP23017_BUS1_GROUP		=0x05000000;
var STM32_MCP23017_BUS2_GROUP		=0x06000000;
var STM32_BH1750_BUS1_GROUP			=0x07000000;
var STM32_BH1750_BUS2_GROUP			=0x08000000;

// DIGITAL SENSOR IDs
var DIGITAL_ID_0					=0x00000000;
var DIGITAL_ID_1					=0x00010000;


var SENSOR_TYPE_NULL				 =0;
var SENSOR_TYPE_DATE				 =1;
var SENSOR_TYPE_DAYTIME				 =2;
var SENSOR_TYPE_TEMPERATURE			 =3;
var SENSOR_TYPE_HUMIDITY			 =4;
var SENSOR_TYPE_PRESSURE			 =5;
var SENSOR_TYPE_SEA_LEVEL_PRESSURE	 =6;
var SENSOR_TYPE_DEW_POINT			 =7;
var SENSOR_TYPE_CO2					 =8;
var SENSOR_TYPE_ALTITUDE			 =9;
var SENSOR_TYPE_LIGHT_IN			=10;
var SENSOR_TYPE_LIGHT_OUT			=11;
var SENSOR_TYPE_GYRO				=12;
var SENSOR_TYPE_COMPASS				=13;
var SENSOR_TYPE_EC					=14;
var SENSOR_TYPE_PH					=15;
var SENSOR_TYPE_TDS					=16;
var SENSOR_TYPE_PPM					=17;
var SENSOR_TYPE_SOLUTION_TEMP		=18;
var SENSOR_TYPE_ONOFF				=19;
var SENSOR_TYPE_ONOFF_CHANGED		=20;
var SENSOR_TYPE_RAW					=21;
var SENSOR_TYPE_MAX					=21;

var SENSOR_COUNT_MAX				=32;
var SENSOR_DIGITAL_MAX				=4;


var SENSOR_TYPE_NAMES = [
	"",
	"Дата",
	"", // ВРЕМЯ точное/интервал
	"Температура воздуха",
	"Влажность воздуха",
	"Атмосферное давление",
	"Атмосферное давление на уровне моря",
	"Точка росы",
	"Насыщение углекислым газом",
	"Высота над заданной точкой",
	"Уровень внутреннего освещения",
	"Уровень внешнего освещения",
	"Угол наклона",
	"Угол от направления СЕВЕР",
	"Электропроводность раствора",
	"Уровень PH раствора",
	"Уровень TDS раствора",
	"Уровень PPM раствора",
	"Температура раствора",
	"Датчик логический",
	"Датчик логический", // unused !!!
	"Сырые показания АЦП"
];
var SENSOR_DAYTIME_TYPE_NAMES = [
	"Время суток",
	"Интервал"
];
var SENSOR_GROUP_NAMES = [
	"",
	"(Аналог.)",
	"(Аналог.)",
	"(Цифр.)",
	"(Цифр.)",
	"(Логич.)",
	"(Логич.)",
	""
];

var SENSOR_ANALOG_TYPES = [
	[SENSOR_TYPE_NULL, "Не выбран тип датчика"],
	[SENSOR_TYPE_RAW, "Сырые показания АЦП"],
	[SENSOR_TYPE_TEMPERATURE, "Температура воздуха"],
	[SENSOR_TYPE_SOLUTION_TEMP, "Температура жидкости"],
	[SENSOR_TYPE_LIGHT_IN, "Освещение внутреннее"],
	[SENSOR_TYPE_LIGHT_OUT, "Освещение внешнее"],
	[SENSOR_TYPE_EC, "TDS/EC/PPM жидкости"]
];


var SUPPORTED_ADC_PINS				= 10;
var SENSOR_ADC_PINS_MAX				= 10;
var SENSOR_AUX_PINS_MAX				= 10;
var SUPPORTED_MCP23017_SENSORS		= 32;
var SENSOR_LOGIC_PINS_MAX			= SUPPORTED_MCP23017_SENSORS;


var SENSOR_CONFIG_LENGTH			= 8012;
var SENSOR_ADC_CONFIG_LENGTH		= 194;


var METRIC_PORT_MIN					= 49152;
var METRIC_PORT_MAX					= 65535;

var ADC_MAX_VALUE					= 4096; // 12 bits
var ADC_MEASUREMENT_COUNT_MAX		= 16;	// times in one iteration
var ADC_AUX_PIN_COUNT_MAX			= 3;	// auxillary pin numbers (maximum == ADC_AUX_PIN_COUNT_MAX)
var ADC_CALIBRATION_COUNT			= 20;	// maximum count of values in calibration buffer
var ADC_CALIBRATION_DATA_MINIMUM	= 4;	// minimum count of values in calibration buffer
var EC_PPM_CONVERSION_FACTOR_MIN	= 500;

var SENSOR_NAME_SIZE				= 128;
var OUTLET_NAME_SIZE				= 128;
var DEVICE_NAME_SIZE				= 128;

var DEVICE_CONFIG_SIZE				= (8+4+4+128+8+4+16+2+128+128);




var API_REQUEST_SYSTEM_GET_CLEAR_LOGS	= "system_clearlogs";
var API_REQUEST_SYSTEM_SET_METRIC_PORT	= "system_metricport";
var API_REQUEST_SYSTEM_GET_RUNLOG		= "system_getrunlog";
var API_REQUEST_SYSTEM_GET_ERRLOG		= "system_geterrlog";
var API_REQUEST_SYSTEM_GET_INFO			= "system_getinfo";
var API_REQUEST_SYSTEM_SET_DATETIME		= "system_setdatetime";
var API_REQUEST_SYSTEM_SET_DEVICE_CONFIG	= "system_setdevconf";
var API_REQUEST_SYSTEM_GET_DEVICE_CONFIG	= "system_getdevconf";

var API_REQUEST_SENSOR_WORK_START		= "sensor_workstart";
var API_REQUEST_SENSOR_WORK_STOP		= "sensor_workstop";
var API_REQUEST_SENSOR_GET_CONFIG		= "sensor_getconfig";
var API_REQUEST_SENSOR_SET_CONFIG		= "sensor_setconfig";
var API_REQUEST_SENSOR_GET_DEVICE_NAME	= "sensor_getdevname";
var API_REQUEST_SENSOR_SET_DEVICE_NAME	= "sensor_setdevname";
var API_REQUEST_SENSOR_SET_ALTITUDE		= "sensor_setaltitude";
var API_REQUEST_SENSOR_SET_ADC_CALIBR	= "sensor_setadccalibr";
var API_REQUEST_SENSOR_SET_ADC_PIN		= "sensor_setadcpin";
var API_REQUEST_SENSOR_SET_ADC_NAME		= "sensor_setadcpinname";
var API_REQUEST_SENSOR_GET_ADC_NAME		= "sensor_getadcpinname";
var API_REQUEST_SENSOR_GET_LOGIC_NAME	= "sensor_getlogicname";
var API_REQUEST_SENSOR_SET_LOGIC_PIN	= "sensor_setlogicpin";
var API_REQUEST_SENSOR_SET_DIGITAL_NAME	= "sensor_setdigitalname";
var API_REQUEST_SENSOR_GET_DIGITAL_NAME	= "sensor_getdigitalname";
var API_REQUEST_SENSOR_GET_METRIC		= "sensor_getmetric";

var API_REQUEST_OUTLET_WORK_START		= "outlet_workstart";
var API_REQUEST_OUTLET_WORK_STOP		= "outlet_workstop";
var API_REQUEST_OUTLET_SET_DEVICE_NAME	= "outlet_setdevname";
var API_REQUEST_OUTLET_GET_DEVICE_NAME	= "outlet_getdevname";
var API_REQUEST_OUTLET_GET_DEVICE_STATE	= "outlet_getdevstate";
var API_REQUEST_OUTLET_GET_DEVICE_CONFIG	= "outlet_getdevconf";
var API_REQUEST_OUTLET_GET_COUNT		= "outlet_getcount";
var API_REQUEST_OUTLET_GET_CONFIG		= "outlet_getconfig";
var API_REQUEST_OUTLET_GET_STATE		= "outlet_getstate";
var API_REQUEST_OUTLET_GET_SENSORLIST	= "outlet_getsensorlist";
var API_REQUEST_OUTLET_GET_RULES		= "outlet_getrules";
var API_REQUEST_OUTLET_SET_STATE		= "outlet_setstate";
var API_REQUEST_OUTLET_SET_CONFIG		= "outlet_setconfig";
var API_REQUEST_OUTLET_SET_RULE			= "outlet_setrule";
var API_REQUEST_OUTLET_DELETE_RULE		= "outlet_delrule";

var API_REQUEST_WIFI_SET_CONFIG			= "wifi_setconfig";



var DEVICE = {};
var OUTLET = {};
var SENSOR = {};



/**
=================================================================================================
================================ Automatic Device Switch API ====================================
=================================================================================================
*
*
*________________________________________________________________________________________________
=================================================================================================
 */



/**
=====================================================================================================
 *
 * get_outlet_device_config	:	Функция получает главные настройки устройства, управляющего выходами.
 *
 *				parameters	:	callback - функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в OUTLET
 *
=====================================================================================================
 */
function get_outlet_device_config (callback)
{
	send_get(API_REQUEST_OUTLET_GET_DEVICE_CONFIG, null, null, function (xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

/*
======================================================

	struct outlet_device {
		device_id_t	device_id;
		char		name[OUTLET_NAME_SIZE];
		uint32_t	flags;
	} __attribute__((packed));

======================================================
*/

			if (response.length < parseInt(8 + OUTLET_NAME_SIZE + 4)) {

				switch (response[0]) {

				case -1: /* ERROR */
					console.log(" get_outlet_device_config ERROR ");
					break;

				default:
					console.log(" unknown status " + (parseInt(response[0])).toString());
				}

				state = parseInt(response[0]);
				if (callback) callback(state);
				return;
			}

			var n = 0;
			var outlet_device = new DataView(response.buffer);

			OUTLET.device_id = [];
			for (var c=0; c<8; c++) {
				OUTLET.device_id[c] = outlet_device.getUint8(n, true); n++;
			}

			var name = new Uint8Array(response.buffer, 8, OUTLET_NAME_SIZE);
			var len = 0; while (len<OUTLET_NAME_SIZE && name[len]!=0) len++;
			name = new Uint8Array(response.buffer, 8, len);

			OUTLET.name = decodeUtf8(name); n += OUTLET_NAME_SIZE;
			OUTLET.flags = outlet_device.getUint32(n, true); n += 4;

			state = 0;
		}
		else {
			console.log(" get_device_config: null answer");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *	get_outlet_sensor_list	:	Функция получает список доступных для устройства наборов датчиков.
 *							:	* набор датчиков - Управляющий Модуль, к которому подключены датчики.
 *							:	Датчики из перечисленных наборов могут быть использованы
 *							:	для настройки правил выходов устройства (суть электроприборов).
 *
 *				parameters	:	callback - Функция, которая будет вызвана по получении результата.
 *
 *					return	:	Результат сохраняется в массиве OUTLET.sensor_list[]
 *
=====================================================================================================
 */
function get_outlet_sensor_list (callback)
{
	send_get(API_REQUEST_OUTLET_GET_SENSORLIST, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);
			var sensorlist = new DataView(response.buffer);

			if (sensorlist.byteLength < 4) {
				console.log(" get_outlet_sensor_list: response " + sensorlist.byteLength.toString() + " bytes ");
				if (callback) callback(null);
				return;
			}
			else if (sensorlist.byteLength == 4) {
				console.log(" get_outlet_sensor_list: error " + sensorlist.getInt32(0, true).toString() + " bytes ");
				if (callback) callback(sensorlist.getInt32(0, true));
				return;
			}

/*
======================================================

	typedef union  device_identifier {
		uint8_t u8[8];
		uint16_t u16[4];
		uint32_t u32[2];
	} __attribute__((packed)) device_id_t;

	struct sensor_broadcast {
		device_id_t device_id;					// ID of sensor device
		char sensor_name [SENSOR_NAME_SIZE];	// main name of sensor device
		uint32_t sensor_count;					// count of sensor_metric structures
		struct sensor_metric metric[1];
	} __attribute__((packed));

======================================================
*/

			OUTLET.sensor_list = [];

			for (var i=0, n=0; n<sensorlist.byteLength; i++) {

				OUTLET.sensor_list[i] = {};

				OUTLET.sensor_list[i].device_id = [];
				for (var c=0; c<8; c++) {
					OUTLET.sensor_list[i].device_id[c] = sensorlist.getUint8(n, true); n++;
				}

				var name = new Uint8Array(sensorlist.buffer, n, SENSOR_NAME_SIZE);
				var len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
				name = new Uint8Array(sensorlist.buffer, n, len);
				OUTLET.sensor_list[i].name =  decodeUtf8(name); n += SENSOR_NAME_SIZE;

				OUTLET.sensor_list[i].sensor_count = sensorlist.getUint32(n, true); n += 4;

/*
======================================================

	struct sensor_metric {
		uint32_t type;
		union {
			uint32_t u32;
			int32_t i32;
			float f32;
		} __attribute__((packed)) value;
	} __attribute__((packed));

======================================================
*/

				OUTLET.sensor_list[i].metric = [];

				for (var s=0; s<OUTLET.sensor_list[i].sensor_count; s++, n+=8) {

					OUTLET.sensor_list[i].metric[s] = {};

					OUTLET.sensor_list[i].metric[s].type = parseInt(sensorlist.getUint32(n+0, true));
					var stype = (OUTLET.sensor_list[i].metric[s].type & SENSOR_TYPE_MASK);

					if (stype == SENSOR_TYPE_DAYTIME) {
						OUTLET.sensor_list[i].metric[s].value = parseInt(sensorlist.getUint32(n+4, true));
					}
					else if (stype == SENSOR_TYPE_ONOFF || stype == SENSOR_TYPE_ONOFF_CHANGED) {
						OUTLET.sensor_list[i].metric[s].value = parseInt(sensorlist.getUint32(n+4, true));
					}
					else {
						OUTLET.sensor_list[i].metric[s].value = parseFloat(sensorlist.getFloat32(n+4, true));
					}
				}
			}

			state = 0;
		}
		else {
			console.log(" get_sensor_list: no sensors now ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *		get_outlet_count	:	Функция получает число доступных выходов (возможных электроприборов).
 *
 *				parameters	:	callback - Функция, которая будет вызвана по получении результата.
 *
 *					return	:	Результат сохраняется в OUTLET.count
 *
=====================================================================================================
 */
function get_outlet_count (callback)
{
	send_get(API_REQUEST_OUTLET_GET_COUNT, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case -1: /* ERROR */
				console.log(" getcount ERROR ");
				state = -1;
				break;

			case 0:
				console.log("NO OUTLET");
				OUTLET.count = parseInt(response[0]);
				state = 0;
				break;

			default:
				OUTLET.count = parseInt(response[0]);
				state = 0;
				break;
			}
		}
		else {
			console.log(" outlet_get_count: null answer");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *		set_outlet_config	:	Функция получает настройки определенных выходов (электроприборов).
 *
 *				parameters	:	outlet_id - номер (ID) выхода. Минимальный ID == 0.
 *							:	consumer - ID потребителя, подключенного к выходу. (задел на будущее).
 *							:	state - состояние выхода (возможно флаги)
 *							:	callback - функция, которая будет вызвана по получении результата
 *
 *					return	:	если успешно, то результат сохраняется в OUTLET.outlet[outlet_id].
 *							:	Изменения касаются только параметров, переданных в функцию.
 *
=====================================================================================================
 */
function set_outlet_config (outlet_id, consumer, state, name, callback)
{
	var buff = new Uint8Array(8+OUTLET_NAME_SIZE);
	var setconfig = new DataView(buff.buffer);

/*
======================================================

	struct outlet_config {
		uint16_t id;
	#define OUTLET_CONSUMER_DEFAULT		0
	#define OUTLET_CONSUMER_LIGHT		1
	#define OUTLET_CONSUMER_WATER		2
	#define OUTLET_CONSUMER_HEATER		3
	#define OUTLET_CONSUMER_COOLER		4
	#define OUTLET_CONSUMER_OXYGEN		5
	#define OUTLET_CONSUMER_CO2			6
	#define OUTLET_CONSUMER_WIND		7
		uint16_t consumer;
		uint32_t state;
		char name[OUTLET_NAME_SIZE];
	} __attribute__((packed));

	outlet_config:
	{
		"id":		0xXXXX,	uint16_t
		"consumer":	0xXXXX,	uint16_t
		"state":	0xXXXX,	uint32_t
		"name":		""		char [128]
	}

======================================================
*/

	setconfig.setUint16(0, outlet_id, true);
	setconfig.setUint16(2, consumer, true);
	setconfig.setUint32(4, state, true);

	string_to_buffer(setconfig, 8, OUTLET_NAME_SIZE, name);

	send_post(API_REQUEST_OUTLET_SET_CONFIG + "?oid=" + outlet_id, buff, null, function(xreq) {

		var s = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				if (!OUTLET.outlet[outlet_id]) OUTLET.outlet[outlet_id] = {};
				OUTLET.outlet[outlet_id].id = outlet_id;
				OUTLET.outlet[outlet_id].consumer = consumer;
				OUTLET.outlet[outlet_id].state = state;
				OUTLET.outlet[outlet_id].name = name;
				console.log(" setconfig OK ");
				break;

			case -1: /* ERROR */
				console.log(" setconfig ERROR ");
				break;

			default:
				console.log(" unknown setconfig status: " + response[0].toString());
				break;
			}

			s = parseInt(response[0]);
		}
		else {
			console.log(" no response on setconfig command");
		}

		if (callback) callback(outlet_id, s);
	});
}
/**
=====================================================================================================
 *
 *		get_outlet_config	:	Функция получает настройки определенных выходов (электроприборов).
 *
 *				parameters	:	start_outlet_id - начальный номер (ID) выхода. Минимальный ID == 0.
 *							:	count - коничество интересующих выходов
 *							:	callback - функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в массивах OUTLET.outlet[outlet_id],
 *							:	сохраняя правила, полученные ранее.
 *
=====================================================================================================
 */
function get_outlet_config (start_outlet_id, count, callback)
{
	if (start_outlet_id < 0) start_outlet_id = 0;
	if (count <= 0) {
		console.log(" get outlet config: invalid argument ");
		if (callback) callback(start_outlet_id, count, -1);
		return;
	}

	send_get(API_REQUEST_OUTLET_GET_CONFIG + "?oid=" + start_outlet_id.toString() + "&count=" + count.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response, xreq.response.byteLength/4);

			if (response.length < parseInt(8 + OUTLET_NAME_SIZE)) {

				switch (response[0]) {

				case 0:
					console.log("NO CONFIG");
					break;

				case -1: /* ERROR */
					console.log(" getconfig ERROR ");
					break;

				default:
					console.log("unknown status " + (parseInt(response[0])).toString());
				}

				if (callback) callback(start_outlet_id, count, parseInt(response[0]));
				return;
			}

/*
======================================================

	struct outlet_config {
		uint16_t id;
	#define OUTLET_CONSUMER_DEFAULT		0
	#define OUTLET_CONSUMER_LIGHT		1
	#define OUTLET_CONSUMER_WATER		2
	#define OUTLET_CONSUMER_HEATER		3
	#define OUTLET_CONSUMER_COOLER		4
	#define OUTLET_CONSUMER_OXYGEN		5
	#define OUTLET_CONSUMER_CO2			6
	#define OUTLET_CONSUMER_WIND		7
		uint16_t consumer;
		uint32_t state;
		char name[OUTLET_NAME_SIZE];
	} __attribute__((packed));


	outlet_config:
	{
		"id":		0xXXXX,	uint16_t
		"consumer":	0xXXXX,	uint16_t
		"state":		0xXXXX,	uint32_t
		"name":		""		char [128]
	}

======================================================
*/

			var configlist = new DataView(response.buffer);

			if (!OUTLET.outlet) OUTLET.outlet = [];

			for (var i=start_outlet_id, n=0; ((n+8+OUTLET_NAME_SIZE)<=configlist.byteLength) && (i<(start_outlet_id+count)); i++) {

				var rules = [];
				if (OUTLET.outlet[i] && OUTLET.outlet[i].rule) {
					rules = OUTLET.outlet[i].rule;
				}

				OUTLET.outlet[i] = {};
				OUTLET.outlet[i].rule = rules;

				OUTLET.outlet[i].id = configlist.getUint16(n, true); n+=2;
				OUTLET.outlet[i].consumer = configlist.getUint16(n, true); n+=2;
				OUTLET.outlet[i].state = configlist.getUint32(n, true); n+=4;

				var name = new Uint8Array(response.buffer, n, OUTLET_NAME_SIZE);
				var len = 0; while (len<OUTLET_NAME_SIZE && name[len]!=0) len++;
				OUTLET.outlet[i].name = decodeUtf8(new Uint8Array(response.buffer, n, len)); n+=OUTLET_NAME_SIZE;
			}

			state = 0;
		}
		else {
			console.log(" no outlet config");
		}

		if (callback) callback(start_outlet_id, count, state);
	});
}


/**
=====================================================================================================
 *
 *		get_outlet_rules	:	Функция получает список правил для указанного выхода.
 *
 *				parameters	:	outlet_id - номер (ID) выхода, правила из которого следует получить.
 *							:				Минимальный ID == 0.
 *							:	start_rule_id - номер первого правила, с которого следует вести отсчёт.
 *							:				Минимальный номер правила == 0.
 *							:	callback - функция, которая будет вызвана по получении результата.
 *
 *					return	:	Результат сохраняется в массивах OUTLET.outlet[outlet_id].rule[]
 *
=====================================================================================================
 */
function get_outlet_rules (outlet_id, start_rule_id, count, callback)
{
	send_get(API_REQUEST_OUTLET_GET_RULES + "?oid="+outlet_id.toString() + "&rid="+start_rule_id.toString() + "&count=" + count.toString(),
																	null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			if (response.length < (24/4)) {

				switch (parseInt(response[0])) {

				case 0:
					console.log("NO RULES");
					break;

				case -1: /* ERROR */
					console.log(" getrules ERROR ");
					break;

				default:
					console.log("unknown status "+(parseInt(response[0])).toString());
				}

				if (callback) callback(outlet_id, parseInt(response[0]));
				return;
			}

			var rulelist = new DataView(response.buffer);

/*
======================================================

	struct outlet_rule_date {
	#define OUTLET_RULE_FLAG_DATE_ENABLE	0x10000000	// дата установлена
	#define OUTLET_RULE_FLAG_WEEK_ENABLE	0x20000000	// день/дни недели установлен(ы)
	#define OUTLET_RULE_FLAG_TIME_EXACT		0x20000000	// поле времени интерпретируется как ТОЧНОЕ ВРЕМЯ СУТОК
	#define OUTLET_RULE_FLAG_TIME_INTERVAL	0x40000000	// поле времени интерпретируется как ИНТЕРВАЛ действия
		uint32_t flags;
		uint32_t start;
		uint32_t stop;
		uint32_t week_days;
	} __attribute__((packed));

	struct outlet_rule_condition {
		device_id_t sensor_id;				// device_id of sensor set
		uint32_t type;						// sensor type (e.g. SENSOR_TYPE_PRESSURE)
	#define OUTLET_RULE_FLAG_ON				0x00000100	// условие для ВКЛЮЧЕНИЯ
	#define OUTLET_RULE_FLAG_OFF			0x00000200	// условие для ВЫКЛЮЧЕНИЯ
	#define OUTLET_RULE_FLAG_RISE			0x00000010	// флаг БОЛЕЕ для условия
	#define OUTLET_RULE_FLAG_FALL			0x00000020	// флаг МЕНЕЕ для условия
	#define OUTLET_RULE_FLAG_ONOFF_ON		0x00000010	// условие ПРАВДА, если логический датчик имеет состояние ON (замкнут)
	#define OUTLET_RULE_FLAG_ONOFF_OFF		0x00000020	// условие ПРАВДА, если логический датчик имеет состояние OFF (разомкнут)
		uint32_t flags;						// contition states
		ruleval_t val_beg;					// begin value of the sensor; on the first second
		ruleval_t val_end;					// end value of the sensor;
	} __attribute__((packed));

	struct outlet_rule {
		uint32_t flags;
		uint32_t condition_count;
		struct outlet_rule_date date;
		struct outlet_rule_condition condition[1];
	} __attribute__((packed));

======================================================
*/

/*
======================================================

	rules :

	[
		"rule":
		{
			"flags":			0xXXXXXXXX	// uint32_t
			"condition_count":	N,			// uint32_t

			"date": {
				"flags":		0xXXXXXXXX,	// uint32_t
				"start":		dd mm yyyy,	// uint32_t
				"stop":			dd mm yyyy,	// uint32_t
				"week_days":	0xXXXXXXXX	// uint32_t
			},

			"condition": [
				{
					"sensor_id":	0xXXXXXXXX XXXXXXXX,	// 8 bytes device ID
					"type":			N,						// uint32_t
					"flags":		0xXXXXXXXX,				// uint32_t
					"val_begin":	N,						// float
					"val_end":		N						// float
				},
				... * condition_count
			]
		}
	];

======================================================
*/

			if (typeof OUTLET.outlet[outlet_id].rule !== 'object' || OUTLET.outlet[outlet_id].rule === null) OUTLET.outlet[outlet_id].rule = [];

			for (var i=start_rule_id, n=0; (count-(i-start_rule_id))>0; i++) {
				OUTLET.outlet[outlet_id].rule[i] = {};
				OUTLET.outlet[outlet_id].rule[i].flags = rulelist.getUint32(n, true); n+=4;
				OUTLET.outlet[outlet_id].rule[i].condition_count = rulelist.getUint32(n, true); n+=4;

				OUTLET.outlet[outlet_id].rule[i].date = {};
				OUTLET.outlet[outlet_id].rule[i].date.flags = rulelist.getUint32(n, true); n+=4;
				OUTLET.outlet[outlet_id].rule[i].date.start = rulelist.getUint32(n, true); n+=4;
				OUTLET.outlet[outlet_id].rule[i].date.stop = rulelist.getUint32(n, true); n+=4;
				OUTLET.outlet[outlet_id].rule[i].date.week_days = rulelist.getUint32(n, true); n+=4;

				OUTLET.outlet[outlet_id].rule[i].condition = [];

				for (var s=0; s<OUTLET.outlet[outlet_id].rule[i].condition_count; s++) {
					OUTLET.outlet[outlet_id].rule[i].condition[s] = {};

					OUTLET.outlet[outlet_id].rule[i].condition[s].sensor_id = [];
					for (var c=0; c<8; c++) {
						OUTLET.outlet[outlet_id].rule[i].condition[s].sensor_id[c] = rulelist.getUint8(n, false); n++;
					}

					OUTLET.outlet[outlet_id].rule[i].condition[s].type = rulelist.getUint32(n, true); n+=4;
					OUTLET.outlet[outlet_id].rule[i].condition[s].flags = rulelist.getUint32(n, true); n+=4;

					if (((OUTLET.outlet[outlet_id].rule[i].condition[s].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_DAYTIME)
						|| ((OUTLET.outlet[outlet_id].rule[i].condition[s].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_DATE)) {
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_beg = rulelist.getUint32(n, true); n+=4;
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_end = rulelist.getUint32(n, true); n+=4;
					}
					else if (((OUTLET.outlet[outlet_id].rule[i].condition[s].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF)
						|| ((OUTLET.outlet[outlet_id].rule[i].condition[s].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF_CHANGED)) {
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_beg = rulelist.getUint32(n, true); n+=4;
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_end = rulelist.getUint32(n, true); n+=4;
					}
					else {
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_beg = rulelist.getFloat32(n, true); n+=4;
						OUTLET.outlet[outlet_id].rule[i].condition[s].val_end = rulelist.getFloat32(n, true); n+=4;
					}
				}

				if (((response.buffer.byteLength - n) < 6*4) || n >= response.buffer.byteLength) break;
			}

			state = 0;
//			console.log(JSON.stringify(OUTLET[outlet_id].rule));
		}
		else {
			console.log(" no rules received");
		}

		if (callback) callback(outlet_id, state);
	});
}

/**
=====================================================================================================
 *
 *		set_outlet_state	:	Функция устанавливает выход (электроприбор) в состояние ВКЛ./ВЫКЛ.
 *
 *				parameters	:	outlet_id - номер (ID) выхода. Минимальный ID == 0.
 *							:	state - состояние, в которое следует установить выход.
 *							:	ON (ВКЛ.) = 1 или OFF (ВЫКЛ.) = 0
 *							:	callback (outlet_id, error);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Успешный результат сохраняется в OUTLET.outlet[outlet_id].state
 *
=====================================================================================================
 */
function set_outlet_state (outlet_id, state, callback)
{
	send_post(API_REQUEST_OUTLET_SET_STATE + "?oid=" + outlet_id.toString() + "&state=" + state.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			if (response[0] < 0) {
				console.log(" error was occured while setting outlet state");
				state = parseInt(response[0]);
			}
			else {
				console.log("outlet_state" + outlet_id + " = " + parseInt(response[0]));
				OUTLET.outlet[outlet_id].state = parseInt(response[0]);
				state = 0;
			}
		}

		if (callback) callback(outlet_id, state);
		return;
	});
}



/**
=====================================================================================================
 *
 *		get_outlet_state	:	Функция получает актуальное состояние  выхода (электроприбора).
 *
 *				parameters	:	outlet_id - номер (ID) выхода. Минимальный ID == 0.
 *							:	callback (outlet_id, error)
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Успешный результат сохраняется в OUTLET.outlet[outlet_id].state
 *
=====================================================================================================
 */
function get_outlet_state (outlet_id, callback)
{
	send_get(API_REQUEST_OUTLET_GET_STATE + "?oid=" + outlet_id.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			if (response[0] < 0) {
				console.log(" error was occured while getting outlet state");
				state = parseInt(response[0]);
			}
			else {
				console.log("outlet" + outlet_id + "_state = " + response[0]);
				OUTLET.outlet[outlet_id].state = parseInt(response[0]);
				state = 0;
			}
		}

		if (callback) callback(outlet_id, state);
		return;
	});
}


/**
=====================================================================================================
 *
 *		outlet_workstart	:	Функция переводит управление выходами (электроприборами) в активный режим.
 *							:	Устройство самостоятельно принимает решения о вкл./выкл. выхода (электроприбора)
 *							:	для которого в устройстве сохранено правило.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function outlet_workstart (callback)
{
	send_post(API_REQUEST_OUTLET_WORK_START, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				OUTLET.state = 1;
				console.log(" outlet start OK ");
				break;

			case -1: /* ERROR */
				console.log(" outlet start ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = response[0];
		}
		else {
			console.log(" no response on outlet start ");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *			outlet_workstop	:	Функция переводит управление выходами (электроприборами) в ручной режим.
 *							:	Устройство не принимает решения о вкл./выкл. выхода (электроприбора)
 *							:	для которого в устройстве сохранено правило. Правила не работают.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function outlet_workstop (callback)
{
	send_post(API_REQUEST_OUTLET_WORK_STOP, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				OUTLET.state = 0;
				console.log(" outlet stop OK ");
				break;

			case -1: /* ERROR */
				console.log(" outlet stop ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on outlet stop ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *	get_outlet_device_name	:	Функция получает название "набора управляющих выходов" (электроприборов),
 *							:	как единого устройства.
 *
 *				parameters	:	callback (status) - функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в OUTLET.name
 *
=====================================================================================================
 */
function get_outlet_device_name (callback)
{
	send_get(API_REQUEST_OUTLET_GET_DEVICE_NAME, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			if (xreq.response.byteLength <= 4) {
				var response = new Int32Array(xreq.response);
				state = parseInt(response[0]);
			}
			else {
				var name = new Uint8Array(xreq.response, 0, OUTLET_NAME_SIZE);
				var len = 0; while (len<OUTLET_NAME_SIZE && name[len]!=0) len++;
				name = new Uint8Array(xreq.response, 0, len);
				OUTLET.name = decodeUtf8(name);
				state = 0;
			}
		}
		else {
			console.log(" get_device_name: null answer");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *	set_outlet_device_name	:	Функция присваивает название "набору управляющих выходов" (электроприборов),
 *							:	как единому устройству.
 *
 *				parameters	:	name - название, которое следует присвоить устройству.
 *							:	callback (status) - функция, которая будет вызвана по получении результата
 *
 *					return	:	Если успешно, название сохраняется в OUTLET.name
 *
=====================================================================================================
 */
function set_outlet_device_name (name, callback)
{
	if (typeof name != 'string') {
		console.log("set_outlet_device_name: invalid name");
		if (callback) calback(-1);
		return;
	}

	var buff = new Uint8Array(OUTLET_NAME_SIZE);
	var setname = new DataView(buff.buffer);

	string_to_buffer(setname, 0, OUTLET_NAME_SIZE, name);

	send_post(API_REQUEST_OUTLET_SET_DEVICE_NAME, buff, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			state = parseInt(response[0]);

			switch (state) {

			case 0:
				console.log("set_outlet_device_name: OK");
				OUTLET.name = name;
				break;

			default:
				console.log("set_outlet_device_name: ERROR " + state);
				break;
			}
		}
		else {
			console.log(" set_device_name: null answer");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *	get_outlet_device_state	:	Функция получает флаги состояния устройства.
 *
 *				parameters	:	callback (status)- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в OUTLET.flags
 *
=====================================================================================================
 */
function get_outlet_device_state (callback)
{
	send_get(API_REQUEST_OUTLET_GET_DEVICE_STATE, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {
			var response = new Int32Array(xreq.response);
			var device_state = new DataView(response.buffer);
			OUTLET.flags = device_state.getUint32(0, true);
			state = 0;
		}
		else {
			console.log(" get_device_state: null answer ");
		}

		if (callback) callback(state);
	});
}




/**
=====================================================================================================
 *
 *		outlet_send_setrule	:	Функция осуществляет перевод объекта setrule в бинарный вид (структуру outlet_setrule)
 *							:	и отправляет устройству.
 *
 *				parameters	:	setrule - объект setrule, который следует перевести в бинарный вид.
 *							:	callback (outlet_id, status) - функция, которая будет вызвана по получении ответа от устройства.
 *
 *					return	:	none
 *
=====================================================================================================
 */
function outlet_send_setrule (setrule, callback)
{
	if (typeof setrule.outlet_id != 'number' || setrule.outlet_id >= OUTLET.outlet.length
		|| typeof setrule.rule_id != 'number' || setrule.rule_id < 0) {

		console.log("outlet_send_setrule: invalid setrule elements");
		if (callback) callback(null, null);
		return;
	}

	if (!setrule.rule.condition) {
		setrule.rule.condition = [];
	}
	if (setrule.rule.condition_count > 0) {
		if (setrule.rule.condition_count != setrule.rule.condition.length) {
			setrule.rule.condition_count = setrule.rule.condition.length;
		}
	}
	var len = (
				8 +		// setrule header
				8 +		// rule.flags + rule.condition_count
				16 +	// rule.rule_date
				(24 * setrule.rule.condition_count) // conditions
	);
	var outlet_setrule = new Uint8Array(len);
	var setrule_data = new DataView(outlet_setrule.buffer);
	var n = 0;
/*
======================================================

	typedef union {
		uint32_t u32;
		int32_t i32;
		float f32;
	} ruleval_t;

	struct outlet_rule_date {
	#define OUTLET_RULE_FLAG_DATE_ENABLE	0x10000000	// дата установлена
	#define OUTLET_RULE_FLAG_WEEK_ENABLE	0x20000000	// день/дни недели установлен(ы)
	#define OUTLET_RULE_FLAG_TIME_EXACT		0x20000000	// поле времени интерпретируется как ТОЧНОЕ ВРЕМЯ СУТОК
	#define OUTLET_RULE_FLAG_TIME_INTERVAL	0x40000000	// поле времени интерпретируется как ИНТЕРВАЛ действия
		uint32_t flags;
		uint32_t start;
		uint32_t stop;
		uint32_t week_days;
	} __attribute__((packed));

	struct outlet_rule_condition {
		device_id_t sensor_id;				// device_id of sensor set
		uint32_t type;						// sensor type (e.g. SENSOR_TYPE_PRESSURE)
	#define OUTLET_RULE_FLAG_ON				0x00000100	// условие для ВКЛЮЧЕНИЯ
	#define OUTLET_RULE_FLAG_OFF			0x00000200	// условие для ВЫКЛЮЧЕНИЯ
	#define OUTLET_RULE_FLAG_RISE			0x00000010	// флаг БОЛЕЕ для условия
	#define OUTLET_RULE_FLAG_FALL			0x00000020	// флаг МЕНЕЕ для условия
	#define OUTLET_RULE_FLAG_ONOFF_ON		0x00000010	// условие ПРАВДА, если логический датчик имеет состояние ON (замкнут)
	#define OUTLET_RULE_FLAG_ONOFF_OFF		0x00000020	// условие ПРАВДА, если логический датчик имеет состояние OFF (разомкнут)
		uint32_t flags;						// contition states
		ruleval_t val_beg;					// begin value of the sensor; on the first second
		ruleval_t val_end;					// end value of the sensor;
	} __attribute__((packed));

	struct outlet_rule {
		uint32_t flags;
		uint32_t condition_count;
		struct outlet_rule_date date;
		struct outlet_rule_condition condition[1];
	} __attribute__((packed));


	struct outlet_setrule {
		uint16_t outlet_id;
		uint16_t rule_id;
	#define	OUTLET_RULE_APPEND			0x00000001	// добавить новое правило
	#define	OUTLET_RULE_INSERT			0x00000100	// вставить новое правило между существующими ...
	#define	OUTLET_RULE_INSERT_BEFORE	0x00000300	// ... до правила, имеющего порядковый номер == (struct setrule)->rule_id
	#define	OUTLET_RULE_INSERT_AFTER	0x00000500	// ... после правила, имеющего порядковый номер == (struct setrule)->rule_id
	#define	OUTLET_RULE_REPLACE			0x00010000	// заменить правило, имеющее порядковый номер == (struct setrule)->rule_id
	#define	OUTLET_RULE_DELETE			0x01000000	// удалить правило, имеющее порядковый номер == (struct setrule)->rule_id
		uint32_t doflag;
		struct outlet_rule rule;
	} __attribute__((packed));


	SETRULE

	{
		"outlet_id":	0xXXXX,		// uint16_t
		"rule_id":		0xXXXX,		// uint16_t
		"doflag":		0xXXXXXXXX,	// uint32_t

		"rule":
		{
			"flags":			0xXXXXXXXX	// uint32_t
			"condition_count":	N,			// uint32_t

			"date": {
				"flags":		0xXXXXXXXX,	// uint32_t
				"start":		dd mm yyyy,	// uint32_t
				"stop":			dd mm yyyy,	// uint32_t
				"week_days":	0xXXXXXXXX	// uint32_t
			},

			"condition": [
				{
					"sensor_id":	0xXXXXXXXX XXXXXXXX,	// 8 bytes device ID
					"type":			N,						// uint32_t
					"flags":		0xXXXXXXXX,				// uint32_t
					"val_begin":	N,						// float
					"val_end":		N						// float
				},
				... * condition_count
			]
		}
	};

======================================================
*/


	// SETRULE HEADER
	setrule_data.setUint16(n, setrule.outlet_id, true); n+=2;
	setrule_data.setUint16(n, setrule.rule_id, true); n+=2;
	setrule_data.setUint32(n, setrule.doflag, true); n+=4;

	// RULE
	setrule_data.setUint32(n, setrule.rule.flags, true); n+=4;
	setrule_data.setUint32(n, setrule.rule.condition_count, true); n+=4;

	// DATE
	setrule_data.setUint32(n, setrule.rule.date.flags, true); n+=4;
	setrule_data.setUint32(n, setrule.rule.date.start, true); n+=4;
	setrule_data.setUint32(n, setrule.rule.date.stop, true); n+=4;
	setrule_data.setUint32(n, setrule.rule.date.week_days, true); n+=4;

	for (var i=0; i<setrule.rule.condition.length; i++) {

		// sensor device ID
		for (var c=0; c<8; c++) {
			setrule_data.setUint8(n, setrule.rule.condition[i].sensor_id[c], false); n++;
		}

		setrule_data.setUint32(n, setrule.rule.condition[i].type, true); n+=4;
		setrule_data.setUint32(n, setrule.rule.condition[i].flags, true); n+=4;

		if ((setrule.rule.condition[i].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_DAYTIME) {
			setrule_data.setUint32(n, setrule.rule.condition[i].val_beg, true); n+=4;
			setrule_data.setUint32(n, setrule.rule.condition[i].val_end, true); n+=4;
		}
		else if ((setrule.rule.condition[i].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF
			|| (setrule.rule.condition[i].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF_CHANGED) {
			setrule_data.setUint32(n, setrule.rule.condition[i].val_beg, true); n+=4;
			setrule_data.setUint32(n, setrule.rule.condition[i].val_end, true); n+=4;
		}
		else {
			setrule_data.setFloat32(n, setrule.rule.condition[i].val_beg, true); n+=4;
			setrule_data.setFloat32(n, setrule.rule.condition[i].val_end, true); n+=4;
		}
	}

	send_post(API_REQUEST_OUTLET_SET_RULE, outlet_setrule, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				if (OUTLET.outlet[setrule.outlet_id].rule.length < setrule.rule_id || setrule.doflag & OUTLET_RULE_APPEND) {
					OUTLET.outlet[setrule.outlet_id].rule[OUTLET.outlet[setrule.outlet_id].rule.length] = setrule.rule;
				}
				else if (setrule.doflag & OUTLET_RULE_REPLACE) {
					OUTLET.outlet[setrule.outlet_id].rule[setrule.rule_id] = setrule.rule;
				}
				else if (setrule.doflag & (OUTLET_RULE_INSERT | OUTLET_RULE_INSERT_BEFORE)) {
					OUTLET.outlet[setrule.outlet_id].rule.splice(setrule.rule_id, 0, setrule.rule);
				}
				else if (setrule.doflag & (OUTLET_RULE_INSERT | OUTLET_RULE_INSERT_AFTER)) {
					OUTLET.outlet[setrule.outlet_id].rule.splice((setrule.rule_id + 1), 0, setrule.rule);
				}
				console.log(" setrule OK ");
				break;

			case -1: /* ERROR */
				console.log(" setrule ERROR ");
				break;

			default:
				console.log(" unknown setrule status: " + response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setrule command");
		}

		if (callback) callback(setrule.outlet_id, state);
	});
}


/**
=====================================================================================================
 *
 *			set_rule_date	:	Функция переводит дату для правила в формат, понятный outlet_send_setrule.
 *
 *				parameters	:	date_start - дата начала действия правила.
 *							:	date_stop - дата окончания действия правила.
 *							:	week_days [true, true, true, true, true, true, true] - активность по дням недели.
 *							:			по умолчанию, все дни недели будут для данного правила рабочими.
 *
 *					return	:	объект дата для правила
 *
=====================================================================================================
 */
function set_rule_date (date_start, date_stop, week_days)
{
	var d = {};
	d.flags = 0x00000000;
	d.start = 0x00000000;
	d.stop = 0x00000000;
	d.week_days = 0x00000000;
	if (date_start || date_stop) {
		d.start = parseInt(date_start);
		d.stop = parseInt(date_stop);
		d.flags |= OUTLET_RULE_FLAG_DATE_ENABLE;
	}
	if (week_days && week_days.length == 7) {
		for (var i=0; i<7; i++) {
			if (week_days[i]) d.week_days |= (1<<i);
		}
		d.flags |= OUTLET_RULE_FLAG_WEEK_ENABLE;
	}
	return d;
}

/**
=====================================================================================================
 *
 *			add_rule_time	:	Функция добавляет к уже существующим условиям
 *							:	или создаёт (если typeof conditions != 'object') условие типа SENSOR_TYPE_DAYTIME (время действия правила)
 *
 *				parameters	:	conditions - массив условий, к которым следует добавить условие типа SENSOR_TYPE_DAYTIME (время действия правила)
 *							:	alg - алгоритм этого условия для предшествующего результата (И или ИЛИ)
 *							:	syncid - ID устройства "набор датчиков", по времени которого следует ориентироваться.
 *							:	time_variant - как интерпретировать значение: как точное время суток ("exact") или интервал ("interval")
 *							:	time_beg - значение для начала действия правила
 *							:	time_end - значение для завершения действия правила
 *							:			(используется только если установлено огданичение действия правила по дате)
 *							:	state - в какое состояние следует перевести электроприбор, если условие выполняется ("on"/"off")
 *
 *					return	:	созданный либо дополненный объект "условия" (conditions)
 *
 *
 *	т.к. условия обрабатываются последовательно, это необходимо учитывать создавая набор условий.
 *	Поэтому, время действия, вероятно, вы захотите добавить в первую очередь. Пожалуйста, не забывайте об этом.
 *
=====================================================================================================
 */
function add_rule_time (conditions, alg, syncid, time_variant, time_beg, time_end, state)
{
	if (!conditions || typeof conditions != 'object') {
		conditions = [];
	}

	if (!syncid || typeof syncid != 'object' || syncid.length != 8) {
		console.log("add_rule_time: invalid syncid");
		return conditions;
	}

	if (time_beg != null && time_end != null) {
		var t = {};
		switch (state) {
		case "on": t.flags = OUTLET_RULE_FLAG_ON; break;
		case "off": t.flags = OUTLET_RULE_FLAG_OFF; break;
		default: console.log("add_rule_time: ERROR: state is unknown");
			return conditions;
		}
		if (alg == null) {
			console.log("set priority flag as the default flag element");
			alg = "prio";
		}
		switch (alg) {
		case "and": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_AND; break;
		case "or": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_OR; break;
		case "prio": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO; break;
		default: console.log("add_rule_time: ERROR: ALGORITHM \"ON\" is unknown");
			return conditions;
		}
		switch (time_variant) {
		case "exact": t.flags |= OUTLET_RULE_FLAG_TIME_EXACT; break;
		case "interval": t.flags |= OUTLET_RULE_FLAG_TIME_INTERVAL; break;
		default: console.log("add_rule_time: ERROR: time ON variant is unknown");
			return conditions;
		}
		t.type = SENSOR_TYPE_DAYTIME;
		t.sensor_id = syncid;
		t.val_beg = parseInt(time_beg);
		t.val_end = parseInt(time_end);

		conditions[conditions.length] = t;
	}
	else {
		console.log("add_rule_time: ERROR: time_begin and time_end must be defined");
	}
	return conditions;
}


/**
=====================================================================================================
 *
 *			add_rule_logic	:	Функция добавляет условие для реакции на показания логического датчика.
 *
 *				parameters	:	conditions - "набор условий", к которому следует добавить условие (по логическому датчику)
 *							:	alg - алгоритм обработки условия по отношению к предыдущему результату.
 *							:	sensor_type - должен быть SENSOR_TYPE_ONOFF (планируется поддержка SENSOR_TYPE_ONOFF_CHANGED)
 *							:	sensor_id - ID устройства "набор датчиков", по показаниям которого следует ориентироваться.
 *							:	sensor_value - значение, которое должно быть в метрике по данному пину (1 или 0) для срабатывания условия.
 *							:	pin - номер ID логического датчика (минимальный == 0, максимальный == SUPPORTED_MCP23017_SENSORS).
 *							:	state - состояние электроприбора, если условие верно.
 *
 *					return	:	объект "набор условий" (conditions)
 *
=====================================================================================================
 */
function add_rule_logic (conditions, alg, sensor_type, sensor_id, sensor_value, pin, state)
{
	if (!conditions || typeof conditions != 'object') {
		conditions = [];
	}

	if (!sensor_id || typeof sensor_id != 'object' || sensor_id.length != 8) {
		console.log("add_rule_logic: invalid sensor_id");
		return conditions;
	}

	if ((sensor_type & SENSOR_TYPE_MASK) > SENSOR_TYPE_MAX) {
		console.log("add_rule_logic: ERROR: invalid sensor type");
		return conditions;
	}

	var t = {};
	if (state == OUTLET_RULE_FLAG_ON) t.flags = OUTLET_RULE_FLAG_ON;
	else if (state == OUTLET_RULE_FLAG_OFF) t.flags = OUTLET_RULE_FLAG_OFF;
	else {
		console.log("add_rule_logic: Nothing to do (ON/OFF)");
		return conditions;
	}

	if (conditions.length == 0) {
		console.log("add_rule_logic: set priority flag as the first element");
		alg = "prio";
	}

	switch (alg) {
	case "and": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_AND; break;
	case "or": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_OR; break;
	case "prio": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO; break;
	default: console.log("add_rule_logic: ERROR: ALGORITHM is unknown");
		return conditions;
	}

	switch (sensor_value) {
	case "-1": /* nothing (type is set) */ break;
	case "off": t.flags |= OUTLET_RULE_FLAG_ONOFF_OFF; break;
	case "on": t.flags |= OUTLET_RULE_FLAG_ONOFF_ON; break;
	default: console.log("add_rule_logic: ERROR: value is unknown");
		return conditions;
	}

	t.val_beg = parseInt(1 << pin);
	t.val_end = 0; // logic cannot change state during time
	t.type = parseInt(sensor_type);
	t.sensor_id = sensor_id;

	conditions[conditions.length] = t;

	return conditions;
}




/**
=====================================================================================================
 *
 *			add_rule_sensor	:	Функция добавляет условие для реакции на показания любого датчика.
 *
 *				parameters	:	conditions - "набор условий", к которому следует добавить условие.
 *							:	alg - алгоритм обработки условия по отношению к предыдущему результату.
 *							:	sensor_type - тип датчика (один из перечисленных в заголовке SENSOR_TYPE_XXX)
 *							:	sensor_id - ID устройства "набор датчиков", по показаниям которого следует ориентироваться.
 *							:	sval_beg - показания датчика для срабатывания условия (в начале периода действия правила).
 *							:	sval_end - показания датчика для срабатывания условия (в конце периода действия правила).
 *							:			(используется только если установлено ограничение действия правила по дате)
 *							:	state - состояние электроприбора, если условие верно.
 *							:	s_vect - вектор отклонения от показания датчика при котором условие верно (более "up"/менее "down").
 *
 *					return	:	объект "набор условий" (conditions)
 *
=====================================================================================================
 */
function add_rule_sensor (conditions, alg, sensor_type, sensor_id, sval_beg, sval_end, state, s_vect)
{
	if (!conditions || typeof conditions != 'object') {
		conditions = [];
	}

	if (!sensor_id || typeof sensor_id != 'object' || sensor_id.length != 8) {
		console.log("add_rule_sensor: invalid sensor_id");
		return conditions;
	}

	if ((sensor_type & SENSOR_TYPE_MASK) > SENSOR_TYPE_MAX) {
		console.log("add_rule_sensor: ERROR: invalid sensor type");
		return conditions;
	}


	var t = {};
	switch (state) {
	case "on": t.flags = OUTLET_RULE_FLAG_ON; break;
	case "off": t.flags = OUTLET_RULE_FLAG_OFF; break;
	default: console.log("add_rule_sensor: Nothing to do (ON/OFF)");
		return conditions;
	}

	if (conditions.length == 0) {
		console.log("add_rule_sensor: set priority flag as the first element");
		alg = "prio";
	}

	switch (alg) {
	case "and": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_AND; break;
	case "or": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_OR; break;
	case "prio": t.flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO; break;
	default: console.log("add_rule_sensor: ERROR: ALGORITHM is unknown");
		return conditions;
	}
	if (((sensor_type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF) || ((sensor_type & SENSOR_TYPE_MASK) == SENSOR_TYPE_ONOFF_CHANGED)) {
		// sval_beg MUST BE == (1<<pin);
		t.val_beg = parseInt(sval_beg);
		t.val_end = 0;
	}
	else {
		switch (s_vect) {
		case "up": t.flags |= OUTLET_RULE_FLAG_RISE; break;
		case "down": t.flags |= OUTLET_RULE_FLAG_FALL; break;
		default: console.log("add_rule_sensor: ERROR: ON vector is unknown");
			return conditions;
		}
		t.val_beg = parseFloat(sval_beg);
		t.val_end = parseFloat(sval_end);
	}
	t.type = parseInt(sensor_type);
	t.sensor_id = sensor_id;

	conditions[conditions.length] = t;

	return conditions;
}


/**
=====================================================================================================
 *
 *			set_outlet_rule	:	Функция для заполнения структуры setrule и отправки её через outlet_send_setrule.
 *
 *				parameters	:	outlet_id - ID выхода (электроприбора), для которого следует установить настоящее правило (минимальный ID == 0).
 *							:	rule_id - ID правила. Каким по счёту будет это правило применяться (минимальный ID == 0).
 *							:	doflag - как д.б. изменён набор правил с помощью этого правила ("append","replace","inbefore" или "inafter")
 *							:	alg - алгоритм обработки правила по отношению к предыдущему результату (к предыдущим правилам).
 *							:	rule_date - объект дата для правила (ограничение по дате/дням недели и т.д.).
 *							:	rule_conditions - "набор условий", который будет применяться к показаниям датчиков.
 *							:	callback (outlet_id, status); - функция, которая будет вызвана по получении ответа от устройства.
 *
 *					return	:	если успешно - правило добавляется в соответствующее место в массиве OUTLET.outlet[outlet_id].rule
 *
=====================================================================================================
 */
function set_outlet_rule (outlet_id, rule_id, doflag, alg, rule_date, rule_conditions, callback)
{
	if (!OUTLET || !OUTLET.outlet || OUTLET.outlet.length == 0) {
		console.log("set_outlet_rule: get configuration first !!!");
		if (callback) callback(outlet_id, null);
		return;
	}

	if (typeof rule_conditions != 'object' || rule_conditions.length == 0 || typeof rule_date != 'object') {
		console.log("set_outlet_rule: invalid arguments (date/sensors)");
		if (callback) callback(outlet_id, null);
		return;
	}

	var setrule = {};

	if (typeof outlet_id != 'number' || outlet_id < 0 || OUTLET.outlet.length <= outlet_id || typeof rule_id != 'number' || !doflag) {
		console.log("set_outlet_rule: check arguments: outlet_id/rule_id/doflag");
		if (callback) callback(outlet_id, null);
		return;
	}

	if (rule_id < 0 || rule_id > 100) rule_id = 0;

	switch (doflag) {
	case "inafter": doflag = (OUTLET_RULE_INSERT_AFTER | OUTLET_RULE_INSERT); break;
	case "inbefore": doflag = (OUTLET_RULE_INSERT_BEFORE | OUTLET_RULE_INSERT); break;
	case "replace": doflag = OUTLET_RULE_REPLACE; break;
	case "append":
	default: doflag = OUTLET_RULE_APPEND; break;
	}

	setrule.outlet_id = parseInt(outlet_id);
	setrule.rule_id = parseInt(rule_id);
	setrule.doflag = doflag;

	setrule.rule = {};
	setrule.rule.flags = 0x00000000;
	setrule.rule.condition_count = rule_conditions.length;
	setrule.rule.date = rule_date || {};
	setrule.rule.condition = rule_conditions || [];

	switch (alg) {
	case "and": setrule.rule.flags |= OUTLET_RULE_FLAG_RULE_ALG_AND; break;
	case "or": setrule.rule.flags |= OUTLET_RULE_FLAG_RULE_ALG_OR; break;
	case "prio": setrule.rule.flags |= OUTLET_RULE_FLAG_RULE_ALG_PRIO; break;
	default: console.log("add_rule_sensor: ERROR: ALGORITHM is unknown");
		return;
	}

	outlet_send_setrule(setrule, callback);
}




/**
=====================================================================================================
 *
 *		delete_outlet_rule	:	Функция для удаления соответствующего правила.
 *
 *				parameters	:	outlet_id - ID выхода (электроприбора), для которого следует удалить настоящее правило (минимальный ID == 0).
 *							:	rule_id - ID правила. Какое правило по счёту следует удалить (минимальный ID == 0).
 *							:	callback (outlet_id, status); - функция, которая будет вызвана по получении ответа от устройства..
 *
 *					return	:	если успешно - правило удаляется из соответствующего места в массиве OUTLET.outlet[outlet_id].rule
 *
=====================================================================================================
 */
function delete_outlet_rule (outlet_id, rule_id, callback)
{
	if (typeof outlet_id != 'number' || outlet_id >= OUTLET.length || outlet_id < 0) {
		console.log("delete_outlet_rule: invalid outlet ID");
		if (callback) callback(outlet_id, null);
		return;
	}

	if (typeof rule_id != 'number' || rule_id > OUTLET.outlet[outlet_id].rule.length || rule_id < 0) {
		console.log("delete_outlet_rule: invalid rule ID");
		if (callback) callback(outlet_id, null);
		return;
	}

	send_post(API_REQUEST_OUTLET_DELETE_RULE + "?oid=" + outlet_id.toString() + "&rid=" + rule_id.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				if (OUTLET.outlet[outlet_id].rule && rule_id < OUTLET.outlet[outlet_id].rule.length) {
					OUTLET.outlet[outlet_id].rule[rule_id] = {};
					OUTLET.outlet[outlet_id].rule.splice(rule_id, 1);
				}
				console.log(" delrule OK ");
				break;

			case -1: /* ERROR */
				console.log(" delrule ERROR ");
				break;

			default:
				console.log("unknown status " + (parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}

		if (callback) callback(outlet_id, state);
		return;
	});
}










/*
=================================================================================================
	SENSOR
=================================================================================================
*/




/**
=====================================================================================================
 *
 * 		get_sensor_metric	:	Функция получает показания датчиков с устройства.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в SENSOR.sensor_bcast
 *
=====================================================================================================
 */
function get_sensor_metric (callback)
{
	send_get(API_REQUEST_SENSOR_GET_METRIC, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < 132) {
				console.log("ERROR: sensor metric length "+ response.length.toString());
			}
			else {

				var n = 0;
				var sensor_data = new DataView(response.buffer);

				SENSOR.sensor_bcast = {};

				SENSOR.sensor_bcast.device_id = [];
				for (var c=0; c<8; c++) {
					SENSOR.sensor_bcast.device_id[c] = sensor_data.getUint8(n, true); n++;
				}

				var name = new Uint8Array(response.buffer, n, SENSOR_NAME_SIZE);
				var len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
				name = new Uint8Array(response.buffer, n, len);
				SENSOR.sensor_bcast.name = decodeUtf8(name); n += SENSOR_NAME_SIZE;

				SENSOR.sensor_bcast.sensor_count = sensor_data.getUint32(n, true); n+=4;

/*
======================================================

	typedef union  device_identifier {
		uint8_t u8[8];
		uint16_t u16[4];
		uint32_t u32[2];
	} __attribute__((packed)) device_id_t;

	struct sensor_broadcast {
		device_id_t device_id;					// ID of sensor device
		char sensor_name [SENSOR_NAME_SIZE];	// main name of sensor device
		uint32_t sensor_count;					// count of sensor_metric structures
		struct sensor_metric metric[1];
	} __attribute__((packed));

======================================================
*/

				SENSOR.sensor_bcast.metric = [];

				for (var i=0; i<SENSOR.sensor_bcast.sensor_count; i++) {

					SENSOR.sensor_bcast.metric[i] = {};
					SENSOR.sensor_bcast.metric[i].type = sensor_data.getUint32(n, true); n+=4;

					var stype = (SENSOR.sensor_bcast.metric[i].type & SENSOR_TYPE_MASK);
					if (stype == SENSOR_TYPE_DATE) {
						SENSOR.sensor_bcast.metric[i].value = sensor_data.getUint32(n, true); n+=4;
					}
					else if (stype == SENSOR_TYPE_DAYTIME) {
						SENSOR.sensor_bcast.metric[i].value = sensor_data.getUint32(n, true); n+=4;
					}
					else if (stype == SENSOR_TYPE_ONOFF || stype == SENSOR_TYPE_ONOFF_CHANGED) {
						SENSOR.sensor_bcast.metric[i].value = sensor_data.getUint32(n, true); n+=4;
					}
					else if (stype == SENSOR_TYPE_RAW) {
						SENSOR.sensor_bcast.metric[i].value = sensor_data.getFloat32(n, true); n+=4;
					}
					else {
						SENSOR.sensor_bcast.metric[i].value = sensor_data.getFloat32(n, true); n+=4;
					}
				}

				state = 0;
			}
		}

		if (callback) callback(state);
		return;
	});
}


/**
=====================================================================================================
 *
 * 		get_sensor_config	:	Функция получает настройки набора датчиков устройства.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в SENSOR
 *
=====================================================================================================
 */
function get_sensor_config (callback)
{
	send_get(API_REQUEST_SENSOR_GET_CONFIG, null, null, function (xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < SENSOR_ADC_PINS_MAX*SENSOR_NAME_SIZE + SENSOR_LOGIC_PINS_MAX*SENSOR_NAME_SIZE) {
				console.log("get sensor config: invalid config length");
			}
			else {

/*
======================================================


struct sensor_device {
	device_id_t device_id;
	uint8_t sensor_name [SENSOR_NAME_SIZE];
	uint32_t flags;
	int32_t altitude;


	struct stm32_config {
		uint16_t sensor_count;
		uint16_t logic_count;
		uint8_t  adc_pin_count;
		uint8_t  aux_pin_count;
	#define STM32_I2C_ADDRESS_1	((uint16_t)0x48)
	#define STM32_I2C_ADDRESS_2	((uint16_t)0x49)
		uint16_t i2c_address;

	#define STM32_FLAG_SENSORS_ON					0x10000000
	#define STM32_FLAG_SENSORS_RESET				0x20000000
	#define STM32_FLAG_SENSORS_READY				0x00000001
	#define STM32_FLAG_DEFAULT_CONFIGURATION_APPLY	0x00000002
		uint32_t flags;


		struct datetime {
			uint32_t utc;	// универсальное время UNIX; количество секунд с 1 января 1970 года
			int32_t tz;		// часовой пояс; MSK (Московское время) == -180 (разница между местным и UTC - временем в минутах)
		} __attribute__((packed)); date


		uint32_t meas_interval;
		int32_t  altitude;

		struct adc_sensor_conf {
			uint32_t flags;				// enabled or not
			uint32_t type;				// sensor type: SENSOR_TYPE_TEMP etc.
			uint32_t resistor_down;		// pull DOWN resistor (if exists)
			uint32_t resistor_up;		// pull UP resistor (if exists)
			uint8_t  adc_sampletime;	// measurement sampletime
			uint8_t  meas_count;		// measurement count

			uint8_t  aux_pin [ADC_AUX_PIN_COUNT_MAX];		// auxillary pin numbers (maximum == ADC_AUX_PIN_COUNT_MAX)
			uint8_t  temp_compensate_adc_pin;				// temperature compensation (adc pin +1); zero means no compensation pin
			int16_t  phase_cnt;								// init by -1 !!!; 
			uint16_t phase_val [ADC_MEASUREMENT_COUNT_MAX];	// average value after each phase

			struct adc_calibr {
				uint16_t adc_val;
				float val;
			} _attribute__((packed)); cal [ADC_CALIBRATION_COUNT];


			union {

				struct adc_ec_conf {
					double   pin_distance;			// pin distance in cantimeters (cm)
					uint8_t  _reserved[7];			// RESERVED for future used
					uint8_t  ph_compensate_adc_pin;	// adc pin where PH sensor is
					uint16_t ppm_conv_factor;		// PPM conversion factor
				} __attribute__((packed)); ec;

			} __attribute__((packed)) ex;


		} __attribute__((packed)); adc [SUPPORTED_ADC_PINS];


		struct mcp23017_conf {
		#define MCP23017_PIN_ENABLED_MASK	0xFFFF0000
			uint32_t flags;
			uint16_t state;
		} __attribute__((packed)); logic [SUPPORTED_MCP23017_SENSORS/16];


	} __attribute__((packed)); stm32;


	char adc_names [SUPPORTED_ADC_PINS][SENSOR_NAME_SIZE];
	char mcp23017_names [SUPPORTED_MCP23017_SENSORS][SENSOR_NAME_SIZE];
	char digital_names [SENSOR_DIGITAL_MAX][SENSOR_NAME_SIZE];

} __attribute__((packed));


======================================================
*/
				var n = 0;
				var sensor_config = new DataView(response.buffer);

				if (!SENSOR) SENSOR = {};

				SENSOR.device_id = [];
				for (var c=0; c<8; c++) {
					SENSOR.device_id[c] = sensor_config.getUint8(n, true); n++;
				}

				var name = new Uint8Array(response.buffer, 8, SENSOR_NAME_SIZE);
				var len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
				name = new Uint8Array(response.buffer, 8, len);
				SENSOR.name = decodeUtf8(name); n += SENSOR_NAME_SIZE;

				SENSOR.flags = sensor_config.getInt32(n, true); n += 4;

				SENSOR.altitude = sensor_config.getInt32(n, true); n += 4;

				// stm32_config
				SENSOR.stm32 = {};
				SENSOR.stm32.sensor_count = sensor_config.getUint16(n, true); n += 2;
				SENSOR.stm32.logic_count = sensor_config.getUint16(n, true); n += 2;
				SENSOR.stm32.adc_pin_count = sensor_config.getUint8(n, true); n += 1;
				SENSOR.stm32.aux_pin_count = sensor_config.getUint8(n, true); n += 1;
				SENSOR.stm32.i2c_address = sensor_config.getUint16(n, true); n += 2;
				SENSOR.stm32.flags = sensor_config.getUint32(n, true); n += 4;

				SENSOR.stm32.datetime = {};
				SENSOR.stm32.datetime.utc = sensor_config.getUint32(n, true); n += 4;
				SENSOR.stm32.datetime.tz = sensor_config.getUint32(n, true); n += 4;

				SENSOR.stm32.meas_interval = sensor_config.getUint32(n, true); n += 4;
				SENSOR.stm32.altitude = sensor_config.getInt32(n, true); n += 4;


				// stm32_config.adc_sensor_conf[]
				SENSOR.stm32.adc = [];

				for (var i=0; i<SENSOR_ADC_PINS_MAX; i++) {
					SENSOR.stm32.adc[i] = {};
					SENSOR.stm32.adc[i].flags = sensor_config.getUint32(n, true); n += 4;
					SENSOR.stm32.adc[i].type = sensor_config.getUint32(n, true); n += 4;
					SENSOR.stm32.adc[i].resistor_down = sensor_config.getUint32(n, true); n += 4;
					SENSOR.stm32.adc[i].resistor_up = sensor_config.getUint32(n, true); n += 4;
					SENSOR.stm32.adc[i].sampletime = sensor_config.getUint8(n, true); n += 1;
					SENSOR.stm32.adc[i].meas_count = sensor_config.getUint8(n, true); n += 1;
					SENSOR.stm32.adc[i].aux_pin = [];
					for (var apn=0; apn<ADC_AUX_PIN_COUNT_MAX; apn++) {
						SENSOR.stm32.adc[i].aux_pin[apn] = sensor_config.getUint8(n, true); n += 1;
					}
					SENSOR.stm32.adc[i].temp_compensate_adc_pin = sensor_config.getUint8(n, true); n += 1;
					SENSOR.stm32.adc[i].phase_cnt = sensor_config.getInt16(n, true); n += 2;
					SENSOR.stm32.adc[i].phase_val = [];
					for (var pvn=0; pvn<ADC_MEASUREMENT_COUNT_MAX; pvn++) {
						SENSOR.stm32.adc[i].phase_val[pvn] = sensor_config.getUint16(n, true); n += 2;
					}

					// calibration data
					SENSOR.stm32.adc[i].cal = [];
					for (var acal=0; acal<ADC_CALIBRATION_COUNT; acal++) {
						SENSOR.stm32.adc[i].cal[acal] = {};
						SENSOR.stm32.adc[i].cal[acal].adc_val = sensor_config.getUint16(n, true); n += 2;
						SENSOR.stm32.adc[i].cal[acal].val = sensor_config.getFloat32(n, true); n += 4;
					}

					SENSOR.stm32.adc[i].ex = {};
					if ((SENSOR.stm32.adc[i].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_EC) {
						SENSOR.stm32.adc[i].ex.ec = {};
						SENSOR.stm32.adc[i].ex.ec.pin_distance = (sensor_config.getFloat64(n, true)); n += 8; // convert to mm
						n += 7; // reserved
						SENSOR.stm32.adc[i].ex.ec.ph_compensate_pin = sensor_config.getUint8(n, true); n += 1;
						SENSOR.stm32.adc[i].ex.ec.ppm_conv_factor = sensor_config.getUint16(n, true); n += 2;
					}
					else {
						// skip union EX
						n += (8 + 8 + 2);
					}
				}

				// stm32_config.mcp23017_conf
				SENSOR.stm32.logic = [];
				for (var logic=0; logic<SENSOR_LOGIC_PINS_MAX/16; logic++) {
					SENSOR.stm32.logic[logic] = {};
					SENSOR.stm32.logic[logic].flags = sensor_config.getUint32(n, true); n += 4;
					SENSOR.stm32.logic[logic].state = sensor_config.getUint16(n, true); n += 2;
				}

				// ADC names
				SENSOR.adc_names = [];
				for (var aname=0; aname<SENSOR_ADC_PINS_MAX; aname++) {
					name = new Uint8Array(response.buffer, n, SENSOR_NAME_SIZE);
					len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
					name = new Uint8Array(response.buffer, n, len);
					SENSOR.adc_names[aname] = decodeUtf8(name); n += SENSOR_NAME_SIZE;
				}

				// MCP23017 names
				SENSOR.logic_names = [];
				for (var lname=0; lname<SENSOR_LOGIC_PINS_MAX; lname++) {
					name = new Uint8Array(response.buffer, n, SENSOR_NAME_SIZE);
					len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
					name = new Uint8Array(response.buffer, n, len);
					SENSOR.logic_names[lname] = decodeUtf8(name); n += SENSOR_NAME_SIZE;
				}

				// DIGITAL names
				SENSOR.digital_names = [];
				for (var dname=0; dname<SENSOR_DIGITAL_MAX; dname++) {
					name = new Uint8Array(response.buffer, n, SENSOR_NAME_SIZE);
					len = 0; while (len<SENSOR_NAME_SIZE && name[len]!=0) len++;
					name = new Uint8Array(response.buffer, n, len);
					SENSOR.digital_names[dname] = decodeUtf8(name); n += SENSOR_NAME_SIZE;
				}

				state = 0;
			}
		}
		else {
			console.log(" no response on get sensor config command");
		}

		if (callback) callback(state);
		return;
	});
}


/**
=====================================================================================================
 *
 *		set_sensor_altitude	:	Функция устанавливает настоящую высоту над уровнем моря.
 *
 *				parameters	:	altitude - высота над уровнем моря, которую следует установить.
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата.
 *
 *					return	:	Результат сохраняется в SENSOR.altitude
 *
=====================================================================================================
 */
function set_sensor_altitude (altitude, callback)
{
	if (typeof altitude != 'number') {
		if (callback) callback(null);
		return;
	}

	send_post(API_REQUEST_SENSOR_SET_ALTITUDE + "?val=" + altitude.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				console.log(" setaltitude OK ");
				SENSOR.altitude = altitude;
				break;

			case -1: /* ERROR */
				console.log(" setaltitude ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setaltitude ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *		sensor_workstart	:	Функция включает блок "набор датчиков" в устройстве.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function sensor_workstart (callback)
{
	send_post(API_REQUEST_SENSOR_WORK_START, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				console.log(" sensor start OK ");
				break;

			case -1: /* ERROR */
				console.log(" sensor start ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on sensor start ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *			sensor_workstop	:	Функция выключает блок "набор датчиков" в устройстве.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function sensor_workstop (callback)
{
	send_post(API_REQUEST_SENSOR_WORK_STOP, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				console.log(" sensor stop OK ");
				break;

			case -1: /* ERROR */
				console.log(" sensor stop ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on sensor stop ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *		set_sensor_config	:	Функция устанавливает настройки "набора датчиков" устройства целиком.
 *
 *				parameters	:	config - Новая структура (копия) SENSOR, которая будет помещена в SENSOR в случае успеха.
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха config сохраняется в SENSOR
 *
=====================================================================================================
 */
function set_sensor_config (config, callback)
{
		if (!config) {
			console.log("set_sensor_config: zero config length");
			if (callback) callback(-1);
			return;
		}


		var sensor_config = new ArrayBuffer(SENSOR_CONFIG_LENGTH);
		var senscfg = new DataView(sensor_config);
		var n = 0;

		for (var c=0; c<8; c++) {
			senscfg.setUint8(n, config.device_id[c]); n++;
		}

		string_to_buffer(senscfg, n, SENSOR_NAME_SIZE, config.sensor_name); n += SENSOR_NAME_SIZE;

		senscfg.setInt32(n, config.flags, true); n += 4;

		senscfg.setInt32(n, config.altitude, true); n += 4;

		// stm32_config
		senscfg.setUint16(n, config.stm32.sensor_count, true); n += 2;
		senscfg.setUint16(n, config.stm32.logic_count, true); n += 2;
		senscfg.setUint8(n, config.stm32.adc_pin_count, true); n += 1;
		senscfg.setUint8(n, config.stm32.aux_pin_count, true); n += 1;
		senscfg.setUint16(n, config.stm32.i2c_address, true); n += 2;

		senscfg.setUint32(n, config.stm32.flags, true); n += 4;
		senscfg.setUint32(n, config.stm32.datetime.utc, true); n += 4;
		senscfg.setUint32(n, config.stm32.datetime.tz, true); n += 4;
		senscfg.setUint32(n, config.stm32.meas_interval, true); n += 4;
		senscfg.setInt32(n, config.stm32.altitude, true); n += 4;

		// stm32_config.adc_sensor_conf[]
		for (var i=0; i<config.stm32.adc_pin_count; i++) {

			senscfg.setUint32(n, config.stm32.adc[i].flags, true); n += 4;
			senscfg.setUint32(n, config.stm32.adc[i].type, true); n += 4;
			senscfg.setUint32(n, config.stm32.adc[i].resistor_down, true); n += 4;
			senscfg.setUint32(n, config.stm32.adc[i].resistor_up, true); n += 4;
			senscfg.setUint8(n, config.stm32.adc[i].sampletime, true); n += 1;
			senscfg.setUint8(n, config.stm32.adc[i].meas_count, true); n += 1;

			for (var apn=0; apn<ADC_AUX_PIN_COUNT_MAX; apn++) {
				senscfg.setUint8(n, config.stm32.adc[i].aux_pin[apn], true); n += 1;
			}
			senscfg.setUint8(n, config.stm32.adc[i].temp_compensate_adc_pin, true); n += 1;
			senscfg.setInt16(n, config.stm32.adc[i].phase_cnt, true); n += 2;
			for (var pvn=0; pvn<ADC_MEASUREMENT_COUNT_MAX; pvn++) {
				senscfg.setUint16(n, config.stm32.adc[i].phase_val[pvn], true); n += 2;
			}

			// calibration data
			for (var acal=0; acal<ADC_CALIBRATION_COUNT; acal++) {
				senscfg.setUint16(n, config.stm32.adc[i].cal[acal].adc_val, true); n += 2;
				senscfg.setFloat32(n, config.stm32.adc[i].cal[acal].val, true); n += 4;
			}


			if ((config.stm32.adc[i].type & SENSOR_TYPE_MASK) == SENSOR_TYPE_EC && config.stm32.adc[i].ex && config.stm32.adc[i].ex.ec) {
				senscfg.setFloat64(n, (config.stm32.adc[i].ex.ec.pin_distance / 10), true); n += 8; // convert to mm
				n += 7; // reserved
				senscfg.setUint8(n, config.stm32.adc[i].ex.ec.ph_compensate_pin, true); n += 1;
				senscfg.setUint16(n, config.stm32.adc[i].ex.ec.ppm_conv_factor, true); n += 2;
			}
			else {
				// skip union EX
				n += (8 + 8 + 2);
			}
		}

		// stm32_config.mcp23017_conf
		for (var logic=0; logic<parseInt((SENSOR_LOGIC_PINS_MAX+15)/16); logic++) {
			senscfg.setUint32(n, config.stm32.logic[logic].flags, true); n += 4;
			senscfg.setUint16(n, config.stm32.logic[logic].state, true); n += 2;
		}

		// ADC names
		for (var aname=0; aname<SENSOR_ADC_PINS_MAX; aname++) {
			string_to_buffer(senscfg, n, SENSOR_NAME_SIZE, config.adc_names[aname]);
			n += SENSOR_NAME_SIZE;
		}

		// MCP23017 names
		for (var lname=0; lname<((SENSOR_LOGIC_PINS_MAX+15)/16); lname++) {
			string_to_buffer(senscfg, n, SENSOR_NAME_SIZE, config.logic_names[lname]);
			n += SENSOR_NAME_SIZE;
		}

		// DIGITAL names
		for (var dname=0; dname<SENSOR_DIGITAL_MAX; dname++) {
			string_to_buffer(senscfg, n, SENSOR_NAME_SIZE, config.digital_names[dname]);
			n += SENSOR_NAME_SIZE;
		}


		send_post(API_REQUEST_SENSOR_SET_CONFIG, sensor_config, null, function(xreq) {

			var state = null;

			if (xreq.response) {

				var response = new Int32Array(xreq.response);

				switch (response[0]) {

				case 0: /* OK */
					SENSOR = config;
					console.log(" sensor setconfig OK ");
					break;

				case -1: /* ERROR */
					console.log(" sensor setconfig ERROR ");
					break;

				default:
					console.log(" unknown sensor setconfig status: "+response[0].toString());
					break;
				}

				state = parseInt(response[0]);
			}
			else {
				console.log(" no response on sensor setconfig command");
			}

			
			if (callback) callback(state);
			return;
		});

	return;
}


/**
=====================================================================================================
 *
 *		set_adc_sensor_name	:	Функция устанавливает название для аналогового входа.
 *
 *				parameters	:	id - начальный номер (ID) аналогового входа. Минимальный ID == 0.
 *							:	name - название, которое следует присвоить входу.
 *							:	callback (status) - функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха название сохраняется в SENSOR.adc_names[id]
 *
=====================================================================================================
 */
function set_adc_sensor_name (pin, name, callback)
{
//console.log("set_adc_sensor_name :"+pin+" "+name); callback(pin, 0); return;
	if (typeof pin != 'number' || pin < 0 || pin > SENSOR_ADC_PINS_MAX) {
		console.log("** set_adc_sensor_name error: pin is invalid");
		if (callback) callback(adc_pin, -1);
		return;
	}

	if (typeof name != 'string') {
		console.log("** set_adc_sensor_name error: name is invalid");
		if (callback) callback(adc_pin, -1);
		return;
	}

	var buff = new Uint8Array(SENSOR_NAME_SIZE);
	var setname = new DataView(buff.buffer);

	string_to_buffer(setname, 0, SENSOR_NAME_SIZE, name);

	send_post(API_REQUEST_SENSOR_SET_ADC_NAME + "?pin=" + pin.toString(), buff, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				console.log(" setadcname OK ");
				SENSOR.adc_names[pin] = name;
				break;

			case -1: /* ERROR */
				console.log(" setadcname ERROR ");
				break;

			default:
				console.log(" unknown setadcname status: "+response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setadcname command");
		}

		if (callback) callback(pin, state);
	});
}

/**
=====================================================================================================
 *
 *				set_adc_pin	:	Функция устанавливает настройки конкретного аналогового входа для подключения датчика.
 *
 *				parameters	:	adc_pin - номер ID аналогового входа для датчика (от 0 до SENSOR.stm32.adc_pin_count).
 *							:	sensor_type - тип датчика для правильной интерпретации показаний АЦП (e.g. SENSOR_TYPE_TEMP)
 *							:	temp_compensate_adc_pin - номер ID аналогового входа (от 0 до SENSOR.stm32.adc_pin_count),
 *							:	                        на котором подключен температурный датчик,
 *							:							по показаниям которого будет производиться температурная компенсация.
 *							:	state - true/false - датчик подключен (собираем показания) или нет соотв.
 *							:	ppm_conv_factor - фактор конверсии для вычисления PPM/TDS (имеет значение только для датчика EC)
 *							:	pin_distance - расстояние между щупами датчика EC для вычисления siemens/cm (имеет значение только для датчика EC)
 *							:	callback (adc_pin, status) - функция, которая будет вызвана по получении результата;
 *
 *					return	:	В случае успеха заполняется SENSOR.stm32.adc[adc_pin]
 *
=====================================================================================================
 */
function set_adc_pin (adc_pin, sensor_type, temp_compensate_adc_pin, state, ppm_conv_factor, pin_distance, callback)
{
	if (typeof adc_pin != 'number' || adc_pin < 0 || adc_pin > SENSOR_ADC_PINS_MAX) {
		console.log("** error: adc_pin is invalid");
		if (callback) callback(adc_pin, -1);
		return;
	}

	if (typeof state != 'boolean') {
		console.log("** error: invalid state");
		if (callback) callback(adc_pin, -1);
		return;
	}

	sensor_type = parseInt(sensor_type);
	temp_compensate_adc_pin = parseInt(temp_compensate_adc_pin);
	pin_distance = parseInt(pin_distance);
	ppm_conv_factor = parseInt(ppm_conv_factor);

	if (typeof sensor_type != 'number' || sensor_type < 0 || sensor_type > SENSOR_TYPE_MAX) {
		sensor_type = SENSOR.stm32.adc[adc_pin].sensor_type;
	}

	if (typeof temp_compensate_adc_pin != 'number' || temp_compensate_adc_pin < 0 || temp_compensate_adc_pin > SENSOR_ADC_PINS_MAX) {
		temp_compensate_adc_pin = SENSOR.stm32.adc[adc_pin].temp_compensate_adc_pin;
	}


	var url = API_REQUEST_SENSOR_SET_ADC_PIN + "?pin=" + adc_pin.toString();
	if (state >= 0) {
		url += "&state="+((state > 0)? "1" : "0").toString();
	}

	var adc_conf = new ArrayBuffer(SENSOR_ADC_CONFIG_LENGTH);
	var adc = new DataView(adc_conf);
	var n = 0;

	var resistor_down = (SENSOR.stm32.adc[adc_pin].resistor_down)? SENSOR.stm32.adc[adc_pin].resistor_down : 0xffffffff;
	var resistor_up = (SENSOR.stm32.adc[adc_pin].resistor_up)? SENSOR.stm32.adc[adc_pin].resistor_up : 0xffffffff;
	var flags = SENSOR.stm32.adc[adc_pin].flags;

	adc.setUint32(n, 		flags, true); n += 4;
	adc.setUint32(n, 		sensor_type, true); n += 4;
	adc.setUint32(n, 		resistor_down, true); n += 4;
	adc.setUint32(n, 		resistor_up, true); n += 4;
	adc.setUint8(n, 		SENSOR.stm32.adc[adc_pin].sampletime, true); n += 1;
	adc.setUint8(n, 		SENSOR.stm32.adc[adc_pin].meas_count, true); n += 1;

	for (var apn=0; apn<ADC_AUX_PIN_COUNT_MAX; apn++) {
		if (apn === 0) {
			adc.setUint8(n, adc_pin, true);
		}
		else {
			adc.setUint8(n, SENSOR.stm32.adc[adc_pin].aux_pin[apn], true);
		}
		n += 1;
	}

	adc.setUint8(n,			temp_compensate_adc_pin, true); n += 1;
	adc.setInt16(n,			SENSOR.stm32.adc[adc_pin].phase_cnt, true); n += 2;

	for (var pvn=0; pvn<ADC_MEASUREMENT_COUNT_MAX; pvn++) {
		adc.setUint16(n,	SENSOR.stm32.adc[adc_pin].phase_val[pvn], true); n += 2;
	}

	// calibration data
	for (var acal=0; acal<ADC_CALIBRATION_COUNT; acal++) {
		adc.setUint16(n,	SENSOR.stm32.adc[adc_pin].cal[acal].adc_val, true); n += 2;
		adc.setFloat32(n,	SENSOR.stm32.adc[adc_pin].cal[acal].val, true); n += 4;
	}

	if ((sensor_type & SENSOR_TYPE_MASK) == SENSOR_TYPE_EC) {
		if (!SENSOR.stm32.adc[adc_pin].ex) SENSOR.stm32.adc[adc_pin].ex = {};
		if (!SENSOR.stm32.adc[adc_pin].ex.ec) SENSOR.stm32.adc[adc_pin].ex.ec = {};

		if (typeof ppm_conv_factor != 'number' || ppm_conv_factor < 0) {
			ppm_conv_factor = SENSOR.stm32.adc[adc_pin].ex.ec.ppm_conv_factor;
		}

		if (typeof pin_distance != 'number' || pin_distance < 0) {
			pin_distance = SENSOR.stm32.adc[adc_pin].ex.ec.pin_distance * 10;
		}

		adc.setFloat64(n,	parseFloat(pin_distance / 10), true); n += 8; // convert to mm
		n += 7; // reserved
		adc.setUint8(n,		SENSOR.stm32.adc[adc_pin].ex.ec.ph_compensate_pin, true); n += 1;
		adc.setUint16(n,	ppm_conv_factor, true); n += 2;
	}
	else {
		// skip union EX
		n += (8 + 8 + 2);
	}


	send_post(url, adc_conf, null, function (xreq) {

		var s = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

/*
======================================================

	struct adc_ec_conf {
		double   pin_distance;			// pin distance in cantimeters (cm)
		uint8_t  _reserved[7];			// RESERVED for future used
		uint8_t  ph_compensate_adc_pin;	// adc pin where PH sensor is
		uint16_t ppm_conv_factor;		// PPM conversion factor
	} __attribute__((packed));

	struct adc_calibr {
		uint16_t adc_val;
		float val;
	} __attribute__((packed));

	struct adc_sensor_conf {
		uint32_t flags;				// enabled or not
		uint32_t type;				// sensor type: SENSOR_TYPE_TEMP etc.
		uint32_t resistor_down;		// pull DOWN resistor (if exists)
		uint32_t resistor_up;		// pull UP resistor (if exists)
		uint8_t  adc_sampletime;	// measurement sampletime
		uint8_t  meas_count;		// measurement count

		uint8_t  aux_pin [ADC_AUX_PIN_COUNT_MAX];		// auxillary pin numbers (maximum == ADC_AUX_PIN_COUNT_MAX)
		uint8_t  temp_compensate_adc_pin;				// temperature compensation (adc pin +1); zero means no compensation pin
		int16_t  phase_cnt;								// init by -1 !!!; 
		uint16_t phase_val [ADC_MEASUREMENT_COUNT_MAX];	// average value after each phase
		struct adc_calibr cal [ADC_CALIBRATION_COUNT];

		union {
			struct adc_ec_conf ec;
		} __attribute__((packed)) ex;
	} __attribute__((packed));

======================================================
*/

			switch (response[0]) {

			case 0: /* OK */
				if (state == 0) {
					SENSOR.stm32.adc[adc_pin].state = 0;
					SENSOR.stm32.adc[adc_pin].type = SENSOR_TYPE_NULL;
					SENSOR.stm32.adc[adc_pin].temp_compensate_adc_pin = 0;

					if (!SENSOR.stm32.adc[adc_pin].ex) SENSOR.stm32.adc[adc_pin].ex = {};
					if (!SENSOR.stm32.adc[adc_pin].ex.ec) SENSOR.stm32.adc[adc_pin].ex.ec = {};
					SENSOR.stm32.adc[adc_pin].ex.ec.ppm_conv_factor = 0;
					SENSOR.stm32.adc[adc_pin].ex.ec.pin_distance = 0;
				}
				else {
					SENSOR.stm32.adc[adc_pin].state = state;
					SENSOR.stm32.adc[adc_pin].type = sensor_type;
					SENSOR.stm32.adc[adc_pin].temp_compensate_adc_pin = temp_compensate_adc_pin;

					if (!SENSOR.stm32.adc[adc_pin].ex) SENSOR.stm32.adc[adc_pin].ex = {};
					if (!SENSOR.stm32.adc[adc_pin].ex.ec) SENSOR.stm32.adc[adc_pin].ex.ec = {};
					SENSOR.stm32.adc[adc_pin].ex.ec.ppm_conv_factor = ppm_conv_factor;
					SENSOR.stm32.adc[adc_pin].ex.ec.pin_distance = parseFloat(pin_distance / 10);
				}
				console.log(" set adc pin OK ");
				break;

			case -1: /* ERROR */
				console.log(" set adc pin ERROR ");
				break;

			default:
				console.log(" unknown set adc pin status: "+response[0].toString());
				break;
			}

			s = parseInt(response[0]);
		}
		else {
			console.log(" no response on setadcpin command");
		}

		if (callback) callback(adc_pin, s);
	});
}


/**
=====================================================================================================
 *
 *	set_digital_sensor_name	:	Функция устанавливает имя для цифрового датчика (модуля с датчиками).
 *
 *				parameters	:	id - идеттификатор цифрового набора/одного датчика. Минимальный ID == 0
 *							:	name - название, которое необходимо присвоить этому датчику.
 *							:	callback(status); - функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха название сохраняется в SENSOR.digital_names[id]
 *
=====================================================================================================
 */
function set_digital_sensor_name (id, name, callback)
{
	if (typeof id != 'number' || id < 0) {
		console.log("set_digital_sensor_name error: invalid digital id");
		if (callback) callback(-1);
		return;
	}

	var buff = new Uint8Array(SENSOR_NAME_SIZE);
	var setname = new DataView(buff.buffer);

	string_to_buffer(setname, 0, SENSOR_NAME_SIZE, name);

	send_post(API_REQUEST_SENSOR_SET_DIGITAL_NAME + "?id=" + id.toString(), buff, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				console.log(" setdigitalname OK ");
				SENSOR.digital_names[id] = name;
				break;

			case -1: /* ERROR */
				console.log(" setdigitalname ERROR ");
				break;

			default:
				console.log(" unknown setdigitalname status: "+response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setdigitalname command");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *			set_logic_pin	:	Функция устанавливает включает и/или присваивает название логическому датчику.
 *
 *				parameters	:	pin - номер логического датчика. Минимальный pin == 0
 *							:	name - название, которое следует присвоить датчику.
 *							:	enabled - включить (обращать внимание на его состояние в метрике) или выключить.
 *							:	callback (pin, status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха enabled сохраняется в SENSOR.stm32.logic[pin], а name - в SENSOR.logic_names[pin]
 *
=====================================================================================================
 */
function set_logic_pin (pin, name, enabled, callback)
{
	if (typeof pin != 'number' || parseInt(pin) < 0 || parseInt(pin) > SENSOR_LOGIC_PINS_MAX) {
		console.log("set logic pin invalid argument pin");
		if (callback) callback(pin, -1);
		return;
	}

	if (typeof enabled != 'boolean') {
		console.log("set logic pin invalid argument enabled");
		if (callback) callback(pin, -1);
		return;
	}

	var url = API_REQUEST_SENSOR_SET_LOGIC_PIN + "?pin=" + pin.toString() + "&enabled=" + ((enabled)? "1" : "0");

	var buff = null;

	if (typeof name == 'string') {
		buff = new Uint8Array(SENSOR_NAME_SIZE);
		var setname = new DataView(buff.buffer);

		string_to_buffer(setname, 0, SENSOR_NAME_SIZE, name);
		console.log("logic pin "+pin.toString()+" name: "+name);
	}

	send_post(url, buff, null, function(xreq) {

		var s = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

/*
======================================================


	struct datetime {
		uint32_t utc;	// универсальное время UNIX; количество секунд с 1 января 1970 года
		int32_t tz;		// часовой пояс; MSK (Московское время) == -180 (разница между местным и UTC - временем в минутах)
	} __attribute__((packed));


	struct stm32_config {
		uint16_t sensor_count;
		uint16_t logic_count;
		uint8_t  adc_pin_count;
		uint8_t  aux_pin_count;
	#define STM32_I2C_ADDRESS_1	((uint16_t)0x48)
	#define STM32_I2C_ADDRESS_2	((uint16_t)0x49)
		uint16_t i2c_address;

	#define STM32_FLAG_SENSORS_ON					0x10000000
	#define STM32_FLAG_SENSORS_RESET				0x20000000
	#define STM32_FLAG_SENSORS_READY				0x00000001
	#define STM32_FLAG_DEFAULT_CONFIGURATION_APPLY	0x00000002
		uint32_t flags;
		struct datetime datetime;
		uint32_t meas_interval;
		int32_t  altitude;

		struct adc_sensor_conf	adc [SUPPORTED_ADC_PINS];
		struct mcp23017_conf	mcp23017 [SUPPORTED_MCP23017_SENSORS/16];
	} __attribute__((packed));


	struct mcp23017_conf {
	#define MCP23017_PIN_ENABLED_MASK	0xFFFF0000
		uint32_t flags;
		uint16_t state;
	} __attribute__((packed));

======================================================
*/

			switch (response[0]) {

			case 0: /* OK */
				if (!SENSOR.stm32.logic) SENSOR.stm32.logic = [];
				if (!SENSOR.logic_names) SENSOR.logic_names = [];
				if (typeof name == 'string') SENSOR.logic_names[pin] = name;
				SENSOR.stm32.logic[pin] = enabled;
				console.log(" set logic pin OK ");
				break;

			case -1: /* ERROR */
				console.log(" set logic pin ERROR ");
				break;

			default:
				console.log(" unknown set logic pin status: "+response[0].toString());
				break;
			}

			s = parseInt(response[0]);
		}
		else {
			console.log(" no response on setlogicpin command");
		}

		if (callback) callback(pin, s);
	});
}


/**
=====================================================================================================
 *
 *	set_sensor_device_name	:	Функция устанавливает главное название для "набора датчиков", как устройства.
 *
 *				parameters	:	name - Новое название, которое следует присвоить устройству, как набору датчиков.
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха name сохраняется в SENSOR.name
 *
=====================================================================================================
 */
function set_sensor_device_name (name, callback)
{
	if (typeof name != 'string') {
		console.log("** set_sensor_device_name: invalid name type");
		if (callback) callback(-1);
		return;
	}

	var buff = new Uint8Array(SENSOR_NAME_SIZE);
	var setname = new DataView(buff.buffer);

	string_to_buffer(setname, 0, SENSOR_NAME_SIZE, name);

	send_post(API_REQUEST_SENSOR_SET_DEVICE_NAME, buff, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				SENSOR.name = name;
				console.log(" setname OK ");
				break;

			case -1: /* ERROR */
				console.log(" setname ERROR ");
				break;

			default:
				console.log(" unknown setname status: "+response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setname command");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *	get_sensor_device_name	:	Функция получает главное название для "набора датчиков", как устройства.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха name сохраняется в SENSOR.name
 *
=====================================================================================================
 */
function get_sensor_device_name (callback)
{
	send_get(API_REQUEST_SENSOR_GET_DEVICE_NAME, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			if (xreq.response.byteLength <= 4) {

				var response = new Int32Array(xreq.response);

				switch (response[0]) {

				case 0: /* OK */
					console.log(" null name ERROR ");
					break;

				case -1: /* ERROR */
					console.log(" -1 name ERROR ");
					break;

				default:
					break;
				}

				state = -1;
			}
			else {
				var name = new Uint8Array(xreq.response);
				SENSOR.name = decodeUtf8(name);
				state = 0;
			}
		}
		else {
			console.log(" no response on getname command");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *	get_sensor_digital_name	:	Функция получает название для цифрового модуля/датчика.
 *
 *				parameters	:	id - идентификатор цифрового модуля/датчика, которому следует присвоить название
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха name сохраняется в SENSOR.digital_names[id]
 *
=====================================================================================================
 */
function get_sensor_digital_name (id, callback)
{
	if (typeof id != 'number') {
		console.log("get_sensor_digital_name: invalid id");
		if (callback) callback(null);
		return;
	}

	send_get(API_REQUEST_SENSOR_GET_DIGITAL_NAME + "?id=" + id.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			if (xreq.response.byteLength <= 4) {

				var response = new Int32Array(xreq.response);

				switch (response[0]) {

				case 0: /* OK */
					console.log(" null name ERROR ");
					break;

				case -1: /* ERROR */
					console.log(" -1 name ERROR ");
					break;

				default:
					break;
				}

				state = -1;
			}
			else {
				var name = new Uint8Array(xreq.response);
				SENSOR.digital_names[id] = decodeUtf8(name);
				state = 0;
			}
		}
		else {
			console.log(" no response on get digital name command");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *	get_sensor_adc_pin_name	:	Функция получает название для аналогового входа.
 *
 *				parameters	:	pin - идентификатор аналогового входа, которому следует присвоить название
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха name сохраняется в SENSOR.adc_names[pin]
 *
=====================================================================================================
 */
function get_sensor_adc_pin_name (pin, callback)
{
	if (typeof pin != 'number') {
		console.log("get_sensor_adc_pin_name: invalid pin");
		if (callback) callback(null);
		return;
	}

	send_get(API_REQUEST_SENSOR_GET_ADC_NAME + "?pin=" + pin.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			if (xreq.response.byteLength <= 4) {

				var response = new Int32Array(xreq.response);

				switch (response[0]) {

				case 0: /* OK */
					console.log(" null name ERROR ");
					break;

				case -1: /* ERROR */
					console.log(" -1 name ERROR ");
					break;

				default:
					break;
				}

				state = -1;
			}
			else {
				var name = new Uint8Array(xreq.response);
				SENSOR.adc_names[pin] = decodeUtf8(name);
				state = 0;
			}
		}
		else {
			console.log(" no response on get adc pin name command");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *	get_sensor_logic_name	:	Функция получает название для логического входа.
 *
 *				parameters	:	pin - идентификатор логического входа, которому следует присвоить название
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	В случае успеха name сохраняется в SENSOR.logic_names[pin]
 *
=====================================================================================================
 */
function get_sensor_logic_name (pin, callback)
{
	if (typeof pin != 'number') {
		console.log("get_sensor_logic_name: invalid pin");
		if (callback) callback(null);
		return;
	}

	send_get(API_REQUEST_SENSOR_GET_LOGIC_NAME + "?pin=" + pin.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			if (xreq.response.byteLength <= 4) {

				var response = new Int32Array(xreq.response);

				switch (response[0]) {

				case 0: /* OK */
					console.log(" null name ERROR ");
					break;

				case -1: /* ERROR */
					console.log(" -1 name ERROR ");
					break;

				default:
					break;
				}

				state = -1;
			}
			else {
				var name = new Uint8Array(xreq.response);
				SENSOR.logic_names[pin] = decodeUtf8(name);
				state = 0;
			}
		}
		else {
			console.log(" no response on get logic pin name command");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *			set_adc_calibr	:	Функция производит калибровку показаний аналогового датчика.
 *							:	Калибровку необходимо производить только при подключенном датчике.
 *							:	Это нужно для того, чтобы прибор запоминал показания (чтобы они были не нулевые).
 *							:	Иначе, она (калибровка) просто не возымеет действие.
 *
 *				parameters	:	adc_pin - номер аналогового входа, на котором нужно произвести калибровку.
 *							:	value - значение, которое показывает эталонный прибор.
 *							:	phase - фаза.
 *							:			Первая фаза - "start" (очищает калибровочный буфер)
 *							:			Далее фаза должна принимать значения null
 *							:			Завершающая фаза - "finish" (сортирует и сохраняет все установленные значения)
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function set_adc_calibr (adc_pin, value, phase, callback)
{
	if (typeof adc_pin != 'number' || adc_pin < 0 || adc_pin >= SUPPORTED_ADC_PINS) {
		console.log("set_adc_calibr error: invalid adc_pin");
		if (callback) callback(-1);
		return;
	}
	if (value != null) value = value.replace(",",".").replace("[^0-9.]",""); 

	var url = API_REQUEST_SENSOR_SET_ADC_CALIBR + "?";

	switch (phase) {

	case "start":
		url += "start=1&";
		break;

	case "finish":
		url += "finish=1&";
		break;

	case "clear":
		url += "start=1&finish=1&";
		break;
	}

	url += "pin="+adc_pin.toString();

	if (value != null) {
		url += "&value="+value.toString();
	}

	send_post(url, null, null, function (xreq) {

		var s = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				console.log(" set adc calibr OK ");
				break;

			case -1: /* ERROR */
				console.log(" set adc calibr ERROR ");
				break;

			default:
				console.log(" unknown set adc calibr status: "+response[0].toString());
				break;
			}

			s = parseInt(response[0]);
		}
		else {
			console.log(" no response on setconfig command");
		}

		if (callback) callback(s);
	});
}



/*
=================================================================================================
================================= SYSTEM API ====================================================
=================================================================================================
*/

/**
=====================================================================================================
 *
 * 			get_system_info	:	Функция получает всю информацию об устройстве (системе).
 *							:	Свободную RAM, использование файловых систем.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в DEVICE.info
 *
=====================================================================================================
 */
function get_system_info (callback)
{
	send_get(API_REQUEST_SYSTEM_GET_INFO, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < 4) {
				console.log(" get system info: invalid info length");
				state = -1;
			}
			else if (response.length < 12) {
				console.log(" get system info: error occured");
				state = parseInt(response[0]);
			}
			else {
				var system_info_data = new DataView(response.buffer);
				var n = 0;


/*
======================================================

	#define FS_FILE_NAME_SIZE_MAX	32
	#define FS_FILE_COUNT_MAX		100

	struct file {
		uint8_t name[FS_FILE_NAME_SIZE_MAX];
		uint32_t size;
	} __attribute__((packed));

	struct fs_info {
		uint32_t fs_total;
		uint32_t fs_used;
		uint32_t fs_avail;
		uint32_t file_count;
		struct file file[1];
	} __attribute__((packed));

	struct system_info {
		uint32_t heap_size;
		struct fs_info fs;
	} __attribute__((packed));

======================================================
*/


				DEVICE.info = {};
				DEVICE.info.heap_size = system_info_data.getUint32(n, true); n += 4;

				// files
				DEVICE.info.fs = {};
				DEVICE.info.fs.fs_total = system_info_data.getUint32(n, true); n += 4;
				DEVICE.info.fs.fs_used = system_info_data.getUint32(n, true); n += 4;
				DEVICE.info.fs.fs_avail = system_info_data.getUint32(n, true); n += 4;
				DEVICE.info.fs.file_count = system_info_data.getUint32(n, true); n += 4;
				DEVICE.info.fs.file = [];

				for (var i=0; i<DEVICE.info.fs.file_count; i++) {
					DEVICE.info.fs.file[i] = {};

					var name = new Uint8Array(system_info_data.buffer, n, 32);
					var len = 0; while (len<32 && name[len]!=0) len++;
					name = new Uint8Array(system_info_data.buffer, n, len);
					DEVICE.info.fs.file[i].name =  decodeUtf8(name);
					n += 32;
					DEVICE.info.fs.file[i].size = system_info_data.getUint32(n, true); n += 4;
				}

				state = 0;
			}
		}
		else {
			console.log(" no response on system getinfo command");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *		set_system_controller	:	Функция устанавливает новый контроллер (шлюз).
 *
 *					parameters	:	url - доменное имя контроллера и путь. (доменное имя, напр.: http(s)://www.controller.ru/device/)
 *								:	callback (status) - функция, которая будет вызвана по получении результата
 *
 *						return	:	Если успешно, struct controller сохраняется в DEVICE.controller
 *
=====================================================================================================
 */
function set_system_controller (url, callback)
{
	if (typeof url != 'string') {
		console.log("set_system_controller: no URL");
		if (callback) calback(-1);
		return;
	}

	var urlre = /([^:\/]*):*\/*([^:\/]*)\/*(.*)$/;

	if (url.indexOf("://") == -1) {
		urlre = /([^\/]*)\/*(.*)$/;
	}

	var url_parts = urlre.exec(url);
	if (url_parts == null) {
		console.log("set_system_controller: invalid URL");
		if (callback) calback(-1);
		return;
	}



	var ipaddr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var port = 80;	// default http port
	var name = "";	// without leading slash ("192.168.0.100")
	var path = "";	// without leading slash but with ending slash ("device/")


	var i = 1;

	if (url.indexOf("://") !== -1) {

		if (url_parts[i] != "http") {
			console.log("set_system_controller: unknown protocol \"" + url_parts[i] + "\"; HTTP will be set by default");
		}
		i++;
	}

	if (!url_parts[i] || url_parts[i] == "") {
		console.log("set_system_controller: no domain in URL");
		return;
	}

	name = url_parts[i]; i++;

	if (url_parts[i]) {

		path = url_parts[i];

		if (path.indexOf("/", path.length-1) == -1) {
			path += "/";
		}
	}


	var device_config = system_create_device_config_copy(DEVICE);

	for (var i=0; i<16; i++) {
		device_config.controller.ipaddr[i] = ipaddr[i];
	}
	device_config.controller.port = port;
	device_config.controller.name = name;
	device_config.controller.path = path;

	set_system_device_config(device_config, callback);
}

/**
=====================================================================================================
 *
 *	set_system_device_config	:	Функция устанавливает глобальные настройки устройства.
 *
 *					parameters	:	config - конфигурация устройства, которую следует сохранить.
 *								:	callback (status) - функция, которая будет вызвана по получении результата
 *
 *						return	:	Если успешно, struct controller сохраняется в DEVICE
 *
=====================================================================================================
 */
function set_system_device_config (config, callback)
{
	if (typeof config != 'object') {
		console.log("set_system_device_config: invalid config argument");
		if (callback) calback(-1);
		return;
	}

	var buff = new Uint8Array(DEVICE_CONFIG_SIZE);
	var device_config = new DataView(buff.buffer);

	var n = 0;

/*
======================================================

	struct controller {
		uint8_t ipaddr[16];
		uint16_t port;
		char name[128];
		char path[128];
	} __attribute__((packed));


struct device_config {
	device_id_t id;
	uint32_t type;
	uint32_t state;
	uint8_t name [DEVICE_NAME_SIZE];
	uint16_t http_port;
	uint16_t metric_port;
	uint16_t ap_name_port;
	uint16_t sta_name_port;
	uint32_t work_interval;			// millisec
	struct controller controller;
} __attribute__((packed));

======================================================
*/


	for (var i=0; i<8; i++) {
		device_config.setUint8(n, config.id[i], true); n+=1;
	}

	device_config.setUint32(n, config.type, true); n+=4;
	device_config.setUint32(n, config.state, true); n+=4;

	string_to_buffer(device_config, n, 128, config.name); n+=128;

	device_config.setUint16(n, config.http_port, true); n+=2;
	device_config.setUint16(n, config.metric_port, true); n+=2;
	device_config.setUint16(n, config.ap_name_port, true); n+=2;
	device_config.setUint16(n, config.sta_name_port, true); n+=2;

	device_config.setUint32(n, config.work_interval, true); n+=4;

	for (var i=0; i<16; i++) {
		if (i < 4) device_config.setUint8(n, config.controller.ipaddr[i], true);
		else device_config.setUint8(n, 0, true);
		n+=1;
	}
	device_config.setUint16(n, config.controller.port, true); n+=2;

	string_to_buffer(device_config, n, 128, config.controller.name); n+=128;
	string_to_buffer(device_config, n, 128, config.controller.path); n+=128;


	send_post(API_REQUEST_SYSTEM_SET_DEVICE_CONFIG, buff, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			state = parseInt(response[0]);

			switch (state) {

			case 0:
				console.log("set_system_controller: OK");
				DEVICE.id = config.id;
				DEVICE.type = config.type;
				DEVICE.state = config.state;
				DEVICE.name = config.name;
				DEVICE.http_port = config.http_port;
				DEVICE.metric_port = config.metric_port;
				DEVICE.ap_name_port = config.ap_name_port;
				DEVICE.sta_name_port = config.sta_name_port;
				DEVICE.work_interval = config.work_interval;
				DEVICE.controller.ipaddr = config.controller.ipaddr;
				DEVICE.controller.port = config.controller.port;
				DEVICE.controller.name = config.controller.name;
				DEVICE.controller.path = config.controller.path;
				break;

			default:
				console.log("set_system_controller: ERROR " + state);
				break;
			}
		}
		else {
			console.log(" set_system_controller: null answer");
		}

		if (callback) callback(state);
	});
}



/**
=====================================================================================================
 *
 *	get_system_device_config	:	Функция получает общую информацию об устройстве.
 *
 *					parameters	:	callback (name, status) - функция, которая будет вызвана по получении результата
 *
 *						return	:	Если успешно, struct controller сохраняется в DEVICE.controller
 *
=====================================================================================================
 */
function get_system_device_config (callback)
{
	send_get(API_REQUEST_SYSTEM_GET_DEVICE_CONFIG, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < 4) {
				console.log("get system controller: invalid controller length");
				state = -1;
			}
			else if (response.length < 8) {
				console.log(" get system controller: error occured");
				state = parseInt(response[0]);
			}
			else {
				var system_controller = new DataView(response.buffer);

/*
======================================================

	struct controller {
		uint8_t ipaddr[16];
		uint16_t port;
		char name[128];
		char path[128];
	} __attribute__((packed));

struct device_config {
	device_id_t id;
	uint32_t type;
	uint32_t state;
	uint8_t name [DEVICE_NAME_SIZE];
	uint16_t http_port;
	uint16_t metric_port;
	uint16_t ap_name_port;
	uint16_t sta_name_port;
	uint32_t work_interval;			// millisec
	struct controller controller;
} __attribute__((packed));


======================================================
*/

				var n = 0;

				DEVICE.id = [];
				for (var i=0; i<8; i++) {
					DEVICE.id[i] = system_controller.getUint8(n, true); n+=1;
				}

				DEVICE.type = system_controller.getUint32(n, true); n+=4;
				DEVICE.state = system_controller.getUint32(n, true); n+=4;

				var name = new Uint8Array(response.buffer, n, 128);
				var len = 0; while (len<128 && name[len]!=0) len++;
				name = new Uint8Array(response.buffer, n, len);
				DEVICE.name = decodeUtf8(name); n += 128;

				DEVICE.http_port = system_controller.getUint16(n, true); n+=2;
				DEVICE.metric_port = system_controller.getUint16(n, true); n+=2;
				DEVICE.ap_name_port = system_controller.getUint16(n, true); n+=2;
				DEVICE.sta_name_port = system_controller.getUint16(n, true); n+=2;

				DEVICE.work_interval = system_controller.getUint32(n, true); n+=4;

				DEVICE.controller = {};
				DEVICE.controller.ipaddr = [];
				for (var i=0; i<16; i++) {
					DEVICE.controller.ipaddr[i] = (i < 4)? system_controller.getUint8(n, true) : 0;
					n+=1;
				}
				DEVICE.controller.port = system_controller.getUint16(n, true); n+=2;

				var name = new Uint8Array(response.buffer, n, 128);
				var len = 0; while (len<128 && name[len]!=0) len++;
				name = new Uint8Array(response.buffer, n, len);
				DEVICE.controller.name = decodeUtf8(name); n += 128;

				var path = new Uint8Array(response.buffer, n, 128);
				var len = 0; while (len<128 && path[len]!=0) len++;
				path = new Uint8Array(response.buffer, n, len);
				DEVICE.controller.path = decodeUtf8(path); n += 128;

				state = 0;
			}
		}
		else {
			console.log(" no response on system get controller command");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 * 		get_system_errlog	:	Функция получает последние 40 ошибок на устройстве (системе).
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в DEVICE.errlog
 *
=====================================================================================================
 */
function get_system_errlog (callback)
{
	send_get(API_REQUEST_SYSTEM_GET_ERRLOG, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < 4) {
				console.log("get system errlog: invalid errlog length");
				state = -1;
			}
			else if (response.length == 4) {
				state = response[0];
			}
			else if (response.length < 8) {
				console.log(" get system errlog: error occured");
				state = parseInt(response[0]);
			}
			else {
				var system_errlog_data = new DataView(response.buffer);

/*
======================================================

	struct errlog {
		uint32_t error_datetime;
		uint32_t error_code;
	} __attribute__((packed));

======================================================
*/

				DEVICE.errlog = [];

				for (var n=0, i=0; n<system_errlog_data.byteLength; i++) {
					var datetime = system_errlog_data.getUint32(n, true); n += 4;
					var errcode = system_errlog_data.getUint32(n, true); n += 4;
					var d = new Date();
					var tz = d.getTimezoneOffset()*60;
					d = new Date((datetime*1000) - tz);

					DEVICE.errlog[i] = {};
					DEVICE.errlog[i].datetime = d.toLocaleString();
					DEVICE.errlog[i].errcode = errcode;
				}

				state = 0;
			}
		}
		else {
			console.log(" no response on system geterrlog command");
		}

		if (callback) callback(state);
	});
}




/**
=====================================================================================================
 *
 * 		get_system_runlog	:	Функция получает последние дату, время и причину
 *							:	последних 40 (пере)загрузок устройства.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	Результат сохраняется в DEVICE.runlog
 *
=====================================================================================================
 */
function get_system_runlog (callback)
{
	send_get(API_REQUEST_SYSTEM_GET_RUNLOG, null, null, function (xreq) {

		var stat = null;

		if (xreq.response) {

			var response = new Uint8Array(xreq.response);

			if (response.length < 4) {
				console.log("get system runlog: invalid runlog length");
				stat = -1;
			}
			else if (response.length < 8) {
				console.log("get system errlog: error occured");
				stat = response[0];
			}
			else {
				var system_runlog_data = new DataView(response.buffer);

/*
======================================================

	struct runlog {
		uint32_t reset_datetime;
		uint32_t reset_flags;
	} __attribute__((packed));

======================================================
*/

				DEVICE.runlog = [];

				for (var n=0, i=0; n<system_runlog_data.byteLength; i++) {
					var datetime = system_runlog_data.getUint32(n, true); n += 4;
					var reason = system_runlog_data.getUint32(n, true); n += 4;
					var d = new Date();
					var tz = d.getTimezoneOffset()*60;
					d = new Date((datetime*1000) - tz);

					DEVICE.runlog[i] = {};
					DEVICE.runlog[i].datetime = d.toLocaleString();
					DEVICE.runlog[i].reason = reason;
				}

				stat = 0;
			}
		}
		else {
			console.log(" no response on system getrunlog command");
		}

		if (callback) callback(stat);
	});
}



/**
=====================================================================================================
 *
 * 		clear_system_logs	:	Функция очищает системные журналы ошибок и загрузок устройства.
 *
 *				parameters	:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	При успехе - очищает из журналов полученную ранее информацию.
 *
=====================================================================================================
 */
function clear_system_logs (callback)
{
	send_post(API_REQUEST_SYSTEM_GET_CLEAR_LOGS, null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				DEVICE.runlog = [];
				DEVICE.errlog = [];
				console.log(" system clear logs OK ");
				break;

			case -1: /* ERROR */
				console.log(" system clear logs ERROR ");
				break;

			default:
				console.log(" unknown system clear logs status: "+response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on system clear logs command");
		}

		if (callback) callback(state);
	});
}




/**
=====================================================================================================
 *
 * 	set_system_metric_port	:	Функция изменяет UDP порт на котором система слушает
 *							:	широковещательные сообщения с показаниями датчиков наборов датчиков.
 *							:	А в случае набора датчиков, - ещё и рассылает
 *							:	широковещательные сообщения с показаниями своих датчиков.
 *
 *				parameters	:	port - UDP порт для широковещательных сообщений показаний датчиков.
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	если указан не правильный порт - -1
 *							:	если запрос ушёл - 0
 *
=====================================================================================================
 */
function set_system_metric_port (port, callback)
{
	if (!port || port < METRIC_PORT_MIN || port > METRIC_PORT_MAX) {
		console.log("invalid metric port");
		return -1;
	}

	send_post(API_REQUEST_SYSTEM_SET_METRIC_PORT + "?port=" + port.toString(), null, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0: /* OK */
				console.log(" system metric port set to " + port.toString() + " OK ");
				break;

			case -1: /* ERROR */
				console.log(" system metric port ERROR ");
				break;

			default:
				console.log(" unknown system metric port status: "+response[0].toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on system metric port command");
		}

		if (callback) callback(state);
	});

	return 0;
}



/**
=====================================================================================================
 *
 *		set_system_datetime	:	Функция устанавливает необходимую дату и время на устройстве.
 *
 *				parameters	:	datetime - дата и время (unix timestamp utc) для установки
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function set_system_datetime (datetime, tz, callback)
{
	var d = new Date();
	datetime = parseInt(datetime);
	tz = parseInt(tz);
	if (typeof datetime !== 'number' || datetime <= 0) { datetime = (d.getTime()/1000); }
	if (typeof tz !== 'number') { tz = d.getTimezoneOffset()*60; }
	d.setTime(datetime * 1000);

/*
======================================================

	struct datetime {
		uint32_t utc;	// универсальное время UNIX; количество секунд с 1 января 1970 года
		int32_t tz;		// часовой пояс; MSK (Московское время) == -180 (разница между местным и UTC - временем в минутах)
	} __attribute__((packed));

======================================================
*/

	var date = new DataView(new Uint32Array(2).buffer);
	date.setUint32(0, parseInt(d.getTime()/1000), true);
	date.setUint32(4, parseInt(tz), true);

	send_post(API_REQUEST_SYSTEM_SET_DATETIME, date, null, function(xreq) {

		var state = null;

		if (xreq.response) {

			var response = new Int32Array(xreq.response);

			switch (response[0]) {

			case 0:
				console.log(" setdatetime OK ");
				break;

			case -1: /* ERROR */
				console.log(" setdatetime ERROR ");
				break;

			default:
				console.log("unknown status "+(parseInt(response[0])).toString());
				break;
			}

			state = parseInt(response[0]);
		}
		else {
			console.log(" no response on setdatetime ");
		}

		if (callback) callback(state);
	});
}


/**
=====================================================================================================
 *
 *			set_system_mode	:	Функция устанавливает режим работы устройства
 *
 *				parameters	:	mode - режим работы, который следует установить
 *							:	callback (status);
 *							:	- функция, которая будет вызвана по получении результата
 *
 *					return	:	none
 *
=====================================================================================================
 */
function set_system_mode (mode, callback)
{
	var device_config = system_create_device_config_copy(DEVICE);

	if (mode === 'controller_on') {
		if (device_config.state & DEVICE_STATE_MODE_CTL) return;
		device_config.state |= DEVICE_STATE_MODE_CTL;
	}
	else if (mode === 'controller_off') {
		if (~device_config.state & DEVICE_STATE_MODE_CTL) return;
		device_config.state &= ~DEVICE_STATE_MODE_CTL;
	}
	else if (mode === 'autonomus_auto') {
		if (device_config.state & DEVICE_STATE_MODE_AUTO) return;
		device_config.state |= DEVICE_STATE_MODE_AUTO;
	}
	else if (mode === 'autonomus_manual') {
		if (~device_config.state & DEVICE_STATE_MODE_AUTO) return;
		device_config.state &= ~DEVICE_STATE_MODE_AUTO;
	}
	else {
		console.log("set_system_mode: invalid mode");
	}

	set_system_device_config
	(
		device_config,

		function (state)
		{
			if (state == 0) {
				DEVICE.state = device_config.state;
			}
			if (callback) callback(state);
		}
	);
}

/*
=================================================================================================
	WI-FI
=================================================================================================
*/

/**
=====================================================================================================
 *
 *				wifi_config	:	Функция устанавливает настройки подключения к сети Wi-Fi
 *
 *				parameters	:	mode - режим подключения "ap" (точка доступа) или "sta" (станция)
 *							:	ssid - имя сети.
 *							:	password - пароль для подключения к этой сети.
 *							:	hostname - опционально имя хоста (для идентификации внутри сети).
 *							:	maxconn - максимальное количество одновременных подключений к устройству.
 *							:	ip - IP адрес (по умолчанию (null) для режима точки 192.168.100.1).
 *							:	netmask - по умолчанию (null) для режима точки 255.255.255.0.
 *							:	run_now - применить настройки немедленно (если false - при следующем включении).
 *							:	isdefault - перезаписать настройки Wi-Fi которые будут применены при потере сети..
 *							:	callback (state); - функция, которая будет вызвана по получении результата
 *
 *					return	:	0. если запрос отправлен.
 *
=====================================================================================================
 */
function wifi_config (mode, ssid, password, hostname, maxconn, ip, netmask, run_now, isdefault, callback)
{
	if (mode != "sta" && mode != "ap") {
		console.log(" invalid mode ");
		return -1;
	}
	if (!ssid || ssid.length < 8 || ssid.length > 32) {
		console.log(" invalid ssid ");
		return -1;
	}
	if (password && (password.length < 8 || password.length > 63)) {
		console.log(" invalid password ");
		return -1;
	}
	if (hostname && (hostname.length < 4 || hostname.length > 63)) {
		console.log(" invalid hostname ");
		return -1;
	}
	if (ip && (ip.length < 7 || ip.length > 15)) {
		console.log(" invalid ip ");
		return -1;
	}
	if (netmask && (netmask.length < 7 || netmask.length > 15)) {
		console.log(" invalid netmask ");
		return -1;
	}

	send_post(API_REQUEST_WIFI_SET_CONFIG + "?mode=" + mode.toString() + "&ssid=" + ssid.toString()+
			((password)? "&pass="+password.toString():"")+
			((hostname)? "&hostname="+hostname.toString():"")+
			((ip)? "&ip="+ip.toString():"")+
			((netmask)? "&netmask="+netmask.toString():"")+ 
			"&now=" + ((run_now)? "1":"0")+
			"&default=" + ((isdefault)? "1":"0"),
			null, 2000, callback);

	return 0;
}



/*
=================================================================================================
	*** !!! DANGER !!! ***
=================================================================================================
*/

// load interfase

function load_new_interface (file, callback)
{
	if (!file) {
		console.log("file not loaded");
		alert("Пожалуйста, выберите файл");
		return;
	}

	if (file.size <= 0) {
		console.log("invalid file size");
		alert("Размер выбранного файла невозможно определить");
		return;
	}

	if (file.name !== "iface.js" && file.name !== "iface.gz") {
		console.log("file name: " + file.name);
		alert
		(
			"Файл выбран не правильный. "
			+ "Пожалуйста, скачайте правильные файлы \"iface.js\" и \"iface.gz\". "
			+ "Оба файла должны быть сжаты (gzip)."
		);
		return;
	}

	send_post("file_write?name=" + file.name + "&offset=0&length=" + file.size, file, null,

		function (xreq) {

			if (xreq) {

				var state = null;

				if (xreq.response) {

					var response = new Int32Array(xreq.response);

					switch (response[0]) {

					case 0:
						console.log(" setdatetime OK ");
						break;

					case -1: /* ERROR */
						console.log(" setdatetime ERROR ");
						break;

					default:
						console.log("unknown status "+(parseInt(response[0])).toString());
						break;
					}

					state = parseInt(response[0]);
				}
				else {
					console.log(" no response on setdatetime ");
				}
			}
			else {
				state = null;
			}

			if (callback) callback(state);
		}
	);
}


// WARNING !!! DO NOT USE THIS FUNCTION WITHOUT EXTREME NEED !!!

function system_fsformat ()
{
	send_post("system_fsformat", null, null, null);
}



