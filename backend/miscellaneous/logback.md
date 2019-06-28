# Logback

[ref](https://www.baeldung.com/logback#example)
- A logger is an acenstor when its name, followed by a dot, prefixes a descendant logger's name
  - like.. package children
  - all loggers are descendants of the predefined root logger
    - defaults to `DEBUG` level
- a logger has a level, which can be set via config or within the code
  - code overrides what is in config
  - `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`
  - if logger level isn't explicitly defined, will default to level of closest ancestor
- has parameterized messages for String concatenation
- default behaviour of logback: if it cannot find a config file, will create a ConsoleAppender and associate it with the root logger
- can debug configuration via `<configuration debug="true">...</configuration>`
  - can also list out all configurations
  - and also reload config automatically over a `scanPeriod`
- logback also supports variable substitutions
  - `<property name="LOG_DIR" value="/var/log/application"/>` and then used with `${LOG_DIR}`
  - can also set the property variable from the JVM as a `-Dparameter`
- Loggers pass LoggingEvents to Appenders
  - Appenders actually do the logging work
    - appender names are used for referencing within the logback.xml configuration
    - `ConsoleAppender` appends messages to `System.out` or `System.err`
    - `FileAppender` appends messages to a file
    - Appenders are cumulative and will flow downwards from the root level
      - to override this, use `additivity="false"`
    - `RollingFileAppender` can roll based on time, log file size, or combination of both
      - use RollingPolicy
      - can also compress log files