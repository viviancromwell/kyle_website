# Week 2 prompts — design direction

This week you teach the AI what your site is and how it should feel.
Two files at the repo root hold that: `PRODUCT.md` (what and who for) and
`DESIGN.md` (how it looks and feels). Once they're filled in, every design
prompt you run is steered by them.

These prompts use the **impeccable** skill — docs and before/after galleries
at [impeccable.style](https://impeccable.style).

Run these in order.

1. **The interview** — in Claude Code or Codex:
   > /impeccable teach

   The AI interviews you and writes `PRODUCT.md` from your answers. Answer like
   you talk. Be specific — "recruiters at small studios" beats "people."
   It may also offer to generate `DESIGN.md` from the current code — that would
   describe the starter's neutral look, which is fine: you'll replace it with
   your own direction in the next three steps.

2. **Three directions** — in Claude Code or Codex:
   > Read PRODUCT.md. Propose three different visual directions for this site — each with a name, a mood, two reference sites, and a rough color feeling. Make them genuinely different from each other, not three versions of the same idea.

3. **See them** — in the Codex app:
   > Generate a moodboard image for a portfolio site direction called "[name from step 2]": [paste its mood description]. Editorial, web design, no text in the image.

   One image per direction. Put them side by side. Which one feels like you?

4. **Capture the pick** — in Claude Code or Codex:
   > I'm choosing direction "[name]". Update DESIGN.md to describe it: mood and references, color direction, typography feeling, spacing and layout feel, motion personality, and what to avoid. Keep my answers from PRODUCT.md in mind. Also confirm the page list in PRODUCT.md — which pages my portfolio needs.

   Steps 1–5 are the in-session work: direction settled. Steps 6–9 happen
   through the week as you build.

5. **Commit**
   > Commit PRODUCT.md and DESIGN.md with a message that says which direction I chose and why.

6. **Make it real** — in Claude Code or Codex:
   > Update src/styles/tokens.css to match DESIGN.md — colors, fonts, type scale. Then start the dev server and open /showcase so I can see my system.

7. **First components** — run this in the **Codex app**, where `craft` can
   generate images: it plans the UX, asks direction questions, makes mock
   images, and waits for your approval before building:
   > /impeccable craft homepage hero

   Repeat with other pieces once the hero feels right. Always read the plan and
   look at the mocks before saying yes — that's the design review habit.

8. **Harvest your components** — after you've styled a few pages, find what
   you've been repeating and turn it into reusable pieces:
   > /impeccable extract

   It only extracts patterns you actually repeated — that's how real design
   systems are born: pulled out of work, not invented up front. Remember the
   house rule: each new component gets a demo on /showcase.

9. **Lock it in** — your tokens are real code now, so regenerate DESIGN.md from
   what actually exists:
   > /impeccable document

By Friday: design settled (both files filled in, your tokens live on /showcase),
navigation settled, and your real work starting to fill the pages. Components
come out of /impeccable extract as you go — no quota, just harvest what repeats.
Your site stops looking like the scaffold this week.
