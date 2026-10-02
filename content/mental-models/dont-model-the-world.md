---
title: "Don't Model the World — Model the Work"
date: "2026-10-02"
tags: [mental-model, software-architecture, cpp]
description: "Why mirroring the real world in your type system is a trap, and how to draw encapsulation boundaries around operations instead of nouns."
thumbnail: "dont-model-the-world.jpg"
---

When I started learning OOP, I thought I was finally learning how to think clearly about software.

You have a `Vehicle`. A `Car` inherits from it. A `SportsCar` inherits from that. The real world has vehicles. Vehicles have cars. Cars have sports cars. The code mirrors the world. It felt rigorous — almost scientific.

It took me a few years of building real things to realize that feeling was a trap.

---

## The Category Error

The problem isn't classes, or encapsulation, or any of the syntax. The problem is something more specific: the belief that your **compile-time hierarchy should define your encapsulation boundaries, and that those boundaries should match your domain model**.

That sentence is worth sitting with.

When you write `Car extends Vehicle`, you're not just naming things. You're making a structural decision that gets baked into the type system. Every piece of code that touches `Car` now inherits the assumptions of `Vehicle`. The encapsulation boundary — what's hidden, what's exposed, what can change independently — is drawn around the domain concept, not around the computation.

That decision is locked in at compile time. And the domain model almost always turns out to be wrong.

---

## The Trap in Practice: C++ Pointers

During the C++ modules in the 42 curriculum, this wasn't just abstract theory — it was the literal assignment.

In C++ Module 04, you are instructed to build a textbook domain hierarchy for an RPG. You have an abstract `AMateria` class (spells like `Ice` and `Cure`). You have an `ICharacter` interface. A `Character` "equips" and "uses" `Materia`. 

Because a character conceptually "owns" its inventory in the real world, the encapsulation boundary is drawn exactly there. The `Character` class manages an array of `AMateria` pointers. It mirrors the domain model perfectly.

Then comes the reality of memory management in C++.

Because the compile-time boundary is locked around the domain nouns, implementing deep copies (the Orthodox Canonical Form) becomes a fragile nightmare. When a `Character` unequips a `Materia` and drops it on the floor, who owns that memory? The domain model says "the floor." The C++ compiler says "you have a memory leak." 

You end up writing complex workarounds — tracking pointers, building garbage-collection lists — just to handle a problem that *only exists because of your encapsulation boundary*.

---

## The Illusion of Ontology

Here is where the confusion comes from.

Humans are extraordinarily good at categorizing the physical world. Dogs are mammals. We've been doing this since Aristotle, and it works beautifully for communication. When I say "character," you know what I mean.

So when we sit down to build software, we ask "what are the things?" and draw boundaries around the answers. Then we use the type system to enforce those boundaries. 

The result is a codebase where the encapsulation reflects the domain ontology perfectly, but the actual data flow — the memory lifetimes, the hardware realities, the state transformations — is buried three layers deep in a hierarchy nobody designed for execution.

---

## Model the Work Instead

The alternative: **draw your encapsulation boundaries around operations, not nouns.**

Ask "what are the transformations this system needs to perform?" and build the structure backward from there. Where do things actually need to be hidden from each other — not conceptually, but computationally?

If we didn't have to mirror the domain model in that C++ project, the solution would have been trivial. A central `MateriaSystem` owns all the memory — a flat, contiguous array of structs. A `Character` doesn't "own" pointers; it just holds a few integer IDs (indexes into that array). 

When a character drops an item, you don't have to orchestrate a complex transfer of pointer ownership between a `Character` class and a `Floor` class. You just change a state flag in the `MateriaSystem` array. The code becomes radically simpler because the encapsulation boundary is drawn around *memory lifetime*, not around the philosophical concept of a "Character."

---

## The Ultimate Test

The category error I see most often in code reviews is a hierarchy that's philosophically accurate but computationally useless.

The code is correct. An `Ice` spell really is a kind of `Materia`. But that boundary is doing zero work for the computation. It's there because it felt responsible to model accurately — not because it makes the system easier to change or safer to run.

Real-world categories are for communication between people. Compile-time encapsulation boundaries are for managing what can change independently. These are different jobs. They produce different shapes. Conflating them is where the complexity comes from.

The test I use now: if a requirement changes what a concept *means*, how many types do I have to touch? If a change to the domain model cascades through the compile-time hierarchy, the encapsulation is working against you. The domain model has infected the type system, and now they can't evolve independently.

The world already has a model. It's called the world. Your types don't need to replicate it. They need to protect the parts of the computation that actually need to be independent.
