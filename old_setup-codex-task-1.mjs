// setup-chemdesk-content-from-master-lectures.js
// ChemDesk content setup from Master Lectures hierarchy.
// Run from the ChemDesk repo root:
//   node setup-chemdesk-content-from-master-lectures.js
//
// This creates:
//   content/<category>/<chapter>/chapter.meta.json
//   content/<category>/<chapter>/images/.gitkeep
//   content/<category>/<chapter>/lectures/<lecture-folder>/lecture.meta.json
//   content/<category>/<chapter>/lectures/<lecture-folder>/images/.gitkeep
//
// For rows/topics marked Replace/standardize to JEE Wallah, it creates only:
//   content/<category>/<chapter>/chapter.meta.json
//   content/<category>/<chapter>/images/.gitkeep
//
// No HTML files. No Astro setup. No Chemistry content.

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const FORCE = process.argv.includes('--force');

const TREE = String.raw`
inorganic/chemical-bonding | Chemical Bonding
  lecture-01-intro-to-chemical-bonds | Intro to Chemical Bonds
  lecture-02-ionic-bonds | Ionic Bonds
  lecture-03-lattice-energy-and-born-haber-cycle | Lattice Energy and Born-Haber Cycle
  lecture-04-fajans-rule | Fajan’s Rule
  lecture-05-lewis-dot-structure | Lewis Dot structure
  lecture-06-vbt | VBT
  lecture-07-more-on-vbt-pi-bonds | More on VBT (Pi bonds)
  lecture-08-hybridisation | Hybridisation
  lecture-09-vsepr | VSEPR
  lecture-10-mot-part-i | MOT part I
  lecture-11-mot-part-ii | MOT part II
  lecture-12-dipole-moment | Dipole Moment
  lecture-13-bond-angle | Bond Angle
  lecture-14-dragos-rule | Drago's Rule
  lecture-15-vanderwaals-force | Vanderwaal's Force
  lecture-16-hydrogen-bonding | Hydrogen Bonding
inorganic/coordination-compounds | Coordination Compounds | REPLACE
inorganic/d-and-f-block-elements | d and f block elements | REPLACE
inorganic/p-block-elements | p block elements | REPLACE
inorganic/periodic-classification | Periodic Classification
  lecture-01-historical-development | Historical Development
  lecture-02-modern-periodic-table | Modern Periodic Table
  lecture-03-how-to-find-group-period-and-block-of-any-element-spdf-trick | How to Find Group, Period and Block of any Element // spdf Trick
  lecture-04-atomic-radius-ionic-radius-and-its-variation | Atomic Radius, Ionic Radius & Its Variation
  lecture-05-ionization-energy-ionization-potential | Ionization Energy // Ionization Potential
  lecture-06-electron-affinity-electron-gain-enthalpy | Electron Affinity // Electron Gain Enthalpy
  lecture-07-electronegativity | Electronegativity
organic/alcohols-phenols-and-ethers-organic-compounds-containing-oxygen-1-3 | Alcohols, Phenols and Ethers (Organic Compounds containing Oxygen 1/3)
  lecture-01-introduction-classification-and-nomenclature | Introduction, Classification & Nomenclature
  lecture-02-preparation-of-alcohols-1-from-alkenes | Preparation of Alcohols 1: From Alkenes
  lecture-03-preparation-of-alcohols-2-from-carbonyl-compounds-and-carboxylic-acid | Preparation of Alcohols 2: From Carbonyl Compounds and Carboxylic Acid
  lecture-04-preparation-of-alcohols-3-from-grignard-s-reagent | Preparation of Alcohols 3: From Grignard’s Reagent
  lecture-05-properties-of-alcohols-1-acidic-nature-esterification | Properties of Alcohols 1: Acidic Nature, Esterification
  lecture-06-properties-of-alcohols-2-lucas-test | Properties of Alcohols 2: Lucas Test
  lecture-07-properties-of-alcohols-3-dehydration-of-alcohols | Properties of Alcohols 3: Dehydration of Alcohols
  lecture-08-properties-of-alcohols-4-oxidation-of-alcohols | Properties of Alcohols 4: Oxidation of Alcohols
  lecture-09-preparation-of-phenols-all-methods | Preparation of Phenols: All Methods
  lecture-10-properties-of-phenols-1-acidic-nature-of-phenols | Properties of Phenols 1: Acidic Nature of Phenols
  lecture-11-properties-of-phenols-2-esterification-and-reactions-of-benzene-ring | Properties of Phenols 2: Esterification and Reactions of Benzene Ring
  lecture-12-properties-of-phenols-3-reimer-tiemann-and-kolbe-s-reaction | Properties of Phenols 3: Reimer-Tiemann and Kolbe's Reaction
  lecture-13-preparation-of-ethers-dehydration-of-alcohol-and-williamson-synthesis | Preparation of Ethers: Dehydration of Alcohol and Williamson Synthesis
  lecture-14-properties-of-ethers-reaction-with-hi-and-reaction-of-aryl-ethers | Properties of Ethers: Reaction with HI and Reaction of Aryl Ethers
organic/aldehydes-and-ketones-organic-compounds-containing-oxygen-2-3 | Aldehydes and Ketones (Organic Compounds containing Oxygen 2/3)
  lecture-01-methods-of-preparation-of-aldehydes-and-ketones | Methods of Preparation of Aldehydes and Ketones
  lecture-02-preparation-of-aldehydes-and-ketones-dry-distillation-of-carboxylic-acids | Preparation of Aldehydes and Ketones: Dry Distillation of Carboxylic Acids
  lecture-03-preparation-of-aldehydes-rosenmund-s-reduction-and-stephen-s-reduction | Preparation of Aldehydes: Rosenmund’s Reduction and Stephen’s Reduction
  lecture-04-preparation-of-benzaldehyde-etard-s-reaction-and-gatterman-koch-reaction | Preparation of Benzaldehyde: Etard’s Reaction and Gatterman-Koch Reaction
  lecture-05-preparation-of-ketones-from-acyl-chloride-and-from-benzene | Preparation of Ketones: From Acyl Chloride and From Benzene
  lecture-06-properties-1-nucleophilic-addition-addition-of-hcn-alcohols | Properties 1: Nucleophilic Addition: Addition of HCN, Alcohols
  lecture-07-properties-2-addition-of-ammonia-and-ammonia-derivatives | Properties 2: Addition of Ammonia and Ammonia Derivatives
  lecture-08-properties-3-reduction-of-aldehydes-and-ketones | Properties 3: Reduction of Aldehydes and Ketones
  lecture-09-properties-4-tollen-s-test-silver-mirror-test-and-fehling-s-test | Properties 4: Tollen’s Test (Silver Mirror Test) and Fehling's Test
  lecture-10-haloform-reaction-iodoform-reaction-iodoform-test | Haloform Reaction: Iodoform Reaction, Iodoform Test
organic/amines-organic-compounds-containing-nitrogen | Amines (Organic Compounds Containing Nitrogen)
  lecture-01-methods-of-formation-of-amines-01 | Methods of Formation of Amines 01
  lecture-02-methods-of-formation-of-amines-02 | Methods of Formation of Amines 02
  lecture-03-beckmann-s-rearrangement-in-ketoximes-amines | Beckmann's Rearrangement in Ketoximes // Amines
  lecture-04-chemical-reactions-of-amines | Chemical Reactions of Amines
  lecture-05-some-interconversions-of-functional-groups | Some Interconversions of Functional Groups
organic/biomolecules | Biomolecules
  lecture-01-carbohydrates-definition | Carbohydrates: Definition
  lecture-02-reactions-of-glucose | Reactions of Glucose
  lecture-03-cyclic-structure-of-glucose | Cyclic Structure of Glucose
  lecture-04-fructose | Fructose
  lecture-05-epimer | Epimer
  lecture-06-diasaccharides | Diasaccharides
  lecture-07-polysaccharides | Polysaccharides
  lecture-08-introduction-of-amino-acids | Introduction of Amino Acids
  lecture-09-structures-of-amino-acids | Structures of Amino Acids
  lecture-10-dipole-structure-of-amino-acids | Dipole Structure of Amino Acids
  lecture-11-formation-and-chemical-reactions-of-amino-acids-peptides | Formation and Chemical Reactions of Amino Acids // Peptides
  lecture-12-proteins-nucleic-acids-chemical-structure-of-dna-rna | Proteins, Nucleic Acids // Chemical Structure of DNA & RNA
organic/carboxylic-acids-organic-compounds-containing-oxygen-3-3 | Carboxylic Acids (Organic Compounds containing Oxygen 3/3)
  lecture-01-methods-of-formation-of-carboxylic-acid | Methods of Formation of Carboxylic Acid
  lecture-02-reactions-of-carboxylic-acid-hvz-hunsdecker-s-reaction-decarboxylation-kolbe-s-electrolysis | Reactions of Carboxylic Acid: HVZ, Hunsdecker’s Reaction, Decarboxylation, Kolbe's Electrolysis
  lecture-03-reactions-of-carboxylic-acid-heating-effects-wolff-rearrangement-arndt-eistert-synthesis | Reactions of Carboxylic Acid: Heating Effects, Wolff Rearrangement, Arndt-Eistert Synthesis
  lecture-04-methods-of-formation-and-reactions-of-derivatives-of-carboxylic-acid | Methods of Formation and Reactions of Derivatives of Carboxylic Acid
organic/haloalkanes-and-haloarenes-organic-compounds-containing-halogens | Haloalkanes and Haloarenes (Organic Compounds containing Halogens)
  lecture-01-preparation-of-haloalkanes-1-from-alkanes-and-alkene | Preparation of Haloalkanes 1: From Alkanes and Alkene
  lecture-02-preparation-of-haloalkanes-2-from-alcohols-lucas-reagent-and-others | Preparation of Haloalkanes 2: From Alcohols, Lucas Reagent and Others
  lecture-03-preparation-of-haloalkanes-3-halogen-exchange-and-hunsdiecker-method | Preparation of Haloalkanes 3: Halogen Exchange and Hunsdiecker Method
  lecture-04-properties-of-haloalkanes-1-sn1-and-sn2-reaction | Properties of Haloalkanes 1: SN1 and SN2 Reaction
  lecture-05-reaction-with-koh-agoh-kcn-agcn-kno2-agno2-nh3-rona-h2o | Reaction with KOH, AgOH, KCN, AgCN, KNO2, AgNO2, NH3, RONa, H2O
  lecture-06-properties-of-haloalkanes-3-elimination-reaction-e1-and-e2 | Properties of Haloalkanes 3: Elimination Reaction E1 and E2
  lecture-07-properties-of-haloalkanes-4-reaction-with-metals | Properties of Haloalkanes 4: Reaction with Metals
  lecture-08-preparation-of-haloarenes-sandmeyer-and-gattermann-reaction | Preparation of Haloarenes: Sandmeyer and Gattermann Reaction
  lecture-09-chemical-properties-of-haloarenes | Chemical Properties of Haloarenes
organic/hydrocarbons | Hydrocarbons
  lecture-01-preparation-of-alkanes-01-reduction-of-alkene-alkyne-and-alkyl-halides | Preparation of Alkanes 01: Reduction of Alkene, Alkyne and Alkyl Halides
  lecture-02-preparation-of-alkanes-02-wurtz-reaction-and-frankland-reaction | Preparation of Alkanes 02: Wurtz Reaction and Frankland Reaction
  lecture-03-preparation-of-alkanes-03-kolbe-s-electrolytic-method | Preparation of Alkanes 03: Kolbe's Electrolytic Method
  lecture-04-preparation-of-alkanes-04-soda-lime-decarboxylation | Preparation of Alkanes 04: Soda Lime Decarboxylation
  lecture-05-preparation-of-alkanes-05-clemenson-and-wolf-kishner-reduction-red-p-hi-method | Preparation of Alkanes 05: Clemenson and Wolf Kishner Reduction, Red P HI Method
  lecture-06-preparation-of-alkanes-06-from-grignard-s-reagant-and-corey-house-synthesis-jee | Preparation of Alkanes 06: From Grignard's Reagant and Corey House Synthesis // JEE
  lecture-07-properties-of-alkanes-01-halogenation-of-alkane-compilation-of-previous-videos | Properties of Alkanes 01: Halogenation of Alkane // Compilation of Previous Videos
  lecture-08-properties-of-alkanes-02-nitration-sulphonation-pyrolysis-aromatization | Properties of Alkanes 02: Nitration, Sulphonation, Pyrolysis, Aromatization
  lecture-09-properties-of-alkanes-03-oxidation-catalytic-oxidation-and-combustion | Properties of Alkanes 03: Oxidation, Catalytic Oxidation and Combustion
  lecture-10-preparation-of-alkenes-1-dehydration-of-alcohols-and-from-alkyl-halide | Preparation of Alkenes 1: Dehydration of Alcohols and From Alkyl Halide
  lecture-11-preparation-of-alkenes-2-from-alkyne-birch-reduction-and-lindlar-s-catalyst | Preparation of Alkenes 2: From Alkyne, Birch Reduction and Lindlar's Catalyst
  lecture-12-properties-of-alkenes-1-addition-of-hydrogen-halogen-and-halogen-acid | Properties of Alkenes 1: Addition of Hydrogen, Halogen and Halogen Acid
  lecture-13-properties-of-alkenes-2-addition-of-water-acid-catalyzed-hydration-of-alkene | Properties of Alkenes 2: Addition of Water, Acid Catalyzed Hydration of Alkene
  lecture-14-properties-of-alkenes-3-addition-of-water-hydroboration-oxidation | Properties of Alkenes 3: Addition of Water, Hydroboration Oxidation
  lecture-15-properties-of-alkenes-4-addition-of-water-oxymercuration-demercuration | Properties of Alkenes 4: Addition of Water, Oxymercuration Demercuration
  lecture-16-properties-of-alkenes-5-ozonolysis-addition-of-ozone | Properties of Alkenes 5: Ozonolysis // Addition of Ozone
organic/organic-chemistry-goc | Organic Chemistry - GOC
  lecture-01-inductive-effect-and-acidic-strength | Inductive Effect and Acidic Strength
  lecture-02-resonance-01-how-to-draw-resonance-structures | Resonance 01: How to Draw Resonance Structures
  lecture-03-resonance-02-stability-of-resonance-structures | Resonance 02: Stability of Resonance Structures
  lecture-04-resonance-03-mesomeric-effect-complete-topic | Resonance 03: Mesomeric Effect Complete Topic
  lecture-05-hyperconjugation-effect-in-carbocation-free-radical | Hyperconjugation Effect in Carbocation, Free Radical
  lecture-06-aromatic-anti-aromatic-and-non-aromatic-compounds | Aromatic, Anti Aromatic and Non Aromatic Compounds
  lecture-07-carbocation-reaction-intermediate-01 | Carbocation // Reaction Intermediate 01
  lecture-08-free-radical-and-carbanion-reaction-intermediate-02 | Free Radical and Carbanion // Reaction Intermediate 02
  lecture-09-carbene-singlet-and-triplet-carbene-reaction-intermediate-03 | Carbene // Singlet and Triplet Carbene // Reaction Intermediate 03
  lecture-10-rearrangement-of-carbocation-hydride-methyl-and-phenyl-shifting | Rearrangement of Carbocation: Hydride, Methyl and Phenyl Shifting
organic/organic-chemistry-iupac-nomenclature | Organic Chemistry - IUPAC Nomenclature
  lecture-01-some-basic-principles-and-naming-of-alkanes | Some Basic Principles and Naming of Alkanes
  lecture-02-complex-substituents-and-cycloalkanes | Complex Substituents and Cycloalkanes
  lecture-03-naming-of-alkenes-and-alkynes | Naming of Alkenes and Alkynes
  lecture-04-functional-groups-with-secondary-suffix | Functional Groups with Secondary Suffix
  lecture-05-naming-of-alcohols | Naming of Alcohols
  lecture-06-naming-of-aldehydes-and-ketones | Naming of Aldehydes and Ketones
  lecture-07-naming-of-carboxylic-acid-and-acid-halides | Naming of Carboxylic Acid and Acid Halides
  lecture-08-naming-of-acid-amides-and-esters | Naming of Acid Amides and Esters
  lecture-09-naming-of-cyanides-amines-and-ethers | Naming of Cyanides, Amines and Ethers
  lecture-10-naming-of-polyfunctional-compounds | Naming of Polyfunctional Compounds
  lecture-11-naming-of-aromatic-compounds-benzene-rings | Naming of Aromatic Compounds // Benzene Rings
  lecture-12-naming-of-bicyclo-and-spiro-compounds | Naming of Bicyclo and Spiro Compounds
organic/organic-chemistry-isomerism | Organic Chemistry - Isomerism
  lecture-01-introduction-chain-and-position-isomerism | Introduction, Chain and Position Isomerism
  lecture-02-how-to-find-total-structural-isomers | How to Find Total Structural Isomers
  lecture-03-functional-isomerism-metamerism-ring-chain-isomerism | Functional Isomerism, Metamerism, Ring Chain Isomerism
  lecture-04-tautomerism-01-condition-to-show-tautomerism-and-special-cases | Tautomerism 01: Condition to Show Tautomerism and Special Cases
  lecture-05-tautomerism-02-percentage-of-enol-content-and-stability-of-enol | Tautomerism 02: Percentage of Enol Content and Stability of Enol
  lecture-06-stereoisomerism-geometrical-isomers-01-cis-trans-e-z-syn-anti | Stereoisomerism // Geometrical Isomers 01: Cis-Trans, E-Z, Syn-Anti
  lecture-07-geometrical-isomers-02-cycloalkanes-allenes-spiro-biphenyl | Geometrical Isomers 02: Cycloalkanes, Allenes, Spiro, Biphenyl
  lecture-08-geometrical-isomers-03-number-of-geometrical-isomers | Geometrical Isomers 03: Number of Geometrical Isomers
  lecture-09-optical-isomers-01-introduction-chiral-centre-and-enantiomers | Optical Isomers 01: Introduction, Chiral Centre and Enantiomers
  lecture-10-optical-isomers-02-plane-of-symmetry-and-centre-of-symmetry | Optical Isomers 02: Plane of Symmetry and Centre of Symmetry
  lecture-11-optical-isomers-03-enantiomers-diastereomers-meso-total-isomers | Optical Isomers 03: Enantiomers, Diastereomers, Meso, Total Isomers
  lecture-12-optical-isomers-04-wedge-dash-and-fischer-projections-with-r-s-configurations | Optical Isomers 04: Wedge Dash and Fischer Projections with R/S Configurations
  lecture-13-optical-isomers-05-optical-isomerism-in-allene-spiro-and-biphenyl | Optical Isomers 05: Optical Isomerism in Allene, Spiro and Biphenyl
organic/organic-chemistry-reaction-mechanism | Organic Chemistry - Reaction Mechanism
  lecture-01-types-of-attacking-reagents-electrophile-and-nucleophile | Types of Attacking Reagents // Electrophile and Nucleophile
  lecture-02-free-radical-substitution-01-halogenation-of-alkane | Free Radical Substitution 01: Halogenation of Alkane
  lecture-03-free-radical-substitution-02-selectivity-in-halogenation | Free Radical Substitution 02: Selectivity in Halogenation
  lecture-04-free-radical-substitution-03-allylic-substitution | Free Radical Substitution 03: Allylic Substitution
  lecture-05-electrophilic-substitution-01-chlorination-nitration-in-benzene | Electrophilic Substitution 01: Chlorination, Nitration in Benzene
  lecture-06-electrophilic-substitution-02-friedel-crafts-reaction | Electrophilic Substitution 02: Friedel-Crafts Reaction
  lecture-07-electrophilic-substitution-03-effect-of-substituent-on-reactivity-of-benzene | Electrophilic Substitution 03: Effect of Substituent on Reactivity of Benzene
  lecture-08-nucleophilic-substitution-01-leaving-group-tendency | Nucleophilic Substitution 01: Leaving Group Tendency
  lecture-09-nucleophilic-substitution-02-sn1-reaction-and-mechanism | Nucleophilic Substitution 02: SN1 Reaction and Mechanism
  lecture-10-nucleophilic-substitution-03-sn2-reaction-and-mechanism | Nucleophilic Substitution 03: SN2 Reaction and Mechanism
  lecture-11-electrophilic-addition-01-addition-of-hx-to-alkene-markovnikov-s-rule | Electrophilic Addition 01: Addition of HX to Alkene, Markovnikov’s Rule
  lecture-12-free-radical-addition-anti-markovnikov-s-rule | Free Radical Addition // Anti-Markovnikov’s Rule
  lecture-13-electrophilic-addition-02-anti-addition-of-bromine | Electrophilic Addition 02: Anti Addition of Bromine
  lecture-14-elimination-reaction-01-e1-reaction | Elimination Reaction 01: E1 Reaction
  lecture-15-elimination-reaction-02-e2-reaction | Elimination Reaction 02: E2 Reaction
physical/atomic-structure | Atomic Structure
  lecture-01-cathode-ray-rutherford-alpha-particle-scattering-experiment | Cathode Ray & Rutherford α-particle Scattering Experiment
  lecture-02-bohrs-atomic-model | Bohr’s Atomic Model
  lecture-03-atomic-spectrum-hydrogen-spectrum | Atomic Spectrum // Hydrogen Spectrum
  lecture-04-de-broglie-wavelength-heisenbergs-uncertainty-principle | de Broglie Wavelength & Heisenberg’s Uncertainty Principle
  lecture-05-quantum-numbers-paulis-exclusion-principle | Quantum Numbers & Pauli’s Exclusion Principle
  lecture-06-aufbaus-principle-rules-for-filling-electrons | Aufbau’s Principle // Rules for Filling Electrons
  lecture-07-hunds-rule-for-maximum-multiplicity | Hund’s Rule for Maximum Multiplicity
  lecture-08-how-to-do-electronic-configuration | How to Do Electronic Configuration
physical/chemical-kinetics | Chemical Kinetics
  lecture-01-introduction-rate-of-reaction | Introduction // Rate of Reaction
  lecture-02-factors-affecting-rate-of-reaction-7-factors | Factors Affecting Rate of Reaction // 7 Factors
  lecture-03-rate-law-and-order-of-reaction | Rate Law and Order of Reaction
  lecture-04-initial-rate-method-to-determine-order-of-reaction-and-rate-law | Initial Rate Method to Determine Order of Reaction and Rate Law
  lecture-05-zero-order-kinetics-rate-law-and-half-life-of-zero-order | Zero Order Kinetics // Rate Law and Half Life of Zero Order
  lecture-06-first-order-kinetics-complete-first-order-reaction | First Order Kinetics // Complete First Order Reaction
  lecture-07-second-third-and-nth-order-reaction-and-kinetics-all-formulae | Second, Third and nth Order Reaction and Kinetics // All Formulae
  lecture-08-how-to-determine-order-of-reaction-half-life-method-and-other-methods | How to Determine Order of Reaction // Half Life Method and Other Methods
  lecture-09-molecularity-of-reaction-pseudo-order-reaction-molecularity | Molecularity of Reaction // Pseudo Order Reaction // Molecularity
  lecture-10-arrhenius-equation-effect-of-temperature-on-rate-of-reaction | Arrhenius Equation // Effect of Temperature on Rate of Reaction
  lecture-11-complex-reaction-mechanism-of-reaction-steady-state-approximation | Complex Reaction // Mechanism of Reaction // Steady State Approximation
  lecture-12-parallel-first-order-reaction-kinetics | Parallel First Order Reaction Kinetics
physical/chemical-thermodynamics | Chemical Thermodynamics
  lecture-01-reversible-and-irreversible-process | Reversible and Irreversible Process
  lecture-02-heat-concept-of-cp-and-cv-of-a-gas | Heat // Concept of Cp and Cv of a Gas
  lecture-03-work-done-on-by-a-gas | Work Done On/By a Gas
  lecture-04-work-done-in-isothermal-and-adiabatic-expansion-of-gas | Work Done in Isothermal and Adiabatic Expansion of Gas
  lecture-05-first-law-of-thermodynamics | First Law of Thermodynamics
  lecture-06-what-is-enthalpy-relation-between-enthalpy-and-internal-energy | What is Enthalpy? Relation Between Enthalpy and Internal Energy
  lecture-07-heat-of-reaction-enthalpy-of-formation-enthalpy-of-combustion | Heat of Reaction: Enthalpy of Formation, Enthalpy of Combustion
  lecture-08-hess-s-law | Hess's Law
  lecture-09-second-law-of-thermodynamics-introduction | Second Law of Thermodynamics: Introduction
  lecture-10-what-is-entropy-spontaneity-and-entropy | What is Entropy? Spontaneity and Entropy
  lecture-11-entropy-of-different-process-how-to-find-entropy | Entropy of Different Process // How to Find Entropy
  lecture-12-gibb-s-free-energy | Gibb's Free Energy
  lecture-13-standard-gibb-s-free-energy-and-equilibrium-constant | Standard Gibb's Free Energy and Equilibrium Constant
physical/equilibrium | Equilibrium
  lecture-01-introduction-to-equilibrium | Introduction to Equilibrium
  lecture-02-equilibrium-constant-kp-and-kc | Equilibrium Constant Kp and Kc
  lecture-03-law-of-chemical-equilibrium-numericals | Law of Chemical Equilibrium // Numericals
  lecture-04-degree-of-dissociation-and-observed-density | Degree of Dissociation and Observed Density
  lecture-05-le-chatelier-s-principle | Le Chatelier's Principle
  lecture-06-theories-of-acids-and-bases | Theories of Acids and Bases
  lecture-07-ionisation-constant-of-weak-acid-and-base | Ionisation Constant of Weak Acid and Base
  lecture-08-ph-of-solutions-how-to-find-ph-how-to-calculate-ph-of-any-solution | pH of Solutions // How to Find pH? How to Calculate pH of Any Solution?
  lecture-09-common-ion-effect | Common Ion Effect
  lecture-10-buffer-solutions-part-1-of-2 | Buffer Solutions Part 1 of 2
  lecture-11-buffer-solutions-part-2-of-2 | Buffer Solutions Part 2 of 2
  lecture-12-salt-hydrolysis | Salt Hydrolysis
  lecture-13-solubility-and-solubility-product | Solubility and Solubility Product
physical/redox-reactions-and-electrochemistry | Redox Reactions and Electrochemistry
  lecture-01-how-to-find-oxidation-number-methods-and-tricks | How to Find Oxidation Number // Methods and Tricks
  lecture-02-oxidation-and-reduction-and-types-of-redox-reactions | Oxidation and Reduction and Types of Redox Reactions
  lecture-03-balancing-a-chemical-equation-by-ion-electron-method-or-half-reaction-method | Balancing a Chemical Equation by Ion-Electron Method or Half Reaction Method
  lecture-04-balancing-a-chemical-equation-by-oxidation-number-method | Balancing a Chemical Equation by Oxidation Number Method
  lecture-05-daniell-cell-electrochemical-galvanic-voltaic-cell | Daniell Cell // Electrochemical, Galvanic, Voltaic Cell
  lecture-06-electrode-potential-and-emf-of-cell-basics | Electrode Potential and EMF of Cell // Basics
  lecture-07-nernst-equation-for-electrode-potential-and-emf-of-cell | Nernst Equation for Electrode Potential and EMF of Cell
  lecture-08-standard-hydrogen-electrode-she-theory-and-numericals | Standard Hydrogen Electrode (SHE) // Theory and Numericals
  lecture-09-electrochemical-series | Electrochemical Series
  lecture-10-electrolysis-or-electrochemical-cell-introduction-product-at-electrode | Electrolysis or Electrochemical Cell // Introduction, Product at Electrode
  lecture-11-faraday-s-laws-of-electrolysis | Faraday's Laws of Electrolysis
  lecture-12-electrolytic-conductance-conductivity-molar-and-equivalent-conductivity | Electrolytic Conductance: Conductivity, Molar and Equivalent Conductivity
  lecture-13-variation-of-molar-conductivity-with-concentration-kohlrausch-s-law | Variation of Molar Conductivity with Concentration // Kohlrausch's Law
physical/solutions | Solutions
  lecture-01-solutions-01-ii-introduction-and-concentration-terms | Solutions 01 II Introduction and Concentration Terms
  lecture-02-vapour-pressure-of-solution-of-two-volatile-liquids-raoult-s-law | Vapour Pressure of Solution of Two Volatile Liquids // Raoult's Law
  lecture-03-relative-lowering-of-vapour-pressure-due-to-non-volatile-solute-colligative-property | Relative Lowering of Vapour Pressure Due to Non-volatile Solute // Colligative Property
  lecture-04-ideal-and-non-ideal-solutions-raoult-s-law-plus-ve-deviation-and-ve-deviation | Ideal and Non Ideal Solutions // Raoult's Law // +ve Deviation and -ve Deviation
  lecture-05-colligative-property-elevation-in-boiling-point | Colligative Property: Elevation in Boiling Point
  lecture-06-colligative-property-depression-in-freezing-point | Colligative Property: Depression in Freezing Point
  lecture-07-colligative-property-osmotic-pressure | Colligative Property: Osmotic Pressure
  lecture-08-van-t-hoff-factor-and-abnormal-molar-masses | Van’t Hoff Factor and Abnormal Molar Masses
  lecture-09-previous-year-iit-questions-on-colligative-properties | Previous Year IIT Questions on Colligative Properties
  lecture-10-solubility-and-henry-s-law | Solubility and Henry's Law
physical/some-basic-concepts-in-chemistry | Some Basic Concepts in Chemistry
  lecture-01-laws-of-chemical-combination | Laws of Chemical Combination
  lecture-02-concentration-terms-mole-fraction | Concentration Terms // Mole Fraction
  lecture-03-mole-concept-stoichiometry-percentage-composition | Mole Concept, Stoichiometry, Percentage Composition
  lecture-04-molarity-and-molality | Molarity and Molality
  lecture-05-equivalent-weight-and-gram-equivalent-part-1 | Equivalent Weight and Gram Equivalent Part 1
  lecture-06-normality | Normality
physical/states-of-matter | States of Matter
  lecture-01-basic-gas-laws | Basic Gas Laws
  lecture-02-ideal-gas-equation | Ideal Gas Equation
  lecture-03-daltons-law-of-partial-pressure | Dalton's Law of Partial Pressure
  lecture-04-grahams-law-of-diffusion | Graham's Law of Diffusion
  lecture-05-kinetic-theory-of-gases | Kinetic Theory of Gases
  lecture-06-types-of-speeds-of-gas-molecules | Types of Speeds of Gas Molecules
  lecture-07-real-gas-and-ideal-gas-compressibility-factor-z | Real Gas and Ideal Gas // Compressibility Factor Z
  lecture-08-vander-waals-corrections | VanDer Waals Corrections
practical/principles-related-to-practical-chemistry-qualitative-analysis | Principles Related to Practical Chemistry / Qualitative Analysis
  lecture-01-introduction-of-qualitative-analysis | Introduction of Qualitative Analysis
  lecture-02-dry-heating-test | Dry Heating Test
  lecture-03-charcoal-cavity-test | Charcoal Cavity Test
  lecture-04-borax-bead-test | Borax Bead Test
  lecture-05-salt-analysis-solubility-of-salts-in-water | Salt Analysis: Solubility of Salts in Water
  lecture-06-sodium-carbonate-extract-phenolphthalein-test | Sodium Carbonate Extract // Phenolphthalein Test
  lecture-07-sulphite-ion | Sulphite Ion
  lecture-08-sulphide-ion | Sulphide Ion
  lecture-09-nitrite-ion | Nitrite Ion
  lecture-10-acetate-ion-thiosulphate-ion | Acetate Ion // Thiosulphate Ion
  lecture-11-chloride-bromide-iodide-1-2 | Chloride, Bromide, Iodide 1/2
  lecture-12-chloride-bromide-iodide-2-2 | Chloride, Bromide, Iodide 2/2
  lecture-13-anions-iodide-ion | Anions: Iodide Ion
  lecture-14-anions-nitrate-ion | Anions: Nitrate Ion
  lecture-15-oxalate-ion-sulphate-ion | Oxalate Ion // Sulphate Ion
  lecture-16-phosphate-ion-borate-ion | Phosphate Ion // Borate Ion
`.trim();

