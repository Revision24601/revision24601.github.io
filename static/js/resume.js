document.addEventListener('DOMContentLoaded', function() {
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animate timeline items on scroll
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            // Generate a random bright color
            const hue = Math.floor(Math.random() * 360);
            tag.style.background = `hsla(${hue}, 80%, 50%, 0.9)`;
        });
        
        tag.addEventListener('mouseout', () => {
            // Reset to original color
            tag.style.background = '';
        });
    });
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print Resume';
    printButton.className = 'btn print-btn';
    printButton.style.marginLeft = '10px';
    
    const resumeActions = document.querySelector('.resume-actions');
    resumeActions.appendChild(printButton);
    
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    // Add scroll to section functionality
    const sections = document.querySelectorAll('.resume-section');
    const sectionNav = document.createElement('div');
    sectionNav.className = 'section-nav';
    sectionNav.innerHTML = '<h3>Quick Navigation</h3>';
    
    const sectionList = document.createElement('ul');
    
    sections.forEach((section, index) => {
        const sectionTitle = section.querySelector('h2').textContent.trim();
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = sectionTitle;
        link.href = '#';
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        listItem.appendChild(link);
        sectionList.appendChild(listItem);
    });
    
    sectionNav.appendChild(sectionList);
    
    // Add the section nav to the page
    const resumeContainer = document.querySelector('.resume-container');
    resumeContainer.insertBefore(sectionNav, resumeContainer.firstChild);
    
    // Style the section nav
    const style = document.createElement('style');
    style.textContent = `
        .section-nav {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .section-nav h3 {
            color: #ff5733;
            margin-top: 0;
            margin-bottom: 10px;
        }
        
        .section-nav ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .section-nav li a {
            display: inline-block;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .section-nav li a:hover {
            background: #ff5733;
            transform: translateY(-3px);
        }
        
        @media print {
            .section-nav, #chat-icon, #chat-container, nav, .print-btn {
                display: none !important;
            }
            
            body {
                background: white !important;
                color: black !important;
            }
            
            .resume-section, .timeline-content {
                background: white !important;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            
            .resume-section h2, .timeline-content h3, .certification-item h3 {
                color: #333 !important;
            }
            
            .company {
                color: #666 !important;
            }
            
            .skill-tag {
                background: #eee !important;
                color: #333 !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}); 