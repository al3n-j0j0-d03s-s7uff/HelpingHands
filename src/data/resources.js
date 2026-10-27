// Original demo educational content written for the HelpingHands prototype.
// These are general wellbeing notes, not clinical or medical guidance.

export const RESOURCES = [
  {
    id: "r1",
    category: "Stress Management",
    title: "Three small habits that ease everyday stress",
    summary:
      "Simple, low-effort routines you can build into a busy student schedule to keep day-to-day stress from piling up.",
    content:
      "Stress tends to build quietly — a missed break here, a late night there — until it feels constant. Three habits can help interrupt that pattern. First, protect short breaks between study blocks instead of skipping them; even five minutes away from a screen helps your mind reset. Second, keep a consistent wake-up time, since irregular mornings tend to throw off mood and focus more than irregular bedtimes do. Third, name what's stressing you out in one sentence, out loud or on paper — vague worry feels heavier than a worry you've actually put into words. None of these fix a hard week on their own, but stacked together they make the week easier to carry.",
  },
  {
    id: "r2",
    category: "Stress Management",
    title: "What a manageable workload actually looks like",
    summary:
      "A quick way to check if your week is realistically planned, before stress catches up with you.",
    content:
      "It's easy to plan a week around an idealized version of yourself who never gets tired, never gets stuck in traffic, and never needs downtime. A more honest plan leaves visible gaps: buffer time between commitments, one lighter day if possible, and an explicit stopping point each evening. If your calendar has no room for anything going wrong, it's not a realistic plan — it's a best-case scenario. Building in slack isn't laziness; it's what keeps a hard week from becoming an overwhelming one.",
  },
  {
    id: "r3",
    category: "Exam Anxiety",
    title: "Reframing the night before an exam",
    summary:
      "Why last-minute cramming often backfires, and what to do with those final hours instead.",
    content:
      "The night before an exam often feels like it should be spent absorbing as much as possible, but research on memory consistently shows that cramming new material late is one of the least effective ways to retain it. A calmer, often more useful approach is to review a short summary of what you already know, get a reasonable amount of sleep, and prepare practical things — stationery, ID, directions — so the morning has one less thing to worry about. Confidence on exam day usually comes more from feeling rested and prepared than from one extra hour of reading.",
  },
  {
    id: "r4",
    category: "Exam Anxiety",
    title: "Managing a racing mind during the exam itself",
    summary:
      "A short, practical technique for the moment your mind goes blank mid-exam.",
    content:
      "Going blank mid-exam is common, and panicking about it usually makes it worse. A useful first step is to stop trying to force the answer and instead do something physical and small — put your pen down, take three slow breaths, and reread the question from the start as if seeing it for the first time. This brief pause interrupts the anxiety spiral long enough for your mind to reset. If a question still won't come, move on and return to it later; often the answer surfaces once the pressure of that specific moment has passed.",
  },
  {
    id: "r5",
    category: "Sleep & Wellbeing",
    title: "Why irregular sleep affects mood more than short sleep",
    summary:
      "The case for a consistent sleep schedule, even when you can't always get eight hours.",
    content:
      "It's tempting to think the main sleep goal is hitting a certain number of hours, but consistency matters just as much. Going to bed and waking up at wildly different times — even if the total hours add up — can leave your body in a constant state of mild jet lag. A steadier, even if imperfect, schedule tends to support mood and concentration better than an inconsistent one that occasionally hits eight hours. If a full routine overhaul feels unrealistic, start with just the wake-up time and keep it fixed for a couple of weeks.",
  },
  {
    id: "r6",
    category: "Sleep & Wellbeing",
    title: "Making your wind-down routine actually work",
    summary:
      "What to change if you're in bed but still lying awake for an hour.",
    content:
      "Lying in bed unable to sleep is often less about the bed and more about what happened in the hour before it. Screens, stimulating conversations, or unresolved to-do lists all keep the mind active right when it needs to slow down. A simple fix is to build a short buffer zone — ten to twenty minutes of low-stimulation activity like stretching, reading something light, or writing down tomorrow's first task so it stops circling in your head. The goal isn't a perfect ritual, just a clear signal to your mind that the day is done.",
  },
  {
    id: "r7",
    category: "Coping with Loneliness",
    title: "Why loneliness on a busy campus is still common",
    summary:
      "Understanding why being surrounded by people doesn't always prevent feeling isolated.",
    content:
      "It can feel confusing to be lonely in a place full of people, but loneliness is about connection quality, not headcount. Passing hundreds of classmates a day doesn't create the sense of being known that comes from even one or two steady relationships. Recognizing this distinction can take some of the self-blame out of the experience — the issue usually isn't a personal failure to socialize enough, but a gap in the kind of connection available. Small, repeated interactions with the same few people tend to build that sense of being known faster than trying to meet many new people at once.",
  },
  {
    id: "r8",
    category: "Coping with Loneliness",
    title: "Low-pressure ways to rebuild social connection",
    summary:
      "Practical starting points when reaching out feels like too much effort right now.",
    content:
      "When loneliness sets in, the idea of putting yourself out there can feel exhausting, which often keeps people stuck. Lower-pressure starting points help: joining a recurring activity where you see the same faces each week, messaging one person instead of a group, or simply keeping a regular routine in a shared space like a library or common room. Familiarity, more than big social effort, is usually what turns strangers into acquaintances and acquaintances into friends.",
  },
  {
    id: "r9",
    category: "Understanding Counselling",
    title: "What actually happens in a first counselling session",
    summary:
      "A plain-language walkthrough of what to expect if you've never spoken to a psychologist before.",
    content:
      "A first session is usually less intense than people expect. Most of it involves the psychologist asking about what brought you in, your current situation, and a bit of background, so they can understand your context rather than jump to conclusions. There's no obligation to have a polished explanation ready — describing things in a rough, unstructured way is completely normal. By the end, a good first session usually leaves you with a clearer sense of whether the approach feels like a fit, not a finished diagnosis or treatment plan.",
  },
  {
    id: "r10",
    category: "Understanding Counselling",
    title: "Counselling vs. therapy vs. psychiatry — the practical difference",
    summary:
      "A short, non-technical guide to which type of professional support might fit different situations.",
    content:
      "These terms often get used interchangeably, but they refer to different kinds of support. Counselling generally focuses on a specific, more immediate concern over a shorter timeframe. Therapy (or psychotherapy) tends to go deeper into longer-standing patterns and can run over a longer period. Psychiatry involves a medical doctor who can assess and prescribe medication when appropriate, often alongside therapy rather than instead of it. None of these labels are strict rules, and many professionals blend approaches — the important part is finding someone whose style matches what you're looking for.",
  },
  {
    id: "r11",
    category: "When to Seek Professional Help",
    title: "Signs that it might be time to talk to someone",
    summary:
      "General, non-clinical signals that professional support could be worth considering.",
    content:
      "There's no single threshold that means you should seek support — it's more about noticing a pattern. If low mood, worry, or exhaustion has lasted for weeks rather than days, if it's starting to affect classes, sleep, or relationships, or if you find yourself avoiding things you used to manage fine, those are reasonable signals to consider talking to a professional. You don't need a crisis to justify seeking help; early conversations are often easier and more useful than waiting until things feel unmanageable.",
  },
  {
    id: "r12",
    category: "When to Seek Professional Help",
    title: "You don't need a diagnosis to start looking for support",
    summary:
      "Why waiting for certainty before reaching out often delays help unnecessarily.",
    content:
      "A common reason students delay seeking help is feeling like their problem isn't 'serious enough' or that they should be able to name exactly what's wrong first. In practice, psychologists are used to working with vague, in-progress descriptions — that's part of the process, not a prerequisite for it. Waiting for a clear label before reaching out often just delays support that could help sooner. If something feels off, that's already a reasonable enough reason to explore finding someone to talk to.",
  },
];

export function getResourceById(id) {
  return RESOURCES.find((r) => r.id === id);
}