const CATEGORY_TITLES = {
	physical: 'Physical Chemistry',
	inorganic: 'Inorganic Chemistry',
	organic: 'Organic Chemistry',
	practical: 'Practical Chemistry',
};

function mkdir(relativePath) {
	fs.mkdirSync(path.join(ROOT, relativePath), { recursive: true });
}

function writeFile(relativePath, content) {
	const absolutePath = path.join(ROOT, relativePath);
	fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

	if (fs.existsSync(absolutePath) && !FORCE) {
		return false;
	}

	fs.writeFileSync(absolutePath, content, 'utf8');
	return true;
}

function writeJson(relativePath, data) {
	return writeFile(relativePath, JSON.stringify(data, null, 2) + '\n');
}

function gitkeep(relativeDir) {
	mkdir(relativeDir);
	writeFile(path.join(relativeDir, '.gitkeep'), '');
}

function readme(title, body) {
	return `# ${title}\n\n${body.trim()}\n`;
}

function parseTree() {
	const chapters = [];
	let currentChapter = null;

	for (const rawLine of TREE.split('\n')) {
		const line = rawLine.trimEnd();
		if (!line.trim()) continue;

		if (!line.startsWith('  ')) {
			const parts = line.split('|').map(part => part.trim());
			const [folderPath, title, mode] = parts;
			const [categoryId, chapterId] = folderPath.split('/');

			currentChapter = {
				category_id: categoryId,
				chapter_id: chapterId,
				title,
				replace_standardize_to_jee_wallah: mode === 'REPLACE',
				lectures: [],
			};

			chapters.push(currentChapter);
			continue;
		}

		if (!currentChapter) {
			throw new Error(`Lecture row found before chapter row: ${line}`);
		}

		const parts = line
			.trim()
			.split('|')
			.map(part => part.trim());
		const [lectureFolder, lectureTitle] = parts;

		const numberMatch = lectureFolder.match(/^lecture-(\d+)/);
		const lectureNumber = numberMatch ? Number(numberMatch[1]) : null;

		currentChapter.lectures.push({
			lecture_folder: lectureFolder,
			lecture_number: lectureNumber,
			title: lectureTitle,
		});
	}

	return chapters;
}

