import data from "../lib/data.json";

export const skills = (): string => {
  const { technical, cybersecurity, soft, certifications } = data.skills;

  return `┌─────────────────────────────────────────────────────────────┐
│                      TECHNICAL SKILLS                      │
└─────────────────────────────────────────────────────────────┘

💻 PROGRAMMING & TECH:
${technical.map((item) => `   • ${item}`).join("\n")}

🔒 CYBERSECURITY & IT:
${cybersecurity.map((item) => `   • ${item}`).join("\n")}

🧠 SOFT SKILLS:
${soft.map((item) => `   • ${item}`).join("\n")}

🎓 CERTIFICATIONS (Selected):
${certifications.map((item) => `   • ${item}`).join("\n")}`;
};
