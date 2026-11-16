export interface EngineeringTrack {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  schedule: string;
  room: string;
  lead: string;
  leadRole: string;
  stack: string[];
  projects: {
    name: string;
    outcome: string;
  }[];
  capacityStatus: 'Open' | 'Waitlist' | 'Active';
}

export interface CorePillar {
  id: string;
  number: string;
  title: string;
  summary: string;
  schedule: string;
  location: string;
  image: string;
  highlights: string[];
}

export interface ClubEventStory {
  id: string;
  category: 'Workshops' | 'Hackathons' | 'Releases';
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  speaker: string;
  location: string;
  registrationState: 'Open' | 'Confirmed' | 'Recap';
  fullStory: string[];
  agenda: string[];
}

export interface PartnerEntity {
  id: string;
  name: string;
  subtitle: string;
}

export const CLUB_LOGO = '/assets/aistudio/902188114_1140955785194607_3477932045149795490_n_d0c1131f.jpg';
export const HERO_IMAGE = '/src/assets/images/hero_it_club_lab_1794841174873.jpg';
export const ABOUT_COLLAB_IMAGE = '/src/assets/images/about_hackathon_collab_1794841175038.jpg';
export const ABOUT_HARDWARE_IMAGE = '/src/assets/images/about_hardware_bench_1794841175660.jpg';
export const TRACK_SOFTWARE_IMAGE = '/src/assets/images/track_software_ai_1794841177388.jpg';
export const TRACK_ROBOTICS_IMAGE = '/src/assets/images/track_cyber_robotics_1794841176372.jpg';
export const PILLAR_WORKSHOP_IMAGE = '/src/assets/images/pillar_workshop_talk_1794841178136.jpg';

export const PARTNER_ENTITIES: PartnerEntity[] = [
  { id: 'os-lab', name: 'OpenSource Lab', subtitle: 'Campus Compute' },
  { id: 'cloud-guild', name: 'Cloud Guild', subtitle: 'Infrastructure' },
  { id: 'robotics-union', name: 'Robotics Union', subtitle: 'Mechatronics' },
  { id: 'cybersec-soc', name: 'CyberSec Society', subtitle: 'Red & Blue Team' },
  { id: 'dataworks', name: 'DataWorks', subtitle: 'Applied ML' },
  { id: 'devforge', name: 'DevForge', subtitle: 'Design Systems' },
];

export const CLUB_METRICS = [
  { label: 'Active Student Members', value: '420+' },
  { label: 'Shipped Open-Source Repos', value: '34' },
  { label: 'Weekly Lab Hours', value: '16 hrs' },
];

export const ENGINEERING_TRACKS: EngineeringTrack[] = [
  {
    id: 'systems-web',
    title: 'Full-Stack & Distributed Systems',
    shortDesc: 'Architect resilient web platforms, APIs, and self-hosted campus tools from commit to production.',
    image: TRACK_SOFTWARE_IMAGE,
    schedule: 'Tuesdays · 18:00 – 20:00',
    room: 'Engineering Hall 304',
    lead: 'Maya Lin',
    leadRole: 'Systems Lead, CS Senior',
    stack: ['TypeScript', 'React', 'Go', 'PostgreSQL', 'Docker'],
    projects: [
      { name: 'CampusBus Live', outcome: '1,800+ daily student commuters tracked in real time' },
      { name: 'RoomBooker API', outcome: 'Adopted across 14 departmental study rooms' },
    ],
    capacityStatus: 'Open',
  },
  {
    id: 'applied-ai',
    title: 'Applied AI & Machine Learning',
    shortDesc: 'Build domain-tuned models, vision pipelines, and reproducible evaluation benchmarks.',
    image: ABOUT_COLLAB_IMAGE,
    schedule: 'Wednesdays · 17:30 – 19:30',
    room: 'Innovation Studio B',
    lead: 'Arjun Patel',
    leadRole: 'ML Track Coordinator',
    stack: ['Python', 'PyTorch', 'ONNX', 'FastAPI', 'Weights & Biases'],
    projects: [
      { name: 'LectureNote Indexer', outcome: 'Indexed 600+ hours of open course recordings' },
      { name: 'SignBridge Vision', outcome: '94.2% gesture classification accuracy on edge GPU' },
    ],
    capacityStatus: 'Open',
  },
  {
    id: 'robotics-iot',
    title: 'Embedded Hardware & Robotics',
    shortDesc: 'Design custom PCBs, sensor fusion firmware, and autonomous mobile platforms.',
    image: TRACK_ROBOTICS_IMAGE,
    schedule: 'Thursdays · 18:00 – 20:30',
    room: 'Makerspace Bay 2',
    lead: 'Elena Rostova',
    leadRole: 'Hardware & Firmware Lead',
    stack: ['C++', 'ROS 2', 'STM32', 'KiCad', 'LiDAR SLAM'],
    projects: [
      { name: 'Rover-04 Autonomous', outcome: 'Completed 1.2 km outdoor autonomous waypoint trial' },
      { name: 'LabEnv Telemetry', outcome: '24/7 air-quality and power monitoring across 3 labs' },
    ],
    capacityStatus: 'Active',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & CTF Defense',
    shortDesc: 'Practice binary exploitation, network forensics, and defensive hardening in isolated ranges.',
    image: ABOUT_HARDWARE_IMAGE,
    schedule: 'Fridays · 16:30 – 18:30',
    room: 'Security Lab 210',
    lead: 'Marcus Vance',
    leadRole: 'CTF Team Captain',
    stack: ['Linux Kernel', 'WireGuard', 'Ghidra', 'Python', 'Kubernetes'],
    projects: [
      { name: 'Club Range CTF', outcome: '48 custom challenges solved by 190 regional competitors' },
      { name: 'ZeroTrust Auth Audit', outcome: 'Hardened 9 student club web deployments' },
    ],
    capacityStatus: 'Open',
  },
];