function createBaseFolders() {
	mkdir('content');

	writeFile(
		'content/README.md',
		readme(
			'ChemDesk Content',
			`Portable Chemistry content lives here.

Markdown/MDX explains.
JSON connects.
Folders preserve the playlist → lecture hierarchy.
Do not create one giant Chemistry data dump.`,
		),
	);

	for (const [categoryId, title] of Object.entries(CATEGORY_TITLES)) {
		mkdir(`content/${categoryId}`);
		writeFile(
			`content/${categoryId}/README.md`,
			readme(
				title,
				`Generated category folder.

Chapter/topic folders are created from the Master Lectures hierarchy.`,
			),
		);
	}
}

function createChapter(chapter) {
	const chapterDir = `content/${chapter.category_id}/${chapter.chapter_id}`;
	const sourcePlanMode = chapter.replace_standardize_to_jee_wallah
		? 'replace_standardize_to_jee_wallah_topic_only'
		: 'lecture_scaffold';

	mkdir(chapterDir);
	gitkeep(`${chapterDir}/images`);

	writeFile(
		`${chapterDir}/README.md`,
		readme(
			chapter.title,
			`Generated from the Master Lectures hierarchy.

Rules:
- Keep chapter-level assets in images/.
- Keep lecture-specific assets inside each lecture folder's images/.
- Metadata lives beside the folders.
- Do not add HTML files yet.
- Do not add Chemistry teaching content yet.`,
		),
	);

	writeJson(`${chapterDir}/chapter.meta.json`, {
		chapter_id: chapter.chapter_id,
		title: chapter.title,
		category_id: chapter.category_id,
		category_title: CATEGORY_TITLES[chapter.category_id] || chapter.category_id,
		canonical_path: chapterDir,
		status: 'draft',
		source_plan_mode: sourcePlanMode,
		source_plan_status: chapter.replace_standardize_to_jee_wallah
			? 'Replace/standardize to JEE Wallah'
			: 'From Master Lectures scaffold',
		planned_lecture_count: chapter.replace_standardize_to_jee_wallah
			? 0
			: chapter.lectures.length,
		exam_scope: ['jee', 'bitsat', 'tg-eapcet', 'cbse', 'tgipe'],
		source_status: 'needs_review',
		review_status: 'not_started',
		notes: chapter.replace_standardize_to_jee_wallah
			? 'Lecture subfolders intentionally skipped until JEE Wallah replacement source is finalized.'
			: 'Lecture folders generated from Master Lectures hierarchy.',
	});

	if (!chapter.replace_standardize_to_jee_wallah) {
		mkdir(`${chapterDir}/lectures`);
		writeFile(
			`${chapterDir}/lectures/README.md`,
			readme(
				`${chapter.title} Lectures`,
				`Each lecture must live in its own folder.
Each lecture folder must contain its own images/ subfolder.
No shared lecture image dumping ground.`,
			),
		);
	}
}

