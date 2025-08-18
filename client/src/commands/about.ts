import data from '../lib/data.json';

export const about = (): string => {
  const { greeting, education, location, summary, languages } = data.about;

  return `┌─────────────────────────────────────────────────────────────┐
│                         ABOUT ME                            │
└─────────────────────────────────────────────────────────────┘

${greeting}

🎓 EDUCATION:
${education.map(item => `   • ${item}`).join('\n')}

🌍 LOCATION:
   ${location}

💡 SUMMARY:
${summary.map(item => `   • ${item}`).join('\n')}

🌐 LANGUAGES:
${languages.map(item => `   • ${item}`).join('\n')}`;
};
