---
title: "Architecture is Damage Control"
date: "2026-10-02"
tags: [software-architecture, system-design, c]
description: "Why software isn't a monument, and why building boundaries is like building bulkheads in a submarine."
thumbnail: "architecture-is-damage-control.webp"
---

When I first learned about software architecture, I pictured a blueprint. I thought a senior engineer sat in a quiet room, mapped out every class and database table perfectly, and then handed the schematics down to be built.

That's how monuments are built. But software isn't a monument. It's a living system that actively wants to collapse under its own weight.

Most large software projects don't fail because of poor initial planning. They fail because they succeed. They grow, requirements change, more engineers touch the code, and eventually, the coupling becomes so dense that changing the color of a button somehow breaks the database connection.

---

## The Monolithic Implosion

I learned this the hard way during the 42 curriculum when I had to build a Unix shell from scratch in C (the `minishell` project).

At first, the goal seemed simple: read a string from the prompt, split it by spaces, and pass it to `execve()`. Because the scope seemed manageable, I wrote it the way most junior engineers do. I put the input reading, the string splitting, and the process execution inside one massive, tangled loop.

It worked perfectly for `ls -l`. Until it didn't.

When the requirement dropped to support pipes (`|`), environment variable expansion (`$USER`), and nested quotes, my architecture imploded. Suddenly, my string-splitting logic was trying to manage process forks and file descriptors. I changed a line of code to handle double quotes, and random pipes started hanging. 

I had built a system where everything knew about everything else. I had no boundaries.

---

## The Submarine Metaphor

That was when I realized what architecture actually is. It's not a master plan for the future. It's a system of bulkheads in a submarine.

In a submarine, you don't build the ship assuming it will never leak. You assume it *will* leak, and you build heavy steel doors between compartments so that when one room floods, the whole ship doesn't sink.

In software, modules are those compartments. Boundaries stop the bleeding.

To survive `minishell`, I had to tear it down and build bulkheads: a Lexer that *only* turned strings into tokens, a Parser that *only* organized tokens into a command table, and an Executor that *only* handled process forks. 

If my Lexer was a strict black box, I could rewrite how it handled quotes without the Executor ever knowing. The Executor didn't know what a quote was. The Lexer didn't know what a process fork was.

The API is a contract. The implementation should be disposable. The golden rule isn't "write perfect code." It's "write code that is easy to delete." It is always faster to write five lines of decoupled code today than to write one highly coupled line today and try to untangle it six months from now.

---

## State is a Liability

This leads to a second realization: state is a liability. 

Global state, or state shared loosely across modules, creates invisible dependencies. It is the water flooding over the bulkheads. When you localize state ruthlessly, you force data to pass through your strict APIs. You make the dependencies visible. If a developer can't hold the entire state of a module in their head, the module is too big.

This also changes how you view testing. We usually think of tests as a way to prove our code works. But in a large system, tests serve a structural purpose. They physically enforce decoupling. If a component is difficult to write a unit test for, it's almost always because it has too many dependencies or hidden state. Code that resists testing is exposing an architectural failure. 

---

## Optimize for Isolation

You cannot predict what a codebase will need a year from now. If you try, you will build heavy, speculative abstractions that you don't actually need — what we call "future-proofing." And future-proofing usually just makes the present miserable.

Instead of trying to predict the future, optimize for isolation.

Start simple. Draw merciless boundaries between your domains. Treat every module as a black box. Build the system so that when you inevitably realize you got the implementation wrong, tearing it out and replacing it is merely difficult, not impossible.
