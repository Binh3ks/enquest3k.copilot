# Project — EngQuest3K

## What this is

An English-learning web app for Vietnamese K-12 students, designed to take a learner from absolute beginner (A1) to upper-intermediate (B1+) over three school years.

The product is structured as a **156-week curriculum** delivered as 16 learning stations per week. Each week is a self-contained unit of content, exercises, and AI-mediated conversation. A student is never "in the app" abstractly — they are always in a specific week, working through a specific set of stations.

## Who it is for

| Tier | Mode | Audience |
|---|---|---|
| Tier 1 | Easy | Personal / domestic students; first contact with English |
| Tier 2–3 | Advanced | Global / international-track students; exam-oriented |

The same week is taught twice — once in Easy mode, once in Advanced — with differentiated content depth, not just translated strings.

## Goals

1. **Reach B1+ in 3 years** for the median student who uses the app at the recommended cadence.
2. **Carry the cognitive load, not the teacher.** AI Tutor handles conversational reinforcement; teachers focus on classroom delivery.
3. **Stay shippable week-by-week.** New weeks deploy as they pass quality gates; nothing waits for "v2.0".
4. **Chunk-first pedagogy.** Multi-word collocations are the primary teaching unit; single-word bolds do not exist.

## Scope (today)

| | |
|---|---|
| Curriculum total | 156 weeks |
| Stations per week | 16 (Read, Vocab, Grammar, Logic, AI Tutor, Games, …) |
| Deployed | ~34 weeks |
| In production | W33+ |

Up-to-date numbers live in `memory/CURRENT.md` and in `Production Progress` tables in `CLAUDE.md`. Do not hard-code counts in this file.

## Engineering philosophy

- **Weeks are the atomic unit of change.** A week ships or it does not; there is no "half-week". Quality gates run on weeks, not on the codebase.
- **Content is data, not code.** The 156-week curriculum lives in JS data files, versioned with the app. Content edits go through the same review and validation pipeline as code edits.
- **Dual modes are siblings, not forks.** Easy and Advanced content share the same station layout and the same validation rules, but the content itself differs. They are parallel products, not a hierarchy.
- **Validation is a gate, not a check.** A week that fails any validator does not deploy. Validators are loud and explicit; no soft warnings.
- **The next agent should not have to re-derive anything.** Memory, decisions, knowledge, and the architecture in this folder exist so the next session starts with full context.

## What this project is NOT

- Not a CMS. The curriculum is shipped with the app, not edited at runtime.
- Not a generic LLM chatbot. The AI Tutor is scoped to the current week, the current chunk focus, and an explicit empathy contract.
- Not a fork of any open-source product. EngQuest3K is built for the Vietnamese K-12 curriculum specifically.

## Related

- `STACK.md` — what we built it with
- `ARCHITECTURE.md` — how it is organized
- `RULES.md` — what cannot be changed
- `memory/CURRENT.md` — what is happening this week
