import React from 'react';
import './MainContent.css'; // Reuse the same styles for consistency
import './Publications.css'; // New CSS file for specific styles

const Publications = () => {
  const publications = [
    {
      year: 2024,
      papers: [
        "Gökçal E, Becker JA, <strong>Horn MJ</strong>, et al. (2024). Regional molecular alterations in cerebral amyloid angiopathy-related hemorrhagic lesions. Stroke; 55:A150. DOI."
      ]
    },
    {
      year: 2023,
      papers: [
        "<strong>Horn MJ</strong>, Gökçal E, Polimeni JR, et al. (2023). Peak width of skeletonized mean diffusivity and cognitive performance in cerebral amyloid angiopathy. Front Neurosci; Vol 17. DOI.",
        "Das AS, Gökçal E, Abramovitz Fouks A, et al. (2023). Left ventricular hypertrophy and left atrial size are associated with ischemic strokes among non-vitamin K antagonist oral anticoagulant users. J Neurol 270, 5578–5588. DOI.",
        "Das AS, Gökçal E, Abramovitz Fouks A, et al. (2023). Risk factors of ischemic strokes in non-vitamin k antagonist oral anticoagulant users. Stroke; Vas and Int Neuro 3, e12823_072. DOI."
      ]
    },
    {
      year: 2022,
      papers: [
        "<strong>Horn MJ</strong>, Gökçal E, Polimeni JR, et al. (2022). Cerebellar atrophy and its implications on gait in cerebral amyloid angiopathy. J Neurol Neurosurg Psychiatry. DOI.",
        "Zanon Zotin MC, Schoemaker D, Viswanathan A, et al. (2022). Peak width of skeletonized mean diffusivity in cerebral amyloid angiopathy: Spatial signature, cognitive, and neuroimaging associations. Front Neurosci; 16:1051038. DOI.",
        "Freeze WM, Zanon Zotin MC, <strong>Horn MJ</strong>, et al. (2022). Corpus callosum lesions are associated with worse cognitive performance in cerebral amyloid angiopathy. Brain Comm. DOI.",
        "Das AS, Gökçal E, <strong>Horn MJ</strong>, et al. (2022). Improving detection of cerebral small vessel disease aetiology in patients with isolated lobar intracerebral haemorrhage. Stroke Vasc Neurol. DOI.",
        "Gökçal E, <strong>Horn MJ</strong>, Gurol ME et al. (2022). Effect of vascular amyloid on white matter disease is mediated by vascular dysfunction in cerebral amyloid angiopathy. J Cereb Blood Flow Metab; 42(7):1272-1281. DOI.",
        "Gurol ME, Das AS, Yaghi S, et al. (2022). Ischemic strokes in patients with atrial fibrillation on oral anticoagulant: the neuro-afib study. Stroke; A157-A157. DOI.",
        "Gurol ME, Das AS, Yaghi S, et al. (2022). Potential causes of anticoagulant underuse in patients with atrial fibrillation presenting with ischemic strokes. Stroke; AWMP-101-157-A157. DOI."
      ]
    },
    {
      year: 2020,
      papers: [
        "<strong>Horn MJ</strong>, Polimeni JR, Greenberg SM, et al. (2020). Default Mode Network Alterations in Cerebral Amyloid Angiopathy: A Resting State FMRI Study. Stroke A19-A19. DOI.",
        "Gökçal E, <strong>Horn MJ</strong>, Greenberg SM, et al. (2020). Functional Magnetic Resonance Imaging as a Predictor of Cognitive Impairment in Cerebral Amyloid Angiopathy. Stroke A16-A16. DOI.",
        "Gökçal E, <strong>Horn MJ</strong>, Greenberg SM, et al. (2020). Association of Cortical Superficial Siderosis with Coritcal Thining in Cerebral Amyloid Angiopathy. Int J Stroke. Vol 15:537-538. DOI.",
        "<strong>Horn MJ</strong>, Gökçal E, Greenberg SM, et al. (2020). Cerebellar Atrophy In Cerebral Amyloid Angiopathy. Int J Stroke; Vol 15:73-73. DOI."
      ]
    },
    {
      year: 2019,
      papers: [
        "Kuban K, Jara H, et al. (2019). Association of Circulating Proinflammatory and Anti-inflammatory Protein Biomarkers in Extremely Preterm Born Children with Subsequent Brain Magnetic Resonance Imaging Volumes and Cognitive Function at Age 10 Years. The Journal of Pediatrics, Vol 210:81-90.e3. DOI.",
        "Kabus S, Ng G, <strong>Horn MJ</strong>, Bloch BN (2019). Simulated deformation of breast MRI from prone to supine for correlating MRI lesion findings to ultrasound: Initial Results. ECR 2019 / C-2136. DOI."
      ]
    },
    {
      year: 2018,
      papers: [
        "<strong>Horn MJ</strong>, Hua N, Farris C, Aakil A, Castro-Aragon I, Jara H (2018). Global Measures of Liver Iron Content Based on T2* mapping and Dual Clustering Segmentation. Proc Intl. Soc. Mag. Reson. Med 26, 2607. DOI.",
        "<strong>Horn MJ</strong>, Kim D, Ng G, Bloch BN (2018). Novel Technique in Freehand Breast Ultrasound Using Electromagnetic Field Position Mapping to Enhance Workflow and Acquisition Standardization. ECR 2018 / C-2794. DOI.",
        "Hua N, <strong>Horn MJ</strong>, Aakil A, Anderson SA, Jara H (2018). Incidental magnetization transfer in qMRI: effects of multi-slice imaging with mixed-TSE. Proc Intl. Soc. Mag. Reson. Med 26, 2294. DOI."
      ]
    },
    {
      year: 2017,
      papers: [
        "<strong>Horn MJ</strong>, Hua N, Anderson SA, Jara H (2017). Direct Assessment of Magnetization Transfer Effects with T1 qMRI. Proc Intl. Soc. Mag. Reson. Med 25, 1925. DOI.",
        "Hua N, <strong>Horn MJ</strong>, Anderson SA, Jara H (2017). Tri-Fast Spin Echo: A Minimalistic Cross-Platform Multi-Spectral qMRI Pulse Sequence for Routine Clinical Use. Proc Intl. Soc. Mag. Reson. Med 25, 1499. DOI."
      ]
    },
    {
      year: 2016,
      papers: [
        "Jara H, Mian A, Sakai O, Anderson SW, <strong>Horn MJ</strong>, Norbash AM, Soto JA (2016). Normal saline as a natural intravascular contrast agent for dynamic perfusion-weighted MRI of the brain: Proof of concept at 1.5T. J Magn Reson Imaging. 44(6):1580-1591. DOI."
      ]
    }
  ];

  return (
    <div className="main-content">
      <div className="content-block">
        <h2>Publications</h2>
        <ul>
          {publications.map((entry) => (
            <li key={entry.year}>
              <span className="publication-year">{entry.year}:</span>
              <ul>
                {entry.papers.map((paper, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: paper.replace(/Horn MJ/g, '<strong style="color: #89CFF0;">Horn MJ</strong>') }} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Publications;