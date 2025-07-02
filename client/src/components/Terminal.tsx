import { useState, useEffect, useRef, useCallback } from 'react';

interface Command {
  description: string;
  execute: (args: string[]) => string | null;
}

interface TerminalState {
  history: string[];
  historyIndex: number;
  isTyping: boolean;
  output: Array<{ content: string; mobileContent?: string; type: 'normal' | 'error' | 'prompt' | 'command-title' }>;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const desktopWelcomeMessage = `+------------------------------------+\n| ____  _ _       _   ____  _ _    _ |\n|| __ )(_) | __ _| | / ___|(_) | _(_)|\n||  _ \\| | |/ _\` | | \\___ \\| | |/ / ||\n|| |_) | | | (_| | |  ___) | |   <| ||\n||____/|_|_|\\__,_|_| |____/|_|_|\\_\\_||\n+------------------------------------+\n\nWelcome to Bilal Siki's Terminal Portfolio!\n> Type 'help' to see available commands.\n> Enjoy exploring in cyber style!`;

  const mobileWelcomeMessage = `+-------------------+\n| ____  _ _       _ |\n|| __ )(_) | __ _| ||\n||  _ \\| | |/ _\` | ||\n|| |_) | | | (_| | ||\n||____/|_|_|\\__,_|_||\n| ____  _ _    _    |\n|/ ___|(_) | _(_)   |\n|\\___ \\| | |/ / |   |\n| ___) | |   <| |   |\n||____/|_|_|\\_\\_|   |\n+-------------------+\n\nWelcome to Bilal Siki's Terminal Portfolio!\n> Type 'help' to get started.\n> Mobile cyber experience activated!`;

  const welcomeMessage = {
    content: desktopWelcomeMessage,
    mobileContent: mobileWelcomeMessage,
    type: 'normal' as const
  };