export const CORE_PILLARS: CorePillar[] = [
  {
    id: 'build-nights',
    number: '01',
    title: 'Weekly Build & Code Nights',
    summary:
      'Every Tuesday and Thursday evening, members gather in Engineering Hall to ship features, pair-program across skill levels, and debug real production software with peer mentors.',
    schedule: 'Tues & Thurs · 18:00 – 20:30',
    location: 'Engineering Hall 304 & Makerspace',
    image: PILLAR_WORKSHOP_IMAGE,
    highlights: ['Open to first-year beginners and senior maintainers', 'Dedicated mentor table for Git & environment setup'],
  },
  {
    id: 'hackathon',
    number: '02',
    title: 'Annual 48-Hour Campus Hackathon',
    summary:
      'Our flagship spring weekend unites 300+ designers, engineers, and hardware builders to prototype working products judged on code quality, usability, and real-world impact.',
    schedule: 'Annual Spring Term · 48 Hours',
    location: 'University Atrium & Innovation Wing',
    image: ABOUT_COLLAB_IMAGE,
    highlights: ['Hardware loaner bench with oscilloscopes and SBCs', 'Live deployment support and alumni engineering critiques'],
  },
  {
    id: 'peer-reviews',
    number: '03',
    title: 'Peer Mentorship & Code Reviews',
    summary:
      'Rather than learning syntax in isolation, every new member is paired with an experienced maintainer who reviews pull requests, architecture docs, and testing discipline.',
    schedule: 'Continuous · Async & In-Person',
    location: 'Club Git Forge & Office Hours',
    image: TRACK_SOFTWARE_IMAGE,
    highlights: ['Structured 1-on-1 architecture walkthroughs', 'Clean documentation and automated CI habits from day one'],
  },
  {
    id: 'lab-infra',
    number: '04',
    title: 'Open-Source Lab Infrastructure',
    summary:
      'IT-CLUB operates its own on-campus Proxmox cluster, GPU compute nodes, 3D printers, and soldering stations so members can deploy without cloud billing barriers.',
    schedule: '24/7 Badge Access for Track Members',
    location: 'Server Rack B & Makerspace Bay 2',
    image: ABOUT_HARDWARE_IMAGE,
    highlights: ['Self-hosted container registry and staging environments', 'Shared component inventory for rapid IoT prototyping'],
  },
  {
    id: 'tech-talks',
    number: '05',
    title: 'Industry Tech Talks & Demo Days',
    summary:
      'Bi-weekly technical deep dives led by alumni engineers and visiting researchers cover compilers, distributed databases, product design systems, and engineering careers.',
    schedule: 'Bi-Weekly Wednesdays · 19:00',
    location: 'Auditorium 102',
    image: HERO_IMAGE,
    highlights: ['Unfiltered engineering post-mortems and live demos', 'End-of-semester showcase open to faculty and recruiters'],
  },
  {
    id: 'ctf-programming',
    number: '06',
    title: 'Competitive Programming & CTFs',
    summary:
      'Our algorithms and security squads train weekly for collegiate programming contests and international Capture The Flag tournaments with curated practice sets.',
    schedule: 'Fridays · 16:30 – 19:00',
    location: 'Security Lab 210',
    image: TRACK_ROBOTICS_IMAGE,
    highlights: ['Ranked top 8 nationally in Fall Regional Cyber Defense', 'Beginner-friendly cryptography and graph theory tracks'],
  },
];

