// ---------------------------------------------------------------------------
// Single source of truth for all site content.
// Edit copy, projects, credentials and team data here — pages render from it.
// ---------------------------------------------------------------------------
import {
  BadgeCheck,
  Building2,
  Camera,
  ClipboardCheck,
  Droplets,
  Facebook,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Hospital,
  Hotel,
  Landmark,
  Leaf,
  Linkedin,
  Network,
  PhoneCall,
  Plane,
  RadioTower,
  Recycle,
  Satellite,
  Scale,
  ShieldCheck,
  Signal,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  Twitter,
  Waves,
  Wifi,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

export const company = {
  name: "MASF & Partners Limited",
  shortName: "MASF & Partners",
  tagline: "Let our services be your advantage.",
  rc: "RC 1161410",
  incorporated: "23 December 2013",
  foundedYear: 2013,
  email: "masfpartnerslimited@gmail.com",
  address: {
    suite: "Suite B21, Business Plaza (formerly Fanaha Plaza)",
    line2: "Behind AP Plaza, Wuse II",
    city: "Abuja",
    country: "Nigeria",
    poBox: "P.O. Box 739, Kubwa, Abuja, FCT",
  },
  phones: [
    { display: "0903 818 7814", href: "tel:+2349038187814" },
    { display: "0805 940 5483", href: "tel:+2348059405483" },
    { display: "0818 718 9622", href: "tel:+2348187189622" },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/masfpartnerslimited", icon: Facebook },
    { label: "X (Twitter)", href: "https://x.com/partnerslimited", icon: Twitter },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/masf-partners", icon: Linkedin },
  ],
  banker: "Jaiz Bank Plc, Opposite Wuse Market, Abuja",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Business+Plaza,+Wuse+II,+Abuja",
  whatsapp: {
    display: "0903 818 7814",
    href: `https://wa.me/2349038187814?text=${encodeURIComponent(
      "Hello MASF & Partners — I'd like to discuss a project."
    )}`,
  },
  profilePdf: "/downloads/MASF-Partners-Company-Profile.pdf",
};

// Client testimonials. The Home page section stays hidden while this list is
// empty — add real, attributable quotes only. Shape:
// { quote: "…", name: "Full Name", role: "Title", organization: "Company" }
export const testimonials = [];

export const stats = [
  { value: "13+", label: "Years in practice", detail: "Delivering since 2013" },
  { value: "30+", label: "In-house specialists", detail: "Engineers, technologists & field crews" },
  { value: "14", label: "Environmental experts", detail: "Multidisciplinary assessment panel" },
  { value: "5", label: "Sectors served", detail: "Government to hospitality" },
];

export const pillars = [
  {
    id: "environmental",
    icon: Leaf,
    title: "Environmental Consultancy",
    summary:
      "Regulator-ready impact assessments, audits and monitoring — built on data gathered with our own field instrumentation.",
    intro:
      "Regulators, financiers and host communities all ask the same question: can you prove it? Our environmental practice pairs a fourteen-specialist expert panel with company-owned field instrumentation, so every assessment we sign is built on measurements we took ourselves.",
    services: [
      {
        name: "Environmental Impact Assessment (EIA)",
        detail:
          "Full-cycle EIA delivery — scoping, baseline studies, impact prediction, mitigation design and reporting — prepared to withstand the scrutiny of federal and state environmental regulators.",
      },
      {
        name: "Environmental Auditing",
        detail:
          "Independent audits of existing facilities and operations, benchmarking practice against statutory requirements and delivering a prioritised corrective-action plan.",
      },
      {
        name: "Energy & Power Audits",
        detail:
          "Measurement-backed analysis of consumption, load profiles and system losses, with recommendations ranked by payback so savings start where they matter most.",
      },
      {
        name: "Ecological Investigations of Energy Facilities",
        detail:
          "Field studies of how energy facility operations affect surrounding flora, fauna and habitats — from baseline surveys to long-term monitoring programmes.",
      },
      {
        name: "New & Renewable Energy Analyses",
        detail:
          "Resource assessments and feasibility studies for solar and other renewable options, grounded in site-specific measurement rather than desktop estimates.",
      },
      {
        name: "Waste Management, Cleaning & Fumigation",
        detail:
          "Structured cleaning, waste management and fumigation programmes for facilities and estates, run to documented schedules and safety procedures.",
      },
      {
        name: "Water Treatment Plants",
        detail:
          "End-to-end delivery of water treatment infrastructure: feasibility, design, procurement, construction, ongoing maintenance and operator training.",
      },
    ],
  },
  {
    id: "power",
    icon: Zap,
    title: "Electrical & Mechanical Engineering",
    summary:
      "From 33KV overhead lines to the switchroom — power infrastructure designed, built and maintained by our in-house team.",
    intro:
      "From 33KV overhead lines to the switchroom, we design, build and maintain the power infrastructure organisations depend on — led by a COREN-registered electrical engineer and delivered by an in-house team of engineers and twelve field electricians.",
    services: [
      {
        name: "Transformer & Switchgear Installation",
        detail:
          "Installation and commissioning of power and distribution transformers with associated switchgear, from site works and cabling through to energisation.",
      },
      {
        name: "Electro-Mechanical Building Wiring",
        detail:
          "Design and execution of electrical and mechanical building services for new construction and refurbishments — safe, standards-compliant and neatly documented.",
      },
      {
        name: "Sales, Maintenance & Repair",
        detail:
          "Supply, preventive maintenance and repair of transformers, panels and switchgear — keeping unplanned downtime rare and short.",
      },
      {
        name: "Power System Reliability Analyses",
        detail:
          "Network studies that locate weak points, quantify outage risk and set out the upgrades that deliver the biggest reliability gain per naira.",
      },
      {
        name: "33KV Overhead Line Construction",
        detail:
          "Route survey, pole erection, conductor stringing and energisation of 33KV overhead lines — including a delivered 7.4-kilometre line in the FCT.",
      },
    ],
  },
  {
    id: "ict",
    icon: Satellite,
    title: "ICT & Telecommunications",
    summary:
      "VSAT, wireless broadband, structured networks and unified communications for operations that cannot afford to be offline.",
    intro:
      "We connect operations that cannot afford to be offline — military training facilities, hotels, hospitals and offices — with satellite links, wireless broadband, structured networks and unified communications, installed and supported by our own technologists.",
    services: [
      {
        name: "Computer Networking & IT Systems",
        detail:
          "Structured cabling, network design and IT system deployment for offices and campuses, built for reliability and straightforward administration.",
      },
      {
        name: "VSAT Satellite Installation",
        detail:
          "Supply, installation and commissioning of VSAT satellite equipment — dependable connectivity where terrestrial infrastructure does not reach.",
      },
      {
        name: "Wireless Broadband, WiFi & Point-to-Point",
        detail:
          "Wireless broadband deployment, WiFi coverage and point-to-point antenna links, engineered from site survey through to signal verification.",
      },
      {
        name: "Two-Way Radio Systems",
        detail:
          "Installation and maintenance of walkie-talkie radio systems for security teams, facilities and event operations.",
      },
      {
        name: "PABX / IPBX Intercom & Telephony",
        detail:
          "Intercom and telephone systems for hotels and offices — including a delivered 40-extension hotel installation — with training for on-site staff.",
      },
    ],
  },
  {
    id: "safety",
    icon: ShieldCheck,
    title: "Safety & Security",
    summary:
      "CCTV surveillance, fire and safety systems, and the project management discipline to deliver them right.",
    intro:
      "Protection engineered into the building: surveillance that watches what matters, fire and safety systems that respond when it counts, and structured project management that delivers the whole scope on programme.",
    services: [
      {
        name: "CCTV & Security Equipment",
        detail:
          "Design, installation and maintenance of CCTV and security systems — including operator training, so your team runs the system with confidence.",
      },
      {
        name: "Fire & Safety Equipment",
        detail:
          "Installation of fire and safety equipment matched to the risk profile of each facility, maintained to remain ready when it is needed.",
      },
      {
        name: "Project Management",
        detail:
          "Structured delivery management across disciplines — scope, schedule, procurement, HSE and quality — for projects that finish as specified.",
      },
    ],
  },
];

export const serviceOptions = [
  "General enquiry",
  "Environmental Consultancy",
  "Electrical & Mechanical Engineering",
  "ICT & Telecommunications",
  "Safety & Security",
];

export const sectors = [
  {
    icon: Landmark,
    name: "Government & Agencies",
    detail: "Ministries, departments and agencies — tender-ready documentation included.",
  },
  {
    icon: Factory,
    name: "Industrial, Commercial & Real Estate",
    detail: "Plants, retail sites, residential estates and mixed-use developments.",
  },
  {
    icon: Hotel,
    name: "Hotels & Restaurants",
    detail: "Guest communications, connectivity, security and power for hospitality.",
  },
  {
    icon: Hospital,
    name: "Hospitals & Clinics",
    detail: "Dependable power, networks and safety systems for critical care settings.",
  },
  {
    icon: Building2,
    name: "Corporate Offices",
    detail: "Workspaces that stay powered, connected and secure.",
  },
];

export const projectCategories = [
  "Power & Energy",
  "ICT & Telecommunications",
  "Safety & Security",
];

export const projects = [
  {
    title: "7.4km 33KV Overhead Line — Capital Science Academy",
    location: "Kuje, FCT",
    year: "2006",
    value: "₦25.25M",
    category: "Power & Energy",
    tags: ["33KV", "Overhead line"],
    description:
      "Route survey, pole erection, conductor stringing and energisation of a dedicated 7.4-kilometre 33KV overhead line supplying the academy campus.",
    featured: true,
  },
  {
    title: "Electrical Upgrade — Oando Station & Chicken Republic",
    location: "Wuse, Abuja",
    year: "2008",
    value: "₦15.55M",
    category: "Power & Energy",
    tags: ["Transformer", "Security lighting"],
    description:
      "Comprehensive power upgrade for a high-traffic retail and restaurant site, including dedicated transformer installation and perimeter security lighting.",
  },
  {
    title: "LNG Plant & Accessories — Oando Stations",
    location: "Wuse I–V & Kubwa, Abuja",
    year: "2009",
    value: "₦12.25M",
    category: "Power & Energy",
    tags: ["LNG", "Multi-site rollout"],
    description:
      "Installation of LNG plant and accessories across six Oando retail stations, delivered as a coordinated multi-site programme.",
  },
  {
    title: "Transformer Relocation & 33KV Conversion",
    location: "Kuje, FCT",
    year: "2006",
    value: "₦8.65M",
    category: "Power & Energy",
    tags: ["500kVA", "300kVA"],
    description:
      "Relocation and conversion of 500kVA and 300kVA transformer substations to 33KV operation, completed with minimal supply interruption.",
  },
  {
    title: "33KV Line & 500kVA Substation — Oando Aviation Depot",
    location: "Nnamdi Azikiwe International Airport, Abuja",
    year: "2006",
    value: "₦5.15M",
    category: "Power & Energy",
    tags: ["Aviation", "Substation"],
    description:
      "Construction of a 33KV supply line and installation of a 500kVA transformer substation serving the aviation fuel depot.",
    featured: true,
  },
  {
    title: "Wireless Broadband — Nigerian Army Training Centre",
    location: "NATRAC, Kontagora Barracks, Niger State",
    year: "2014",
    value: null,
    category: "ICT & Telecommunications",
    tags: ["Wireless", "Defence"],
    description:
      "Deployment of wireless broadband infrastructure for the Nigerian Army Training Centre — engineered for a demanding, security-conscious environment.",
    featured: true,
  },
  {
    title: "Broadband Internet — US Army Internship Training",
    location: "Jaji, Kaduna & Kontagora",
    year: "2014",
    value: null,
    category: "ICT & Telecommunications",
    tags: ["Broadband", "Multi-location"],
    description:
      "Broadband internet provisioning supporting a US Army internship training programme across two military locations.",
  },
  {
    title: "Hotel Communications & Security Systems",
    location: "Niger State",
    year: "2014–2015",
    value: null,
    category: "Safety & Security",
    tags: ["CCTV", "VSAT", "40-line intercom"],
    description:
      "Integrated hospitality fit-out: a 40-extension intercom system, wireless CCTV with security-personnel training, and VSAT connectivity with WiFi backhaul.",
  },
];

export const projectsNote =
  "Contract values as recorded at award. Engagements from 2006–2009 were delivered by the firm's principals prior to incorporation and are presented as part of the team's track record.";

export const equipment = [
  {
    icon: Gauge,
    name: "GrayWolf AdvancedSense™ Environmental Meter",
    spec: "Multi-gas monitoring: VOCs, CO₂, CO, O₃, NH₃, H₂S, NO/NO₂, SO₂ and more.",
    benefit: "A complete ambient-air chemistry snapshot from one instrument, logged digitally for defensible reporting.",
  },
  {
    icon: Wind,
    name: "GrayWolf 6-Channel Particle Counters",
    spec: "Handheld counters covering PM0.5 through PM10 and total suspended particulates (TSP).",
    benefit: "Occupational and ambient dust surveys measured to internationally recognised parameters.",
  },
  {
    icon: Droplets,
    name: "Mobile Water Quality Laboratory",
    spec: "Field laboratory built to the WHO/UNICEF standard for drinking-water testing.",
    benefit: "Potability results on site — no waiting on distant laboratories, no chain-of-custody gaps.",
  },
  {
    icon: Plane,
    name: "UAV Aerial Survey Drone",
    spec: "Unmanned aerial vehicle for site mapping, corridor surveys and visual inspection.",
    benefit: "Rapid, repeatable aerial coverage of project sites, routes and hard-to-reach assets.",
  },
  {
    icon: Thermometer,
    name: "Multifunction Environment Meter",
    spec: "Sound, light, humidity and temperature measurement in a single handheld unit.",
    benefit: "Workplace and ambient comfort surveys completed in one field visit.",
  },
  {
    icon: FlaskConical,
    name: "BOD Testing Equipment",
    spec: "Biochemical oxygen demand analysis for wastewater and effluent studies.",
    benefit: "Quantified organic loading — the number regulators ask for on every discharge permit.",
  },
  {
    icon: Signal,
    name: "RF Spectrum & EMF Analyser",
    spec: "Radio-frequency spectrum and electromagnetic-field measurement with ICNIRP exposure calculations.",
    benefit: "Verified human-exposure compliance around masts, antennas and electrical installations.",
  },
];

export const credentials = [
  {
    name: "Certificate of Incorporation",
    issuer: "Corporate Affairs Commission (CAC)",
    status: "RC 1161410 · Issued 23 Dec 2013",
  },
  {
    name: "Tax Clearance Certificate",
    issuer: "Federal Inland Revenue Service (FIRS)",
    status: "Current · Valid to 31 Dec 2026",
  },
  {
    name: "ECS Compliance Clearance",
    issuer: "Nigeria Social Insurance Trust Fund (NSITF)",
    status: "Valid to 31 Dec 2026",
  },
  {
    name: "Pension Clearance Certificate",
    issuer: "National Pension Commission (PENCOM)",
    status: "Valid to 31 Dec 2026",
  },
  {
    name: "Certificate of Compliance",
    issuer: "Industrial Training Fund (ITF)",
    status: "Valid to 31 Dec 2026",
  },
  {
    name: "Interim Registration Report",
    issuer: "Bureau of Public Procurement (BPP)",
    status: "Registered contractor",
  },
  {
    name: "Corporate Certificate",
    issuer: "Nigerian Electricity Management Services Agency (NEMSA)",
    status: "Certified for electrical works",
  },
  {
    name: "COREN-Registered Leadership",
    issuer: "Council for the Regulation of Engineering in Nigeria",
    status: "MD registered R.15,129 · Since 2008",
  },
];

export const certStrip = ["CAC", "FIRS", "NSITF", "PENCOM", "ITF", "BPP", "NEMSA", "COREN"];

// Board portraits: drop images with these exact filenames into
// frontend/public/team/ (portrait orientation, ~800x1000px works well).
// Cards show a branded initials placeholder until the file exists.
export const leadership = [
  {
    name: "Engr. Mukhtar Ado",
    role: "Chairman / Managing Director",
    credentials: "MNSE, MIEEE, MCIA · COREN-registered electrical engineer (R.15,129, 2008)",
    photo: "/team/engr-mukhtar-ado.jpg",
  },
  { name: "Engr. A. M. Lawal", role: "Director", photo: "/team/engr-a-m-lawal.jpg" },
  { name: "Alh. Umar Usman", role: "Director", photo: "/team/alh-umar-usman.jpg" },
  { name: "Engr. A. M. Ganda", role: "Director", photo: "/team/engr-a-m-ganda.jpg" },
  { name: "Mal. Abdu A. Sule", role: "Director", photo: "/team/mal-abdu-a-sule.jpg" },
  { name: "Arc. Sanusi Idriss", role: "Director", photo: "/team/arc-sanusi-idriss.jpg" },
  {
    name: "Bar. U. Dikko",
    role: "Company Secretary",
    credentials: "Legal counsel & governance",
    photo: "/team/bar-u-dikko.jpg",
  },
];

export const departments = [
  { name: "Projects", roles: ["Project Manager", "Assistant Project Manager"] },
  { name: "Engineering", roles: ["Information Technology", "Electrical", "Mechanical", "Civil / Architectural"] },
  { name: "Finance", roles: ["Accountant", "Account Clerk"] },
  { name: "Administration", roles: ["Personnel", "Head of Administration"] },
];

export const teamStrength = [
  { count: "4", role: "Electrical Engineers" },
  { count: "3", role: "Mechanical Engineers" },
  { count: "1", role: "Civil Engineer" },
  { count: "1", role: "Architect" },
  { count: "5", role: "Computer & Communication Technologists" },
  { count: "12", role: "Electricians" },
  { count: "1", role: "Accountant" },
  { count: "4", role: "Administrative Staff" },
  { count: "2", role: "Drivers" },
];

export const expertPanel = [
  "Team Leader — Engr. Mukhtar Ado",
  "Quality Assurance",
  "GIS / Meteorologist",
  "Health Expert",
  "Microbiologist",
  "Chemist",
  "Ecologist",
  "Geology Expert",
  "Soil Scientist",
  "Waste Management Expert",
  "Air Quality & Noise Specialist",
  "Socio-economist",
  "Power Systems Engineer",
  "Estate Surveyor & Valuer",
];

export const coreValues = [
  {
    icon: Scale,
    name: "Integrity, Honesty & Ethical Business",
    detail: "We say what we will do, do what we said, and document both.",
  },
  {
    icon: BadgeCheck,
    name: "Professionalism",
    detail: "Registered engineers, structured methods and deliverables that stand up to review.",
  },
  {
    icon: TrendingUp,
    name: "High Performance",
    detail: "We measure our work against the standard of the best firms in our field.",
  },
  {
    icon: Sprout,
    name: "Respect & Personal Growth",
    detail: "Every individual is respected, developed and given room to grow.",
  },
];

export const mission = [
  "Satisfy clients by providing the best value.",
  "Commit to quality, safety and environmental excellence — promoting leadership and teamwork across our people.",
  "Deliver consistently high standards of service.",
];

export const vision =
  "To be among the top environmental and engineering consulting companies in Nigeria.";

// Icon lookups kept here so pages stay declarative.
export const miscIcons = {
  Camera,
  ClipboardCheck,
  Flame,
  Network,
  PhoneCall,
  RadioTower,
  Recycle,
  Sun,
  Waves,
  Wifi,
  Wrench,
};
