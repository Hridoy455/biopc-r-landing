/**
 * Marketing copy + structured content for each landing-page section.
 * Kept separate from layout so non-developers can edit wording easily.
 */

export const benefits = [
  {
    icon: 'sparkles',
    title: 'No coding experience needed',
    body: 'We start from absolute zero — installing R, writing your first line, and building up step by step.',
  },
  {
    icon: 'video',
    title: 'Live online classes',
    body: 'Interactive sessions where you can ask questions in real time and code along with the instructor.',
  },
  {
    icon: 'flask',
    title: 'Hands-on biology projects',
    body: 'Work with real datasets — gene expression, clinical data, ecology — not toy examples.',
  },
  {
    icon: 'certificate',
    title: 'Verified certificate',
    body: 'Earn a BioPC certificate of completion to showcase on your CV and LinkedIn.',
  },
  {
    icon: 'replay',
    title: 'Lifetime recordings',
    body: 'Miss a class or want a refresher? Every session is recorded and yours to keep.',
  },
  {
    icon: 'community',
    title: 'Community support',
    body: 'Join a private group of biologists learning R together, with peer and mentor help.',
  },
  {
    icon: 'microscope',
    title: 'Research focused',
    body: 'Learn the exact analyses and plots reviewers expect in publications and theses.',
  },
  {
    icon: 'rocket',
    title: 'Career oriented',
    body: 'R is a core skill for bioinformatics, data science, and higher-study applications abroad.',
  },
] as const;

export const audience = [
  'Undergraduate students',
  'Master’s students',
  'PhD students',
  'Faculty & researchers',
  'Biotechnology',
  'Genetics',
  'Microbiology',
  'Medicine',
  'Pharmacy',
  'Agriculture',
  'Veterinary',
  'Life Sciences',
] as const;

export const whyBiopc = [
  { title: 'Research', body: 'A research-first platform with peer-reviewed publications since 2021.' },
  { title: 'Training', body: 'Signature programs training thousands of students across 30+ universities.' },
  { title: 'Community', body: 'An active community of young researchers and mentors supporting each other.' },
  { title: 'Certificates', body: 'Recognized certificates that strengthen CVs and higher-study applications.' },
  { title: 'Expert instructors', body: 'Learn from published researchers who use these tools every day.' },
  { title: 'Hands-on learning', body: 'Every concept is paired with real data, tasks, and guided practice.' },
] as const;

export const curriculum = [
  {
    week: 'Week 1',
    title: 'Getting Started with R & RStudio',
    lessons: [
      'Installing R and RStudio, tour of the interface',
      'R as a calculator, objects, and assignment',
      'Data types and vectors',
      'Your first script — good habits from day one',
    ],
    project: 'Set up your environment and reproduce a simple analysis.',
  },
  {
    week: 'Week 2',
    title: 'Working with Biological Data',
    lessons: [
      'Data frames, tibbles, and factors',
      'Importing CSV / Excel datasets',
      'Cleaning and reshaping data with the tidyverse',
      'Handling missing values',
    ],
    project: 'Clean and summarise a real gene-expression dataset.',
  },
  {
    week: 'Week 3',
    title: 'Data Wrangling with dplyr & tidyr',
    lessons: [
      'filter, select, mutate, arrange',
      'group_by and summarise',
      'Joining datasets',
      'Pipes and readable workflows',
    ],
    project: 'Build a reproducible data-wrangling pipeline.',
  },
  {
    week: 'Week 4',
    title: 'Visualization with ggplot2',
    lessons: [
      'The grammar of graphics',
      'Scatter, box, bar, and violin plots',
      'Publication-quality themes and colors',
      'Faceting and annotations',
    ],
    project: 'Recreate a figure from a published biology paper.',
  },
  {
    week: 'Week 5',
    title: 'Statistics for Biologists',
    lessons: [
      't-tests, ANOVA, and non-parametric tests',
      'Correlation and linear regression',
      'Choosing the right test',
      'Interpreting and reporting p-values',
    ],
    project: 'Run and interpret a full statistical analysis.',
  },
  {
    week: 'Week 6',
    title: 'Bioinformatics & Capstone',
    lessons: [
      'Intro to Bioconductor',
      'Differential expression overview',
      'Heatmaps and volcano plots',
      'Building a reproducible report with R Markdown',
    ],
    project: 'Capstone: end-to-end analysis + report on a dataset of your choice.',
  },
] as const;

export const instructor = {
  name: 'Hridoy Ahmed',
  role: 'Head Coordinator, BioPC',
  bio: 'Bioinformatics researcher and founder of BioPC. Under his guidance, BioPC published its first paper in the Journal of Biomolecular Structure and Dynamics (IF 5.2) and has trained thousands of students in bioinformatics, drug design, and data analysis since 2021.',
  highlights: [
    'Published in Journal of Biomolecular Structure and Dynamics (IF 5.2)',
    'Led 10+ signature training programs & olympiads',
    'Mentored 3000+ students across 30+ universities',
  ],
  photo: '/instructor.jpg',
} as const;

export const testimonials = [
  {
    name: 'Ayesha R.',
    role: 'MS student, Genetic Engineering',
    rating: 5,
    quote: 'I had never written a line of code before. By week 4 I was making my own ggplot figures for my thesis. The live classes made all the difference.',
  },
  {
    name: 'Tanvir H.',
    role: 'Undergraduate, Microbiology',
    rating: 5,
    quote: 'The projects use real biological data, so everything felt relevant. BioPC’s community helped whenever I got stuck.',
  },
  {
    name: 'Dr. Nusrat J.',
    role: 'Lecturer, Pharmacy',
    rating: 5,
    quote: 'A clear, well-structured course. I now teach my own students the reproducible workflows I learned here.',
  },
  {
    name: 'Rakib M.',
    role: 'PhD applicant, Biotechnology',
    rating: 5,
    quote: 'The statistics and R Markdown modules gave my applications a real edge. Highly recommended for anyone heading into research.',
  },
] as const;

export const faqs = [
  {
    q: 'Do I need any programming background?',
    a: 'No. The course is designed for absolute beginners. We start from installing R and build up gradually with plenty of guided practice.',
  },
  {
    q: 'What do I need to join?',
    a: 'A laptop or desktop (Windows, Mac, or Linux), a stable internet connection, and curiosity. R and RStudio are free — we install them together in Week 1.',
  },
  {
    q: 'Are the classes live or recorded?',
    a: 'Both. Classes are live so you can ask questions, and every session is recorded so you can revisit anytime.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes. You receive a BioPC certificate of completion after finishing the course and the capstone project.',
  },
  {
    q: 'What if I miss a class?',
    a: 'No problem — watch the recording and post questions in the community group. Instructors respond throughout the week.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept bKash, Nagad, Rocket, and bank transfer. After paying, submit your Transaction ID in the registration form and we confirm your seat by email.',
  },
] as const;

export const trustStats = [
  { value: '3000+', label: 'Students trained' },
  { value: '30+', label: 'Universities' },
  { value: '2021', label: 'Serving since' },
  { value: '5.2', label: 'Journal impact factor' },
] as const;
