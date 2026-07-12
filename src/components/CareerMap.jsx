import { useMemo, useState, useId, useRef, useEffect } from 'react';
import '../styles/CareerMap.css';

/*
 * CareerMap — a timeline-anchored ARC DIAGRAM of Mitchell Horn's career.
 *
 * The antidote to a force-directed hairball: every node sits on a horizontal
 * TIME SPINE (x = when, no physics, no drift), so the default state already
 * reads as a legible timeline. ARCS above the spine connect the handful of
 * recurring THREADS that carry forward across roles — the thesis being that
 * these are not four disconnected jobs but skills that arc into the AI work.
 *
 * Hover / focus a role or a thread chip -> its arcs + endpoints highlight and
 * the rest fade. Chips filter to isolate a thread.
 *
 * Hand-rolled inline SVG (decorative geometry, aria-hidden) + an HTML overlay of
 * real, focusable, labelled <button> nodes + a visually-hidden semantic summary,
 * so the graph is keyboard- and screen-reader-navigable, never canvas-only.
 * All content is grounded in the CV.
 */

// ── threads (recurring skills that span eras) ────────────────────────────────
// tier = vertical band the thread's arcs bow to (0..1 of arc height); distinct
// tiers give each thread its own lane => a structural, non-color encoding.
const THREADS = [
  {
    id: 'python',
    label: 'Python pipelines',
    tier: 0.98,
    desc: 'The throughline. Neuroimaging feature-extraction pipelines → HPC job workflows → RAG backends & lab-data engineering. 2019 → today.',
  },
  {
    id: 'ml',
    label: 'ML: segmentation → LLM',
    tier: 0.82,
    desc: 'A 3D-segmentation CNN (88% sensitivity, 1,000+ scans) becomes retrieval-augmented generation over 825+ papers. Computer vision → LLMs.',
  },
  {
    id: 'gpu',
    label: 'GPU / CUDA',
    tier: 0.62,
    desc: 'GPU-trained CNNs → migrating 25+ research workflows to GPU (10–40× faster) → building the GPU utilization & energy portal.',
  },
  {
    id: 'imaging',
    label: 'Imaging data',
    tier: 0.44,
    desc: 'MRI acquisition, QC & regulatory compliance → 7T analysis pipelines and automated feature extraction (FreeSurfer / FSL). 2016 → 2021.',
  },
  {
    id: 'teaching',
    label: 'Teaching / enablement',
    tier: 0.28,
    desc: '15+ HPC & ML workshops; containerized stacks for 200+ researchers; 750+ people trained across BU and Yale.',
  },
];
const THREAD_BY_ID = Object.fromEntries(THREADS.map((t) => [t.id, t]));

// ── eras (phases behind the spine) ───────────────────────────────────────────
const ERAS = [
  { id: 'neuro', label: 'Neuroimaging', start: 2016, end: 2022 },
  { id: 'hpc', label: 'Research Computing', start: 2022, end: 2024 },
  { id: 'ai', label: 'AI & Data Eng', start: 2024, end: 2026.4 },
];

