
WORKDIR=$(shell pwd)
BUILDDIR=$(WORKDIR)/iface

INTERFACE_START_DEMO=iface_demo.js
INTERFACE_API_DEMO=ads_demo_api.js

INTERFACE_TARGET=iface.js
INTERFACE_RAW=iface.raw
INTERFACE_TMP=iface.tmp

INTERFACE_RES=iface.gz

INTERFACE_API=../ads_api.js
INTERFACE_CALENDAR=../calendar.js

INTERFACE_MISC=ads_misc.js
INTERFACE_BOOT=ads_bootstrap.js

INTERFACE_DIR=iface_uni
INTERFACE_WIFI=ads_wifi.js
INTERFACE_OUTLET=ads_outlet.js
INTERFACE_SENSOR=ads_sensor.js
INTERFACE_SYSTEM=ads_system.js

INTERFACE_STYLE_RAW=raw.style.css
INTERFACE_STYLE_TARGET=style.css

INTERFACE_RES_LIST=img $(INTERFACE_STYLE_TARGET)

CSS_PACKER := yui-compressor
CSS_PACKER_FLAGS :=  --type css --charset UTF-8

JS_PACKER := yui-compressor
JS_PACKER_FLAGS :=  --type js --charset UTF-8

.PHONY: undefined clean outlet


udefined:
	@echo "Please, define a target"


outlet:
	@echo "Creating interface for the universal (outlets and sensors) control device"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_API)" > "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_MISC)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_OUTLET)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_SENSOR)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_SYSTEM)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_CALENDAR)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	cat "$(WORKDIR)/$(INTERFACE_DIR)/$(INTERFACE_BOOT)" >> "$(BUILDDIR)/$(INTERFACE_RAW)"
	@echo "==> compress JS file ..."
	$(JS_PACKER) $(JS_PACKER_FLAGS) "$(BUILDDIR)/$(INTERFACE_RAW)" >> "$(BUILDDIR)/$(INTERFACE_TMP)"
	cd $(BUILDDIR) && gzip -9c $(INTERFACE_TMP) > $(INTERFACE_TARGET)
	@echo "==> compress GZ resources file ..."
	$(CSS_PACKER) $(CSS_PACKER_FLAGS) "$(INTERFACE_DIR)/$(INTERFACE_STYLE_RAW)" > "$(INTERFACE_DIR)/$(INTERFACE_STYLE_TARGET)"
	cd "$(WORKDIR)/$(INTERFACE_DIR)" && tar -czf "$(BUILDDIR)/$(INTERFACE_RES)" $(INTERFACE_RES_LIST)
	@echo "==> done"
	rm -f $(BUILDDIR)/$(INTERFACE_RAW) $(BUILDDIR)/$(INTERFACE_TMP) $(INTERFACE_DIR)/$(INTERFACE_STYLE_TARGET)


clean:
	rm -f $(BUILDDIR)/$(INTERFACE_RES) \
		$(BUILDDIR)/$(INTERFACE_RAW) \
		$(BUILDDIR)/$(INTERFACE_TMP) \
		$(BUILDDIR)/$(INTERFACE_TARGET) \
		$(INTERFACE_DIR)/$(INTERFACE_STYLE_TARGET)

