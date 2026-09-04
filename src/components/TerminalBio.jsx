import { useEffect, useRef, useState } from 'react';
import '../styles/TerminalBio.css';

// [command, output]. The command is TYPED (like a real shell); the output
// prints INSTANTLY. Every line is grounded in the CV or a repo I own -- no
// claim here is unverifiable. Keep outputs <= ~34 chars to fit the width.
//
// NOTE ON $ROLE: the NSF ACCESS award is 3,000,000 COMPUTE CREDITS, not
// dollars. Never render it as "$3.1M" -- that reads as secured grant money
// and is the kind of error a program officer spots instantly.
const ENTRIES = [
  ['whoami', 'Data Systems & AI Engineer'],
  ['pwd', '~/bu/cds'],
  ['echo $ROLE', 'PI · 3M NSF ACCESS credits'],
  ['ls rag/', 'epr · drylands · rao · graph'],
  ['cat epr-ai.md', 'RAG · extended producer resp.'],
  ['python detect.py', '1.9M trees · 486 NAIP images'],
  ['deploy --cloud', 'aws · gcp · azure · 250+ users'],
  ['cat access.md', 'upscaling for flood resilience'],
  ['echo $STACK', 'qdrant · gemini · pytorch · slurm'],
  ['./uri-survey', 'New Haven urban forest survey'],
  ['cat drylands.md', '983 articles · 45 years'],
  ['history | grep gpu', '25+ workflows · 10-40x faster'],
  ['cat seedlearn.md', 'BioCLIP seedling ID · iNat'],
  ['./vllm-serve', 'vLLM on H200 · SLURM cluster'],
  ['cat hpc.txt', '200+ researchers · 60% faster'],
  ['cat species.md', '250+ rare species · 76% acc'],
  ['./gpu-portal', 'live GPU energy & waste audit'],
  ['dvc status', '282 GB · 306k files versioned'],
  ['cat vision.txt', '3D CNN · 88% sens · 1,000 scans'],
  ['cat research.txt', '13 peer-reviewed papers'],
  ['groups', 'nairr · fabric · access · neurips'],
  ['orcid --open', '0000-0002-8249-5793'],
  ['cat teaching.txt', '750+ trained · 20+ workshops'],
  ['uname -a', 'neuroscience -> AI infra'],
  ['uptime', 'building research systems, 10y'],
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
          <span className="terminal-user">mitchell@horn</span>
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
