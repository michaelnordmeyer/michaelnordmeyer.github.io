---
title: MySQL Tuning for WordPress
---
Take a look at the `Qcache_total_blocks` and `Qcache_queries_in_cache` variables from the output of `SHOW STATUS LIKE '%qcache%';`. If you see a ratio near 1:1, you might benefit from lowering `query_cache_min_res_unit` value.

The lock contention problems would still be an issue, but you would see the limit hit when “Waiting for query cache lock” proceses.

    | Qcache_free_blocks | 824 |
    | Qcache_free_memory | 14924088 |
    | Qcache_hits | 300319 |
    | Qcache_inserts | 510690 |
    | Qcache_lowmem_prunes | 0 |
    | Qcache_not_cached | 37421 |
    | Qcache_queries_in_cache | 694 |
    | Qcache_total_blocks | 2236 |

`SHOW VARIABLES LIKE 'query_cache_*'`

https://dev.mysql.com/doc/refman/5.7/en/query-cache-configuration.html
https://major.io/2007/08/08/mysqls-query-cache-explained/

    $ tuning-primer.sh
     
    	-- MYSQL PERFORMANCE TUNING PRIMER --
    	     - By: Matthew Montgomery -
    
    MySQL Version 5.7.18-0ubuntu0.17.04.1-log x86_64
    
    Uptime = 2 days 15 hrs 18 min 14 sec
    Avg. qps = 1
    Total Questions = 441664
    Threads Connected = 1
    
    Server has been running for over 48hrs.
    It should be safe to follow these recommendations
    
    To find out more information on how each of these
    runtime variables effects performance visit:
    http://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html
    Visit http://www.mysql.com/products/enterprise/advisors.html
    for info about MySQL's Enterprise Monitoring and Advisory Service
    
    SLOW QUERIES
    The slow query log is NOT enabled.
    Current long_query_time = 1.000000 sec.
    You have 4837 out of 441685 that take longer than 1.000000 sec. to complete
    Your long_query_time seems to be fine
    
    BINARY UPDATE LOG
    The binary update log is NOT enabled.
    You will not be able to do point in time recovery
    See http://dev.mysql.com/doc/refman/5.7/en/point-in-time-recovery.html
    
    WORKER THREADS
    Current thread_cache_size = 10
    Current threads_cached = 3
    Current threads_per_sec = 0
    Historic threads_per_sec = 0
    Your thread_cache_size is fine
    
    MAX CONNECTIONS
    Current max_connections = 10
    Current threads_connected = 1
    Historic max_used_connections = 4
    The number of used connections is 40% of the configured maximum.
    Your max_connections variable seems to be fine.
    
    No InnoDB Support Enabled!
    
    MEMORY USAGE
    Max Memory Ever Allocated : 80 M
    Configured Max Per-thread Buffers : 27 M
    Configured Max Global Buffers : 69 M
    Configured Max Memory Limit : 96 M
    Physical Memory : 486 M
    Max memory limit seem to be within acceptable norms
    
    KEY BUFFER
    Current MyISAM index space = 43 K
    Current key_buffer_size = 1 M
    Key cache miss rate is 1 : 31
    Key buffer free ratio = 81 %
    Your key_buffer_size seems to be fine
    
    QUERY CACHE
    Query cache is enabled
    Current query_cache_size = 4 M
    Current query_cache_used = 16 K
    Current query_cache_limit = 1 M
    Current Query cache Memory fill ratio = .40 %
    Current query_cache_min_res_unit = 1 K
    Your query_cache_size seems to be too high.
    Perhaps you can use these resources elsewhere
    MySQL won't cache query results that are larger than query_cache_limit in size
    
    SORT OPERATIONS
    Current sort_buffer_size = 1 M
    Current read_rnd_buffer_size = 256 K
    Sort buffer seems to be fine
    
    JOINS
    Current join_buffer_size = 260.00 K
    You have had 39 queries where a join could not use an index properly
    You should enable "log-queries-not-using-indexes"
    Then look for non indexed joins in the slow query log.
    If you are unable to optimize your queries you may want to increase your
    join_buffer_size to accommodate larger joins in one pass.
    
    Note! This script will still suggest raising the join_buffer_size when
    ANY joins not using indexes are found.
    
    OPEN FILES LIMIT
    Current open_files_limit = 1024 files
    The open_files_limit should typically be set to at least 2x-3x
    that of table_cache if you have heavy MyISAM usage.
    Your open_files_limit value seems to be fine
    
    TABLE CACHE
    Current table_open_cache = 502 tables
    Current table_definition_cache = 651 tables
    You have a total of 233 tables
    You have 354 open tables.
    The table_cache value seems to be fine
    
    TEMP TABLES
    Current max_heap_table_size = 8 M
    Current tmp_table_size = 8 M
    Of 63154 temp tables, 34% were created on disk
    Perhaps you should increase your tmp_table_size and/or max_heap_table_size
    to reduce the number of disk-based temporary tables
    Note! BLOB and TEXT columns are not allow in memory tables.
    If you are using these columns raising these values might not impact your 
    ratio of on disk temp tables.
    
    TABLE SCANS
    Current read_buffer_size = 1 M
    Current table scan ratio = 5 : 1
    read_buffer_size seems to be fine
    
    TABLE LOCKING
    Current Lock Wait ratio = 0 : 441868
    Your table locking seems to be fine

    $ mysqltuner.pl

     >>  MySQLTuner 1.7.0 - Major Hayden <major@mhtx.net>
     >>  Bug reports, feature requests, and downloads at http://mysqltuner.com/
     >>  Run with '--help' for additional options and output filtering
    
    [--] Skipped version check for MySQLTuner script
    [OK] Logged in using credentials from debian maintenance account.
    [OK] Currently running supported MySQL version 5.7.18-0ubuntu0.17.04.1-log
    [OK] Operating on 64-bit architecture
     
    -------- Log file Recommendations ------------------------------------------------------------------
    [--] Log file: stderr(0B)
    [!!] Log file stderr doesn't exist
    [!!] Log file stderr isn't readable.
     
    -------- Storage Engine Statistics -----------------------------------------------------------------
    [--] Status: -ARCHIVE -BLACKHOLE +CSV -FEDERATED +InnoDB +MEMORY +MRG_MYISAM +MyISAM +PERFORMANCE_SCHEMA 
    [--] Data in InnoDB tables: 111M (Tables: 115)
    [OK] Total fragmented tables: 0
     
    -------- Security Recommendations ------------------------------------------------------------------
    [OK] There are no anonymous accounts for any database users
    [OK] All database users have passwords assigned
    [--] There are 612 basic passwords in the list.
     
    -------- CVE Security Recommendations --------------------------------------------------------------
    [OK] NO SECURITY CVE FOUND FOR YOUR VERSION
     
    -------- Performance Metrics -----------------------------------------------------------------------
    [--] Up for: 2d 17h 8m 34s (448K q [1.914 qps], 25K conn, TX: 432M, RX: 197M)
    [--] Reads / Writes: 78% / 22%
    [--] Binary logging is disabled
    [--] Physical Memory     : 486.1M
    [--] Max MySQL memory    : 104.5M
    [--] Other process memory: 281.9M
    [--] Total buffers: 77.0M global + 2.8M per thread (10 max threads)
    [--] P_S Max memory usage: 0B
    [--] Galera GCache Max memory usage: 0B
    [OK] Maximum reached memory usage: 88.0M (18.10% of installed RAM)
    [OK] Maximum possible memory usage: 104.5M (21.50% of installed RAM)
    [OK] Overall possible memory usage with other process is compatible with memory available
    [OK] Slow queries: 1% (4K/448K)
    [OK] Highest usage of available connections: 40% (4/10)
    [OK] Aborted connections: 0.01%  (2/25897)
    [OK] Query cache is disabled by default due to mutex contention on multiprocessor machines.
    [OK] Sorts requiring temporary tables: 0% (3 temp sorts / 82K sorts)
    [OK] No joins without indexes
    [!!] Temporary tables created on disk: 53% (34K on disk / 64K total)
    [OK] Thread cache hit rate: 99% (4 created / 25K connections)
    [OK] Table cache hit rate: 96% (354 open / 367 opened)
    [OK] Open file limit used: 2% (25/1K)
    [OK] Table locks acquired immediately: 100% (988 immediate / 988 locks)
     
    -------- Performance schema ------------------------------------------------------------------------
    [--] Performance schema is disabled.
    [--] Memory used by P_S: 0B
    [--] Sys schema is installed.
     
    -------- ThreadPool Metrics ------------------------------------------------------------------------
    [--] ThreadPool stat is disabled.
     
    -------- MyISAM Metrics ----------------------------------------------------------------------------
    [!!] Key buffer used: 18.9% (198K used / 1M cache)
    [OK] Key buffer size / total MyISAM indexes: 1.0M/43.0K
    [OK] Read Key buffer hit rate: 97.0% (234 cached / 7 reads)
     
    -------- InnoDB Metrics ----------------------------------------------------------------------------
    [--] InnoDB is enabled.
    [--] InnoDB Thread Concurrency: 0
    [OK] InnoDB File per table is activated
    [!!] InnoDB buffer pool / data size: 48.0M/111.5M
    [OK] InnoDB log file size / InnoDB Buffer pool size: 6.0M * 2/48.0M should be equal 25%
    [OK] InnoDB buffer pool instances: 1
    [--] Number of InnoDB Buffer Pool Chunk : 6 for 1 Buffer Pool Instance(s)
    [OK] Innodb_buffer_pool_size aligned with Innodb_buffer_pool_chunk_size & Innodb_buffer_pool_instances
    [OK] InnoDB Read buffer efficiency: 99.89% (21143165 hits/ 21165971 total)
    [!!] InnoDB Write Log efficiency: 71.86% (240793 hits/ 335086 total)
    [OK] InnoDB log waits: 0.00% (0 waits / 94293 writes)
     
    -------- AriaDB Metrics ----------------------------------------------------------------------------
    [--] AriaDB is disabled.
     
    -------- TokuDB Metrics ----------------------------------------------------------------------------
    [--] TokuDB is disabled.
     
    -------- XtraDB Metrics ----------------------------------------------------------------------------
    [--] XtraDB is disabled.
     
    -------- RocksDB Metrics ---------------------------------------------------------------------------
    [--] RocksDB is disabled.
     
    -------- Spider Metrics ----------------------------------------------------------------------------
    [--] Spider is disabled.
     
    -------- Connect Metrics ---------------------------------------------------------------------------
    [--] Connect is disabled.
     
    -------- Galera Metrics ----------------------------------------------------------------------------
    [--] Galera is disabled.
     
    -------- Replication Metrics -----------------------------------------------------------------------
    [--] Galera Synchronous replication: NO
    [--] No replication slave(s) for this server.
    [--] This is a standalone server.
     
    -------- Recommendations ---------------------------------------------------------------------------
    General recommendations:
        When making adjustments, make tmp_table_size/max_heap_table_size equal
        Reduce your SELECT DISTINCT queries which have no LIMIT clause
        Performance should be activated for better diagnostics
    Variables to adjust:
        tmp_table_size (> 8M)
        max_heap_table_size (> 8M)
        performance_schema = ON enable PFS
        innodb_buffer_pool_size (>= 111M) if possible.
