import data from '../lib/data.json';

export const about = (): string => {
  const { greeting, education, location, summary, languages } = data.about;

  return `<h1 class="text-2xl terminal-prompt mb-4">About Me</h1>

${greeting}

<h2 class="text-lg terminal-prompt mt-4">🎓 Education</h2>
${education.map(item => `   • ${item}`).join('\n')}

<h2 class="text-lg terminal-prompt mt-4">🌍 Location</h2>
   ${location}

<h2 class="text-lg terminal-prompt mt-4">💡 Summary</h2>
${summary.map(item => `   • ${item}`).join('\n')}

<h2 class="text-lg terminal-prompt mt-4">🌐 Languages</h2>
${languages.map(item => `   • ${item}`).join('\n')}`;
};
