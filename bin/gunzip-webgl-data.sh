#!/bin/bash

echo ""
echo "##### Decompress webgl data"

data_file="./public/webgl/Build/webgl.data.gz"

if [ -f "$data_file" ]; then
	gzip -d "$data_file"
fi