function createLecture(chapter, lecture) {
	const chapterDir = `content/${chapter.category_id}/${chapter.chapter_id}`;
	const lectureDir = `${chapterDir}/lectures/${lecture.lecture_folder}`;
	const lectureNumberText = String(lecture.lecture_number || '').padStart(
		2,
		'0',
	);

	mkdir(lectureDir);
	gitkeep(`${lectureDir}/images`);

	writeFile(
		`${lectureDir}/README.md`,
		readme(
			`Lecture ${lectureNumberText} — ${lecture.title}`,
			`Generated lecture scaffold only.

Do not add Chemistry teaching content yet.
Keep lecture assets inside this folder's images/ subfolder.`,
		),
	);

	writeJson(`${lectureDir}/lecture.meta.json`, {
		lecture_id: `${chapter.chapter_id}-lecture-${lectureNumberText}`,
		chapter_id: chapter.chapter_id,
		category_id: chapter.category_id,
		lecture_number: lecture.lecture_number,
		title: lecture.title,
		folder: lecture.lecture_folder,
		status: 'raw',
		source_plan_status: 'From Master Lectures scaffold',
		source_platform: 'YouTube',
		source_status: 'needs_review',
		transcript_status: 'not_started',
		timestamp_map_status: 'not_started',
		concept_map_status: 'not_started',
		copyright_review_status: 'needs_review',
		notes:
			'Generated scaffold metadata only. CEE and Source Research must review before content use.',
	});
}

function main() {
	const chapters = parseTree();

	createBaseFolders();

	let lectureCount = 0;
	let replaceOnlyCount = 0;

	for (const chapter of chapters) {
		createChapter(chapter);

		if (chapter.replace_standardize_to_jee_wallah) {
			replaceOnlyCount += 1;
			continue;
		}

		for (const lecture of chapter.lectures) {
			createLecture(chapter, lecture);
			lectureCount += 1;
		}
	}

	console.log('ChemDesk content scaffold complete.');
	console.log(`Chapter folders: ${chapters.length}`);
	console.log(`Lecture folders: ${lectureCount}`);
	console.log(`Replace-standardize topic-only folders: ${replaceOnlyCount}`);
	console.log('');
	console.log('Expected checks:');
	console.log('  find content -name "chapter.meta.json" | wc -l  # 25');
	console.log('  find content -name "lecture.meta.json" | wc -l  # 242');
	console.log('  find content -path "*/images/.gitkeep" | wc -l # 267');
	console.log('');
	console.log('Canonical Chemical Bonding path:');
	console.log('  content/inorganic/chemical-bonding');
	console.log('');
	console.log(
		'No HTML files, Chemistry notes, Astro setup, or validation scripts were created.',
	);
}

main();
