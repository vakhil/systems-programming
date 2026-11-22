export interface ProjectLanguage {
  name: string;
  tag: string;
  badgeColor: string;
  why: string;
  starterTip: string;
}

export interface Milestone {
  step: number;
  id: string;
  title: string;
  goal: string;
  specs: string[];
  syscallsOrConcepts: string[];
  checkpoint: string;
  manualHandCheck: string;
}

export interface TheoryDataStructure {
  name: string;
  description: string;
  asciiDiagram?: string;
}

export interface DeepTheoryConcept {
  title: string;
  tag: string;
  coreConcept: string;
  inDepthExplanation: string;
  mathOrAlgorithm?: string;
  asciiDiagram?: string;
  codeSnippet?: string;
}

export interface ExecutionPhase {
  phaseNumber: number;
  phaseTitle: string;
  summary: string;
  eli5Explanation?: string; // Dumbed-down plain English explanation
  architectureDeepDive: string;
  visualWorkflowAscii: string;
  concreteExecutionSteps: string[];
  handsOnCodeSnippet?: string; // Complete copy-pasteable working code for this phase
  codeExplanationLines?: Array<{ line: string; plainMeaning: string }>; // Line-by-line breakdown in plain English
  verificationCommand: string;
  verificationBreakdown?: string; // What the verification command does
  expectedOutput: string;
  outputExplanation?: string; // What the terminal output proves
  edgeCasesAndPitfalls: string[];
}

export interface ProjectTheory {
  highLevelArchitecture: string;
  mentalModel: string;
  deepDiveConcepts?: DeepTheoryConcept[];
  executionRoadmap?: ExecutionPhase[];
  dataStructures: TheoryDataStructure[];
  keySyscalls: Array<{ syscall: string; signature: string; purpose: string }>;
  commonPitfalls: string[];
  visualizerType: 'allocator' | 'socket' | 'balancer' | 'blog' | 'git' | 'redis' | 'torrent' | 'vm' | 'canvas';
}

export interface ProgressiveHints {
  level1_concept: string;
  level2_architecture: string;
  level3_codeSkeleton: string;
}

export interface VerificationHarness {
  testScenarios: string[];
  cliCommands: string[];
  edgeCasesToBreak: string[];
}

export interface VideoChapter {
  timeSeconds: number;
  timestamp: string; // e.g. "02:15"
  title: string;
  description: string;
  subtitle: string;
  scene: {
    type: 'overview' | 'architecture' | 'demo' | 'code' | 'benchmark';
    headline: string;
    visualSnippet: string;
    calloutText: string;
  };
}

export interface VideoMasterclass {
  youtubeId: string;
  title: string;
  author: string;
  duration: string;
  description: string;
  tag?: string;
}

export interface VideoTour {
  durationSeconds: number; // e.g. 615 (~10 minutes 15 seconds)
  durationFormatted: string; // "10:15"
  title: string;
  overviewSummary: string;
  instructorName: string;
  chapters: VideoChapter[];
  masterclass?: VideoMasterclass;
  playlist?: VideoMasterclass[];
}

export interface GettingStartedGuide {
  prerequisites: string[];
  projectStructure: string;
  visualArchitectureImage: {
    caption: string;
    diagramType: string;
    elements: Array<{
      id: string;
      title: string;
      desc: string;
      color: string;
      role: string;
    }>;
    connections: string[];
  };
  starterFileName: string;
  starterLanguage: string;
  starterCode: string;
  codeBreakdown: Array<{
    lines: string;
    concept: string;
    detail: string;
  }>;
  quickstartCommands: string[];
  expectedOutput: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  difficulty: 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: string;
  category:
    | 'Memory Management'
    | 'Networking & Concurrency'
    | 'Distributed Systems'
    | 'Fullstack Baremetal'
    | 'Developer Tools'
    | 'Database Engines'
    | 'Peer-to-Peer Networks'
    | 'Virtual Machines & Compilers'
    | 'Real-Time Collaboration';
  shortDesc: string;
  accentColor: {
    primary: string;
    gradient: string;
    badgeClass: string;
    borderHover: string;
    glowShadow: string;
  };
  languages: ProjectLanguage[];
  scope: {
    overview: string;
    whatYouWillBuild: string[];
    whatYouWontUse: string[];
    realWorldComparison: string;
  };
  videoTour: VideoTour;
  gettingStarted: GettingStartedGuide;
  milestones: Milestone[];
  theory: ProjectTheory;
  hints: ProgressiveHints;
  verification: VerificationHarness;
}

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  role: string;
  completedMilestones: Record<string, boolean>;
  notes: Record<string, string>;
  hasPledged: boolean;
  pledgedAt?: string;
}