  const [terminalState, setTerminalState] = useState<TerminalState>({
    history: [],
    historyIndex: -1,
    isTyping: false,
    output: [welcomeMessage]
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, Command> = {
    help: {
      description: "Display available commands",
      execute: () => {
        return `Available commands:

  help, ?          Show this help message
  about           Display information about me
  skills          List my technical and soft skills
  projects        Show my portfolio projects
  contact         Display contact information
  clear           Clear the terminal screen

Type any command and press Enter to execute.`;
      }
    },
    '?': {
      description: "Display available commands",
      execute: () => commands.help.execute([])
    },
    about: {
      description: "Display information about me",
      execute: () => {
        return `┌─────────────────────────────────────────────────────────────┐\n│                         ABOUT ME                            │\n└─────────────────────────────────────────────────────────────┘\n\n👋 Hello! I'm Bilal Siki, a Cybersecurity Student at Ibn Zohr University.\n\n🎓 EDUCATION:\n   • Ibn Zohr University, Morocco\n   • General Baccalauréat (Experimental Science) Score: 15.88 (Jul 2024) \n\n🌍 LOCATION:\n   Ouarzazate, Drâa-Tafilalet, Morocco\n\n💡 SUMMARY:\n   • Passionate about cybersecurity and technology\n   • Eager to learn and grow in the field\n   • Strong foundation in science and mathematics\n   • Motivated self-learner, open to new challenges\n\n🌐 LANGUAGES:\n   • Arabic (Native/Bilingual)\n   • English (Limited working proficiency)\n   • French (Elementary proficiency)`;
      }
    },
    skills: {
      description: "List technical and soft skills",
      execute: () => {
        return `┌─────────────────────────────────────────────────────────────┐\n│                      TECHNICAL SKILLS                      │\n└─────────────────────────────────────────────────────────────┘\n\n💻 PROGRAMMING & TECH:\n   • Python (Beginner)\n   • C (Beginner)\n   • HTML, CSS (Beginner)\n   • Bash scripting (Basic)\n   • MySQL (Basic)\n\n🔒 CYBERSECURITY & IT:\n   • Cybersecurity Fundamentals\n   • Critical Infrastructure Protection\n   • Cybersecurity Awareness\n\n🧠 SOFT SKILLS:\n   • Critical Thinking\n   • Communication\n   • Multitasking\n   • Project Management (Intro)\n\n🎓 CERTIFICATIONS (Selected):\n   • CS50's Introduction to Cybersecurity (Harvard Online)\n   • Introduction to Cybersecurity (Cisco)\n   • Introduction to Critical Infrastructure Protection (OPSWAT)\n   • AICE (AI, Project Management, Multitasking)\n   • Python for Beginners, C, HTML (SoloLearn)\n   • EF SET English Certificate (C1 Advanced)\n`;
      }
    },
    projects: {
      description: "Show portfolio projects",
      execute: () => {
        return `┌─────────────────────────────────────────────────────────────┐\n│                     PORTFOLIO PROJECTS                     │\n└─────────────────────────────────────────────────────────────┘\n\nI'm just starting out, so my portfolio is still growing!\n\n• CyberPack (TypeScript)\n• SQL-Project (Python, MySQL)\n\nFind more on my GitHub: github.com/SICROMONOCO\n`;
      }
    },
    contact: {
      description: "Display contact information",
      execute: () => {
        return `┌─────────────────────────────────────────────────────────────┐\n│                      CONTACT INFORMATION                   │\n└─────────────────────────────────────────────────────────────┘\n\n�� EMAIL:\n   bilal06siki@gmail.com\n\n📱 PHONE:\n   +212 723-537180\n\n💼 PROFESSIONAL NETWORKS:\n   🔗 LinkedIn: linkedin.com/in/bilal-siki-3ba436320\n   💻 GitHub: github.com/SICROMONOCO\n\n📍 LOCATION:\n   Ouarzazate, Morocco\n\nFeel free to reach out for collaboration, questions, or opportunities!`;
      }
    },
    clear: {
      description: "Clear the terminal screen",
      execute: () => {
        setTerminalState(prev => ({ ...prev, output: [welcomeMessage] }));
        return null;
      }
    },
    '777': {
      description: "???",
      execute: () => {
        return `
┌──────────────────────────────────────────────┐
│        🎉 JACKPOT! SECRET UNLOCKED! 🎉        │
├──────────────────────────────────────────────┤
│                                              │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│   ░   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ░   │
│   ░   ▒   7   7   7   ▒   7   7   7   ▒   ░   │
│   ░   ▒ JACKPOT! 777 ▒   ▒  JACKPOT!  ▒   ░   │
│   ░   ▒   7   7   7   ▒   7   7   7   ▒   ░   │
│   ░   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   ░   │
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
│                                              │
│  Congratulations! You found the secret! 🎰    │
│  Take a screenshot and share it with Bilal!   │
└──────────────────────────────────────────────┘
        `;
      }
    },
    commands: {
      description: "List all available commands",
      execute: () => {
        return `┌─────────────────────────────────────────────┐\n│                COMMANDS LIST                │\n└─────────────────────────────────────────────┘\n\nhelp, ?      Show help message\nabout        About Bilal Siki\nskills       Technical and soft skills\nprojects     Portfolio projects\ncontact      Contact information\nresume       Download my resume\nclear        Clear the terminal\ncommands     List all commands\n777          ??? (secret)\n`;
      }
    },
    resume: {
      description: "Download my resume",
      execute: () => {
        return `You can download my resume here:\n[Download Resume](#)\n(Replace '#' with your actual resume link)`;
      }
    },
  };

  const addToOutput = useCallback((content: string, type: 'normal' | 'error' | 'prompt' = 'normal') => {
    setTerminalState(prev => ({
      ...prev,
      output: [...prev.output, { content, type }]
    }));
  }, []);

  const typeOutput = useCallback(async (text: string, type: 'normal' | 'error' = 'normal') => {
    setTerminalState(prev => ({ ...prev, isTyping: true }));
    // Show processing animation
    setTerminalState(prev => ({
      ...prev,
      output: [...prev.output, { content: 'Processing...', type: 'prompt' }]
    }));
    // Add empty output line that will be filled with typing effect
    const outputIndex = terminalState.output.length + 1;
    await new Promise(resolve => setTimeout(resolve, 400)); // Short delay for effect
    setTerminalState(prev => {
      const newOutput = [...prev.output];
      newOutput[outputIndex - 1] = { content: '', type };
      return { ...prev, output: newOutput };
    });
    const lines = text.split('\n');
    let currentText = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        await new Promise(resolve => setTimeout(resolve, 1));
        currentText += line[j];
        setTerminalState(prev => {
          const newOutput = [...prev.output];
          newOutput[outputIndex - 1] = { content: currentText, type };
          return { ...prev, output: newOutput };
        });
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }
      if (i < lines.length - 1) {
        currentText += '\n';
      }
    }
    setTerminalState(prev => ({ ...prev, isTyping: false }));
  }, [terminalState.output.length, addToOutput]);

