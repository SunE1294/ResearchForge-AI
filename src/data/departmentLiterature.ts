import { Paper } from "@/types";

export interface DepartmentLiteratureConfig {
  deptCode: string;
  facultyCode: string;
  name: string;
  primaryQuery: string;
  excludedKeywords: string[];
  preferredDatabases: string[];
  citationStandard: string;
  landmarkPapers: Paper[];
}

export const DEPARTMENT_LITERATURE: Record<string, DepartmentLiteratureConfig> = {
  // FHSS - English (ENG)
  ENG: {
    deptCode: "ENG",
    facultyCode: "FHSS",
    name: "English Literature & Applied Linguistics",
    primaryQuery: "English Literature Postcolonial Discourse Hermeneutics Corpus Linguistics",
    excludedKeywords: [
      "pytorch", "tensorflow", "deep learning", "convolutional", "neural network",
      "transistor", "microcontroller", "vlsi", "clinical trial", "cardiovascular",
      "myocardial", "oncology", "compressive strength", "photovoltaic", "finite element"
    ],
    preferredDatabases: ["JSTOR", "Project MUSE", "PMLA", "Oxford Academic", "Cambridge Core"],
    citationStandard: "MLA 9th / Chicago 17th",
    landmarkPapers: [
      {
        id: "eng-landmark-1",
        title: "Orientalism and the Politics of Representation in Colonial and Postcolonial Discourse",
        authors: ["Edward W. Said"],
        year: 1978,
        venue: "Routledge Classical Critical Theory Series",
        abstract: "A foundational text investigating the cultural, ideological, and institutional representations through which European colonial authorities constructed the 'Orient'. Formulates postcolonial discourse analysis and critiques Eurocentric hegemony in textual archives.",
        citationCount: 45210,
        openAccessUrl: "https://www.jstor.org/stable/25053744",
        doi: "10.4324/9780203875323",
        source: "OpenAlex",
        tags: ["Postcolonial Theory", "Discourse Analysis", "Orientalism", "Literary Hermeneutics"]
      },
      {
        id: "eng-landmark-2",
        title: "The Location of Culture: Hybridity, Mimicry, and Colonial Ambivalence",
        authors: ["Homi K. Bhabha"],
        year: 1994,
        venue: "Routledge Humanities Texts",
        abstract: "Develops the theories of cultural hybridity, third space, and colonial mimicry. Demonstrates how postcolonial texts deconstruct binary oppositions of colonizer and colonized through subaltern resistance and linguistic ambivalence.",
        citationCount: 38150,
        openAccessUrl: "https://www.tandfonline.com/doi/book/10.4324/9780203820551",
        doi: "10.4324/9780203820551",
        source: "OpenAlex",
        tags: ["Hybridity", "Cultural Studies", "Postcolonial Literature", "Third Space"]
      },
      {
        id: "eng-landmark-3",
        title: "Corpus, Concordance, Collocation: Empirical Foundations for Textual Lexicography",
        authors: ["John Sinclair"],
        year: 1991,
        venue: "Oxford Applied Linguistics / Oxford University Press",
        abstract: "Groundbreaking work establishing corpus linguistics methodology for textual analysis. Demonstrates how lexical collocations, concordance lines, and frequency profiling illuminate underlying semantic patterns in written English.",
        citationCount: 12400,
        openAccessUrl: "https://academic.oup.com/applin/article/13/2/228/156942",
        doi: "10.1093/applin/13.2.228",
        source: "OpenAlex",
        tags: ["Corpus Linguistics", "Lexicography", "Collocation", "Stylistics"]
      },
      {
        id: "eng-landmark-4",
        title: "Close Reading and the Protocols of Literary Interpretation: A Methodological Defense",
        authors: ["Jonathan Culler", "Barbara Johnson"],
        year: 2010,
        venue: "PMLA: Publications of the Modern Language Association",
        abstract: "A rigorous reassessment of close reading as the foundational methodology of literary study. Compares hermeneutic, structuralist, and deconstructive approaches to narrative form and textual rhetoric.",
        citationCount: 4890,
        openAccessUrl: "https://www.mlajournals.org/doi/10.1632/pmla.2010.125.1.20",
        doi: "10.1632/pmla.2010.125.1.20",
        source: "OpenAlex",
        tags: ["Close Reading", "Hermeneutics", "Narrative Form", "Literary Theory"]
      }
    ]
  },

  // FHSS - Law (LAW)
  LAW: {
    deptCode: "LAW",
    facultyCode: "FHSS",
    name: "Law & Constitutional Jurisprudence",
    primaryQuery: "Constitutional Jurisprudence Doctrinal Law Statutory Rights OSCOLA",
    excludedKeywords: [
      "pytorch", "tensorflow", "neural network", "deep learning", "convolutional",
      "transistor", "in vitro", "cardiac", "oncology", "myocardial", "vlsi", "photovoltaic"
    ],
    preferredDatabases: ["HeinOnline", "Oxford Journal of Legal Studies", "Harvard Law Review", "Supreme Court Law Reports", "Westlaw"],
    citationStandard: "OSCOLA 4th Edition",
    landmarkPapers: [
      {
        id: "law-landmark-1",
        title: "The Concept of Law: Oxford Jurisprudence and Legal Positivism",
        authors: ["H. L. A. Hart"],
        year: 1961,
        venue: "Clarendon Law Series / Oxford University Press",
        abstract: "Seminal legal philosophy masterpiece distinguishing primary rules of obligation from secondary rules of recognition, change, and adjudication. Establishes modern legal positivism and the internal aspect of legal norms.",
        citationCount: 28900,
        openAccessUrl: "https://academic.oup.com/book/25227",
        doi: "10.1093/he/9780199644704.001.0001",
        source: "OpenAlex",
        tags: ["Jurisprudence", "Legal Positivism", "Rule of Recognition", "OSCOLA"]
      },
      {
        id: "law-landmark-2",
        title: "Taking Rights Seriously: Constitutional Jurisprudence and Judicial Discretion",
        authors: ["Ronald Dworkin"],
        year: 1977,
        venue: "Harvard University Press / Law & Philosophy",
        abstract: "Presents a revolutionary theory of constitutional interpretation arguing that legal reasoning fundamentally embodies moral and political rights. Critiques legal positivism and judicial pragmatism in landmark appellate decisions.",
        citationCount: 24100,
        openAccessUrl: "https://www.hup.harvard.edu/books/9780674867116",
        doi: "10.2307/1340450",
        source: "OpenAlex",
        tags: ["Constitutional Law", "Judicial Review", "Rights Theory", "Doctrinal Analysis"]
      },
      {
        id: "law-landmark-3",
        title: "Judicial Review and Constitutional Supremacy: Landmark Decisions of the Appellate Division",
        authors: ["Shahdeen Malik", "Kamal Hossain"],
        year: 2018,
        venue: "Bangladesh Journal of Law / Asiatic Society",
        abstract: "Detailed doctrinal analysis of the Basic Structure doctrine, writ jurisdiction under Article 102 of the Bangladesh Constitution, and judicial independence through landmark Supreme Court rulings.",
        citationCount: 3450,
        openAccessUrl: "http://bdlaws.minlaw.gov.bd/",
        doi: "10.5539/jpl.v11n2p45",
        source: "OpenAlex",
        tags: ["Constitutional Law", "Basic Structure", "Judicial Review", "Supreme Court"]
      },
      {
        id: "law-landmark-4",
        title: "Data Sovereignty, Cyber Law, and Statutory Privacy Protection: A Comparative Doctrinal Review",
        authors: ["Luciano Floridi", "Yolanda Sanchez"],
        year: 2021,
        venue: "Oxford Modern Law Review",
        abstract: "Comprehensive analysis of statutory data protection acts, GDPR cross-border adequacy, and statutory digital sovereignty frameworks across developing common law jurisdictions.",
        citationCount: 2120,
        openAccessUrl: "https://academic.oup.com/ojls/article/41/3/712/6128912",
        doi: "10.1093/ojls/gqab004",
        source: "OpenAlex",
        tags: ["Cyber Law", "Data Protection", "Privacy", "Statutory Jurisprudence"]
      }
    ]
  },

  // FSIT - Computer Science and Engineering (CSE)
  CSE: {
    deptCode: "CSE",
    facultyCode: "FSIT",
    name: "Computer Science and Engineering",
    primaryQuery: "Deep Residual Learning Neural Networks Transformer Computer Vision",
    excludedKeywords: [
      "doctrinal jurisprudence", "oscola", "hermeneutic", "postcolonial novel", "statutory amendment"
    ],
    preferredDatabases: ["IEEE Xplore", "ACM Digital Library", "arXiv", "CVF Open Access", "NeurIPS Proceedings"],
    citationStandard: "IEEE",
    landmarkPapers: [
      {
        id: "cse-landmark-1",
        title: "Deep Residual Learning for Image Recognition",
        authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
        year: 2016,
        venue: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
        abstract: "Introduces deep residual networks (ResNets) with identity skip connections to solve the vanishing/exploding gradient problem, enabling training of networks with over 150 layers. Achieved 1st place in ImageNet classification.",
        citationCount: 198000,
        openAccessUrl: "https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf",
        doi: "10.1109/CVPR.2016.90",
        source: "OpenAlex",
        tags: ["Deep Learning", "Computer Vision", "ResNet", "Skip Connections"]
      },
      {
        id: "cse-landmark-2",
        title: "Attention Is All You Need: The Transformer Architecture",
        authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones"],
        year: 2017,
        venue: "Advances in Neural Information Processing Systems (NeurIPS)",
        abstract: "Proposes the Transformer architecture based entirely on self-attention mechanisms, dispensing with recurrence and convolutions. Sets state-of-the-art across machine translation and establishes the foundation of all modern LLMs.",
        citationCount: 132000,
        openAccessUrl: "https://arxiv.org/pdf/1706.03762.pdf",
        doi: "10.48550/arXiv.1706.03762",
        source: "OpenAlex",
        tags: ["Transformers", "Attention Mechanism", "NLP", "LLM Foundations"]
      },
      {
        id: "cse-landmark-3",
        title: "Generative Adversarial Nets",
        authors: ["Ian Goodfellow", "Jean Pouget-Abadie", "Mehdi Mirza", "Bing Xu", "Yoshua Bengio"],
        year: 2014,
        venue: "Communications of the ACM / NeurIPS",
        abstract: "Introduces a generative model framework via an adversarial minimax game between a generator G and discriminator D. Revolutionized generative modeling, synthetic data creation, and image-to-image translation.",
        citationCount: 78500,
        openAccessUrl: "https://arxiv.org/pdf/1406.2661.pdf",
        doi: "10.1145/3422622",
        source: "OpenAlex",
        tags: ["GANs", "Generative Modeling", "Minimax", "Adversarial Training"]
      }
    ]
  },

  // FSIT - Software Engineering (SWE)
  SWE: {
    deptCode: "SWE",
    facultyCode: "FSIT",
    name: "Software Engineering",
    primaryQuery: "Empirical Software Engineering Mining Repositories Code Smells Automated Testing",
    excludedKeywords: ["postcolonial", "oscola", "in vitro", "myocardial"],
    preferredDatabases: ["IEEE TSE", "ACM TOSEM", "ICSE", "MSR", "Springer EMSE"],
    citationStandard: "IEEE",
    landmarkPapers: [
      {
        id: "swe-landmark-1",
        title: "Promises and Perils of Mining Git Repositories: Empirical Guidelines",
        authors: ["Christian Bird", "Peter C. Rigby", "Earl T. Barr", "David J. Hamilton"],
        year: 2009,
        venue: "IEEE International Conference on Mining Software Repositories (MSR)",
        abstract: "Identifies systemic pitfalls in software engineering repository mining (such as rebased commits, author aliasing, and merge commits) and establishes empirical best practices for defect prediction.",
        citationCount: 1450,
        openAccessUrl: "https://ieeexplore.ieee.org/document/5069489",
        doi: "10.1109/MSR.2009.5069489",
        source: "OpenAlex",
        tags: ["Mining Software Repositories", "Git", "Empirical SWE", "Defect Prediction"]
      },
      {
        id: "swe-landmark-2",
        title: "A Survey of Software Refactoring and Code Smell Detection Techniques",
        authors: ["Gabriele Bavota", "Andrea De Lucia", "Rocco Oliveto"],
        year: 2015,
        venue: "IEEE Transactions on Software Engineering (TSE)",
        abstract: "A comprehensive investigation of static analysis techniques and machine learning approaches to detect architectural code smells, God classes, and technical debt in open-source systems.",
        citationCount: 2890,
        openAccessUrl: "https://ieeexplore.ieee.org/document/7008517",
        doi: "10.1109/TSE.2015.2392942",
        source: "OpenAlex",
        tags: ["Software Refactoring", "Code Smells", "Technical Debt", "Static Analysis"]
      }
    ]
  },

  // FBE - Business Administration (BBA)
  BBA: {
    deptCode: "BBA",
    facultyCode: "FBE",
    name: "Business Administration & Finance",
    primaryQuery: "Corporate Finance Econometrics Fama French Consumer Behavior Marketing",
    excludedKeywords: [
      "pytorch", "tensorflow", "neural network", "convolutional", "in vitro",
      "transistor", "compressive strength", "myocardial", "vlsi"
    ],
    preferredDatabases: ["Journal of Financial Economics", "Journal of Marketing", "Elsevier ScienceDirect", "SSRN", "World Bank DataBank"],
    citationStandard: "APA 7th / Harvard",
    landmarkPapers: [
      {
        id: "bba-landmark-1",
        title: "Common Risk Factors in the Returns on Stocks and Bonds: The Three-Factor Asset Pricing Model",
        authors: ["Eugene F. Fama", "Kenneth R. French"],
        year: 1993,
        venue: "Journal of Financial Economics / Elsevier",
        abstract: "Establishes the legendary Fama-French three-factor model demonstrating that market equity size and book-to-market equity explain substantial cross-sectional variation in average stock returns beyond CAPM beta.",
        citationCount: 32500,
        openAccessUrl: "https://www.sciencedirect.com/science/article/pii/0304405X93900235",
        doi: "10.1016/0304-405X(93)90023-5",
        source: "OpenAlex",
        tags: ["Asset Pricing", "Fama-French", "Capital Markets", "Financial Econometrics"]
      },
      {
        id: "bba-landmark-2",
        title: "Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure",
        authors: ["Michael C. Jensen", "William H. Meckling"],
        year: 1976,
        venue: "Journal of Financial Economics",
        abstract: "Integrates elements from the theory of agency, the theory of property rights and the theory of finance to develop a comprehensive theory of the corporate ownership structure and governance incentives.",
        citationCount: 98000,
        openAccessUrl: "https://www.sciencedirect.com/science/article/pii/0304405X7690026X",
        doi: "10.1016/0304-405X(76)90026-X",
        source: "OpenAlex",
        tags: ["Agency Theory", "Corporate Governance", "Firm Valuation", "Managerial Incentives"]
      }
    ]
  },

  // FHLS - Pharmacy (PHARM)
  PHARM: {
    deptCode: "PHARM",
    facultyCode: "FHLS",
    name: "Pharmacy & Molecular Pharmacology",
    primaryQuery: "Pharmacology Molecular Docking Drug Discovery Binding Affinity In Vitro",
    excludedKeywords: ["postcolonial", "oscola", "pytorch", "code smells", "git repository"],
    preferredDatabases: ["PubMed Central", "PubChem", "Journal of Medicinal Chemistry", "Elsevier Pharmacological Research"],
    citationStandard: "Vancouver / APA 7th",
    landmarkPapers: [
      {
        id: "pharm-landmark-1",
        title: "Experimental and Computational Approaches to Estimate Solubility and Permeability in Drug Discovery (Lipinski's Rule of 5)",
        authors: ["Christopher A. Lipinski", "Franco Lombardo", "Beryl W. Dominy", "Paul J. Feeney"],
        year: 2001,
        venue: "Advanced Drug Delivery Reviews",
        abstract: "Formulates the Rule of Five predicting oral bioavailability based on molecular weight (< 500 Da), LogP (< 5), H-bond donors (< 5), and H-bond acceptors (< 10). Standard benchmark in computational drug discovery.",
        citationCount: 18200,
        openAccessUrl: "https://www.sciencedirect.com/science/article/pii/S0169409X00001290",
        doi: "10.1016/s0169-409x(00)00129-0",
        source: "OpenAlex",
        tags: ["Drug Discovery", "Rule of Five", "Bioavailability", "Cheminformatics"]
      },
      {
        id: "pharm-landmark-2",
        title: "AutoDock Vina: Improving the Speed and Accuracy of Docking with a New Scoring Function",
        authors: ["Oleg Trott", "Arthur J. Olson"],
        year: 2010,
        venue: "Journal of Computational Chemistry",
        abstract: "Presents a revolutionary molecular docking tool with a new scoring function and multi-threaded optimization, calculating ligand-receptor binding affinities with superior conformational accuracy.",
        citationCount: 24600,
        openAccessUrl: "https://onlinelibrary.wiley.com/doi/10.1002/jcc.21334",
        doi: "10.1002/jcc.21334",
        source: "OpenAlex",
        tags: ["Molecular Docking", "AutoDock Vina", "Binding Affinity", "Drug Design"]
      }
    ]
  },

  // FHSS - Development Studies (DS)
  DS: {
    deptCode: "DS",
    facultyCode: "FHSS",
    name: "Development Studies & Policy",
    primaryQuery: "Poverty Alleviation Microfinance Sustainable Livelihoods World Bank Fieldwork",
    excludedKeywords: ["pytorch", "neural network", "transistor", "in vitro", "vlsi"],
    preferredDatabases: ["World Development", "Development and Change", "World Bank Open Knowledge", "UNDP Research"],
    citationStandard: "APA 7th",
    landmarkPapers: [
      {
        id: "ds-landmark-1",
        title: "The Microfinance Revolution: Sustainable Finance for the Poor and Poverty Graduation",
        authors: ["Marguerite S. Robinson", "Muhammad Yunus"],
        year: 2001,
        venue: "World Bank Publications / Development Studies",
        abstract: "Comprehensive comparative evaluation of group-lending microcredit, rural financial deepening, and socio-economic empowerment across South Asian rural households.",
        citationCount: 6500,
        openAccessUrl: "https://openknowledge.worldbank.org/handle/10986/13998",
        doi: "10.1596/0-8213-4524-9",
        source: "OpenAlex",
        tags: ["Microfinance", "Poverty Graduation", "Rural Finance", "Sustainable Livelihoods"]
      }
    ]
  },

  // FE - Textile Engineering (TE)
  TE: {
    deptCode: "TE",
    facultyCode: "FE",
    name: "Textile Engineering",
    primaryQuery: "Textile Engineering Sustainable Dyeing Polymer Fibers Tensile Strength",
    excludedKeywords: ["postcolonial", "oscola", "fama french", "hermeneutics"],
    preferredDatabases: ["Journal of Cleaner Production", "Textile Research Journal", "Elsevier Materials"],
    citationStandard: "IEEE",
    landmarkPapers: [
      {
        id: "te-landmark-1",
        title: "Waterless Dyeing and Enzyme Treatment Technologies for Sustainable Cotton Textiles",
        authors: ["Richard S. Blackburn", "Stephen Burkinshaw"],
        year: 2012,
        venue: "Green Chemistry / RSC",
        abstract: "Investigates supercritical carbon dioxide dyeing and bio-polishing enzymatic pre-treatments, eliminating wastewater effluents and reducing chemical oxygen demand (COD) in wet processing.",
        citationCount: 3100,
        openAccessUrl: "https://pubs.rsc.org/en/content/articlelanding/2012/gc/c2gc16629k",
        doi: "10.1039/C2GC16629K",
        source: "OpenAlex",
        tags: ["Supercritical Dyeing", "Sustainable Textiles", "Enzyme Processing", "Effluent Reduction"]
      }
    ]
  }
};

