#!/bin/bash
. ./bin/activate
paver parse_docs
make html
deactivate
