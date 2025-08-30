export const help = (): string => {
  return `<h1 class="text-2xl terminal-prompt mb-4">Available Commands</h1>
<div class="grid grid-cols-2 gap-4">
<div>
<h2 class="text-lg terminal-prompt mt-4">Navigation</h2>
<p><span class="terminal-prompt">help, ?</span>     - Show available commands</p>
<p><span class="terminal-prompt">about</span>       - About me & background</p>
<p><span class="terminal-prompt">skills</span>      - Technical & soft skills</p>
<p><span class="terminal-prompt">projects</span>    - View portfolio projects</p>
<p><span class="terminal-prompt">contact</span>     - Get in touch</p>
<p><span class="terminal-prompt">clear</span>       - Clear terminal screen</p>
</div>
</div>
<br>
Type a command and press Enter to execute.`;
};
