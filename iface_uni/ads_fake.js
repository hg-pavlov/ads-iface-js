	OUTLET = {}; OUTLET.outlet = [];
	OUTLET.device_id = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF];
	OUTLET.name = "Управляемые розетки";
	for (var i=0; i<16; i++) {
		OUTLET.outlet[i] = {}; OUTLET.outlet[i].state = 0; OUTLET.outlet[i].id = i; OUTLET.outlet[i].consumer = 0; OUTLET.outlet[i].name = "Розетка";
		OUTLET.outlet[i].rule = [];
		for (var n=0; n<10; n++) {
			OUTLET.outlet[i].rule[n] = {};
			OUTLET.outlet[i].rule[n].rule_flags = 0xFFFFFFFF;
			OUTLET.outlet[i].rule[n].condition_count = 0;
			OUTLET.outlet[i].rule[n].date = {};
			OUTLET.outlet[i].rule[n].date.flags = 0xFFFFFFFF;
			OUTLET.outlet[i].rule[n].date.start = 10000;
			OUTLET.outlet[i].rule[n].date.stop = 30000;
			OUTLET.outlet[i].rule[n].date.week_days = 0xEFEFEFEF;
			OUTLET.outlet[i].rule[n].condition = [];

				var c=0;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_TEMPERATURE | STM32_BME280_BUS1_GROUP;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_HUMIDITY | STM32_BME280_BUS1_GROUP;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_PRESSURE | STM32_BME280_BUS1_GROUP;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_SOLUTION_TEMP | STM32_ADC1_GROUP | (c << 16);
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_LIGHT_IN | STM32_ADC1_GROUP | (c << 16);
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_LIGHT_OUT | STM32_ADC1_GROUP | (c << 16);
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_DAYTIME;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_ONOFF | STM32_MCP23017_BUS1_GROUP;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_ALTITUDE | STM32_BME280_BUS1_GROUP;
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
				OUTLET.outlet[i].rule[n].condition[c] = {};
				OUTLET.outlet[i].rule[n].condition[c].sensor_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
				OUTLET.outlet[i].rule[n].condition[c].type = SENSOR_TYPE_EC | STM32_ADC1_GROUP | (c << 16);
				OUTLET.outlet[i].rule[n].condition[c].flags = 0xFFFFFFFF;
				OUTLET.outlet[i].rule[n].condition[c].val_beg = 1400;
				OUTLET.outlet[i].rule[n].condition[c].val_end = 3000;
				OUTLET.outlet[i].rule[n].condition_count++; c++;
		}
	}





	SENSOR.stm32 = {};
	SENSOR.adc_names = ["","","Третий аналоговый датчик","","","","","","",""];
	SENSOR.logic_names = ["","","","","","","","","","","","","","","","Последний логический датчик"];
	SENSOR.digital_names = ["Первый цифровой датчик","","",""];
	SENSOR.name = "Набор датчиков №1";
	SENSOR.device_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
	SENSOR.sensor_bcast = {};
	SENSOR.sensor_bcast.name = "Набор датчиков №1";
	SENSOR.sensor_bcast.device_id = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0xFF];
	SENSOR.sensor_bcast.sensor_count = 11;
	SENSOR.sensor_bcast.metric = [];
		var i = 0;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_DATE;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_DAYTIME;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_LIGHT_IN | 0x00010000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_LIGHT_OUT | 0x00020000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_TEMPERATURE | 0x00030000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_TEMPERATURE | STM32_BME280_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_HUMIDITY | STM32_BME280_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_PRESSURE | STM32_BME280_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_ALTITUDE | STM32_BME280_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_SEA_LEVEL_PRESSURE | STM32_BME280_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_SOLUTION_TEMP | 0x00040000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_EC | 0x00050000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_PH | 0x00060000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 1000.20;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_TDS | 0x00050000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_PPM | 0x00050000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_RAW | 0x00070000 | STM32_ADC1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 10000.10;
		i++;
		SENSOR.sensor_bcast.metric[i] = {};
		SENSOR.sensor_bcast.metric[i].type = SENSOR_TYPE_ONOFF | STM32_MCP23017_BUS1_GROUP;
		SENSOR.sensor_bcast.metric[i].value = 0xFFECAAAA;
		i++;

	SENSOR.sensor_bcast.sensor_count = i;

	SENSOR.stm32 = {}; SENSOR.stm32.adc = [];
	SENSOR.adc_names = [];
	for (var i=0; i<SUPPORTED_ADC_PINS; i++) {
		SENSOR.stm32.adc[i] = {};
		SENSOR.stm32.adc[i].type = SENSOR.sensor_bcast.metric[i].type;
		SENSOR.stm32.adc[i].temp_compensate_adc_pin = 1;
		SENSOR.adc_names[i] = "SENSOR NAME";

		// calibration data
		SENSOR.stm32.adc[i].cal = [];
		for (var acal=0; acal<ADC_CALIBRATION_COUNT; acal++) {
			SENSOR.stm32.adc[i].cal[acal] = {};
			SENSOR.stm32.adc[i].cal[acal].adc_val = 0;
			SENSOR.stm32.adc[i].cal[acal].val = 0;
		}
	}
	for (var i=0; i<SENSOR.sensor_bcast.sensor_count; i++) {
		var g = (SENSOR.sensor_bcast.metric[i].type & SENSOR_GROUP_MASK);
		if (g === STM32_ADC1_GROUP) {
			var n = (SENSOR.sensor_bcast.metric[i].type & SENSOR_COUNT_MASK) >> 16;
			SENSOR.stm32.adc[n].type = SENSOR.sensor_bcast.metric[i].type;
		}
	}


	SENSOR.stm32.logic = [];
	for (var i=0; i<SUPPORTED_MCP23017_SENSORS; i++) {
		if (!SENSOR.stm32.logic[parseInt(i/16)]) SENSOR.stm32.logic[parseInt(i/16)] = {};
		SENSOR.stm32.logic[parseInt(i/16)].flags |= ((1 << (i%16)) << 16);
		SENSOR.logic_names[i] = "LOGIC SENSOR";
	}



if (SENSOR.sensor_bcast) {OUTLET.sensor_list = []; OUTLET.sensor_list[0] = SENSOR.sensor_bcast;}

