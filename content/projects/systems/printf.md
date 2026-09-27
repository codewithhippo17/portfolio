---
title: "ft_printf"
description: "Because putnbr and putstr aren't enough."
category: "Systems"
date: "2023-02-15"
tags: ["C", "Variadic Functions", "Formatting"]
role: "Developer"
github: "https://github.com/codewithhippo17/pritf"
status: "completed"
---

## Overview

The `ft_printf` project is about recreating the behavior of the standard C library `printf` function. This project introduces variadic functions in C and string formatting logic.

## Features

- **Variadic Arguments**: Utilizing `stdarg.h` to handle a variable number of arguments.
- **Format Specifiers**: Supports standard conversions including `%c`, `%s`, `%p`, `%d`, `%i`, `%u`, `%x`, `%X`, and `%%`.
- **Extensible Design**: Structured cleanly to allow future feature additions such as padding, precision, and width flags.
