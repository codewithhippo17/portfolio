---
title: "Minitalk"
description: "A small data exchange program using UNIX signals."
category: "Systems"
date: "2023-04-05"
tags: ["C", "UNIX Signals", "IPC"]
role: "Developer"
thumbnail: "minitalk.webp"
github: "https://github.com/codewithhippo17/minitalk"
status: "completed"
---

## Overview

Minitalk is a project aimed at creating a client-server communication program that relies entirely on UNIX signals (`SIGUSR1` and `SIGUSR2`).

## Features

- **Signal Handling**: Robust usage of `sigaction` to catch and process signals asynchronously.
- **Bitwise Operations**: Translating characters and strings into binary bits to send them one by one across processes.
- **Inter-Process Communication (IPC)**: Reliable data transmission over the OS signal queuing system, ensuring messages are re-assembled correctly by the server.
- **PID Targeting**: The client targets the server process exclusively via its Process ID (PID).
