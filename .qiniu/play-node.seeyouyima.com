#/usr/bin/env bash

rm -rf /Users/wujunchuan/.qshell/qupload/
# 不要执行删除`qupload`缓存文件,保证不会重复上传
echo 'removed qupload folder'
qshell -d qupload  ./play-node.seeyouyima.com.json
