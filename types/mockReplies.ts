// mockReplies.ts
export type MockReply = {
    skillId: string;
    replies: { text: string; delay: number; phase: number }[];
  };
  
  export const mockReplies: MockReply[] = [
    {
      skillId: 'fe-1', // React.js
      replies: [
        { text: 'Yo! Pumped you\'re into React.js! 😎 Wanna dive into hooks or components first?', delay: 1000, phase: 0 },
        { text: 'I\'ve got some dope resources for React. What\'s your current level?', delay: 2000, phase: 0 },
        { text: 'Hooks are game changers! useState and useEffect are great starting points.', delay: 1000, phase: 1 },
        { text: 'For components, I recommend starting with functional components - they\'re simpler.', delay: 1500, phase: 1 },
        { text: 'Need help with a specific React problem? Share your code and I\'ll take a look!', delay: 1000, phase: 2 },
      ],
    },
    {
      skillId: 'design-1', // Figma
      replies: [
        { text: 'Hey! Figma\'s my jam! 🎨 Need help with prototyping or wireframing?', delay: 800, phase: 0 },
        { text: 'Got a cool Figma project? Share some deets, and I\'ll drop some tips!', delay: 1800, phase: 0 },
        { text: 'For prototyping, try using auto-animate - it creates smooth transitions!', delay: 1000, phase: 1 },
        { text: 'Components in Figma are like React components - reusable and powerful!', delay: 1500, phase: 1 },
        { text: 'Want feedback on your design? Share a link to your Figma file!', delay: 1000, phase: 2 },
      ],
    },
    {
      skillId: 'devops-1', // Docker
      replies: [
        { text: 'Docker\'s awesome for containers! 🐳 Want to talk about Dockerfiles or CI/CD?', delay: 900, phase: 0 },
        { text: 'I can share some pro tips on Docker setups. What\'s your use case?', delay: 2000, phase: 0 },
        { text: 'For Dockerfiles, remember to use multi-stage builds to reduce image size.', delay: 1000, phase: 1 },
        { text: 'Docker Compose is perfect for local development with multiple services.', delay: 1500, phase: 1 },
        { text: 'Having issues with a specific Docker setup? Share your config!', delay: 1000, phase: 2 },
      ],
    },
    {
        skillId: 'ai-1', // AI
        replies: [
            { text: 'AI is the future! 🤖 Want to talk about LLMs or RAG?', delay: 800, phase: 0 },
            { text: 'I can share some AI tips. What\'s your current focus?', delay: 1800, phase: 0 },
            { text: 'For LLMs, try using LangChain for better orchestration.', delay: 1000, phase: 1 },
            { text: 'RAG is great for context-aware responses - try Pinecone for vector storage!', delay: 1500, phase: 1 },
        ]
    },
    {
        skillId: 'ml-1', // Machine Learning
        replies: [
            { text: 'Machine learning is fascinating! 🤖 Want to talk about models or data pipelines?', delay: 800, phase: 0 },
            { text: 'I can share some ML tips. What\'s your current focus?', delay: 1800, phase: 0 },
            { text: 'For models, try using TensorFlow for training and inference.', delay: 1000, phase: 1 },
            { text: 'Data pipelines are key for ML - consider using Airflow or Luigi for orchestration!', delay: 1500, phase: 1 },
        ]
    },
    {
      skillId: 'be-1', // Node.js
      replies: [
        { text: 'Node.js for the win! ⚡️ Building APIs or something else?', delay: 900, phase: 0 },
        { text: 'I\'ve got some Node.js tricks up my sleeve. What\'s your project?', delay: 1900, phase: 0 },
        { text: 'For APIs, Express is great but consider Fastify for better performance.', delay: 1000, phase: 1 },
        { text: 'Remember to handle errors properly in async functions - use try/catch!', delay: 1500, phase: 1 },
        { text: 'Need help debugging a Node issue? Share the error and I\'ll help!', delay: 1000, phase: 2 },
      ],
    },
    {
        skillId: 'db-1', // Database
        replies: [
            { text: 'Databases are the backbone of data storage! 💾 Want to talk about SQL or NoSQL?', delay: 800, phase: 0 },
            { text: 'I can share some DB tips. What\'s your current focus?', delay: 1800, phase: 0 },
            { text: 'For SQL, try using PostgreSQL for its reliability and features.', delay: 1000, phase: 1 },
            { text: 'NoSQL is great for flexibility - consider MongoDB for document-based storage!', delay: 1500, phase: 1 },
        ]
    },
    {
        skillId: 'devops-2', // Docker
        replies: [
            { text: 'Docker\'s awesome for containers! 🐳 Want to talk about Dockerfiles or CI/CD?', delay: 900, phase: 0 },
            { text: 'I can share some pro tips on Docker setups. What\'s your use case?', delay: 2000, phase: 0 },
            { text: 'For Dockerfiles, remember to use multi-stage builds to reduce image size.', delay: 1000, phase: 1 },
            { text: 'Docker Compose is perfect for local development with multiple services.', delay: 1500, phase: 1 },
            { text: 'Having issues with a specific Docker setup? Share your config!', delay: 1000, phase: 2 },
        ]
    },
    {
        skillId: 'devops-3', // Docker
        replies: [
            { text: 'Docker\'s awesome for containers! 🐳 Want to talk about Dockerfiles or CI/CD?', delay: 900, phase: 0 },
            { text: 'I can share some pro tips on Docker setups. What\'s your use case?', delay: 2000, phase: 0 },
            { text: 'For Dockerfiles, remember to use multi-stage builds to reduce image size.', delay: 1000, phase: 1 },
            { text: 'Docker Compose is perfect for local development with multiple services.', delay: 1500, phase: 1 },
            { text: 'Having issues with a specific Docker setup? Share your config!', delay: 1000, phase: 2 },
        ]
    }
  ];