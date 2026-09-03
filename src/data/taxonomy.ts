import { DepartmentInfo, FacultyCode, DepartmentCode } from "@/types";

export interface FacultyMeta {
  code: FacultyCode;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
}

export const FACULTIES: FacultyMeta[] = [
  {
    code: "FSIT",
    name: "Faculty of Science & Information Technology",
    nameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    description: "Computational sciences, software engineering, spatial data, and high-performance computing.",
    descriptionBn: "কম্পিউটেশনাল সায়েন্স, সফটওয়্যার ইঞ্জিনিয়ারিং, স্পেশিয়াল ডেটা এবং হাই-পারফরম্যান্স কম্পিউটিং।"
  },
  {
    code: "FE",
    name: "Faculty of Engineering",
    nameBn: "প্রকৌশল অনুষদ",
    description: "Hardware systems, materials, structural modeling, telecommunications, and sustainable architecture.",
    descriptionBn: "হার্ডওয়্যার সিস্টেম, টেক্সটাইল ও বস্তু বিজ্ঞান, স্ট্রাকচারাল মডেলিং এবং স্থাপত্য ডিজাইন।"
  },
  {
    code: "FBE",
    name: "Faculty of Business & Entrepreneurship",
    nameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    description: "Econometrics, empirical consumer behavior, market systems, financial analytics, and supply chains.",
    descriptionBn: "ইকোনোমেট্রিক্স, ভোক্তা আচরণ, আর্থিক বিশ্লেষণ এবং বাজার গবেষণা।"
  },
  {
    code: "FHLS",
    name: "Faculty of Health & Life Sciences",
    nameBn: "স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ",
    description: "Biostatistics, epidemiology, molecular therapeutics, clinical nutrition, and agricultural field trials.",
    descriptionBn: "বায়োস্ট্যাটিস্টিক্স, মহামারীবিদ্যা, মলিকুলার থেরাপিউটিকস এবং কৃষি গবেষণা।"
  },
  {
    code: "FHSS",
    name: "Faculty of Humanities & Social Sciences",
    nameBn: "মানবিক ও সামাজিক বিজ্ঞান অনুষদ",
    description: "Hermeneutic analysis, statutory jurisprudence, qualitative fieldwork, and thematic media discourse.",
    descriptionBn: "গুণগত ক্ষেত্র গবেষণা, আইন ও আইনি ব্যাখ্যা, সাহিত্য ও মিডিয়া বিশ্লেষণ।"
  },
  {
    code: "OTHER",
    name: "Other Faculty (Type Custom...)",
    nameBn: "অন্যান্য অনুষদ (নিজে লিখুন...)",
    description: "Custom or multidisciplinary institutional faculty structure across universities.",
    descriptionBn: "বহুবিষয়ক বা কাস্টম প্রাতিষ্ঠানিক অনুষদ কাঠামো।"
  }
];

