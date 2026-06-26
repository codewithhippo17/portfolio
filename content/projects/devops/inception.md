---
title: "Inception"
category: "DevOps"
date: "2023-06-01"
tags: [docker, docker-compose, nginx, mariadb, wordpress, devops]
role: "DevOps Engineer"
github: "https://github.com/codewithhippo17/Inception"
status: "completed"
featured: true
description: "A comprehensive Docker-based infrastructure virtualization project."
---

## Overview

Inception is a system administration project focused on Docker and containerization. The goal is to set up a small infrastructure composed of different services under specific rules, using Docker Compose.

## Architecture

- **NGINX**: The only entry point, configured with TLSv1.2/1.3.
- **WordPress + php-fpm**: Runs the main application.
- **MariaDB**: The database backend, isolated from the network.

All services are built from scratch (Alpine/Debian) without using pre-configured DockerHub images for the specific software (e.g., no `nginx:latest`, must install nginx on a base OS image).
