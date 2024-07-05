#!/usr/bin/make

# Make and Shell behavior
SHELL = /usr/bin/bash
.ONESHELL:
.DELETE_ON_ERROR:
.DEFAULT_GOAL := all
.EXPORT_ALL_VARIABLES:

# Include package information
include ./PACKAGE

# Critical Paths
SRCDIR := .
BUILDIR := $(SRCDIR)/build
DISTDIR := $(SRCDIR)/dist

# Programs
NODE = node
BUNDLER = esbuild

# Mode
MODE?=production
node=node

all: build

build:
	rm -rf $(SRCDIR)/dist
	$(NODE) $(BUNDLER).config.js

run: file?=tmp/scratch.js
run: $(file)
	@if [[ "$${file:-}" == "" ]]; then
		echo "Usage: 'make run file [args]'"
		exit 1
	fi
	extension="$${file##*.}"
	case $$extension in
	sh)
		$(SHELL) $(file) $(args)
		;;
	js)
		$(node) $(file) $(args)
		;;
	*)
		echo "Unrecognized extension: $$extension"
		echo "Failed to 'make $@ $^'"
		;;
	esac

.DEFAULT:
	@if [ ! -f "$<" ]; then
	echo "Missing file $${file:-}"
	exit 1
	fi


clean:
	rm -rf node_modules
	rm -f package-lock.json

.PHONY: clean
.PHONY: build
.PHONY: all
