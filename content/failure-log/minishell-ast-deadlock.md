---
title: "Failure Log: The Minishell Pipe Deadlock"
date: "2023-08-20"
tags: [c, minishell, failure, debugging]
description: "How a missing close() brought my entire shell to a halt."
---

## The Symptom
During the evaluation of Minishell, testing a pipeline like `ls | grep .md | wc -l` would completely freeze the terminal. The process just hung indefinitely.

## The Root Cause
I had successfully piped `stdout` of one command to `stdin` of the next, but I forgot to `close()` the unused file descriptors in the parent process. Because the read end of the pipe was still open in the parent, the `wc` command never received an `EOF` (End of File) signal. It was waiting forever for more data.

## The Fix
I mapped out every single fork and file descriptor on a whiteboard. I implemented a strict policy: the parent must immediately close its copies of the pipe ends after forking the children.

## Lesson Learned
**File descriptors are like memory**: if you open them, you must explicitly close them. Trusting the OS to clean up only works when the process dies, not while it's running.
