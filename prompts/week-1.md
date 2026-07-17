# Week 1 starter prompts

Copy these into Claude Code (or Codex) one at a time. Read what the AI does after each one —
the diff is the lesson.

1. **Run the site**
   > Start the dev server and tell me the local URL.

2. **Get your bearings** — the whole repo in one minute. (One idea to hold onto: HTML is the words, CSS is the look, JS is the behavior. You'll meet each file as an exercise touches it.)
   > Give me a tour of this project: one sentence per folder or file, ordered by how often I'll touch them. Tell me which files hold what the pages say, which control how everything looks, and which decide what happens when I click.

3. **Make it yours**
   > Replace "Your Name" with my real name everywhere it appears — the nav, the homepage hero, the page titles, and the footer.

4. **First design change** — your colors live as named tokens in one file; change the token and everything using it follows.
   > Change the accent color token to something that feels like mine: [a hex code, a description like "deep forest green", or a thing — "the color of my water bottle"]. Give the color a name, show me which file you changed, and open /showcase so I can watch it land everywhere at once.

5. **Drive with precision** — one change, nothing else. You pick the target; checking the diff is the exercise.
   > On the homepage, change only [one small thing that bugs you — a button's shape, a heading's size, the space under the nav]. Don't touch the tokens file or anything else. Then show me exactly which lines changed so I can check you stayed inside the lines.

6. **Steer, don't restart** — send this vague ask on purpose. Look at what comes back, then correct it with one precise follow-up: keep what works, name what to drop, point at a token. Hate all of it? Tell the AI to undo everything it just did.
   > Make my homepage header more interesting.

7. **First commit**
   > Commit my changes with a clear message, then push to my GitHub repo.

8. **Go live** — the GitHub connection is the point: after this one-time setup, every push updates your live site on its own. Then verify like a pro — a link only counts when it opens for someone who isn't you.
   > Help me put this site on Vercel: I want to connect my GitHub repo on vercel.com (not the CLI) so every push deploys automatically. Walk me through it step by step, then give me the public URL. I'll open it in an incognito window to check it really loads — if it asks me to log in, that's Vercel's Deployment Protection; walk me through turning it off.

   Dashboard path if you need it: Vercel → your project → Settings → Deployment Protection → Disabled.
