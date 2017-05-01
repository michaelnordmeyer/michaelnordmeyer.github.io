---
title: WordPress Tuning and Monitoring
categories:
  - 'Technology'
tags:
  - 'WordPress'
---
In MySQL "show status" eingeben
tuning_primer.sh
top
tail -n 40 -f
The rule of thumb is that you should multiply the maximum number of connections (described below) by the maximum number of tables used in joins.

Optimierung des Lese-Performance

To control the maximum size of individual query results that can be cached, set the query_cache_limit system variable.

You can set the maximim size of each query that can be cached. If the query result is larger than the query cache limit, the results will not be cached. This is normally set to 1M:

query_cache_limit = 1M

The amount of memory globally available for query caches is set with the query cache size setting. This should be fairly large, and should be increased in size for large databases.

query_cache_size = 100M

To tune the query cache, use the show status command. This can be used to determine which settings need to be altered and to see the effect of alterations. The show status command will show you if the query cache is heavily in use and if you have free memory, which indicates whether the query cache buffer settings should be increased or decreased.

mysql> show status like "qcache%";

Optimierung des Schreib-Performance

we have noticed that the time used to contact the DNS server can be significant.
The solution is to enter DNS information in the /etc/hosts file on the database server.

Filesystem optimization: noatime

Mounting a filesystem with the noatime option disables the storage of information about file access. This information is normally not needed. This increases the performance of the filesystem as fewer disk writes need to be done.

We tested this method with an ext3 filesystem on SATA disks, generating 15 articles in one folder of an eZ Publish installation with 900.000 objects. We ran the test 3 times and recorded the average time:

    * Before noatme: 1.333 sec MySQL queries
    * After noatme: 1.262 sec MySQL queries

While this setting does not seem to generate a significant performance improvement (about a 5.3 % increase in MySQL processing time), we only did the test with concurrency of 1. If you increase the number of concurrent users the improvement should be more noticeable, as there will be fewer writes to the filesystem.