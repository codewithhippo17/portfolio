---
title: "The Invisible Data Race"
date: "2023-03-25"
tags: [failure, threads, concurrency, c]
description: "Why Helgrind is a concurrent programmer's best friend."
---

## The Symptom
My **Philosophers** simulation ran perfectly for exactly 3 minutes, then a philosopher would inexplicably die of starvation even though they supposedly had both forks.

## The Root Cause
I was using a boolean flag `is_dead` to signal all threads to stop. While I thought reading a boolean was "atomic", multiple threads were checking the flag at the exact millisecond another thread was updating it. This caused a subtle data race that desynced the timing loop by just a few microseconds on each pass. Over 3 minutes, those microseconds compounded until a philosopher starved.

## The Fix
I wrapped the `is_dead` flag access in a dedicated mutex: `pthread_mutex_lock(&death_lock);`. Every single read or write to that variable required the lock.

## Lesson Learned
There is no such thing as a "safe" read of a shared variable across threads in C without atomics or mutexes. If it's shared, it must be locked.
