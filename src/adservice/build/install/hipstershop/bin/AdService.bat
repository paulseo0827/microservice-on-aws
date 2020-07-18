@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  AdService startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Add default JVM options here. You can also use JAVA_OPTS and AD_SERVICE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Dlog4j2.contextDataInjector=io.opencensus.contrib.logcorrelation.log4j2.OpenCensusTraceContextDataInjector" "-agentpath:/opt/cprof/profiler_java_agent.so=-cprof_service=adservice,-cprof_service_version=1.0.0"

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\hipstershop-0.1.0-SNAPSHOT.jar;%APP_HOME%\lib\opencensus-exporter-stats-stackdriver-0.18.0.jar;%APP_HOME%\lib\google-cloud-monitoring-1.52.0.jar;%APP_HOME%\lib\opencensus-exporter-trace-stackdriver-0.18.0.jar;%APP_HOME%\lib\google-cloud-trace-0.70.0-beta.jar;%APP_HOME%\lib\google-cloud-core-grpc-1.52.0.jar;%APP_HOME%\lib\google-cloud-core-1.52.0.jar;%APP_HOME%\lib\proto-google-cloud-monitoring-v3-1.34.0.jar;%APP_HOME%\lib\proto-google-cloud-trace-v1-0.35.0.jar;%APP_HOME%\lib\proto-google-cloud-trace-v2-0.35.0.jar;%APP_HOME%\lib\proto-google-iam-v1-0.12.0.jar;%APP_HOME%\lib\gax-grpc-1.34.0.jar;%APP_HOME%\lib\grpc-services-1.17.0.jar;%APP_HOME%\lib\grpc-protobuf-1.17.0.jar;%APP_HOME%\lib\proto-google-common-protos-1.12.0.jar;%APP_HOME%\lib\opencensus-contrib-grpc-util-0.18.0.jar;%APP_HOME%\lib\opencensus-exporter-trace-jaeger-0.18.0.jar;%APP_HOME%\lib\opencensus-exporter-trace-logging-0.18.0.jar;%APP_HOME%\lib\opencensus-contrib-log-correlation-log4j2-0.18.0.jar;%APP_HOME%\lib\opencensus-impl-0.18.0.jar;%APP_HOME%\lib\opencensus-contrib-monitored-resource-util-0.18.0.jar;%APP_HOME%\lib\opencensus-impl-core-0.18.0.jar;%APP_HOME%\lib\grpc-netty-1.17.0.jar;%APP_HOME%\lib\grpc-netty-shaded-1.15.0.jar;%APP_HOME%\lib\grpc-auth-1.15.0.jar;%APP_HOME%\lib\grpc-stub-1.17.0.jar;%APP_HOME%\lib\grpc-protobuf-lite-1.17.0.jar;%APP_HOME%\lib\grpc-core-1.17.0.jar;%APP_HOME%\lib\opencensus-contrib-grpc-metrics-0.17.0.jar;%APP_HOME%\lib\opencensus-api-0.18.0.jar;%APP_HOME%\lib\log4j-core-2.11.1.jar;%APP_HOME%\lib\jackson-databind-2.9.6.jar;%APP_HOME%\lib\gax-1.34.0.jar;%APP_HOME%\lib\google-auth-library-oauth2-http-0.11.0.jar;%APP_HOME%\lib\google-http-client-jackson2-1.24.1.jar;%APP_HOME%\lib\jackson-core-2.9.6.jar;%APP_HOME%\lib\netty-tcnative-boringssl-static-2.0.8.Final.jar;%APP_HOME%\lib\protobuf-java-util-3.6.1.jar;%APP_HOME%\lib\protobuf-java-3.6.1.jar;%APP_HOME%\lib\grpc-context-1.17.0.jar;%APP_HOME%\lib\guava-26.0-android.jar;%APP_HOME%\lib\jaeger-core-0.27.0.jar;%APP_HOME%\lib\google-auth-library-credentials-0.11.0.jar;%APP_HOME%\lib\netty-codec-http2-4.1.30.Final.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.30.Final.jar;%APP_HOME%\lib\re2j-1.2.jar;%APP_HOME%\lib\log4j-api-2.11.1.jar;%APP_HOME%\lib\jackson-annotations-2.9.0.jar;%APP_HOME%\lib\disruptor-3.4.2.jar;%APP_HOME%\lib\jaeger-thrift-0.27.0.jar;%APP_HOME%\lib\opentracing-util-0.31.0.jar;%APP_HOME%\lib\opentracing-noop-0.31.0.jar;%APP_HOME%\lib\opentracing-api-0.31.0.jar;%APP_HOME%\lib\gson-2.8.2.jar;%APP_HOME%\lib\libthrift-0.9.2.jar;%APP_HOME%\lib\slf4j-api-1.7.25.jar;%APP_HOME%\lib\okhttp-3.9.0.jar;%APP_HOME%\lib\netty-codec-http-4.1.30.Final.jar;%APP_HOME%\lib\netty-handler-4.1.30.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.30.Final.jar;%APP_HOME%\lib\netty-codec-4.1.30.Final.jar;%APP_HOME%\lib\netty-transport-4.1.30.Final.jar;%APP_HOME%\lib\okio-1.13.0.jar;%APP_HOME%\lib\joda-time-2.9.2.jar;%APP_HOME%\lib\google-http-client-1.24.1.jar;%APP_HOME%\lib\api-common-1.7.0.jar;%APP_HOME%\lib\netty-buffer-4.1.30.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.30.Final.jar;%APP_HOME%\lib\httpclient-4.5.3.jar;%APP_HOME%\lib\httpcore-4.4.6.jar;%APP_HOME%\lib\threetenbp-1.3.3.jar;%APP_HOME%\lib\netty-common-4.1.30.Final.jar;%APP_HOME%\lib\error_prone_annotations-2.2.0.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\animal-sniffer-annotations-1.17.jar;%APP_HOME%\lib\checker-compat-qual-2.5.2.jar;%APP_HOME%\lib\j2objc-annotations-1.1.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\commons-codec-1.9.jar

@rem Execute AdService
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %AD_SERVICE_OPTS%  -classpath "%CLASSPATH%" hipstershop.AdService %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable AD_SERVICE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%AD_SERVICE_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
