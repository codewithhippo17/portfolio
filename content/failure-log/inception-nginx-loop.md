---
title: "The NGINX Crash Loop"
date: "2023-06-20"
tags: [failure, docker, nginx, devops]
description: "How a missing daemon setting caused infinite container restarts."
---

## The Symptom
During **Inception**, my NGINX container would start, print "Server running", and immediately exit with code 0. Docker Compose would then restart it, leading to an infinite crash loop.

## The Root Cause
By default, NGINX runs as a background daemon. Docker requires the main process of a container to run in the foreground. Because NGINX successfully started the background worker and then the foreground process exited, Docker assumed the container's job was done and shut it down.

## The Fix
I added `daemon off;` to my `nginx.conf` (or via command line argument). This forces NGINX to stay in the foreground, keeping the Docker container alive.

## Lesson Learned
Containers are not virtual machines. They don't run operating systems; they wrap a single process. If that process goes to the background, the container dies.
