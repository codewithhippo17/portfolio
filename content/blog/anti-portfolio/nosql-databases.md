---
title: "NoSQL Databases"
date: "2023-06-15"
tags: [anti-portfolio, database, architecture]
description: "Why I default to relational databases like MariaDB."
---

## The Avoidance
I generally avoid Document/NoSQL databases (like MongoDB) as the primary datastore for new applications, unless the schema is inherently unstructured.

## The Why
During the **Inception** project, I was tasked with deploying a full WordPress infrastructure. I configured MariaDB from scratch. It reinforced how powerful structured relationships, ACID compliance, and raw SQL queries truly are.

NoSQL is fantastic for massive horizontal scaling of unstructured JSON. However, 95% of business applications are deeply relational (Users have Posts, Posts have Comments). Trying to force relational data into a NoSQL document database often leads to massive application-level JOINs, which are incredibly slow and error-prone compared to a database-level `JOIN`.
