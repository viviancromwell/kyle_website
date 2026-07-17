# Studio Starter

Your portfolio site for the **AI-Native Design Studio** course. You'll clone this in
Week 1, and by the end of Week 4 it will be your finished, live portfolio.

It works right now — it's just deliberately plain. The design is what you add.

## Get started

```bash
npm install
npm run dev
```

Open the local URL it prints. Then open `prompts/week-1.md` and run the prompts.

## Two words you'll hear constantly

- A **skill** is a reusable instruction set that teaches the AI how to do one job well.
- An **agent** is the AI actually doing a job, using those instructions.

This repo ships with skills preinstalled — in `.claude/skills/` for Claude Code and
`.agents/skills/` for the Codex app, so both tools are ready out of the box. You don't
need to understand them all on day one — each one gets introduced in the week that uses it.

Quick check that both sides work: ask Claude Code `What skills are installed in this
repo?`, and in the Codex app try `/impeccable teach` — if Codex doesn't recognize it,
ask it `Do you see a skill in .agents/skills?`

## The skills in this studio

Every skill ships preinstalled for both Claude Code (`.claude/skills/`) and the Codex
app (`.agents/skills/`). Each gets introduced in the week that uses it.

| Skill | What it does | Week | Learn more |
|---|---|---|---|
| **impeccable** | The design driver: direction, critique, refinement. Reads your `PRODUCT.md` + `DESIGN.md`. Commands you'll use: `teach`, `craft`, `extract`, `document`, `animate`. | 2+ | [impeccable.style](https://impeccable.style) |
| **frontend-design** | *Makes* things — new sections, pages, components. (Impeccable *judges* them.) | 2+ | [SKILL.md](.claude/skills/frontend-design/SKILL.md) |
| **vocabulary** | A reverse dictionary for design. Ask "what's the word for…" and get the precise term — you can only prompt what you can name. | any | [index.how/to/articulate](https://index.how/to/articulate) |
| **animation-vocabulary** | The motion sibling of vocabulary — describe an effect loosely ("the bouncy thing when a popover opens") and get its real name. | 3 | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| **emil-design-engineering** | The motion judge: easing, duration, pairing, frequency. Passive — wakes up only when a prompt names it. Pairing rule: impeccable picks *where* motion goes, this sets *how it feels*. | 3 | [animations.dev](https://animations.dev) |
| **apple-design** | Apple's fluid-interface playbook translated to the web — springs, gestures, motion you can grab and reverse mid-flight. For when your site starts to move. | 3 | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| **review-animations** | A strict reviewer for motion code — approval is earned, not given. Run it by name before you ship an animation. | 4 | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| **improve-animations** | The motion advisor — surveys all your animation code and hands back a prioritized fix plan. Review judges one change; this maps the whole. | 4 | [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| **design-rules** | The house rules — tokens only, image rules, the three-artifacts sync. Applies to every edit automatically; nobody runs it. | always | [SKILL.md](.claude/skills/design-rules/SKILL.md) |
| **rams** | Accessibility and visual design review (WCAG). | 4 | [SKILL.md](.claude/skills/rams/SKILL.md) |
| **favicon** | Generates your full favicon set from one image. | 4 | [SKILL.md](.claude/skills/favicon/SKILL.md) |
| **polish** | Cleans up AI-generated code before commits. | 4 | [SKILL.md](.claude/skills/polish/SKILL.md) |

## The map

| Week | You fill in |
|---|---|
| 1 | Clone, make it yours (name, one color), deploy. Your site is live from day one. |
| 2 | `PRODUCT.md` + `DESIGN.md`, your tokens in `src/styles/tokens.css`, components. Watch `/showcase`. |
| 3 | The case-study page with a real project, plus motion. |
| 4 | Polish: experiments (type, layout, color), the quality gates, favicon, launch. Not "done" — live, plus the loop to keep improving it. |

## Pages

- `/` — home
- `/work/` — work index
- `/work/first-project/` — case-study template (rename it when you fill it)
- `/about/` — about + contact
- `/showcase/` — your design system, rendered live from `tokens.css`. **This is where you
  look at your system** — keep it open in a tab while you design. It, `tokens.css`, and
  `DESIGN.md` must always tell the same story.

You can add pages once these are done — this scaffold is the floor, not the ceiling.
