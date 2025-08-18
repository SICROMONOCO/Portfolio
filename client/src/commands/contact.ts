import data from '../lib/data.json';

export const contact = (): string => {
  return `┌─────────────────────────────────────────────────────────────┐
│                      CONTACT INFORMATION                   │
└─────────────────────────────────────────────────────────────┘

📧 EMAIL:
   ${data.contact.email}

📱 PHONE:
   ${data.contact.phone}

💼 PROFESSIONAL NETWORKS:
   🔗 LinkedIn: ${data.contact.socials.LinkedIn}
   💻 GitHub: ${data.contact.socials.GitHub}

📍 LOCATION:
   ${data.contact.location}

Feel free to reach out for collaboration, questions, or opportunities!`;
};