// ── nodes on the time spine (roles · projects · publications · foundation) ────
// row = which stagger lane the label drops into (0 nearest spine … 2 lowest).
const NODES = [
  { id: 'bme', year: 2016, type: 'foundation', era: 'neuro', short: 'B.Eng BME', title: 'B.Eng, Biomedical Engineering', org: 'Boston University', detail: 'Biology & medicine — the foundation the whole arc builds on.', threads: [], row: 0 },
  { id: 'bumc', year: 2017, type: 'role', era: 'neuro', short: 'BU Med Center', title: 'Research Technologist & Coordinator', org: 'BU Medical Center · 2016–2018', detail: 'Multi-site neuroimaging studies; MRI acquisition protocols (perfusion-weighted imaging); data QC & regulatory compliance.', threads: ['imaging'], row: 1 },
  { id: 'mgh', year: 2019, type: 'role', era: 'neuro', short: 'MGH', title: 'Senior Computational Scientist', org: 'Massachusetts General Hospital · 2018–2022', detail: '7T MRI analysis pipelines; automated feature extraction (FreeSurfer / FSL / scikit-image) cut 4 h → 15 min (93% faster).', threads: ['imaging', 'python'], row: 0 },
  { id: 'cnn', year: 2020, type: 'project', era: 'neuro', short: '3D CNN seg', title: '3D-segmentation CNN', org: 'MGH · cerebral amyloid angiopathy', detail: 'Custom 3D convolutional network for brain-lesion segmentation: 88% sensitivity across 1,000+ scans. The seed of the ML thread.', metric: '88% · 1,000+ scans', threads: ['ml', 'gpu'], row: 1 },
  { id: 'pubs', year: 2021, type: 'pub', era: 'neuro', short: '12 papers', title: '12 peer-reviewed publications', org: 'Neuroimaging · 2016–2024', detail: 'Twelve peer-reviewed papers on cerebral amyloid angiopathy and quantitative MRI. ORCID 0000-0002-8249-5793.', metric: '12 publications', threads: ['imaging'], row: 2 },
  { id: 'rcs', year: 2022, type: 'role', era: 'hpc', short: 'BU · RCS', title: 'Research Computing App & Data Specialist III', org: 'Boston University · 2022–2024', detail: 'HPC modernization: containerization (Docker / Singularity) for 200+ researchers; a 100+ package software stack via Lmod / EasyBuild / Spack; 60% average compute-time cut.', threads: ['teaching'], row: 0 },
  { id: 'gpumig', year: 2022.6, type: 'project', era: 'hpc', short: 'GPU ×10–40', title: 'Migrated 25+ workflows to GPU', org: 'BU Research Computing', detail: 'Ported 25+ research workflows to GPU for 10–40× speedups — the compute muscle behind later AI work.', metric: '25+ workflows · 10–40×', threads: ['gpu', 'python'], row: 1 },
  { id: 'train', year: 2023.4, type: 'project', era: 'hpc', short: '15+ workshops', title: '15+ workshops · 500+ researchers', org: 'BU Research Computing', detail: 'Designed and delivered 15+ workshops to 500+ researchers on HPC, containers and GPU computing.', metric: '500+ trained', threads: ['teaching'], row: 2 },
  { id: 'yale', year: 2024, type: 'role', era: 'ai', short: 'Yale', title: 'Senior Research Data Support Analyst', org: 'Yale School of the Environment · 2024–2025', detail: 'Environmental Data Science Certificate + YSE Research Computing Series; Git/GitHub, HPC & ML workshops; DVC + S3 data-engineering pipelines. Co-PI, $100K NSF "Envisioning AI" (species ID, 76%).', threads: ['teaching', 'python'], row: 0 },
  { id: 'epr', year: 2024.6, type: 'project', era: 'ai', short: 'EPR AI · RAG', title: 'EPR AI — enterprise RAG platform', org: 'Yale · sustain-rag', detail: 'Q&A over 825+ academic references: Qdrant hybrid retrieval + Gemini / Vertex AI, Flask on GCP, a React frontend — serving 250+ users.', metric: '825+ papers · 250+ users', threads: ['ml', 'python'], row: 1 },
  { id: 'cds', year: 2025, type: 'role', era: 'ai', short: 'BU CDS', title: 'Data Systems & AI Engineer', org: 'BU Faculty of Computing & Data Sciences · 2025–present', detail: 'Data + AI infrastructure for research. PI on $3.1M NSF ACCESS Accelerate (flood-resilience benchmarking); FABRIC testbed lead; NAIRR member.', metric: '$3.1M+ · NAIRR', threads: ['gpu', 'python'], row: 2 },
  { id: 'portal', year: 2026, type: 'project', era: 'ai', short: 'GPU portal', title: 'GPU utilization / efficiency portal', org: 'BU CDS · cds-scc-audit', detail: 'Raw gpustats → a live R dashboard: utilization, VRAM, energy-$ and "top wasters" / "idle GPUs" views. Closing the loop back to GPU where the arc began.', threads: ['gpu', 'python'], row: 0 },
];

const METRICS = [
  ['researchers_trained', '750+'],
  ['grants_secured', '$3.1M+'],
  ['publications', '12+'],
];

// ── geometry (SVG user units; the plot scales to fit) ────────────────────────
const W = 1120;
const H = 520;
const PADX = 92;
const SPINE = 300;         // y of the time spine
const ARC_SPAN = 240;      // px above the spine available to arcs
const TICK_GAP = 10;       // spine → first label row
const ROW_H = 46;          // label row height
const Y0 = 2016;
const Y1 = 2026.4;
const YEAR_TICKS = [2016, 2018, 2020, 2022, 2024, 2026];

const xOf = (year) => PADX + ((year - Y0) / (Y1 - Y0)) * (W - 2 * PADX);
const pctX = (year) => (xOf(year) / W) * 100;

