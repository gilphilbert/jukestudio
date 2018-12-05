#!/bin/sh

if [ -t 1 ]; then
	target="../vfs_fonts.js"
else
	target="/dev/stdout"
fi

(
	echo -n "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {"
	start=1
	for file in *ttf ; do
		if [ $start -eq 0 ]
		then
		  echo -n ",";
		else
		  start=0
		fi
		echo -n '"'
		echo -n "$(basename $file)"
		echo -n '":"'
		echo -n "$(base64 -w 0 $file)"
		echo -n '"'
	done
	for file in *png ; do
		if [ $start -eq 0 ]
		then
		  echo -n ",";
		else
		  start=0
		fi
		echo -n '"'
		echo -n "$(basename $file)"
		echo -n '":"'
		echo -n "$(base64 -w 0 $file)"
		echo -n '"'
	done
	echo -n "};"
) > "$target"
