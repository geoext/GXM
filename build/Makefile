# Makefile for GXM

VERSION = 0.2
LIB_NAME = GXM
ZIP_NAME = $(LIB_NAME)-$(VERSION).zip
TGZ_NAME = $(LIB_NAME)-$(VERSION).tar.gz
TODAY = $(shell date +'%Y%m%d')
DATE = $(shell date +'%Y-%m-%d, %H:%M:%S')
YEAR = $(shell date +'%Y')
NIGHTLY = $(LIB_NAME)-$(TODAY)

.PHONEY: help lib zip tgz release nightly examplelib clean

help: 
	@echo
	@echo "  Please use 'make <target>' where <target> is one or more of"
	@echo "    clean      to clean up after building"
	@echo "    lib        to make a standalone dir of lib resources"
	@echo "    zip        to make a zip archive of the standalone lib"
	@echo "    tgz        to make a gzipped tar-ball of the standalone lib"
	@echo "    release    calls clean, lib, zip and tgz"
	@echo "    nightly    calls release, moves the tar.gz and zip and calls clean"
	@echo "    examplelib calls lib, copies the singlefile to the lib-directory and calls clean"
	@echo "    help       show this screen"
	@echo
	@echo "  Example use:"
	@echo "    make lib"
	@echo "    make lib LIB_NAME=MyLib"
	@echo "    make zip"
	@echo "    make zip ZIP_NAME=MyZip.zip"
	@echo

lib:
	@echo "Building the library."
	mkdir -p $(LIB_NAME)
	# see http://trac.geoext.org/wiki/builds to get jsbuild installation help
	./build.py -c "closure_ws" "full.cfg" $(LIB_NAME)/$(LIB_NAME).js
	echo "This is GXM version $(VERSION), created $(DATE)." >> $(LIB_NAME)/VERSION 
	
	sed -i 's/<VERSION>/$(VERSION)/g' $(LIB_NAME)/$(LIB_NAME).js
	sed -i 's/<BUILDDATE>/$(DATE)/g' $(LIB_NAME)/$(LIB_NAME).js
	sed -i 's/<YEAR>/$(YEAR)/g' $(LIB_NAME)/$(LIB_NAME).js
	
	rsync -au --exclude=.svn `pwd`/../lib `pwd`/$(LIB_NAME)
	rsync -au --exclude=.svn `pwd`/../resources `pwd`/$(LIB_NAME)

zip: lib
	@echo "Archiving the library a zipfile."
	-rm -f $(ZIP_NAME)
	zip $(ZIP_NAME) -r $(LIB_NAME)

tgz: lib
	@echo "Archiving the library as gzipped tar-ball."
	-rm -f $(TGZ_NAME)
	tar -czvf $(TGZ_NAME) $(LIB_NAME)

release: clean lib zip tgz

nightly: release
	mkdir -p ../$(NIGHTLY)
	cp $(ZIP_NAME) ../$(LIB_NAME)-$(TODAY)
	cp $(TGZ_NAME) ../$(LIB_NAME)-$(TODAY)
	make clean

examplelib: lib
	cp $(LIB_NAME)/$(LIB_NAME).js ../lib/$(LIB_NAME).closurized.js
	make clean

clean:
	-rm -rf $(LIB_NAME)
	-rm -f $(ZIP_NAME)
	-rm -f $(TGZ_NAME)

