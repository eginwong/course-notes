# Concurrency and Multi-threading in Java

- Process do not share common memory, threads do
    * processes have their own virtual memory space, isolated, cooperate over IPC
- Thread instance has states
    * NEW
    * RUNNABLE
    * BLOCKED
    * WAITING
    * TIMED_WAITING
    * TERMINATED
- Runnable has single `run` method, meant to be run in a separate thread, no return value or unchecked exceptions
- Callable interface has single `call` method that has a value + exceptions
- Daemon thread is a thread that does not prevent the JVM from exiting
    * `setDaemon(true)` to indicate this
- Executor and ExecutorService are interfaces, with single execute method for accepting a Runnable instance
    * ExecutorService does more and handles lifecycle of thread
        * `ThreadPoolExecutor`, `ScheduledThreadPoolExecutor`, `ForkJoinPool`
- **Semaphore** can be counted, more of an ongoing count lock, like a thread pool
- **Mutex** is for guarding stuff, and is usually only 0 or 1, mutual exclusion semaphore