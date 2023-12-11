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

all: build

build:
	rm -rf $(SRCDIR)/dist
	$(NODE) $(BUNDLER).config.js

.PHONY: build
.PHONY: all
