import { useEffect, useRef, useState } from 'react';
import '../styles/TerminalBio.css';

// [command, output]. The command is TYPED (like a real shell); the output
// prints INSTANTLY. Grounded in the CV. `whoami` rotates through roles;
// other commands reveal facts. Keep outputs <= ~34 chars to fit the width.
const ENTRIES = [
  ['whoami', 'Data Systems & AI Engineer'],
  ['pwd', '~/bu/cds'],
  ['cat role.txt', 'data + AI infra for research'],
  ['whoami', 'research computing engineer'],
  ['ls repos/', 'epr-ai sustain-rag seedlearn'],
  ['cat epr-ai.md', 'RAG over 825+ academic papers'],
  ['whoami', 'ML / AI engineer'],
  ['echo $STACK', 'qdrant · gemini · pytorch · slurm'],
  ['cat teaching.txt', 'git · hpc · ml - 750+ trained'],
  ['cat consulting.txt', 'AI/ML + HPC research advising'],
  ['whoami', 'technical program manager'],
  ['ls programs/', 'nsf-access fabric envisioning-ai'],
  ['cat data-science.txt', 'climate-scenario forecasting'],
  ['ls analysis/', 'water-quality · energy · forecasts'],
  ['./gpu-portal', 'GPU usage & energy dashboard'],
  ['cat data-eng.txt', 'clean, version & serve lab data'],
  ['echo $AWARDS', '$3.1M HPC · $100K AI · $10K NAIRR'],
  ['cat vision.txt', '3D brain segmentation - 88% sens'],
  ['python detect.py', 'forest + species vision models'],
  ['history | grep gpu', '25+ workflows · 10-40x faster'],
  ['whoami', '(ex) computational scientist'],
  ['cat past-life.txt', 'neuroimaging · 12 papers'],
  ['groups', 'hpc ml data enablement'],
  ['uptime', 'optimizing research since 2016'],
];

const TYPE_MS = 65;   // per char while typing the command
const ENTER_MS = 260; // pause after the command, before output (the "enter")
const HOLD_MS = 1700; // hold command + output on screen
const CLEAR_MS = 550; // blank pause before the next command types

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TerminalBio = () => {
  const [cmd, setCmd] = useState('');
  const [out, setOut] = useState('');
  const reduced = useRef(prefersReducedMotion());
  const timer = useRef(null);

  useEffect(() => {
    // Reduced motion: show one command + its output, no animation.
    if (reduced.current) {
      setCmd(ENTRIES[0][0]);
      setOut(ENTRIES[0][1]);
      return undefined;
    }

    let idx = 0;
    let i = 0;

    const typeCmd = () => {
      const command = ENTRIES[idx][0];
      i += 1;
      setCmd(command.slice(0, i));
      timer.current = setTimeout(
        i === command.length ? showOutput : typeCmd,
        i === command.length ? ENTER_MS : TYPE_MS,
      );
    };
    const showOutput = () => {
      setOut(ENTRIES[idx][1]); // instant — like real command output
      timer.current = setTimeout(clearAll, HOLD_MS);
    };
    const clearAll = () => {
      setCmd('');
      setOut('');
      idx = (idx + 1) % ENTRIES.length;
      i = 0;
      timer.current = setTimeout(typeCmd, CLEAR_MS);
    };

    timer.current = setTimeout(typeCmd, TYPE_MS);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className="terminal">
      {/* Real, indexable text for SR + SEO; the animation below is decorative. */}
      <span className="visually-hidden">
        Mitchell Horn — {ENTRIES.map((e) => e[1]).join(', ')}.
      </span>

      <div className="terminal-visual" aria-hidden="true">
        <span className="terminal-line">
          <span className="terminal-user">mitch@BU-CDS</span>
          <span className="terminal-punct">:~$</span>{' '}
          {cmd}
          <span className="terminal-cursor" />
        </span>
        <span className="terminal-line terminal-out">{out}</span>
      </div>
    </div>
  );
};

export default TerminalBio;
