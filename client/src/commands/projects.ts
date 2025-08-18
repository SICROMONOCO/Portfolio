import data from "../lib/data.json";

export const projects = (): string => {
  return `┌─────────────────────────────────────────────────────────────┐
│                     PORTFOLIO PROJECTS                     │
└─────────────────────────────────────────────────────────────┘

I'm just starting out, so my portfolio is still growing!

${data.projects.map((p) => `• ${p.name} (${p.description})`).join("\n")}

Find more on my GitHub: ${data.contact.socials.GitHub}
`;
};
