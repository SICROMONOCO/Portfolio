import data from "../lib/data.json";

export const projects = (): string => {
  return `<h1 class="text-2xl terminal-prompt mb-4">Portfolio Projects</h1>

I'm just starting out, so my portfolio is still growing!

${data.projects.map((p) => `• <span class="terminal-prompt">${p.name}</span> (${p.description})`).join("\n")}

Find more on my GitHub: ${data.contact.socials.GitHub}
`;
};
