import data from "../lib/data.json";

export const contact = (): string => {
  return `<h1 class="text-2xl terminal-prompt mb-4">Contact Information</h1>

<h2 class="text-lg terminal-prompt mt-4">📧 Email</h2>
   ${data.contact.email}

<h2 class="text-lg terminal-prompt mt-4">📱 Phone</h2>
   ${data.contact.phone}

<h2 class="text-lg terminal-prompt mt-4">💼 Professional Networks</h2>
   🔗 LinkedIn: ${data.contact.socials.LinkedIn}
   💻 GitHub: ${data.contact.socials.GitHub}

<h2 class="text-lg terminal-prompt mt-4">📍 Location</h2>
   ${data.contact.location}

Feel free to reach out for collaboration, questions, or opportunities!`;
};
