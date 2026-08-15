/**
 * Reference copy for the Learn About PKD pages (/pkd, /pkd/symptoms-and-diagnosis, /pkd/treatment-and-care).
 *
 * Held as data for the same reason as policies.ts: this is clinical text that will be re-reviewed as a
 * body, not edited section by section inside a page component.
 *
 * Every clinical statement below is drawn from the Mayo Clinic reference in `pkdSource`. Nothing here is
 * Hope4PKD's own clinical guidance and no page carries a medically reviewed label — see
 * components/common/SourceNote.tsx and /medical-disclaimer.
 */

export interface PkdEntry {
  readonly title: string;
  readonly description: string;
}

export const pkdSource = {
  publisher: "Mayo Clinic",
  title: "Polycystic kidney disease",
  href: "https://www.mayoclinic.org/diseases-conditions/polycystic-kidney-disease/symptoms-causes/syc-20352820",
} as const;

/** The one-paragraph answer, reused on the hub page and in page metadata. */
export const pkdInBrief =
  "Polycystic kidney disease is an inherited condition in which clusters of fluid-filled sacs, called cysts, grow in the kidneys. As the cysts multiply the kidneys enlarge and gradually work less well, and cysts can form in the liver and other organs too.";

export const pkdTypes = [
  {
    eyebrow: "Autosomal dominant · ADPKD",
    title: "The common adult form",
    description:
      "The most common inherited kidney disease. Signs often begin between the ages of 30 and 40, so many people live for years without knowing they have it. Only one parent needs the gene change to pass it on, and each child then has a 50% chance of inheriting the condition.",
  },
  {
    eyebrow: "Autosomal recessive · ARPKD",
    title: "The rarer childhood form",
    description:
      "Far less common and usually more serious. Symptoms can appear shortly after birth, or later in childhood or the teenage years. Both parents must carry the gene change, and each child then has a 25% chance of inheriting the condition.",
  },
] as const satisfies readonly (PkdEntry & { eyebrow: string })[];

/**
 * Mayo's symptom list, kept as plain statements. Cysts can grow for a long time before anything is
 * noticeable, which is why several of these are found at a routine appointment rather than reported.
 */
export const pkdSymptoms = [
  "High blood pressure",
  "Pain in the abdomen, side or back",
  "Blood in the urine",
  "A feeling of fullness in the abdomen",
  "An increase in the size of the abdomen as the kidneys enlarge",
  "Headaches",
  "Kidney stones",
  "Urinary tract or kidney infections",
  "Loss of kidney function, up to kidney failure",
] as const;

export const pkdComplications = [
  {
    title: "High blood pressure",
    description:
      "Common in PKD, and untreated it damages the kidneys further while raising the risk of heart disease and stroke. It is also one of the most treatable parts of the condition.",
  },
  {
    title: "Loss of kidney function",
    description:
      "Kidney function declines as the cysts grow. Nearly half of people with the condition have kidney failure by the age of 60, at which point dialysis or a transplant is needed.",
  },
  {
    title: "Ongoing pain",
    description:
      "Usually felt in the side or back. It can come from a cyst that has bled, an infection, or a kidney stone, so new or severe pain is worth reporting rather than enduring.",
  },
  {
    title: "Cysts in the liver",
    description:
      "Liver cysts become more likely with age and affect almost everyone with PKD eventually. Women tend to develop larger cysts than men.",
  },
  {
    title: "Brain aneurysm",
    description:
      "A bulge in a blood vessel in the brain is more likely in people with PKD, particularly where there is a family history of one. Screening may be offered.",
  },
  {
    title: "Pregnancy complications",
    description:
      "Most pregnancies are successful, but there is a raised risk of preeclampsia, especially where high blood pressure is already present. Plan pregnancy with a clinician.",
  },
  {
    title: "Heart valve problems",
    description:
      "As many as one in four adults with polycystic kidney disease develops mitral valve prolapse, where the valve no longer closes cleanly.",
  },
  {
    title: "Problems in the colon",
    description:
      "Pouches can form in the wall of the colon. They often cause nothing at all, but they can bleed or become infected.",
  },
] as const satisfies readonly PkdEntry[];

export const pkdDiagnosis = [
  {
    title: "Ultrasound",
    description:
      "The usual first look. A handheld probe sends sound waves through the abdomen and builds an image of the kidneys, with no radiation and no injection.",
  },
  {
    title: "CT scan",
    description:
      "X-ray imaging taken from many angles inside a doughnut-shaped scanner. It picks up smaller cysts than ultrasound can.",
  },
  {
    title: "MRI scan",
    description:
      "Uses a magnetic field rather than X-rays, and can measure total kidney volume — the number clinicians watch to judge how quickly the disease is progressing.",
  },
] as const satisfies readonly PkdEntry[];

export const pkdTreatments = [
  {
    title: "Slowing cyst growth",
    description:
      "For some people with ADPKD, a medicine called tolvaptan can slow the growth of cysts and the decline in kidney function. It needs monitoring, so it is a conversation with a kidney specialist.",
  },
  {
    title: "Controlling blood pressure",
    description:
      "The single most useful lever. ACE inhibitors or ARBs, combined with a low-salt diet, regular activity, a healthy weight and not smoking, protect kidney function over years.",
  },
  {
    title: "Protecting kidney function",
    description:
      "Drinking enough fluid, and reducing salt and protein in the diet, eases the load on the kidneys. Any restriction should be set with a clinician, not guessed at.",
  },
  {
    title: "Managing pain",
    description:
      "Acetaminophen is generally preferred; most anti-inflammatory painkillers are avoided because they can worsen kidney function. Large or painful cysts can sometimes be drained or removed.",
  },
  {
    title: "Treating infections",
    description:
      "Urinary tract and kidney infections need prompt antibiotics, because an infection that reaches a cyst is much harder to clear once established.",
  },
  {
    title: "Managing bleeding",
    description:
      "A cyst that bleeds often settles with rest and extra fluids to dilute the urine. Bleeding that is heavy or does not stop needs medical assessment.",
  },
  {
    title: "When the kidneys fail",
    description:
      "Dialysis takes over the filtering the kidneys can no longer do. A transplant may be possible, sometimes before dialysis is ever needed.",
  },
  {
    title: "Watching for aneurysms",
    description:
      "Small aneurysms are usually monitored while blood pressure and cholesterol are controlled and smoking is stopped. Larger ones may be treated surgically.",
  },
] as const satisfies readonly PkdEntry[];