export const DEPARTMENTS: DepartmentInfo[] = [
  // FSIT (7 Departments)
  {
    code: "CSE",
    name: "Computer Science and Engineering",
    nameBn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "High Compute (PyTorch, Colab, Kaggle, LaTeX)",
    recommendedCitation: "IEEE",
    primaryTools: ["PyTorch / TensorFlow", "Google Colab Pro / Kaggle GPU", "Overleaf (LaTeX)", "Weights & Biases", "GitHub CI/CD"],
    keyVenues: ["IEEE TPAMI", "CVPR / ICCV", "NeurIPS", "ACM SIGKDD", "IEEE Access"],
    benchmarkDatasets: ["ImageNet", "HuggingFace Datasets", "MIMIC-IV", "Common Voice Bengali", "Kaggle Competitions"],
    methodologyFocus: ["Ablation Studies", "K-Fold Cross Validation", "Algorithmic Complexity (Big-O)", "Statistical Significance Testing (t-test, ANOVA)"],
    description: "Algorithmic design, deep neural networks, computer vision, natural language processing, and distributed systems.",
    descriptionBn: "অ্যালগরিদম ডিজাইন, ডিপ লার্নিং, কম্পিউটার ভিশন, বাংলা এনএলপি এবং ডিস্ট্রিবিউটেড সিস্টেমস।"
  },
  {
    code: "SWE",
    name: "Software Engineering",
    nameBn: "সফটওয়্যার ইঞ্জিনিয়ারিং",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "High Compute (DevOps, Repositories, IEEE)",
    recommendedCitation: "IEEE",
    primaryTools: ["GitHub / GitLab", "SonarQube (Code Smells)", "Docker / Kubernetes", "Jira / Linear", "LaTeX / IEEEtran"],
    keyVenues: ["IEEE TSE", "ACM TOSEM", "ICSE", "FSE", "MSR (Mining Software Repositories)"],
    benchmarkDatasets: ["GitHub Archive", "Defects4J", "Smart Contract Vulnerability Datasets", "Software Metric Repositories"],
    methodologyFocus: ["Empirical Software Engineering", "Repository Mining (MSR)", "Static & Dynamic Analysis", "Controlled Developer Experiments"],
    description: "Software architecture, automated testing, DevOps pipelines, code refactoring, and secure lifecycle engineering.",
    descriptionBn: "সফটওয়্যার আর্কিটেকচার, অটোমেটেড টেস্টিং, রিপোজিটরি মাইনিং এবং কোড সিকিউরিটি।"
  },
  {
    code: "CIS",
    name: "Computing and Information System",
    nameBn: "কম্পিউটিং অ্যান্ড ইনফরমেশন সিস্টেম",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "Applied Data (SQL, Analytics, Elsevier)",
    recommendedCitation: "IEEE",
    primaryTools: ["PostgreSQL / BigQuery", "Power BI / Tableau", "Python (Pandas, Scikit-learn)", "KNIME Analytics", "Elsevier Template"],
    keyVenues: ["Information Systems (Elsevier)", "Decision Support Systems", "IEEE Big Data", "ACM TIS"],
    benchmarkDatasets: ["UCI Machine Learning Repository", "Kaggle Business Analytics", "Government Open Data Bangladesh", "E-commerce Clickstream"],
    methodologyFocus: ["CRISP-DM Framework", "Database Benchmarking", "Predictive Analytics Modeling", "User Acceptance (UTAUT)"],
    description: "Data warehousing, enterprise information systems, applied business intelligence, and cloud relational architectures.",
    descriptionBn: "ডেটা ওয়্যারহাউজিং, এন্টারপ্রাইজ ইনফরমেশন সিস্টেম, অ্যাপ্লায়েড অ্যানালিটিক্স এবং ক্লাউড আর্কিটেকচার।"
  },
  {
    code: "ITM",
    name: "Information Technology & Management",
    nameBn: "ইনফরমেশন টেকনোলজি অ্যান্ড ম্যানেজমেন্ট",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "Systems Analysis & Empirical Surveys",
    recommendedCitation: "APA 7th",
    primaryTools: ["SmartPLS (SEM)", "SPSS", "Lucidchart / Enterprise Architect", "Qualtrics / Google Forms", "Zotero"],
    keyVenues: ["International Journal of Information Management", "MIS Quarterly", "Computers in Human Behavior", "AMCIS"],
    benchmarkDatasets: ["Pew Internet Research", "Digital Bangladesh Metrics", "Enterprise IT Adoption Surveys"],
    methodologyFocus: ["Structural Equation Modeling (PLS-SEM)", "Technology Acceptance Model (TAM/UTAUT)", "Mixed-Method Case Studies"],
    description: "IT governance, digital transformation management, systems integration, and socioeconomic IT adoption.",
    descriptionBn: "আইটি গভর্নেন্স, ডিজিটাল রূপান্তর ব্যবস্থাপনা, প্রযুক্তি গ্রহণ মডেল (TAM) এবং স্ট্রাকচারাল ইকুয়েশন মডেলিং।"
  },
  {
    code: "MCT",
    name: "Multimedia & Creative Technology",
    nameBn: "মাল্টিমিডিয়া অ্যান্ড ক্রিয়েটিভ টেকনোলজি",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "HCI, Design Research, UX Tooling",
    recommendedCitation: "IEEE",
    primaryTools: ["Figma / ProtoPie", "Unity / Unreal Engine", "Blender 3D", "Tobii Eye Tracker / Morae", "Miro"],
    keyVenues: ["ACM CHI", "IEEE Transactions on Visualization and Computer Graphics", "DIS (Designing Interactive Systems)", "IEEE VR"],
    benchmarkDatasets: ["AffectNet", "UI/UX Usability Test Repositories", "Open 3D Model Repositories"],
    methodologyFocus: ["System Usability Scale (SUS)", "Heuristic Evaluation (Nielsen)", "A/B Testing with Heatmaps", "Think-Aloud Protocols"],
    description: "Human-computer interaction (HCI), VR/AR immersion, user experience (UX) science, and interactive media systems.",
    descriptionBn: "হিউম্যান-কম্পিউটার ইন্টারঅ্যাকশন (HCI), ভিআর/এআর, ব্যবহারযোগ্যতা মূল্যায়ন (SUS) এবং ইউজার এক্সপেরিয়েন্স।"
  },
  {
    code: "ESDM",
    name: "Environmental Science & Disaster Mgmt",
    nameBn: "পরিবেশ বিজ্ঞান ও দুর্যোগ ব্যবস্থাপনা",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "GIS, Spatial Datasets, Statistical Modeling",
    recommendedCitation: "APA 7th",
    primaryTools: ["QGIS / ArcGIS Pro", "Google Earth Engine (GEE)", "R (Spatial, sf, raster)", "OpenStreetMap", "SPSS"],
    keyVenues: ["Remote Sensing of Environment", "Journal of Hydrology", "International Journal of Disaster Risk Reduction", "Nature Climate Change"],
    benchmarkDatasets: ["Copernicus Sentinel Hub", "USGS Landsat", "NASA EarthData", "Bangladesh Disaster Knowledge Network (BDKN)"],
    methodologyFocus: ["Multi-Criteria Decision Analysis (AHP)", "Normalized Difference Vegetation Index (NDVI)", "Flood Susceptibility Mapping", "Time-Series Satellite Analytics"],
    description: "Geospatial modeling, satellite remote sensing, flood/cyclone vulnerability indexing, and climate adaptation.",
    descriptionBn: "ভৌগোলিক তথ্য ব্যবস্থা (GIS), রিমোট সেন্সিং, দুর্যোগ ঝুঁকি ম্যাপিং এবং জলবায়ু পরিবর্তন বিশ্লেষণ।"
  },
  {
    code: "PESS",
    name: "Physical Education & Sports Science",
    nameBn: "শারীরিক শিক্ষা ও ক্রীড়া বিজ্ঞান",
    facultyCode: "FSIT",
    facultyName: "Faculty of Science & Information Technology",
    facultyNameBn: "বিজ্ঞান ও তথ্যপ্রযুক্তি অনুষদ",
    archetype: "Biomechanics & Empirical Quantitative Tools",
    recommendedCitation: "APA 7th",
    primaryTools: ["Kinovea (Video Motion Analysis)", "OpenCap / Vicon", "SPSS / Jamovi", "Polar Beat (HRV Monitors)", "Excel Solver"],
    keyVenues: ["Journal of Sports Sciences", "Sports Medicine", "Medicine & Science in Sports & Exercise", "International Journal of Sports Physiology"],
    benchmarkDatasets: ["PhysioNet Biomechanics", "Athletic Performance Open Datasets", "Fitbit / Garmin Public Research Sets"],
    methodologyFocus: ["Kinematic Motion Tracking", "VO2 Max & Physiological Metrics", "Pre-Post Intervention Clinical Trials", "Reliability Testing (ICC)"],
    description: "Human movement kinematics, cardiovascular conditioning, sports psychology, and quantitative physical metrics.",
    descriptionBn: "বায়োমেকানিক্স, মানব গতিশীলতা বিশ্লেষণ, ক্রীড়া শারীরতত্ত্ব এবং পারফরম্যান্স মূল্যায়ন।"
  },

  // FE (4 Departments)
  {
    code: "EEE",
    name: "Electrical & Electronic Engineering",
    nameBn: "ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং",
    facultyCode: "FE",
    facultyName: "Faculty of Engineering",
    facultyNameBn: "প্রকৌশল অনুষদ",
    archetype: "MATLAB, Circuit Simulators, IEEE Xplore",
    recommendedCitation: "IEEE",
    primaryTools: ["MATLAB / Simulink", "Cadence Virtuoso / LTspice", "Proteus / KiCad", "Ansys HFSS", "Overleaf"],
    keyVenues: ["IEEE Transactions on Power Systems", "IEEE Transactions on Electron Devices", "IEEE TIE", "IEEE Access"],
    benchmarkDatasets: ["IEEE Test Feeder Systems", "NREL Solar Radiation Data", "Lithium-Ion Battery Aging Datasets"],
    methodologyFocus: ["Finite Element Analysis (FEA)", "Monte Carlo Power Flow Simulation", "SPICE Transient Modeling", "Hardware Prototyping Validation"],
    description: "Renewable microgrids, semiconductor device modeling, embedded robotics, and signal processing.",
    descriptionBn: "নবায়নযোগ্য শক্তি, সার্কিট সিমুলেশন, এম্বেডেড সিস্টেম এবং সিগন্যাল প্রসেসিং।"
  },
  {
    code: "TE",
    name: "Textile Engineering",
    nameBn: "টেক্সটাইল ইঞ্জিনিয়ারিং",
    facultyCode: "FE",
    facultyName: "Faculty of Engineering",
    facultyNameBn: "প্রকৌশল অনুষদ",
    archetype: "Materials Science, Testing Protocols",
    recommendedCitation: "IEEE",
    primaryTools: ["Design-Expert (Response Surface Methodology)", "OriginLab (Spectra Analysis)", "SEM ImageJ (Fiber Analysis)", "Minitab"],
    keyVenues: ["Textile Research Journal", "Journal of Cleaner Production", "Carbohydrate Polymers", "Coloration Technology"],
    benchmarkDatasets: ["Materials Project Datasets", "Dye Adsorption Kinetics Repositories", "RMG Export & Sustainability Metrics"],
    methodologyFocus: ["Response Surface Methodology (RSM)", "Tensile Testing (ASTM D5034)", "Spectrophotometric Color Matching (CIE L*a*b*)", "Biodegradation Kinetics"],
    description: "Smart textiles, sustainable dyeing effluents, nanofiber electrospinning, and apparel supply chain optimization.",
    descriptionBn: "স্মার্ট টেক্সটাইল, টেকসই ডাইং প্রযুক্তি, ন্যানোফাইবার এবং টেক্সটাইল সামগ্রী পরীক্ষা।"
  },
  {
    code: "CE",
    name: "Civil Engineering",
    nameBn: "সিভিল ইঞ্জিনিয়ারিং",
    facultyCode: "FE",
    facultyName: "Faculty of Engineering",
    facultyNameBn: "প্রকৌশল অনুষদ",
    archetype: "Structural CAD, Material Testing Datasets",
    recommendedCitation: "IEEE",
    primaryTools: ["ETABS / SAP2000", "AutoCAD / Civil 3D", "GEO5 (Geotechnical)", "Abaqus FEA", "Minitab"],
    keyVenues: ["ASCE Journal of Structural Engineering", "Construction and Building Materials", "Computers & Structures", "Cement and Concrete Research"],
    benchmarkDatasets: ["PEER Ground Motion Database", "Concrete Compressive Strength Repositories", "Global Bridge Condition Datasets"],
    methodologyFocus: ["Nonlinear Static Pushover Analysis", "Compressive Strength Regression Modeling", "Soil Bearing Capacity Calculations (BNBC 2020)", "Life-Cycle Assessment (LCA)"],
    description: "Earthquake-resistant structures, green concrete geopolymer, transportation systems, and geotechnical foundations.",
    descriptionBn: "ভূমিকম্প সহনশীল কাঠামো, জিওপলিমার কংক্রিট, মাটি পরীক্ষা এবং অবকাঠামো ডিজাইন।"
  },
  {
    code: "ARCH",
    name: "Architecture",
    nameBn: "আর্কিটেকচার",
    facultyCode: "FE",
    facultyName: "Faculty of Engineering",
    facultyNameBn: "প্রকৌশল অনুষদ",
    archetype: "Spatial Design, Qualitative Case Studies",
    recommendedCitation: "Chicago",
    primaryTools: ["Rhino 3D / Grasshopper", "Revit BIM", "Ladybug / Honeybee (Daylight Simulation)", "AutoCAD", "InDesign"],
    keyVenues: ["Architectural Science Review", "Building and Environment", "Energy and Buildings", "Journal of Architectural Education"],
    benchmarkDatasets: ["EnergyPlus Weather Files (EPW)", "Urban Morphology Open Spatial Data", "Vernacular Architecture Archives"],
    methodologyFocus: ["Parametric Computational Design", "Daylight Factor Simulation (DF%)", "Post-Occupancy Evaluation (POE)", "Typological Historical Morphing"],
    description: "Climate-responsive tropical architecture, parametric urbanism, daylight physics, and cultural heritage conservation.",
    descriptionBn: "জলবায়ু-বান্ধব স্থাপত্য, ডে-লাইট সিমুলেশন, প্যারামেট্রিক ডিজাইন এবং ঐতিহ্য সংরক্ষণ।"
  },

  // FBE (5 Departments)
  {
    code: "BBA",
    name: "Business Administration",
    nameBn: "বিজনেস অ্যাডমিনিস্ট্রেশন",
    facultyCode: "FBE",
    facultyName: "Faculty of Business & Entrepreneurship",
    facultyNameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    archetype: "SPSS, SmartPLS, Econometrics, Harvard Ref",
    recommendedCitation: "Harvard",
    primaryTools: ["SPSS Statistics", "SmartPLS 4", "STATA", "EViews", "Mendeley"],
    keyVenues: ["Journal of Marketing", "Journal of Business Research", "Strategic Management Journal", "Journal of Financial Economics"],
    benchmarkDatasets: ["World Bank Open Data", "Dhaka Stock Exchange Historical Feed", "Kaggle FinTech & Customer Churn Sets"],
    methodologyFocus: ["Confirmatory Factor Analysis (CFA)", "Structural Equation Modeling (PLS-SEM)", "Panel Data Regression (Fixed vs Random)", "Mediation & Moderation Tests"],
    description: "Empirical marketing, financial econometrics, human capital management, and institutional corporate governance.",
    descriptionBn: "মার্কেটিং কৌশল, স্ট্রাকচারাল ইকুয়েশন মডেলিং (SEM), আর্থিক ইকোনোমেট্রিক্স এবং ব্যবস্থাপনা গবেষণা।"
  },
  {
    code: "DoIE",
    name: "Innovation & Entrepreneurship",
    nameBn: "ইনোভেশন অ্যান্ড এন্টারপ্রেনারশিপ",
    facultyCode: "FBE",
    facultyName: "Faculty of Business & Entrepreneurship",
    facultyNameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    archetype: "Case Study Methodologies, Market Data",
    recommendedCitation: "Harvard",
    primaryTools: ["Miro (Business Model Canvas)", "NVivo (Qualitative Coding)", "SmartPLS", "Statista", "SurveyMonkey"],
    keyVenues: ["Journal of Business Venturing", "Technological Forecasting & Social Change", "Entrepreneurship Theory and Practice", "Small Business Economics"],
    benchmarkDatasets: ["Global Entrepreneurship Monitor (GEM)", "Crunchbase Open Startup Data", "World Bank Doing Business Archive"],
    methodologyFocus: ["Multiple-Case Holistic Design (Yin)", "Thematic Qualitative Analysis", "Effectuation vs Causation Frameworks", "Venture Valuation Metric Analysis"],
    description: "Startup incubation dynamics, agile business modeling, social entrepreneurship, and venture seed mechanics.",
    descriptionBn: "স্টার্টআপ ইনকিউবেশন, এন্টারপ্রেনারশিপ পলিসি, ভেঞ্চার ক্যাপিটাল এবং বিজনেস মডেল উদ্ভাবন।"
  },
  {
    code: "REAL",
    name: "Real Estate",
    nameBn: "রিয়েল এস্টেট",
    facultyCode: "FBE",
    facultyName: "Faculty of Business & Entrepreneurship",
    facultyNameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    archetype: "Valuation Models, Macroeconomic Datasets",
    recommendedCitation: "Harvard",
    primaryTools: ["Argus Enterprise / Excel Financial Modeling", "ArcGIS / QGIS", "SPSS", "STATA"],
    keyVenues: ["Real Estate Economics", "Journal of Real Estate Finance and Economics", "Urban Studies", "Cities"],
    benchmarkDatasets: ["Urban Development Authority Spatial Data", "Zillow Research Archive", "Macroeconomic Inflation & Land Price Indices"],
    methodologyFocus: ["Hedonic Price Modeling", "Discounted Cash Flow (DCF) Valuation", "Spatial Spatial-Autoregressive Regression", "Highest and Best Use (HBU) Assessment"],
    description: "Urban property valuation, hedonic price indices, housing policy econometrics, and REIT asset management.",
    descriptionBn: "রিয়েল এস্টেট মূল্যায়ন, হেদোনিক প্রাইসিং মডেল, হাউজিং পলিসি এবং নগর অর্থনীতি।"
  },
  {
    code: "THM",
    name: "Tourism & Hospitality Management",
    nameBn: "ট্যুরিজম অ্যান্ড হসপিটালিটি ম্যানেজমেন্ট",
    facultyCode: "FBE",
    facultyName: "Faculty of Business & Entrepreneurship",
    facultyNameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    archetype: "Survey Metrics, Qualitative/Quantitative Mixed",
    recommendedCitation: "APA 7th",
    primaryTools: ["SPSS", "SmartPLS", "MAXQDA", "TripAdvisor API Scrapers", "Qualtrics"],
    keyVenues: ["Tourism Management", "Annals of Tourism Research", "Journal of Travel Research", "International Journal of Hospitality Management"],
    benchmarkDatasets: ["UN Tourism (UNWTO) World Tourism Barometer", "Bangladesh Tourism Board Visitor Metrics", "Online Travel Review Corpora"],
    methodologyFocus: ["Customer Satisfaction Index (CSI)", "SERVQUAL Gap Model", "Destination Image Thematic Coding", "Willingness to Pay (WTP) Contingent Valuation"],
    description: "Sustainable ecotourism, destination marketing, hospitality service quality metrics, and heritage travel economics.",
    descriptionBn: "টেকসই পর্যটন, আতিথেয়তা সেবা মূল্যায়ন (SERVQUAL), পর্যটক আচরণ এবং গন্তব্য ব্র্যান্ডিং।"
  },
  {
    code: "BIT",
    name: "Business Information Technology",
    nameBn: "বিজনেস ইনফরমেশন টেকনোলজি",
    facultyCode: "FBE",
    facultyName: "Faculty of Business & Entrepreneurship",
    facultyNameBn: "ব্যবসায় ও উদ্যোক্তা অনুষদ",
    archetype: "Enterprise Systems, Mixed Quantitative",
    recommendedCitation: "Harvard",
    primaryTools: ["SAP / ERPsim", "Python (Pandas / Seaborn)", "SmartPLS", "Power BI", "Lucidchart"],
    keyVenues: ["Computers in Industry", "Business & Information Systems Engineering", "Information & Management", "Electronic Commerce Research"],
    benchmarkDatasets: ["Supply Chain Analytics Repositories", "ERP Implementation Success Cases", "E-commerce Conversion Funnel Sets"],
    methodologyFocus: ["Technology-Organization-Environment (TOE) Framework", "Process Mining & Bottleneck Analysis", "Structural Equation Modeling", "Cost-Benefit Enterprise Modeling"],
    description: "Enterprise Resource Planning (ERP), fintech supply chains, business process re-engineering, and IT productivity economics.",
    descriptionBn: "এন্টারপ্রাইজ ইআরপি সিস্টেম, সাপ্লাই চেইন অ্যানালিটিক্স, ফিনটেক ও ব্যবসায় তথ্য প্রযুক্তি।"
  },

  // FHLS (4 Departments)
  {
    code: "PHARM",
    name: "Pharmacy",
    nameBn: "ফার্মাসি",
    facultyCode: "FHLS",
    facultyName: "Faculty of Health & Life Sciences",
    facultyNameBn: "স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ",
    archetype: "Molecular Docking, PubMed, PRISMA, APA",
    recommendedCitation: "APA 7th",
    primaryTools: ["AutoDock Vina / PyMOL", "SwissADME / pkCSM", "GraphPad Prism", "EndNote / Mendeley", "PubMed / NCBI"],
    keyVenues: ["European Journal of Medicinal Chemistry", "Phytomedicine", "Journal of Ethnopharmacology", "Bioorganic Chemistry"],
    benchmarkDatasets: ["PubChem BioAssay", "Protein Data Bank (PDB)", "DrugBank Open Data", "BindingDB"],
    methodologyFocus: ["Molecular Docking & In-Silico ADMET", "In-Vitro Antioxidant / Antibacterial Assays", "Pharmacophore Modeling", "PRISMA Systematic Review Pipeline"],
    description: "In-silico drug design, ethnopharmacological extracts, molecular dynamics, and pharmaceutical formulations.",
    descriptionBn: "ড্রাগ ডিজাইন, মলিকুলার ডকিং (AutoDock), ফাইটোকেমিক্যাল মূল্যায়ন এবং ফার্মাসিউটিক্যাল ফর্মুলেশন।"
  },
  {
    code: "PH",
    name: "Public Health",
    nameBn: "পাবলিক হেলথ",
    facultyCode: "FHLS",
    facultyName: "Faculty of Health & Life Sciences",
    facultyNameBn: "স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ",
    archetype: "Epidemiology, Biostatistics (R/SPSS), WHO Data",
    recommendedCitation: "APA 7th",
    primaryTools: ["R (Epi, survival, metafor)", "Epi Info / SPSS", "STATA", "Zotero", "PRISMA Flowchart"],
    keyVenues: ["The Lancet Global Health", "Bulletin of the World Health Organization", "BMC Public Health", "American Journal of Public Health"],
    benchmarkDatasets: ["Demographic and Health Surveys (BDHS)", "WHO Global Health Observatory", "Institute for Health Metrics and Evaluation (IHME)"],
    methodologyFocus: ["Cross-Sectional Odds Ratio (OR) Analysis", "Multivariate Logistic Regression", "PRISMA 2020 SLR with Cochrane Risk of Bias", "Survival & Hazard Rate Modeling"],
    description: "Epidemiological surveillance, maternal & neonatal mortality, waterborne disease vectors, and health policy interventions.",
    descriptionBn: "জনস্বাস্থ্য মহামারীবিদ্যা, বায়োস্ট্যাটিস্টিক্স, পুষ্টি ও মাতৃস্বাস্থ্য জরিপ (BDHS) এবং স্বাস্থ্যনীতি গবেষণা।"
  },
  {
    code: "NFE",
    name: "Nutrition & Food Engineering",
    nameBn: "নিউট্রিশন অ্যান্ড ফুড ইঞ্জিনিয়ারিং",
    facultyCode: "FHLS",
    facultyName: "Faculty of Health & Life Sciences",
    facultyNameBn: "স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ",
    archetype: "Lab Methodologies, Bio-statistical Analysis",
    recommendedCitation: "APA 7th",
    primaryTools: ["GraphPad Prism", "Design-Expert (Formulation RSM)", "SPSS", "NutriSurvey", "ImageJ"],
    keyVenues: ["Food Chemistry", "Journal of Food Engineering", "LWT - Food Science and Technology", "Nutrients"],
    benchmarkDatasets: ["USDA FoodData Central", "FAO/WHO Nutrient Composition Tables", "Bangladesh Food Composition Database"],
    methodologyFocus: ["Proximate Composition Analysis (AOAC)", "Sensory Evaluation (9-point Hedonic Scale)", "Shelf-Life Kinetic Modeling", "Nutrient Fortification Optimization"],
    description: "Food fortification, post-harvest shelf-life extension, bioactive functional ingredients, and clinical dietary assessments.",
    descriptionBn: "খাদ্য প্রক্রিয়াজাতকরণ, পুষ্টি বিজ্ঞান, খাদ্য নিরাপত্তা এবং প্রোক্সিমেট পুষ্টি উপাদান বিশ্লেষণ।"
  },
  {
    code: "AGRI",
    name: "Agricultural Science",
    nameBn: "অ্যাগ্রিকালচারাল সায়েন্স",
    facultyCode: "FHLS",
    facultyName: "Faculty of Health & Life Sciences",
    facultyNameBn: "স্বাস্থ্য ও জীবন বিজ্ঞান অনুষদ",
    archetype: "Field Experimentation, Environmental Datasets",
    recommendedCitation: "APA 7th",
    primaryTools: ["R (agricolae, lme4)", "CropSyst / DSSAT (Crop Modeling)", "QGIS", "SPSS", "Minitab"],
    keyVenues: ["Field Crops Research", "Agronomy for Sustainable Development", "Agricultural Water Management", "Plant and Soil"],
    benchmarkDatasets: ["CGIAR Open Access Data", "FAOSTAT Global Agricultural Database", "Bangladesh Bureau of Statistics Crop Yields"],
    methodologyFocus: ["Randomized Complete Block Design (RCBD)", "Split-Plot Factorial ANOVA", "Crop Evapotranspiration (Penman-Monteith)", "Salinity Tolerance Screening"],
    description: "Saline-tolerant crop cultivars, hydroponic precision farming, soil microbial ecology, and climate-smart agronomy.",
    descriptionBn: "মাঠ ফসল গবেষণা (RCBD ডিজাইন), লবণাক্ততা সহনশীলতা, জলবায়ু-বান্ধব কৃষি এবং মৃত্তিকা বিজ্ঞান।"
  },

  // FHSS (4 Departments)
  {
    code: "ENG",
    name: "English",
    nameBn: "ইংরেজি",
    facultyCode: "FHSS",
    facultyName: "Faculty of Humanities & Social Sciences",
    facultyNameBn: "মানবিক ও সামাজিক বিজ্ঞান অনুষদ",
    archetype: "MLA/Chicago, Hermeneutics, Textual Analysis",
    recommendedCitation: "MLA 9th",
    primaryTools: ["Zotero / Mendeley", "AntConc (Corpus Linguistics)", "Voyant Tools (Text Analytics)", "JSTOR / Project MUSE"],
    keyVenues: ["PMLA", "New Literary History", "Applied Linguistics", "Journal of Postcolonial Writing"],
    benchmarkDatasets: ["British National Corpus (BNC)", "Corpus of Contemporary American English (COCA)", "Project Gutenberg Public Domain Texts"],
    methodologyFocus: ["Hermeneutic Close Reading", "Postcolonial Critical Discourse Analysis (CDA)", "Corpus Frequency & Collocation Profiling", "Structural Semiotics"],
    description: "Postcolonial literary theory, corpus-based linguistics, subaltern translation studies, and pedagogy of English as a foreign language.",
    descriptionBn: "উত্তর-ঔপনিবেশিক সাহিত্য তত্ত্ব, হার্মেনিউটিক্স ও নিবিড় পাঠ, করপাস ভাষাতত্ত্ব এবং ডিসকোর্স অ্যানালিসিস।"
  },
  {
    code: "LAW",
    name: "Law",
    nameBn: "আইন",
    facultyCode: "FHSS",
    facultyName: "Faculty of Humanities & Social Sciences",
    facultyNameBn: "মানবিক ও সামাজিক বিজ্ঞান অনুষদ",
    archetype: "OSCOLA, Jurisprudence, Statutory Databases",
    recommendedCitation: "OSCOLA",
    primaryTools: ["Zotero with OSCOLA CSL", "Manupatra / SCC Online / HeinOnline", "Laws of Bangladesh Portal (MoLJPA)", "Westlaw"],
    keyVenues: ["Oxford Journal of Legal Studies", "Harvard Law Review", "Modern Law Review", "Human Rights Law Review"],
    benchmarkDatasets: ["Bangladesh Supreme Court Law Reports", "UN Treaty Collection", "ICJ Judgments & Advisory Opinions"],
    methodologyFocus: ["Doctrinal Legal Research", "Comparative Statutory Analysis", "Constitutional Teleological Interpretation", "Empirical Socio-Legal Inquiries"],
    description: "Constitutional jurisprudence, cyber law & data sovereignty, human rights frameworks, and corporate legal compliance.",
    descriptionBn: "ডকট্রিনাল লিগ্যাল রিসার্চ, সাংবিধানিক আইন, সাইবার নিরাপত্তা আইন এবং ওসকোলা (OSCOLA) সাইটেশন।"
  },
  {
    code: "JMC",
    name: "Journalism, Media & Communication",
    nameBn: "সাংবাদিকতা, মিডিয়া ও গণযোগাযোগ",
    facultyCode: "FHSS",
    facultyName: "Faculty of Humanities & Social Sciences",
    facultyNameBn: "মানবিক ও সামাজিক বিজ্ঞান অনুষদ",
    archetype: "Content/Thematic Analysis, Media Archives",
    recommendedCitation: "APA 7th",
    primaryTools: ["NVivo 14", "CrowdTangle / TweetBinder", "SPSS", "Zotero", "YouTube Data Tools"],
    keyVenues: ["Journal of Communication", "Media, Culture & Society", "Journalism Practice", "New Media & Society"],
    benchmarkDatasets: ["Internet Archive TV News", "Global Misinformation Corpora", "Bangladesh National Press Archives"],
    methodologyFocus: ["Quantitative Content Analysis (Krippendorff's Alpha)", "Framing Theory Discourse Analysis", "Social Network Sentiment Analysis", "In-Depth Semi-Structured Interviews"],
    description: "Digital misinformation propagation, agenda-setting dynamics, mobile journalism (MoJo), and audience reception studies.",
    descriptionBn: "বিষয়বস্তু বিশ্লেষণ (Content Analysis), ফ্রেইমিং থিওরি, গুজব ও বিভ্রান্তিমূলক তথ্য প্রতিরোধ এবং মিডিয়া ডিসকোর্স।"
  },
  {
    code: "DS",
    name: "Development Studies",
    nameBn: "উন্নয়ন অধ্যয়ন",
    facultyCode: "FHSS",
    facultyName: "Faculty of Humanities & Social Sciences",
    facultyNameBn: "মানবিক ও সামাজিক বিজ্ঞান অনুষদ",
    archetype: "Qualitative Fieldwork, Policy Data, World Bank",
    recommendedCitation: "APA 7th",
    primaryTools: ["KoboToolbox / ODK (Field Surveys)", "STATA / SPSS", "NVivo (Qualitative Codes)", "QGIS", "Mendeley"],
    keyVenues: ["World Development", "Development and Change", "Journal of Development Studies", "Third World Quarterly"],
    benchmarkDatasets: ["World Bank Development Indicators (WDI)", "UNDP Human Development Reports", "BBS Household Income and Expenditure Survey (HIES)"],
    methodologyFocus: ["Participatory Rural Appraisal (PRA)", "Difference-in-Differences (DiD) Policy Impact Evaluation", "Focus Group Discussions (FGD)", "Sustainable Livelihoods Framework"],
    description: "Microfinance poverty graduation, NGO intervention efficacy, urban slum vulnerability, and climate migration policies.",
    descriptionBn: "মাঠপর্যায়ের গুণগত সমীক্ষা (FGD, KII), টেকসই জীবিকা কাঠামো, দারিদ্র্য বিমোচন এবং নীতি মূল্যায়ন।"
  }
];