  const executeCommand = useCallback(async () => {
    if (!input.trim() || terminalState.isTyping) return;

    const command = input.trim();
    
    // Add to history
    setTerminalState(prev => ({
      ...prev,
      history: [...prev.history, command],
      historyIndex: prev.history.length + 1
    }));

    // Display command
    addToOutput(`bilal06siki@Portfolio:~$ ${command}`, 'prompt');

    // Parse and execute
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    if (commands[cmd]) {
      const result = commands[cmd].execute(args);
      if (result !== null) {
        await typeOutput(result);
      }
    } else {
      await typeOutput(`Command not found: ${cmd}\nType 'help' or 'commands' for available commands.`, 'error');
    }

    setInput('');
  }, [input, terminalState.isTyping, addToOutput, typeOutput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (terminalState.isTyping) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        executeCommand();
        break;
      case 'ArrowUp':
        e.preventDefault();
        setTerminalState((prev: TerminalState) => {
          const newIndex = Math.max(0, prev.historyIndex - 1);
          return {
            ...prev,
            historyIndex: newIndex
          };
        });
        if (terminalState.history[terminalState.historyIndex - 1]) {
          setInput(terminalState.history[terminalState.historyIndex - 1]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setTerminalState((prev: TerminalState) => {
          const newIndex = Math.min(prev.history.length, prev.historyIndex + 1);
          return {
            ...prev,
            historyIndex: newIndex
          };
        });
        if (terminalState.historyIndex + 1 < terminalState.history.length) {
          setInput(terminalState.history[terminalState.historyIndex + 1]);
        } else {
          setInput('');
        }
        break;
      case 'Tab':
        e.preventDefault();
        const partial = input.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
        
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          addToOutput(`bilal06siki@Portfolio:~$ ${input}`, 'prompt');
          addToOutput(`Possible completions: ${matches.join(', ')}`);
        }
        break;
    }
  }, [input, terminalState.isTyping, terminalState.history, terminalState.historyIndex, executeCommand, addToOutput]);

  useEffect(() => {
    if (inputRef.current && !terminalState.isTyping) {
      inputRef.current.focus();
    }
  }, [terminalState.isTyping]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalState.output]);

  const handleClick = () => {
    if (inputRef.current && !terminalState.isTyping) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-full flex flex-col max-w-full terminal-bg" onClick={handleClick} aria-label="Terminal Portfolio Main Area">
      {/* Cyberpunk Terminal Header */}
      <div className="cyber-border scan-line p-2 sm:p-3 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="terminal-muted text-[10px] sm:text-xs italic mr-2 hidden sm:inline-block">— Crafted by Bilal Siki © 2024 —</span>
            <span className="terminal-prompt text-xs sm:text-sm font-bold truncate">
              <span className="hidden sm:inline">┌─[bilal06siki@Portfolio]─[~]</span>
              <span className="sm:hidden">[bilal06siki@Portfolio]</span>
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="terminal-accent text-xs hidden sm:inline">
              ◉ SECURE CONNECTION
            </span>
            <span className="terminal-accent text-xs sm:hidden">
              ◉
            </span>
            <span className="terminal-muted text-xs">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {/* Last updated label */}
            <span className="terminal-muted text-[10px] sm:text-xs ml-2 italic" title="Last profile update">
              Last updated: {new Date('2024-06-09T23:00:00').toLocaleDateString()} {/* Update this date as needed */}
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        ref={outputRef}
        className="flex-1 p-2 sm:p-4 overflow-y-auto min-h-0 cyber-border border-t-0 max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] bg-black"
        aria-label="Terminal Output Area"
      >
        {terminalState.output.map((line, index) => (
          <div key={index} className="mb-1 sm:mb-2">
            {line.type === 'command-title' ? (
              <div className="text-center text-lg sm:text-xl font-bold text-terminal-accent py-2 border-b border-terminal-accent mb-2">
                {line.content}
              </div>
            ) : line.mobileContent ? (
              <>
                <pre className={`hidden sm:block whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed ${
                  line.type === 'error' ? 'terminal-error' : 
                  line.type === 'prompt' ? 'terminal-prompt' : 
                  'terminal-text'
                }`}>
                  {line.content}
                </pre>
                <pre className={`sm:hidden whitespace-pre-wrap font-mono text-xs leading-relaxed ${
                  line.type === 'error' ? 'terminal-error' : 
                  line.type === 'prompt' ? 'terminal-prompt' : 
                  'terminal-text'
                }`}>
                  {line.mobileContent}
                </pre>
              </>
            ) : (
              <pre className={`whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed ${
                line.type === 'error' ? 'terminal-error' : 
                line.type === 'prompt' ? 'terminal-prompt' : 
                'terminal-text'
              }`}>
                {line.content}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Command Input Area */}
      <div className="p-2 sm:p-4 terminal-bg cyber-border border-t">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="terminal-prompt font-bold text-xs sm:text-sm flex-shrink-0">
            <span className="hidden sm:inline">└─[bilal06siki@Portfolio]─[~]$</span>
            <span className="sm:hidden">$</span>
          </span>
          <div className="flex-1 relative min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent terminal-text outline-none border-none font-mono text-xs sm:text-base"
              autoComplete="off"
              spellCheck="false"
              disabled={terminalState.isTyping}
              aria-label="Terminal Command Input"
            />
            <span className="absolute terminal-text blink">▋</span>
          </div>
        </div>
      </div>
    </div>
  );
}
