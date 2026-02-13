import { Skill, TimelineEvent, Certification } from './types';

export const SKILLS: Skill[] = [
  {
    name: "Systems Engineering",
    level: 98,
    description: "Architecting distributed systems with C++, Rust, and Go.",
    icon: "Server"
  },
  {
    name: "Full-Stack Dev",
    level: 95,
    description: "End-to-end development using TS, Python, and React.",
    icon: "Layers"
  },
  {
    name: "Cloud & DevOps",
    level: 92,
    description: "AWS/GCP infrastructure, Kubernetes, and CI/CD automation.",
    icon: "Cloud"
  },
  {
    name: "Security",
    level: 90,
    description: "OWASP, Pen-testing, PCI-DSS compliance, and cryptography.",
    icon: "Shield"
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2024 - Present",
    title: "Senior Staff Engineer",
    company: "Systems & Security Architect",
    description: "Leading high-scale production systems with 99.9% uptime. Specializing in secure-by-design distributed systems and automated payment security pipelines (PCI-DSS)."
  },
  {
    year: "2018 - 2023",
    title: "Lead Systems Engineer",
    company: "Distributed Solutions Inc.",
    description: "Architected multi-region cloud infrastructure on AWS/GCP. Managed deployments of mission-critical services using Kubernetes and Docker."
  },
  {
    year: "2013 - 2018",
    title: "Full-Stack Engineer",
    company: "Digital Innovations Hub",
    description: "Built scalable web applications using TypeScript and Python. Optimized database performance and implemented secure authentication protocols."
  },
  {
    year: "2009 - 2013",
    title: "Security Researcher & Developer",
    company: "Open Source Collective",
    description: "Active contributor to core software security tools. Participated in major bug bounty programs for Google, Microsoft, and Oracle."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Google Bug Bounty Participant",
    issuer: "Google Security",
    year: "2023",
    icon: "Award"
  },
  {
    name: "Microsoft Security Hall of Fame",
    issuer: "Microsoft",
    year: "2022",
    icon: "Award"
  },
  {
    name: "Oracle Vulnerability Researcher",
    issuer: "Oracle",
    year: "2021",
    icon: "Shield"
  },
  {
    name: "PCI-DSS Implementation Specialist",
    issuer: "Security Standards Council",
    year: "2020",
    icon: "Shield"
  },
  {
    name: "Certified Cloud Architect",
    issuer: "AWS",
    year: "2019",
    icon: "Cloud"
  }
];