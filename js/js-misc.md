# JS MISC

## Event Loop

* https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
* thread gets its own event loop
* execute script, then microtasks (right after currently executing scripts) like promises
* and then new tasks, such as `setTimeout`
* Mutation Observer also queues microtask

* bubbling, will radiate upwards and affect each parent to that div