import type { LetterSpec, SkillCategory } from './types';

/**
 * Mengeja sebuah kata menjadi daftar huruf tanpa simpangan.
 */
function spell(word: string): LetterSpec[] {
  return [...word].map((c) => ({ c }));
}

/**
 * Data kategori kemampuan untuk Skills section dengan penataan letter spacing stabil.
 */
export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    roman: 'I',
    bannerLabel: 'FRONTEND',
    letters: [
      { c: 'F', y: -0.04, gap: -0.07 },
      { c: 'R', y: 0.03, r: -2, gap: -0.08 },
      { c: 'O', y: -0.02, s: 1.08, gap: -0.07, invert: true, boxR: -12, padX: -0.03, padY: -0.125 },
      { c: 'N', y: 0.08, gap: -0.08 },
      { c: 'T', y: -0.07, gap: -0.08 },
      { c: 'E', y: 0.05, gap: -0.06 },
      { c: 'N', y: -0.05, r: 1.5, gap: -0.12 },
      { c: 'D', y: 0.07 },
    ],
    name: 'FRONTEND ENGINEERING',
    description: 'Antarmuka web interaktif dan responsif',
    techs: [
      {
        name: 'Next.js',
        coreSkills: ['App Router', 'Server Components', 'Server Actions', 'Route Handlers', 'Dynamic Rendering', 'Static Generations'],
      },
      {
        name: 'React',
        coreSkills: ['Hooks', 'Component Composition', 'Context API', 'Concurrent Rendering'],
      },
      {
        name: 'TypeScript',
        coreSkills: ['Generics', 'Type Inference', 'Utility Types', 'Interfaces'],
      },
      {
        name: 'Tailwind CSS',
        coreSkills: ['Utility Classes', 'Responsive Variants', 'Custom Theming', 'JIT Compiler'],
      },
      {
        name: 'React Flow',
        coreSkills: ['Custom Nodes', 'Edge Routing', 'Viewport Controls', 'Interactive Graphs'],
      },
    ],
  },
  {
    roman: 'II',
    bannerLabel: 'BACKEND',
    letters: [
      { c: 'B', y: -0.04, gap: -0.17 },
      { c: 'A', y: 0.03, r: -2, gap: -0.1 },
      { c: 'C', s: 1.08, gap: -0.08, boxR: -12, padX: 0.01, padY: -0.02 },
      { c: 'K', y: -0.07, gap: -0.04 },
      { c: 'E', y: 0.02, gap: -0.04, invert: true, boxR: 3, padX: 0.005, padY: -0.10 },
      { c: 'N', y: -0.05, gap: -0.15 },
      { c: 'D', y: 0.05, r: 1.5 },
    ],
    name: 'BACKEND & DATABASE',
    description: 'Layanan API, autentikasi, dan penyimpanan data',
    techs: [
      {
        name: 'Express.js',
        coreSkills: ['Routing', 'Middleware', 'Error Handling', 'REST APIs'],
      },
      {
        name: 'FastAPI',
        coreSkills: ['Path Operations', 'Pydantic Validation', 'Async Endpoints', 'Auto Docs'],
      },
      {
        name: 'PostgreSQL',
        coreSkills: ['Relational Schema', 'Transactions', 'Indexing', 'JSONB'],
      },
      {
        name: 'MySQL',
        coreSkills: ['Relational Schema', 'Stored Procedures', 'Replication', 'Indexing'],
      },
    ],
  },
  {
    roman: 'III',
    bannerLabel: 'EMBEDDED',
    letters: [
      { c: 'E', y: -0.04, gap: -0.08 },
      { c: 'M', y: 0.03, r: -2, gap: -0.1 },
      { c: 'B', y: 0.08, s: 1.08, gap: -0.06 },
      { c: 'E', y: -0.02, gap: -0.1 },
      { c: 'D', y: 0.08, gap: -0.15 },
      { c: 'D', y: 0.04, r: 1.5, gap: -0.1 },
      { c: 'E', y: -0.05, gap: -0.1, invert: true, boxR: 3, padX: -0.03, padY: -0.10 },
      { c: 'D', y: 0.04 },
    ],
    name: 'EMBEDDED & COMPUTER VISION',
    description: 'Sistem tertanam dan pemrosesan citra real-time',
    techs: [
      {
        name: 'C++',
        coreSkills: ['Memory Management', 'OOP', 'STL', 'Real-Time Constraints'],
      },
      {
        name: 'ESP32 / STM32',
        coreSkills: ['GPIO Control', 'Interrupt Handling', 'PWM & Timers', 'Peripheral Drivers'],
      },
      {
        name: 'OpenCV',
        coreSkills: ['Image Processing', 'Object Detection', 'Video Capture', 'Contour Analysis'],
      },
      {
        name: 'Google MediaPipe',
        coreSkills: ['Pose Estimation', 'Hand Tracking', 'Face Landmarks', 'Real-Time Inference'],
      },
    ],
  },
  {
    roman: 'IV',
    bannerLabel: 'DESIGN',
    letters: [
      { c: 'D', y: -0.04, gap: -0.12 },
      { c: 'E', y: 0.03, r: -2, gap: -0.04 },
      { c: 'S', y: 0.06, s: 1.08, gap: -0.04 },
      { c: 'I', y: -0.02, gap: -0.04 },
      { c: 'G', y: 0.04, gap: -0.06, invert: true, boxR: 3, padX: -0.03, padY: -0.10 },
      { c: 'N', y: -0.05, r: 1.5 },
    ],
    name: 'DESIGN & PROTOTYPING',
    description: 'Perancangan UI/UX dan sistem desain',
    techs: [
      {
        name: 'Figma',
        coreSkills: ['Auto Layout', 'Components', 'Prototyping', 'Design Tokens'],
      },
      {
        name: 'UI/UX Design',
        coreSkills: ['Wireframing', 'User Flows', 'Usability Heuristics', 'Accessibility'],
      },
      {
        name: 'Design System',
        coreSkills: ['Component Library', 'Design Tokens', 'Style Guide', 'Consistency Rules'],
      },
    ],
  },
]; 