// cubic-bezier hump from (x1,SPINE) to (x2,SPINE) peaking `h` px above the spine
const arcPath = (x1, x2, h) => {
  const c = h / 0.75; // control offset so the midpoint peaks at exactly h
  return `M ${x1.toFixed(1)} ${SPINE} C ${x1.toFixed(1)} ${(SPINE - c).toFixed(1)}, ${x2.toFixed(1)} ${(SPINE - c).toFixed(1)}, ${x2.toFixed(1)} ${SPINE}`;
};

// precompute the arc segments (consecutive endpoints within each thread)
const ARCS = THREADS.flatMap((t) => {
  const pts = NODES.filter((n) => n.threads.includes(t.id)).sort((a, b) => a.year - b.year);
  const h = t.tier * ARC_SPAN;
  const segs = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    segs.push({ thread: t.id, key: `${t.id}-${pts[i].id}-${pts[i + 1].id}`, d: arcPath(xOf(pts[i].year), xOf(pts[i + 1].year), h) });
  }
  return segs;
});

const nodeButtonHeightPct = (row) => (((TICK_GAP + (row + 1) * ROW_H) / H) * 100);
const eraById = Object.fromEntries(ERAS.map((e) => [e.id, e]));

export default function CareerMap() {
  const [filter, setFilter] = useState(() => new Set()); // pinned threads (chips)
  const [hoverThread, setHoverThread] = useState(null);  // chip preview
  const [hoverNode, setHoverNode] = useState(null);      // transient
  const [pinNode, setPinNode] = useState(null);          // click / focus
  const uid = useId();
  const plotRef = useRef(null);

  const activeNodeId = hoverNode ?? pinNode;
  const activeNode = activeNodeId ? NODES.find((n) => n.id === activeNodeId) : null;

  // which threads are currently "emphasized" (hover wins over pin wins over none)
  const emphasis = useMemo(() => {
    if (hoverThread) return new Set([hoverThread]);
    if (activeNode) return new Set(activeNode.threads);
    return null;
  }, [hoverThread, activeNode]);

  const threadState = (id) => {
    if (filter.size > 0 && !filter.has(id)) return 'hide';
    if (emphasis) return emphasis.has(id) ? 'emph' : 'dim';
    return 'full';
  };
  const nodeState = (n) => {
    const gated = filter.size > 0 && !n.threads.some((t) => filter.has(t));
    if (gated) return 'dim';
    if (emphasis) return n.threads.some((t) => emphasis.has(t)) ? 'emph' : 'dim';
    return 'full';
  };

  const toggleFilter = (id) => {
    setFilter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clickNode = (id) => setPinNode((p) => (p === id ? null : id));

  // dismiss a pinned node: click anywhere outside the plot, or press Escape
  useEffect(() => {
    if (!pinNode) return undefined;
    const onDown = (e) => {
      if (plotRef.current && !plotRef.current.contains(e.target)) setPinNode(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setPinNode(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [pinNode]);

  // detail-card content: thread preview > active node (idle → no card; the plot stands alone)
  let card;
  if (hoverThread) {
    const t = THREAD_BY_ID[hoverThread];
    card = (
      <>
        <span className="cm-card-tag" data-thread={t.id}><span className="cm-swatch" data-thread={t.id} aria-hidden="true" />{t.label}</span>
        <p className="cm-card-body">{t.desc}</p>
      </>
    );
  } else if (activeNode) {
    const e = eraById[activeNode.era];
    card = (
      <>
        <span className="cm-card-tag" data-era={activeNode.era}>{Math.floor(activeNode.year)} · {e ? e.label : activeNode.era}</span>
        <p className="cm-card-title">{activeNode.title}</p>
        <p className="cm-card-org">{activeNode.org}</p>
        <p className="cm-card-body">{activeNode.detail}</p>
        {activeNode.threads.length > 0 && (
          <p className="cm-card-threads">
            <span className="cm-card-threads-label">threads</span>
            {activeNode.threads.map((tid) => (
              <span key={tid} className="cm-mini-tag" data-thread={tid}><span className="cm-swatch" data-thread={tid} aria-hidden="true" />{THREAD_BY_ID[tid].label}</span>
            ))}
          </p>
        )}
      </>
    );
  }

  return (
    <section className="career-map" id="career" aria-labelledby={`${uid}-h`}>
      <header className="cm-head">
        <h2 id={`${uid}-h`} className="cm-title">10+ years, 1 data story</h2>
        <p className="cm-sub">Every node sits at <em>when</em> it happened; each arc traces a <em>skill</em> that carried forward.</p>
        <ul className="cm-metrics" aria-label="Career metrics">
          {METRICS.map(([k, v]) => (
            <li key={k} className="cm-metric"><span className="cm-metric-k">{k}</span><span className="cm-metric-v">{v}</span></li>
          ))}
        </ul>
      </header>

      {/* screen-reader summary — the graph's meaning as real, ordered text */}
      <div className="visually-hidden">
        <h3>Career timeline</h3>
        <ol>
          {NODES.map((n) => (
            <li key={n.id}>{Math.floor(n.year)} — {n.title} ({n.org}).{n.metric ? ` ${n.metric}.` : ''}{n.threads.length ? ` Threads: ${n.threads.map((t) => THREAD_BY_ID[t].label).join(', ')}.` : ''}</li>
          ))}
        </ol>
        <h3>Recurring threads</h3>
        <ul>{THREADS.map((t) => <li key={t.id}>{t.label}: {t.desc}</li>)}</ul>
      </div>

      {/* thread filter — clickable chips isolate a skill thread */}
      <div className="cm-filter">
        <div className="cm-chips" role="group" aria-label="Filter career map by thread">
          {THREADS.map((t) => {
            const on = filter.has(t.id);
            return (
              <button
                key={t.id}
                className={`cm-chip ${on ? 'is-on' : ''}`}
                data-thread={t.id}
                aria-pressed={on}
                onMouseEnter={() => setHoverThread(t.id)}
                onMouseLeave={() => setHoverThread(null)}
                onFocus={() => setHoverThread(t.id)}
                onBlur={() => setHoverThread(null)}
                onClick={() => toggleFilter(t.id)}
              >
                <span className="cm-swatch" data-thread={t.id} aria-hidden="true" />
                {t.label}
              </button>
            );
          })}
          <button className={`cm-chip cm-chip--clear ${filter.size === 0 ? 'is-off' : ''}`} onClick={() => setFilter(new Set())} disabled={filter.size === 0}>
            clear
          </button>
        </div>
      </div>

      <div className="cm-plot-scroll" ref={plotRef}>
        <div className="cm-scrollhint" aria-hidden="true">scroll →</div>
        <div className="cm-plot" style={{ '--vb-w': W, '--vb-h': H }}>
          <svg className="cm-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
            {/* era bands (zoning) — first/last extended to the plot edges so the endpoint nodes sit inside */}
            {ERAS.map((e, i) => {
              const x0 = i === 0 ? 4 : xOf(e.start);
              const x1 = i === ERAS.length - 1 ? W - 4 : xOf(e.end);
              return <rect key={e.id} className="cm-band" data-era={e.id} x={x0} y="26" width={x1 - x0} height={H - 26} />;
            })}
            {/* year gridlines + top axis labels */}
            {YEAR_TICKS.map((y) => (
              <g key={y}>
                <line className="cm-grid" x1={xOf(y)} y1="34" x2={xOf(y)} y2={SPINE} />
                <text className="cm-year" x={xOf(y)} y="22" textAnchor="middle">{y}</text>
              </g>
            ))}
            {/* the time spine */}
            <line className="cm-spine" x1={xOf(Y0)} y1={SPINE} x2={xOf(Y1)} y2={SPINE} />
            {/* arcs */}
            {ARCS.map((a) => (
              <path key={a.key} className={`cm-arc is-${threadState(a.thread)}`} data-thread={a.thread} d={a.d} />
            ))}
          </svg>

          {/* interactive nodes — real focusable buttons over the SVG */}
          <div className="cm-nodes">
            {NODES.map((n) => (
              <button
                key={n.id}
                className={`cm-node type-${n.type} is-${nodeState(n)} ${activeNodeId === n.id ? 'is-active' : ''}`}
                data-era={n.era}
                style={{ left: `${pctX(n.year)}%`, top: `${(SPINE / H) * 100}%`, height: `${nodeButtonHeightPct(n.row)}%` }}
                onMouseEnter={() => setHoverNode(n.id)}
                onMouseLeave={() => setHoverNode(null)}
                onFocus={() => setHoverNode(n.id)}
                onBlur={() => setHoverNode(null)}
                onClick={() => clickNode(n.id)}
                aria-pressed={pinNode === n.id}
                aria-label={`${Math.floor(n.year)}. ${n.title}. ${n.org}.${n.metric ? ` ${n.metric}.` : ''}`}
              >
                <span className="cm-dot" aria-hidden="true" />
                <span className="cm-leader" aria-hidden="true" />
                <span className="cm-node-label">
                  <span className="cm-node-short">{n.short}</span>
                  {n.metric && <span className="cm-node-metric">{n.metric}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {card && <div className="cm-card" role="status" aria-live="polite">{card}</div>}
    </section>
  );
}