export function getDepartmentByCode(
  code: string,
  customDeptName?: string,
  customFacultyName?: string
): DepartmentInfo | undefined {
  if (code === "OTHER") {
    const displayName = customDeptName && customDeptName.trim() ? customDeptName.trim() : "Custom Department";
    const displayFaculty = customFacultyName && customFacultyName.trim() ? customFacultyName.trim() : "Institutional Faculty";
    return {
      code: "OTHER",
      name: displayName,
      nameBn: displayName,
      facultyCode: "OTHER",
      facultyName: displayFaculty,
      facultyNameBn: displayFaculty,
      archetype: "High Compute (PyTorch, Colab, Kaggle, LaTeX)",
      recommendedCitation: "IEEE",
      primaryTools: ["Google Colab / Kaggle", "Overleaf (LaTeX)", "Zotero / Mendeley", "Python / R", "GitHub"],
      keyVenues: ["Interdisciplinary Academic Journals", "Peer-Reviewed Conferences"],
      benchmarkDatasets: ["Kaggle Competitions & Open Data", "UCI Machine Learning Repository", "Hugging Face Hub"],
      methodologyFocus: ["Empirical Evaluation", "Ablation Studies", "Comparative Benchmarking", "Reproducible Research Framework"],
      description: `Custom academic discipline (${displayName}, ${displayFaculty}) with multi-disciplinary research tooling and verified pipelines.`,
      descriptionBn: `কাস্টম একাডেমিক বিভাগ ও অনুষদ (${displayName}, ${displayFaculty}) - বহুমুখী গবেষণা টুলস ও কাঠামোগত পাইপলাইন।`
    };
  }
  return DEPARTMENTS.find((d) => d.code === code);
}

export function getDepartmentsByFaculty(facultyCode: FacultyCode): DepartmentInfo[] {
  if (facultyCode === "OTHER") {
    return [
      {
        code: "OTHER",
        name: "Other Department (Type Custom...)",
        nameBn: "অন্যান্য বিভাগ (নিজে লিখুন...)",
        facultyCode: "OTHER",
        facultyName: "Other Faculty",
        facultyNameBn: "অন্যান্য অনুষদ",
        archetype: "High Compute (PyTorch, Colab, Kaggle, LaTeX)",
        recommendedCitation: "IEEE",
        primaryTools: ["Google Colab / Kaggle", "Overleaf (LaTeX)", "Zotero / Mendeley", "Python / R"],
        keyVenues: ["Interdisciplinary Journals", "Academic Conferences"],
        benchmarkDatasets: ["Open Data Repositories", "Kaggle", "Hugging Face"],
        methodologyFocus: ["Scientific Inquiry", "Empirical Analysis"],
        description: "Custom academic department with discipline-aware research tools.",
        descriptionBn: "কাস্টম একাডেমিক বিভাগ ও গবেষণার উপযোগী টুলস।"
      }
    ];
  }
  return DEPARTMENTS.filter((d) => d.facultyCode === facultyCode);
}
