import { useState, useEffect, useRef, useCallback } from "react";
import { commands } from "../commands";

interface TerminalState {
  history: string[];
  historyIndex: number;
  isTyping: boolean;
  output: Array<{
    content: string;
    mobileContent?: string;
    type: "normal" | "error" | "prompt" | "command-title";
  }>;
}

// Utility to find and wrap URLs in anchor tags
const linkify = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    // Check if the URL is already in an anchor tag to avoid double wrapping
    if (text.includes(`href="${url}"`)) {
      return url;
    }
    const href = url.startsWith("http") ? url : `https://${url}`;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:underline">${url}</a>`;
  });
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const desktopWelcomeMessage = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
                                                              
  Connecting to Bilal Siki's Terminal v1.0.0...
  Connection established ✓
  Type 'help' to see available commands
`;

  const mobileWelcomeMessage = `
██████████████████████████
█ Bilal Siki Terminal v1 █
██████████████████████████

Connection ✓
Type 'help' for commands
`;

  const welcomeMessage = {
    content: desktopWelcomeMessage,
    mobileContent: mobileWelcomeMessage,
    type: "normal" as const,
  };

  const [terminalState, setTerminalState] = useState<TerminalState>({
    history: [],
    historyIndex: -1,
    isTyping: false,
    output: [welcomeMessage],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const addToOutput = useCallback(
    (content: string, type: "normal" | "error" | "prompt" = "normal") => {
      setTerminalState((prev) => ({
        ...prev,
        output: [...prev.output, { content, type }],
      }));
    },
    [],
  );

  const typeOutput = useCallback(
    async (text: string, type: "normal" | "error" = "normal") => {
      setTerminalState((prev) => ({ ...prev, isTyping: true }));
      setTerminalState((prev) => ({
        ...prev,
        output: [...prev.output, { content: "Processing...", type: "prompt" }],
      }));

      const outputIndex = terminalState.output.length + 1;
      await new Promise((resolve) => setTimeout(resolve, 400));

      setTerminalState((prev) => {
        const newOutput = [...prev.output];
        newOutput[outputIndex - 1] = { content: "", type };
        return { ...prev, output: newOutput };
      });

      const lines = text.split("\n");
      let currentText = "";
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
          await new Promise((resolve) => setTimeout(resolve, 1));
          currentText += line[j];
          setTerminalState((prev) => {
            const newOutput = [...prev.output];
            newOutput[outputIndex - 1] = { content: currentText, type };
            return { ...prev, output: newOutput };
          });
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        }
        if (i < lines.length - 1) {
          currentText += "\n";
        }
      }
      setTerminalState((prev) => ({ ...prev, isTyping: false }));
    },
    [terminalState.output.length],
  );

  const executeCommand = useCallback(async () => {
    if (!input.trim() || terminalState.isTyping) return;

    const command = input.trim();
    setTerminalState((prev) => ({
      ...prev,
      history: [...prev.history, command],
      historyIndex: prev.history.length + 1,
    }));

    addToOutput(`bilal06siki@Portfolio:~$ ${command}`, "prompt");

    const [cmd] = command.toLowerCase().split(" ");

    if (cmd === "clear") {
      setTerminalState((prev) => ({ ...prev, output: [welcomeMessage] }));
    } else if (commands[cmd]) {
      const result = commands[cmd]();
      await typeOutput(result);
    } else {
      await typeOutput(
        `Command not found: ${cmd}\nType 'help' for available commands.`,
        "error",
      );
    }

    setInput("");
  }, [input, terminalState.isTyping, addToOutput, typeOutput, welcomeMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (terminalState.isTyping) {
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          executeCommand();
          break;
        case "ArrowUp":
          e.preventDefault();
          setTerminalState((prev) => {
            const newIndex = Math.max(0, prev.historyIndex - 1);
            if (prev.history[newIndex]) {
              setInput(prev.history[newIndex]);
            }
            return { ...prev, historyIndex: newIndex };
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setTerminalState((prev) => {
            const newIndex = Math.min(
              prev.history.length,
              prev.historyIndex + 1,
            );
            setInput(prev.history[newIndex] || "");
            return { ...prev, historyIndex: newIndex };
          });
          break;
        case "Escape":
          e.preventDefault();
          setInput("");
          setTerminalState((prev) => ({
            ...prev,
            isTyping: false,
            historyIndex: prev.history.length,
          }));
          break;
      }
    },
    [terminalState, executeCommand],
  );

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
    <div
      className="w-full h-screen bg-black animate-fade-in-up"
      onClick={handleClick}
      aria-label="Terminal Portfolio Main Area"
    >
      <div className="fixed top-0 left-0 right-0 z-20 cyber-border scan-line p-2 sm:p-3 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="terminal-prompt text-xs sm:text-sm font-bold truncate ml-2 sm:ml-4">
              <span className="hidden sm:inline">
                ┌─[bilal06siki@Portfolio]─[~]
              </span>
              <span className="sm:hidden">[bilal06siki@Portfolio]</span>
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="terminal-accent text-xs font-bold">◉ SECURE</span>
            <span className="terminal-muted text-xs ml-2">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={outputRef}
        className="h-full overflow-y-auto px-2 sm:px-3 cyber-border border-t-0 bg-black shadow-inner pt-16 pb-28"
        aria-label="Terminal Output Area"
      >
        {terminalState.output.map((line, index) => (
          <div
            key={index}
            className={`animate-fade-in ${
              line.type === "error"
                ? "mb-2 p-2 rounded bg-red-950/60 border border-red-700 text-red-300 font-mono"
                : line.type === "prompt"
                  ? "mb-2 p-2 rounded bg-gray-900/60 border border-gray-700 text-green-300 font-mono"
                  : "mb-2 p-2 rounded bg-gray-800/60 border border-gray-700 text-gray-100 font-mono"
            }`}
          >
            {line.mobileContent ? (
              <>
                <pre
                  className="hidden sm:block whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-['Ubuntu_Mono']"
                  dangerouslySetInnerHTML={{ __html: linkify(line.content) }}
                />
                <pre
                  className="sm:hidden whitespace-pre-wrap text-xs leading-relaxed font-['Ubuntu_Mono']"
                  dangerouslySetInnerHTML={{
                    __html: linkify(line.mobileContent),
                  }}
                />
              </>
            ) : (
              <pre
                className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-['Ubuntu_Mono']"
                dangerouslySetInnerHTML={{ __html: linkify(line.content) }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="cyber-border p-2 sm:p-4 terminal-bg border-t">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="terminal-prompt font-bold text-xs sm:text-sm flex-shrink-0 animate-pulse">
              <span className="hidden sm:inline">
                └─[bilal06siki@Portfolio]─[~]$
              </span>
              <span className="sm:hidden">$</span>
            </span>
            <div className="flex-1 relative min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent terminal-text outline-none border-none text-xs sm:text-base py-1"
                autoComplete="off"
                spellCheck="false"
                disabled={terminalState.isTyping}
                aria-label="Terminal Command Input"
              />
              <span className="absolute terminal-text blink">▋</span>
            </div>
          </div>
        </div>

        <div className="cyber-border scan-line p-1 bg-black w-full flex items-center justify-center">
          <span className="terminal-muted text-[10px] sm:text-xs italic mx-2">
            © Bilal Siki · Last updated: Aug 10, 2025
          </span>
        </div>
      </div>
    </div>
  );
}
