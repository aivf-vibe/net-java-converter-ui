

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission and conversion logic
const githubUrlInput = document.getElementById('github-url');
const convertBtn = document.getElementById('convert-btn');
const conversionProgress = document.getElementById('conversion-progress');
const conversionResult = document.getElementById('conversion-result');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const filesCount = document.getElementById('files-count');
const linesCount = document.getElementById('lines-count');
const newRepoLink = document.getElementById('new-repo-link');

// Mock conversion function (replace with actual API call)
async function convertDotNetToJava(githubUrl) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response data
    return {
        success: true,
        filesConverted: Math.floor(Math.random() * 50) + 10,
        linesOfCode: Math.floor(Math.random() * 3000) + 1000,
        newRepository: `https://github.com/converted/${githubUrl.split('/').pop()}-java`,
        conversionTime: Math.floor(Math.random() * 5) + 2
    };
}

// Progress simulation
function simulateProgress() {
    const steps = [
        { percent: 10, text: 'Analyzing repository structure...' },
        { percent: 25, text: 'Identifying .NET dependencies...' },
        { percent: 40, text: 'Converting C# to Java...' },
        { percent: 60, text: 'Transforming ASP.NET to Spring Boot...' },
        { percent: 80, text: 'Generating Java tests...' },
        { percent: 95, text: 'Creating new GitHub repository...' },
        { percent: 100, text: 'Conversion complete!' }
    ];

    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = step.percent + '%';
            progressText.textContent = step.text;
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

// Handle form submission
convertBtn.addEventListener('click', async function() {
    const githubUrl = githubUrlInput.value.trim();
    
    if (!githubUrl) {
        alert('Please enter a GitHub repository URL');
        return;
    }
    
    if (!githubUrl.includes('github.com')) {
        alert('Please enter a valid GitHub repository URL');
        return;
    }
    
    // Disable button and show loading
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<div class="loading"></div> Converting...';
    
    // Show progress
    conversionProgress.style.display = 'block';
    conversionResult.style.display = 'none';
    
    // Start progress simulation
    simulateProgress();
    
    try {
        // Call conversion API (mock for now)
        const result = await convertDotNetToJava(githubUrl);
        
        // Hide progress and show result
        setTimeout(() => {
            conversionProgress.style.display = 'none';
            conversionResult.style.display = 'block';
            
            // Update result details
            filesCount.textContent = result.filesConverted;
            linesCount.textContent = result.linesOfCode;
            newRepoLink.href = result.newRepository;
            
            // Reset button
            convertBtn.disabled = false;
            convertBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Convert to Java';
            
            // Scroll to result
            conversionResult.scrollIntoView({ behavior: 'smooth' });
        }, 12000);
        
    } catch (error) {
        console.error('Conversion failed:', error);
        alert('Conversion failed. Please try again.');
        
        // Reset UI
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Convert to Java';
        conversionProgress.style.display = 'none';
    }
});

// Handle Enter key in input
githubUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertBtn.click();
    }
});

// Add input validation styling
githubUrlInput.addEventListener('input', function() {
    const url = this.value.trim();
    if (url && !url.includes('github.com')) {
        this.style.borderColor = '#ef4444';
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .step-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