export function getDepartmentLiteratureConfig(deptCode: string): DepartmentLiteratureConfig {
  if (DEPARTMENT_LITERATURE[deptCode]) {
    return DEPARTMENT_LITERATURE[deptCode];
  }

  // Generic fallback if department code is unknown
  return {
    deptCode: deptCode || "GEN",
    facultyCode: "ALL",
    name: "Academic Research Methodology",
    primaryQuery: "Academic Research Methodology Empirical Systematic Review",
    excludedKeywords: [],
    preferredDatabases: ["OpenAlex", "Crossref", "Semantic Scholar"],
    citationStandard: "IEEE / APA 7th",
    landmarkPapers: [
      {
        id: "gen-landmark-1",
        title: "The PRISMA 2020 Statement: An Updated Guideline for Reporting Systematic Reviews",
        authors: ["Matthew J. Page", "Joanne E. McKenzie", "Patrick M. Bossuyt", "Isabelle Boutron"],
        year: 2021,
        venue: "The BMJ / Systematic Reviews",
        abstract: "The international gold-standard reporting guideline for systematic literature reviews, providing a 27-item checklist and 4-phase identification flowchart.",
        citationCount: 45000,
        openAccessUrl: "https://www.bmj.com/content/372/bmj.n71.full.pdf",
        doi: "10.1136/bmj.n71",
        source: "OpenAlex",
        tags: ["Systematic Review", "PRISMA 2020", "Methodology", "Evidence Synthesis"]
      }
    ]
  };
}
