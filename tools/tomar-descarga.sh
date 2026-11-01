#!/usr/bin/env bash
# Moves the most recently created Gemini download (< 3 min old) to tools/out/<name>.
# Usage: bash tools/tomar-descarga.sh ia-nombre.jpg
cd /c/Users/carlos/Downloads || exit 1
now=$(date +%s); best=""; bt=0
for f in Gemini_Generated_Image_*; do [ -f "$f" ] || continue; b=$(stat -c %W "$f"); if [ $((now-b)) -lt 180 ] && [ "$b" -gt "$bt" ]; then best="$f"; bt=$b; fi; done
[ -n "$best" ] || { echo "no reciente"; exit 1; }
cp "$best" "/c/Users/carlos/truly-uruguay/tools/out/$1" && echo "ok $1 $(stat -c %s "/c/Users/carlos/truly-uruguay/tools/out/$1")"
