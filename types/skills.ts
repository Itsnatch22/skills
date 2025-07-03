export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type Skill = {
    id: string;
    name: string;
    category: string;
    description: string;
    level: SkillLevel;
    postedBy: {
        id: string;
        name: string;
        avatar: string;
        role: string;
    };
    resourceURL: string;
    createdAt: Date;
    tags: string[];
};

export const skillCategories = [
    'Frontend Development',
    'Backend Development',
    'Creative Design',
    'DevOps & Cloud',
    'Data Science',
    'Mobile Development',
    'Production Management',
] as const;

export type SkillCategory = typeof skillCategories[number];

export const skillsData: Skill[] = [
    {
        id: 'fe-1',
        name: 'React.js',
        category: 'Frontend Development',
        description: 'Build interactive user interfaces with React',
        level: 'Advanced',
        postedBy: {
            id: 'user-1',
            name: 'Sarah Johnson',
            avatar: '/avatars/sarah.jpg',
            role: 'Senior Frontend Engineer @ Google'
        },
        resourceURL: 'https://reactjs.org',
        tags: ['JavaScript','UI','Components'],
        createdAt: new Date('2024-01-15')
    },
    {
        id: 'design-1',
        name: 'Figma',
        category: 'Creative Design',
        description: 'Collaborative interface design tool',
        level: 'Intermediate',
        postedBy: {
            id: 'user-2',
            name: 'Michael Chen',
            avatar: '/avatars/michael.jpg',
            role: 'UX Designer @ Airbnb'
        },
        resourceURL: 'https://figma.com',
        tags: ['UI/UX','Prototyping','Wireframing'],
        createdAt: new Date('2024-02-20')
    },
    {
        id: 'devops-1',
        name: 'Docker',
        category: 'DevOps & Cloud',
        description: 'Containerize applications for consistent environments',
        level: 'Advanced',
        postedBy: {
            id: 'user-3',
            name: 'Emily Davis',
            avatar: '/avatars/emily.jpg',
            role: 'DevOps Engineer @ Microsoft'
        },
        resourceURL: 'https://docker.com',
        tags: ['Containers','Deployment','CI/CD'],
        createdAt: new Date('2024-03-05')
    },
    {
        id: 'data-1',
        name: 'Python for Data Science',
        category: 'Data Science',
        description: 'Learn Python libraries for data analysis and visualization',
        level: 'Beginner',
        postedBy: {
            id: 'user-4',
            name: 'David Smith',
            avatar: '/avatars/david.jpg',
            role: 'Data Scientist @ Facebook'
        },
        resourceURL: 'https://python.org',
        tags: ['Python','Data Analysis','Machine Learning'],
        createdAt: new Date('2024-04-10')
    },
    {
        id: 'mobile-1',
        name: 'Flutter',
        category: 'Mobile Development',
        description: 'Build natively compiled applications for mobile, web, and desktop from a single codebase',
        level: 'Intermediate',
        postedBy: {
            id: 'user-5',
            name: 'Laura Brown',
            avatar: '/avatars/laura.jpg',
            role: 'Mobile Developer @ Uber'
        },
        resourceURL: 'https://flutter.dev',
        tags: ['Dart','Cross-platform','UI'],
        createdAt: new Date('2024-05-15')
    },
    {
        id: 'prod-1',
        name: 'Agile Project Management',
        category: 'Production Management',
        description: 'Learn Agile methodologies for effective project management',
        level: 'Beginner',
        postedBy: {
            id: 'user-6',
            name: 'James Wilson',
            avatar: '/avatars/james.jpg',
            role: 'Project Manager @ Amazon'
        },
        resourceURL: 'https://agilemanifesto.org',
        tags: ['Agile','Scrum','Kanban'],
        createdAt: new Date('2024-06-01')
    },
    {
        id: 'be-1',
        name: 'Node.js',
        category: 'Backend Development',
        description: 'Build scalable server-side applications with Node.js',
        level: 'Advanced',
        postedBy: {
            id: 'user-7',
            name: 'Olivia Taylor',
            avatar: '/avatars/olivia.jpg',
            role: 'Backend Engineer @ Netflix'
        },
        resourceURL: 'https://nodejs.org',
        tags: ['JavaScript','APIs','Server'],
        createdAt: new Date('2024-07-20')
    },
    {
        id: 'fe-2',
        name: 'Vue.js',
        category: 'Frontend Development',
        description: 'Progressive framework for building user interfaces',
        level: 'Intermediate',
        postedBy: {
            id: 'user-8',
            name: 'Liam Martinez',
            avatar: '/avatars/liam.jpg',
            role: 'Frontend Developer @ Shopify'
        },
        resourceURL: 'https://vuejs.org',
        tags: ['JavaScript','UI','Framework'],
        createdAt: new Date('2024-08-10')
    },
    {
        id: 'ai-1',
        name: 'AI',
        category: 'AI',
        description: 'Build AI models and applications',
        level: 'Advanced',
        postedBy: {
            id: 'user-9',
            name: 'John Doe',
            avatar: '/avatars/john.jpg',
            role: 'AI Engineer @ Google'
        },
        resourceURL: 'https://ai.com',
        tags: ['AI','Machine Learning','Deep Learning'],
        createdAt: new Date('2024-09-15')
    }
]