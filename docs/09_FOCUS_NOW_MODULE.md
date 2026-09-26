# MnsWorld — Focus Now Module

## Purpose

Focus Now should be the fastest path from opening MnsWorld to doing focused work.

## Main UI

Large timer centered on the page.

Primary:
- Start
- Pause
- Resume
- Reset

Presets:
- 25 / 5
- 50 / 10
- custom

## Timer State Machine

```text
IDLE
 -> RUNNING
 -> PAUSED
 -> RUNNING
 -> COMPLETED

Any active state
 -> RESET
```

## Timer Accuracy

Use timestamps:

```text
remaining = targetEndTime - now
```

Do not use a decrementing interval as the source of truth.

This avoids drift when the page is backgrounded, throttled, or busy.

## Session Recording

On completion:
- create a FocusSession
- store start/completion times
- store duration
- mark complete

## Visual Style

Compared with the rest of MnsWorld, Focus Now should be calmer:
- less visual noise
- strong typography
- subtle motion
- readable timer
- no distracting effects

## Optional Ambient Mode

Potential future options:
- soft moving light
- nature/space ambience
- simple local sound

## Future Metrics

- today's minutes
- weekly minutes
- completed sessions
- longest session
- streaks

Metrics remain secondary to the timer.
