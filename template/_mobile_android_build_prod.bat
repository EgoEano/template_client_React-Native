@echo on
chcp 65001

cd /d %~dp0
cd android
gradlew assembleRelease
@REM gradlew assembleRelease > log_mobile_android_build_prod.txt 2>&1

pause