export const CLUB_STORIES: ClubEventStory[] = [
  {
    id: 'rust-systems-workshop',
    category: 'Workshops',
    date: 'Nov 24, 2026',
    readTime: '6:00 PM · Room 304',
    title: 'Hands-On Workshop: Building a Concurrent HTTP Proxy in Rust',
    excerpt:
      'Walk through async I/O, Tokio task scheduling, and zero-copy buffer handling in a two-hour live coding session.',
    image: TRACK_SOFTWARE_IMAGE,
    speaker: 'Maya Lin & David Okafor',
    location: 'Engineering Hall 304',
    registrationState: 'Open',
    fullStory: [
      'Understanding how modern network proxies handle thousands of concurrent connections is one of the fastest ways to demystify systems programming. In this hands-on evening workshop, we will build a working HTTP/1.1 reverse proxy from scratch using Rust and Tokio.',
      'Participants should bring a laptop with Rustup installed. Beginners to Rust are welcome—we will provide starter scaffolding and focus on ownership patterns across async task boundaries, connection pooling, and graceful shutdown.',
    ],
    agenda: [
      '18:00 — Environment check & starter repository clone',
      '18:20 — TCP listeners, async streams, and framing basics',
      '19:00 — Connection pooling & upstream health checks',
      '19:40 — Load-testing your proxy live against local targets',
    ],
  },
  {
    id: 'autumn-hack-recap',
    category: 'Hackathons',
    date: 'Nov 08, 2026',
    readTime: '4 min read',
    title: 'Autumn Hardware & AI Sprint: 28 Prototypes Shipped in 36 Hours',
    excerpt:
      'From autonomous campus accessibility mappers to low-power soil moisture meshes, explore the winning builds from this fall.',
    image: ABOUT_COLLAB_IMAGE,
    speaker: 'IT-CLUB Organizing Committee',
    location: 'Innovation Wing Atrium',
    registrationState: 'Recap',
    fullStory: [
      'Over 140 students formed 32 interdisciplinary teams for our Autumn Hardware & AI Sprint. Unlike traditional pitch competitions, teams were judged strictly on working hardware-software integration demonstrated live on stage.',
      'First place went to Team TrailSense for a low-cost curb-ramp gradient scanner mounted to a standard wheelchair wheel hub, streaming accessibility heatmaps directly to our CampusMap open-source repository.',
    ],
    agenda: [
      '28 functioning prototypes submitted before Sunday freeze',
      '11 projects merged into ongoing club open-source tracks',
      '6 hardware teams continuing development in Makerspace Bay 2',
    ],
  },
  {
    id: 'rover-v4-release',
    category: 'Releases',
    date: 'Oct 29, 2026',
    readTime: '5 min read',
    title: 'Open-Source Release: Rover-04 Autonomous ROS 2 Navigation Stack',
    excerpt:
      'Our robotics squad published full KiCad schematics, custom motor controller firmware, and LiDAR SLAM configs under MIT.',
    image: TRACK_ROBOTICS_IMAGE,
    speaker: 'Elena Rostova & Robotics Squad',
    location: 'Makerspace Bay 2',
    registrationState: 'Recap',
    fullStory: [
      'After two semesters of field testing across campus pathways, the Embedded Hardware & Robotics track has released v4.0 of the Rover-04 open hardware platform. Everything from aluminum chassis CAD files to the STM32 CAN-bus firmware is now publicly documented.',
      'New members joining the Thursday lab sessions can immediately fork the simulation workspace in Gazebo before deploying navigation nodes onto the physical rover.',
    ],
    agenda: [
      'Full 4-layer motor driver PCB Gerber & BOM files published',
      'ROS 2 Humble & Jazzy Docker containers for instant onboarding',
      'Open benchmark dataset of 4.5 km campus LiDAR scans',
    ],
  },
  {
    id: 'ctf-bootcamp',
    category: 'Workshops',
    date: 'Dec 04, 2026',
    readTime: '4:30 PM · Lab 210',
    title: 'Defensive Security Bootcamp: Packet Forensics & Web Exploitation',
    excerpt:
      'Learn how to inspect live PCAP captures, spot common authentication flaws, and patch vulnerable services safely.',
    image: ABOUT_HARDWARE_IMAGE,
    speaker: 'Marcus Vance',
    location: 'Security Lab 210',
    registrationState: 'Open',
    fullStory: [
      'Security engineering starts with understanding how protocols behave on the wire. In this Friday bootcamp, our CTF Defense squad walks through three realistic incident response scenarios inside an isolated local lab network.',
      'No prior security background is required. Bring a laptop with a modern browser and terminal; temporary sandbox credentials will be distributed at the door.',
    ],
    agenda: [
      '16:30 — Setting up Wireshark & isolated challenge VPN',
      '17:00 — Tracing anomalous DNS and TLS handshakes',
      '17:45 — Patching and verifying fixes on live containerized apps',
    ],
  },
];

export const CLUB_TESTIMONIAL = {
  quote:
    'Joining IT-CLUB in my freshman fall turned theory from lectures into real production habits. Within two months I had shipped my first merged pull request, learned Linux container orchestration, and met the teammates I built our senior capstone with.',
  author: 'Nadia Benali',
  role: 'Former Club Vice President · Software Engineer',
  cohort: 'Class of 2025 Alumni',
};
