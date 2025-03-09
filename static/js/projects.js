document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-details-btn');
    
    // Project details data
    const projectDetails = {
        project1: {
            title: 'AI-Powered Cloud Monitoring',
            image: 'static/images/munich.JPG',
            description: `
                <p>An intelligent cloud monitoring system that uses machine learning to detect anomalies in AWS infrastructure performance metrics.</p>
                <p>The system continuously analyzes CloudWatch metrics, identifies unusual patterns, and alerts teams before issues impact users.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Real-time anomaly detection using custom ML models</li>
                    <li>Automated incident response workflows</li>
                    <li>Customizable alerting thresholds</li>
                    <li>Historical trend analysis</li>
                </ul>
                <h3>Technical Implementation:</h3>
                <p>Built using AWS Lambda for serverless processing, DynamoDB for data storage, and SageMaker for ML model training and deployment. The frontend dashboard was created with React and D3.js for data visualization.</p>
            `,
            techStack: ['AWS Lambda', 'DynamoDB', 'SageMaker', 'CloudWatch', 'React', 'D3.js'],
            gallery: ['static/images/munich.JPG', 'static/images/leshark.png']
        },
        project2: {
            title: 'Real-Time EventBridge Analytics',
            image: 'static/images/leshark.png',
            description: `
                <p>A comprehensive analytics dashboard for monitoring and analyzing AWS EventBridge events across multiple accounts and regions.</p>
                <p>This tool provides real-time visibility into event patterns, helping teams understand event flows and optimize their event-driven architectures.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Live event stream visualization</li>
                    <li>Cross-account event tracking</li>
                    <li>Event pattern analysis</li>
                    <li>Custom filtering and search</li>
                </ul>
                <h3>Technical Implementation:</h3>
                <p>The backend is built with Flask and uses AWS SDK to interact with EventBridge APIs. The frontend is developed with React and uses WebSockets for real-time updates. Data is temporarily stored in ElastiCache for performance optimization.</p>
            `,
            techStack: ['AWS EventBridge', 'React', 'Flask', 'WebSockets', 'ElastiCache', 'AWS SDK'],
            gallery: ['static/images/leshark.png', 'static/images/munich.JPG']
        },
        project3: {
            title: 'Generative AI Content Platform',
            image: 'static/images/munich.JPG',
            description: `
                <p>A platform that leverages GPT-4 and other AI models to generate and manage content for various business needs.</p>
                <p>Users can create templates, define parameters, and generate customized content at scale, with built-in review and approval workflows.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Template-based content generation</li>
                    <li>Multi-model AI integration</li>
                    <li>Content versioning and history</li>
                    <li>Collaborative editing and approval</li>
                </ul>
                <h3>Technical Implementation:</h3>
                <p>Built with a React frontend and Python backend using FastAPI. Integrates with OpenAI's API for content generation and uses PostgreSQL for data storage. Deployed on AWS using ECS for containerization.</p>
            `,
            techStack: ['GPT-4', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'AWS ECS'],
            gallery: ['static/images/munich.JPG', 'static/images/leshark.png']
        },
        project4: {
            title: 'Serverless Data Pipeline',
            image: 'static/images/leshark.png',
            description: `
                <p>A scalable, event-driven data processing pipeline that handles millions of records per hour with minimal operational overhead.</p>
                <p>The system ingests data from multiple sources, processes it in real-time, and makes it available for analytics and machine learning workloads.</p>
                <h3>Key Features:</h3>
                <ul>
                    <li>Real-time data processing</li>
                    <li>Automatic scaling based on load</li>
                    <li>Data transformation and enrichment</li>
                    <li>Error handling and dead-letter queues</li>
                </ul>
                <h3>Technical Implementation:</h3>
                <p>Implemented using AWS Kinesis for data streaming, Lambda for processing, and S3 for data storage. Uses Step Functions for orchestration and Glue for data cataloging. Monitoring is done with CloudWatch and custom dashboards.</p>
            `,
            techStack: ['AWS Kinesis', 'Lambda', 'S3', 'Step Functions', 'Glue', 'CloudWatch'],
            gallery: ['static/images/leshark.png', 'static/images/munich.JPG']
        }
    };
    
    // Open modal with project details
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                // Create modal content
                let content = `
                    <div class="project-detail">
                        <div class="project-detail-header">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-detail-title">
                                <h2>${project.title}</h2>
                            </div>
                        </div>
                        <div class="project-detail-content">
                            ${project.description}
                        </div>
                        <div class="tech-stack">
                            <h3>Technologies Used:</h3>
                            <div class="tech-items">
                                ${project.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="project-gallery">
                            ${project.gallery.map(img => `
                                <div class="gallery-image">
                                    <img src="${img}" alt="Project Image">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                
                modalContent.innerHTML = content;
                modal.style.display = 'block';
                
                // Prevent scrolling on body when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add animation classes to projects for staggered appearance
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, 100 * index);
    });
}); 