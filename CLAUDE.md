# Claude project instructions

## Source of truth

The existing landing page in `landing-page/` is approved. Preserve its visual identity, messaging hierarchy, responsive behavior, sport picker, athlete imagery, play simulation, apparel presentation, and overall brand tone. Do not replace it with a generic SaaS template.

The screenshots and images in `references/` communicate the internal product direction. Use them as product references, not as final production code.

## Product goal

Build a working MVP of New Radical: a daily Game IQ challenge for athletes across baseball, basketball, soccer, football, volleyball, and jiu-jitsu.

The central loop is:

1. Choose a sport and position.
2. Watch a short pressure-play simulation.
3. Lock one of three decisions.
4. Reveal the correct answer and coach explanation.
5. Update Decision DNA attributes.
6. Add progress to the player's squad and season.
7. Return tomorrow for the next shared challenge.

## Non-negotiable design rules

- Preserve the New Radical graffiti logo and black, bone, and signal-red palette.
- The experience should feel competitive, cinematic, athletic, and premium.
- Use real athlete imagery where supplied; do not replace it with abstract gradients or generic illustrations.
- Mobile layouts must remain readable and avoid oversized headlines that break into excessive lines.
- Sport selection must visibly change the athlete image, challenge, simulation, answer choices, coach read, and Clinic content.
- Keep the daily experience focused. Avoid endless feeds, loot boxes, multiple currencies, and noisy notification patterns.
- Rewards should represent participation and accomplishment rather than chance.
- Apparel is part of the product value: the core line is open, while season finishes can unlock exclusive shirts, physical Marks, and squad treatments.

## Build approach

- First audit the existing files and explain the proposed architecture.
- Extend from the approved landing page rather than rebuilding it from memory.
- Establish reusable sport/challenge data models instead of hardcoding separate pages.
- Make the smallest coherent MVP functional before adding speculative features.
- Clearly identify which features are implemented, mocked, or deferred.
- Keep accessibility, mobile responsiveness, loading states, and error states in scope.
- Do not delete supplied assets without explicit approval.

## MVP priorities

1. Authentication and player onboarding.
2. Sport and position selection.
3. Daily challenge with animated simulation and three answers.
4. Correct-answer reveal, coach explanation, and response percentages.
5. Streak, points, Decision DNA, and challenge history.
6. Squad creation/invitations and a weekly board.
7. Personalized Clinic recommendations.
8. Eight-week season progression and reward unlock states.
9. Lightweight admin/content workflow for publishing daily challenges.

## Before major implementation

Provide:

- recommended stack and why;
- data model;
- route map;
- authentication and database plan;
- content-authoring approach;
- MVP milestones;
- questions that materially affect architecture or product behavior.

