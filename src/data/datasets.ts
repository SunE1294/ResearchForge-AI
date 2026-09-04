import { DatasetItem } from "@/types";

export const BENCHMARK_DATASETS: DatasetItem[] = [
  // --- FSIT (Computing, Software & Systems) ---
  {
    id: "huggingface-bengali-nlp",
    title: "BanglaNLP & Bengali Speech Corpora",
    description: "Multi-domain annotated Bengali text, sentiment, NER, and ASR speech benchmarks for low-resource NLP.",
    descriptionBn: "বাংলা টেক্সট ক্লাসিফিকেশন, সেন্টিমেন্ট অ্যানালিসিস, এনইআর এবং ভয়েস স্পিচ বেঞ্চমার্ক ডেটাসেট।",
    departments: ["CSE", "SWE", "CIS", "MCT"],
    facultyCode: "FSIT",
    sourceName: "Hugging Face Hub",
    sourceUrl: "https://huggingface.co/datasets?search=bengali",
    format: ["JSONL", "Parquet", "Audio WAV"],
    license: "CC-BY-4.0 / Open Source",
    tags: ["NLP", "Bengali", "Deep Learning", "LLM Benchmark"]
  },
  {
    id: "uci-ml-repo",
    title: "UCI Machine Learning Repository",
    description: "Over 600 gold-standard tabular and multivariate datasets for machine learning & data mining.",
    descriptionBn: "মেশিন লার্নিং অ্যালগরিদম ও ডেটা মাইনিং বেঞ্চমার্কের জন্য ৬০০+ প্রতিষ্ঠিত ডেটাসেট।",
    departments: ["CSE", "SWE", "CIS", "ITM"],
    facultyCode: "FSIT",
    sourceName: "UC Irvine",
    sourceUrl: "https://archive.ics.uci.edu/",
    format: ["CSV", "ARFF", "ZIP"],
    license: "Public Domain / Open Access",
    tags: ["Classification", "Regression", "Clustering", "Data Science"]
  },
  {
    id: "github-archive-msr",
    title: "GitHub Archive Software Repository Metrics",
    description: "Millions of public git commits, code smell indicators, pull requests, and software defect logs.",
    descriptionBn: "সফটওয়্যার আর্কিটেকচার, কোড ডিফেক্ট প্রেডিকশন এবং ওপেন সোর্স রেপোজিটরি মাইনিং ডেটাসেট।",
    departments: ["SWE", "CSE"],
    facultyCode: "FSIT",
    sourceName: "GH Archive / Google BigQuery",
    sourceUrl: "https://www.gharchive.org/",
    format: ["JSON", "SQL BigQuery"],
    license: "Open Data Commons",
    tags: ["Software Engineering", "Mining Repositories", "Code Smells", "DevOps"]
  },
  {
    id: "copernicus-sentinel",
    title: "Copernicus Open Access Hub & Sentinel Imagery",
    description: "Multispectral optical and SAR radar satellite data for flood mapping, NDVI, and land cover.",
    descriptionBn: "বন্যা পর্যবেক্ষণ, কৃষি ও ভূমি ব্যবহার বিশ্লেষণের জন্য উচ্চ রেজোলিউশনের উপগ্রহ চিত্র।",
    departments: ["ESDM", "CE", "AGRI"],
    facultyCode: "FSIT",
    sourceName: "European Space Agency (ESA)",
    sourceUrl: "https://browser.dataspace.copernicus.eu/",
    format: ["GeoTIFF", "NetCDF", "SAFE"],
    license: "Free Open Access",
    tags: ["GIS", "Remote Sensing", "Environmental", "Satellite"]
  },

  // --- FHSS (Humanities, Law & Social Sciences) ---
  {
    id: "coca-corpus-linguistics",
    title: "Corpus of Contemporary American English (COCA)",
    description: "One billion word balanced corpus across spoken, fiction, academic texts, magazines, and newspapers.",
    descriptionBn: "ভাষাতাত্ত্বিক গবেষণা, শব্দ ব্যবহারের ফ্রিকোয়েন্সি এবং ডিসকোর্স বিশ্লেষণের এক বিলিয়ন শব্দের করপাস।",
    departments: ["ENG", "JMC"],
    facultyCode: "FHSS",
    sourceName: "English-Corpora.org",
    sourceUrl: "https://www.english-corpora.org/coca/",
    format: ["Web Interface", "Text Concordance"],
    license: "Academic Research License",
    tags: ["Linguistics", "Corpus", "English", "Collocations"]
  },
  {
    id: "bnc-british-corpus",
    title: "British National Corpus (BNC)",
    description: "100-million word collection of samples of written and spoken language from a wide range of sources.",
    descriptionBn: "ব্রিটিশ ন্যাশনাল করপাস - ১০০ মিলিয়ন শব্দের সমসাময়িক ইংরেজি টেক্সট ও কথ্য ভাষার ডাটাবেজ।",
    departments: ["ENG"],
    facultyCode: "FHSS",
    sourceName: "University of Oxford",
    sourceUrl: "https://www.natcorp.ox.ac.uk/",
    format: ["XML", "Concordance"],
    license: "BNC Academic License",
    tags: ["Corpus Linguistics", "Lexicography", "Discourse", "English"]
  },
  {
    id: "project-gutenberg-literary",
    title: "Project Gutenberg Literary Corpora",
    description: "Over 70,000 public domain full-text literary works spanning classical, Victorian, and modern postcolonial literature.",
    descriptionBn: "৭০,০০০+ ধ্রুপদী সাহিত্য, নাটক ও ঐতিহাসিক টেক্সটের উন্মুক্ত গবেষণাধর্মী টেক্সচুয়াল ডাটাবেজ।",
    departments: ["ENG"],
    facultyCode: "FHSS",
    sourceName: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/",
    format: ["Plain Text UTF-8", "EPUB", "HTML"],
    license: "Public Domain",
    tags: ["Literary Analysis", "Hermeneutics", "Textual Corpora", "Literature"]
  },
  {
    id: "bangladesh-laws-statutes",
    title: "Laws of Bangladesh & Supreme Court Law Reports",
    description: "Comprehensive statutory repository containing all codified Acts, Ordinances, and landmark Appellate Division judgments.",
    descriptionBn: "বাংলাদেশ সরকারের সকল প্রচলিত আইন, অধ্যাদেশ এবং সুপ্রিম কোর্টের গুরুত্বপূর্ণ নজিরবাহী রায়।",
    departments: ["LAW"],
    facultyCode: "FHSS",
    sourceName: "Ministry of Law / Supreme Court of BD",
    sourceUrl: "http://bdlaws.minlaw.gov.bd/",
    format: ["HTML", "PDF"],
    license: "Official Public Domain",
    tags: ["Jurisprudence", "Statutes", "OSCOLA", "Case Law"]
  },
  {
    id: "caselaw-access-project",
    title: "Harvard Caselaw Access Project (CAP)",
    description: "Digitized collection of 6.7 million official court decisions covering 360 years of common law jurisprudence.",
    descriptionBn: "হার্ভার্ড ল স্কুলের ৩৬০ বছরের ৬.৭ মিলিয়ন সাধারণ আইনের আদালতের রায়ের ডিজিটালাইজড ডাটাবেজ।",
    departments: ["LAW"],
    facultyCode: "FHSS",
    sourceName: "Harvard Law School",
    sourceUrl: "https://case.law/",
    format: ["JSON API", "PDF"],
    license: "Creative Commons / Open Legal Data",
    tags: ["Common Law", "Doctrinal Legal Research", "Appellate Case Law", "OSCOLA"]
  },
  {
    id: "un-treaty-collection",
    title: "United Nations Treaty Collection (UNTC) & ICJ Reports",
    description: "Official multilateral treaties, international conventions, and International Court of Justice jurisprudence.",
    descriptionBn: "জাতিসংঘের আন্তর্জাতিক চুক্তি, কনভেনশন এবং আন্তর্জাতিক আদালতের (ICJ) রায়সমূহের আর্কাইভ।",
    departments: ["LAW", "DS"],
    facultyCode: "FHSS",
    sourceName: "United Nations Legal Affairs",
    sourceUrl: "https://treaties.un.org/",
    format: ["PDF", "HTML"],
    license: "Official UN Open Access",
    tags: ["International Law", "Human Rights", "Treaties", "ICJ"]
  },

  // --- FBE (Business & Entrepreneurship) ---
  {
    id: "world-bank-wdi",
    title: "World Bank World Development Indicators (WDI)",
    description: "Comprehensive macroeconomic, poverty, education, trade, and health time-series spanning 217 economies.",
    descriptionBn: "বিশ্বব্যাংকের ২১৭টি দেশের অর্থনীতি, দারিদ্র্য, বাণিজ্য ও স্বাস্থ্য সম্পর্কিত দীর্ঘমেয়াদী ডেটাসেট।",
    departments: ["BBA", "DoIE", "REAL", "DS", "PH"],
    facultyCode: "FBE",
    sourceName: "The World Bank DataBank",
    sourceUrl: "https://databank.worldbank.org/source/world-development-indicators",
    format: ["CSV", "Excel", "API REST"],
    license: "CC-BY-4.0",
    tags: ["Macroeconomics", "Poverty", "Policy", "Time-Series"]
  },
  {
    id: "dse-historical-stock",
    title: "Dhaka Stock Exchange (DSE) Historical Feeds",
    description: "Daily equity prices, trading volumes, market capitalization, and sector indices for Bangladesh capital markets.",
    descriptionBn: "ঢাকা স্টক এক্সচেঞ্জের শেয়ার দর, ট্রেডিং ভলিউম এবং আর্থিক সেক্টর সূচকের ঐতিহাসিক তথ্য।",
    departments: ["BBA", "REAL", "BIT"],
    facultyCode: "FBE",
    sourceName: "DSE / Open Financial Repositories",
    sourceUrl: "https://www.dsebd.org/",
    format: ["CSV", "Excel"],
    license: "Research Fair Use",
    tags: ["Finance", "Econometrics", "Capital Markets", "Stock Prediction"]
  },
  {
    id: "fred-economic-data",
    title: "Federal Reserve Economic Data (FRED)",
    description: "Over 800,000 international macroeconomic, interest rate, exchange rate, and inflation time-series.",
    descriptionBn: "আন্তর্জাতিক মুদ্রাস্ফীতি, সুদের হার, বিনিময় হার এবং জিডিপি প্রবৃদ্ধির টাইম-সিরিজ ডাটাবেজ।",
    departments: ["BBA", "DS"],
    facultyCode: "FBE",
    sourceName: "Federal Reserve Bank of St. Louis",
    sourceUrl: "https://fred.stlouisfed.org/",
    format: ["CSV", "Excel", "R/Python API"],
    license: "Public Domain",
    tags: ["Macroeconomics", "Econometrics", "Inflation", "Time-Series"]
  },

  // --- FHLS (Health, Pharmacy & Life Sciences) ---
  {
    id: "pubchem-bindingdb",
    title: "PubChem BioAssay & BindingDB",
    description: "Million-scale small molecule biological activities, drug-target binding affinities (Kd, Ki, IC50), and SMILES structures.",
    descriptionBn: "ড্রাগ ডিসকভারি ও মলিকুলার ডকিং গবেষণার জন্য রাসায়নিক যৌগ ও প্রোটিন বাইন্ডিং ডেটাসেট।",
    departments: ["PHARM", "PH", "NFE"],
    facultyCode: "FHLS",
    sourceName: "NCBI / BindingDB",
    sourceUrl: "https://pubchem.ncbi.nlm.nih.gov/",
    format: ["SDF", "SMILES", "CSV"],
    license: "Public Domain",
    tags: ["Molecular Docking", "Pharmacy", "BioAssay", "Cheminformatics"]
  },
  {
    id: "who-gho",
    title: "WHO Global Health Observatory (GHO)",
    description: "Epidemiological surveillance metrics: maternal health, infectious diseases, nutrition stunting, and NCD prevalence.",
    descriptionBn: "বিশ্ব স্বাস্থ্য সংস্থার আন্তর্জাতিক স্বাস্থ্য সূচক, রোগব্যাধি পরিসংখ্যান ও মহামারী ডেটাসেট।",
    departments: ["PH", "PHARM", "NFE"],
    facultyCode: "FHLS",
    sourceName: "World Health Organization",
    sourceUrl: "https://www.who.int/data/gho",
    format: ["CSV", "JSON", "OData API"],
    license: "Open WHO",
    tags: ["Epidemiology", "Public Health", "Biostatistics", "Global Health"]
  },
  {
    id: "fao-faostat",
    title: "FAOSTAT Food and Agriculture Data",
    description: "Global agricultural production, fertilizer utilization, crop yields, trade flows, and food balances.",
    descriptionBn: "জাতিসংঘের খাদ্য ও কৃষি সংস্থার বিশ্বব্যাপী ফসল উৎপাদন, সার ব্যবহার ও খাদ্য নিরাপত্তা ডেটা।",
    departments: ["AGRI", "NFE", "ESDM"],
    facultyCode: "FHLS",
    sourceName: "UN FAO",
    sourceUrl: "https://www.fao.org/faostat/en/#data",
    format: ["CSV", "Excel", "R package"],
    license: "Open Access",
    tags: ["Agriculture", "Food Security", "Crop Yields", "Soil Science"]
  },

  // --- FE (Engineering & Architecture) ---
  {
    id: "materials-project",
    title: "Materials Project Open Database",
    description: "Density Functional Theory (DFT) calculations on over 140,000 inorganic compounds, band gaps, and crystal lattices.",
    descriptionBn: "পদার্থ বিজ্ঞান, ন্যানোম্যাটেরিয়াল এবং সেমিকন্ডাক্টরের ডিএফটি হিসাবকৃত তথ্যভাণ্ডার।",
    departments: ["TE", "EEE", "CE"],
    facultyCode: "FE",
    sourceName: "Lawrence Berkeley National Lab",
    sourceUrl: "https://next-gen.materialsproject.org/",
    format: ["CIF", "JSON", "REST API"],
    license: "CC-BY-4.0",
    tags: ["Materials Science", "Nanotechnology", "DFT", "Crystallography"]
  },
  {
    id: "nasa-turbofan-prognostics",
    title: "NASA Turbofan Engine Degradation Simulation",
    description: "Run-to-failure sensor degradation time-series under different operational regimes and fault modes.",
    descriptionBn: "নাসা টার্বোফ্যান ইঞ্জিন সেন্সর ডেটাসেট - প্রেডিক্টিভ মেইনটেন্যান্স ও ফল্ট ডায়াগনসিস গবেষণা।",
    departments: ["EEE", "CE", "CSE"],
    facultyCode: "FE",
    sourceName: "NASA Ames Prognostics Center of Excellence",
    sourceUrl: "https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/",
    format: ["TXT", "CSV"],
    license: "Public NASA Open Data",
    tags: ["Sensors", "Predictive Maintenance", "Engineering", "Time-Series"]
  }
];
