---
title: "Principle: Boring Technology is Good"
date: "2023-09-01"
tags: [principles, philosophy, architecture]
description: "Why predictability beats novelty in production systems."
---

## The Principle
**Choose technologies that have already failed in every possible way.**

## The Background
It's tempting to use the newest alpha framework hitting the front page of Hacker News. However, when you are building infrastructure (like in the **Inception** project), novelty is a liability.

## Application
I default to Postgres/MariaDB, Redis, and proven languages. If I introduce a new, "exciting" piece of technology, it must solve a problem that the boring technology absolutely cannot. If an application goes down at 3 AM, I want to be able to find a StackOverflow answer from 2014, not an open GitHub issue from two days ago.
