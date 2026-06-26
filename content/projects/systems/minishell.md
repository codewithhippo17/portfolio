---
title: "Minishell"
category: "Systems"
date: "2023-08-01"
tags: [c, shell, posix, linux]
role: "Developer"
github: "https://github.com/codewithhippo17/Minishell"
status: "completed"
featured: true
description: "A compact, modular, POSIX-like shell implemented in C."
---

## Overview

Minishell is a project from 42 School that requires creating a simple bash-like shell. It involves parsing user input, handling processes, and executing commands just like a real shell.

## Features

- **Lexer/Parser**: Tokenization and Abstract Syntax Tree (AST) generation.
- **Expander**: Handles environment variables (`$VAR`) and exit status (`$?`).
- **Executor**: Full pipeline support using `fork`, `execve`, and `pipe`.
- **Redirections**: Input/output redirection (`>`, `<`, `>>`, `<<` heredoc).
- **Builtins**: `cd`, `echo`, `pwd`, `export`, `unset`, `env`, `exit`.
- **Signal Handling**: `Ctrl-C`, `Ctrl-D`, `Ctrl-\`.
