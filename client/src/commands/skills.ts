import data from '../lib/data.json';

export const skills = (): string => {
  const { technical, cybersecurity, soft, certifications } = data.skills;

  return `<h1 class="text-2xl terminal-prompt mb-4">Technical Skills</h1>

<h2 class="text-lg terminal-prompt mt-4">💻 Programming & Tech</h2>
${technical.map(item => `   • ${item}`).join('\n')}

<h2 class="text-lg terminal-prompt mt-4">🔒 Cybersecurity & IT</h2>
${cybersecurity.map(item => `   • ${item}`).join('\n')}

<h2 class="text-lg terminal-prompt mt-4">🧠 Soft Skills</h2>
${soft.map(item => `   • ${item}`).join('\n')}

<h2 class="text-lg terminal-prompt mt-4">🎓 Certifications (Selected)</h2>
${certifications.map(item => `   • ${item}`).join('\n')}`;
};
