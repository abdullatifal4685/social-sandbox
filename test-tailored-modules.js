/**
 * Unit test for tailored learning module validation.
 * Run with: node test-tailored-modules.js
 */

// Mock functions for testing
function validateTailoredPath(modules, goalDescription) {
  if (!Array.isArray(modules) || modules.length !== 6) {
    console.log(`  ❌ FAIL: Expected 6 modules, got ${modules.length}`);
    return false;
  }
  const goal = (goalDescription || "").toLowerCase();
  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    const combined = `${mod.title || ''} ${mod.summary || ''} ${(mod.points || []).join(' ')} ${mod.example || ''}`.toLowerCase();
    if (!combined.includes(goal)) {
      console.log(`  ❌ FAIL: Module ${i + 1} does not mention goal "${goalDescription}"`);
      console.log(`     Found: "${combined.substring(0, 80)}..."`);
      return false;
    }
  }
  console.log(`  ✓ PASS: All 6 modules mention goal "${goalDescription}"`);
  return true;
}

function buildLocalTailoredLearningPath(goalDescription) {
  const MODULE_SECTIONS = [
    {
      title: "1. Notice What Makes the Conversation Hard",
      summary: "A difficult conversation usually feels hard because the stakes, emotions, and relationships are all active at once.",
      points: [
        "Pause and identify what is making this conversation difficult.",
        "Set one intention: solve the issue while preserving respect.",
        "Prepare one opening sentence and one open question.",
      ],
      example: "Example: Instead of 'This is a mess', try 'I want us to address two delays before they affect delivery.'",
    }
  ];

  const goal = goalDescription || "your goal";
  return MODULE_SECTIONS.map((section, idx) => {
    const title = `${section.title} — Focus: ${goal}`;
    const summary = `${section.summary} This module is tailored to: ${goal}.`;
    const points = section.points.map((p) => {
      return `${p} (applies to: ${goal})`;
    });
    const example = `${section.example} Example tied to goal: ${goal}.`;
    return {
      id: `module-${idx + 1}`,
      title,
      summary,
      points,
      example,
      tailoredTo: goal,
    };
  });
}

// Test cases
console.log("\n=== Unit Tests: Tailored Module Validation ===\n");

// Test 1: Valid tailored path
console.log("Test 1: Valid tailored path with goal mention in all fields");
const goal1 = "Improve Listening & Empathy";
const validModules = Array.from({ length: 6 }, (_, i) => ({
  id: `module-${i + 1}`,
  title: `Module ${i + 1}: Practice ${goal1}`,
  summary: `Learn to ${goal1} in difficult situations`,
  points: [
    `Understand why ${goal1} matters`,
    `Practice ${goal1} techniques`,
    `Reflect on your ${goal1}`,
  ],
  example: `When you ${goal1}, you build trust`,
  tailoredTo: goal1,
}));
console.log("Input: 6 modules, all mentioning goal");
console.log(`Result: ${validateTailoredPath(validModules, goal1) ? "✓" : "✗"}`);

// Test 2: Invalid - wrong count
console.log("\nTest 2: Invalid - wrong module count");
const invalidCount = validModules.slice(0, 5);
console.log("Input: 5 modules (should be 6)");
console.log(`Result: ${validateTailoredPath(invalidCount, goal1) ? "✓" : "✗"}`);

// Test 3: Invalid - missing goal reference
console.log("\nTest 3: Invalid - module missing goal reference");
const missingGoal = validModules.map((m, i) => 
  i === 2 ? { ...m, summary: "Generic learning summary without specific goal" } : m
);
console.log("Input: Module 3 has summary without goal reference");
console.log(`Result: ${validateTailoredPath(missingGoal, goal1) ? "✓" : "✗"}`);

// Test 4: Fallback generation
console.log("\nTest 4: Local fallback generator produces tailored modules");
const goal2 = "Surface Risks & Bad News";
const fallbackModules = buildLocalTailoredLearningPath(goal2);
console.log(`Input: Goal "${goal2}"`);
console.log(`Generated ${fallbackModules.length} fallback modules`);
console.log(`Result: ${validateTailoredPath(fallbackModules, goal2) ? "✓" : "✗"}`);

// Test 5: Goal mention case-insensitive
console.log("\nTest 5: Goal matching is case-insensitive");
const caseTest = Array.from({ length: 6 }, (_, i) => ({
  id: `module-${i + 1}`,
  title: `Module ${i + 1}: PRACTICE ${goal1.toUpperCase()}`,
  summary: `Learn to improve listening & empathy in difficult situations`,
  points: [`Understand ${goal1.split(" ").join(" ")}`],
  example: `When you improve listening & empathy, you build trust`,
  tailoredTo: goal1,
}));
console.log("Input: Module titles in UPPERCASE, goal in original case");
console.log(`Result: ${validateTailoredPath(caseTest, goal1) ? "✓" : "✗"}`);

console.log("\n=== All tests completed ===\n");
