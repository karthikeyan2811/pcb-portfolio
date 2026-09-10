export interface SkillChip {
  label: string;
  level: 'core' | 'proficient' | 'familiar';
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface Academic {
  degree: string;
  institution: string;
  duration: string;
  detail: string;
}

export interface Project {
  name: string;
  description: string;
  tools: string[];
}
export interface quickSummary {
  points: string;
}