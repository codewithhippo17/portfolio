---
title: "IRC Server"
category: "Networking"
date: "2023-10-01"
tags: [c++, networking, sockets, rfc]
role: "Backend Developer"
github: "https://github.com/codewithhippo17/IRC"
status: "completed"
featured: false
description: "A fully functional IRC server written in C++98."
---

## Overview

This project involves writing an Internet Relay Chat (IRC) server in C++98 that is compatible with actual IRC clients like HexChat or irssi. It handles multiple clients concurrently without freezing, using `poll()` or `select()`.

## Features

- Non-blocking I/O operations
- Implementation of core IRC commands (JOIN, PART, PRIVMSG, KICK, MODE, etc.)
- Channel management and user modes
- Secure authentication system
