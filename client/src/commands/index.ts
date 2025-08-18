import { about } from "./about";
import { contact } from "./contact";
import { help } from "./help";
import { projects } from "./projects";
import { skills } from "./skills";

export const commands: Record<string, () => string> = {
  help,
  "?": help,
  about,
  skills,
  projects,
  contact,
};
