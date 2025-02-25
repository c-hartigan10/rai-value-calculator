// RelationalAI Business Value Calculator - JavaScript

// Industry multipliers for calculations
const industryMultipliers = {
    'financial': 1.2,
    'healthcare': 1.15,
    'retail': 0.95,
    'manufacturing': 1.05,
    'technology': 1.1,
    'other': 1.0
};

// Company size multipliers
const sizeMultipliers = {
    'small': 0.8,
    'medium': 1.0,
    'large': 1.2,
    'enterprise': 1.4
};

// Use case impact factors
const useCaseImpact = {
    'customerInsight': { revenue: 1.2, efficiency: 0.9, risk: 0.8 },
    'fraudDetection': { revenue: 0.7, efficiency: 0.9, risk: 1.5 },
    'supplyChain': { revenue: 0.9, efficiency: 1.3, risk: 0.9 },
    'riskAnalysis': { revenue: 0.6, efficiency: 0.8, risk: 1.6 },
    'productDevelopment': { revenue: 1.3, efficiency: 1.1, risk: 0.7 },
    'other': { revenue: 1.0, efficiency: 1.0, risk: 1.0 }
};

// Store calculation results
let calculationResults = {};

// DOM Elements
const inputForm = document.getElementById('inputForm');
const resultsContainer = document.getElementById('resultsContainer');
const calculateBtn = document.getElementById('calculateBtn');
const backToFormBtn = document.getElementById('backToFormBtn');
const shareResultsBtn = document.getElementById('shareResultsBtn');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Step navigation elements
const step1NextBtn = document.getElementById('step1NextBtn');
const step2NextBtn = document.getElementById('step2NextBtn');
const step2BackBtn = document.getElementById('step2BackBtn');
const step3BackBtn = document.getElementById('step3BackBtn');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step1Content = document.getElementById('step1Content');
const step2Content = document.getElementById('step2Content');
const step3Content = document.getElementById('step3Content');

// Helper function to format currency
function formatCurrency(value) {
    return '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// Helper function to format percentage
function formatPercent(value) {
    return value.toFixed(1) + '%';
}

// Form validation
function validateStep1() {
    const companyName = document.getElementById('companyName').value;
    const industry = document.getElementById('industry').value;
    const companySize = document.getElementById('companySize').value;
    const annualRevenue = document.getElementById('annualRevenue').value;
    
    if (!companyName || !industry || !companySize || !annualRevenue) {
        alert('Please complete all fields to continue.');
        return false;
    }
    return true;
}

function validateStep2() {
    const currentDataSolution = document.getElementById('currentDataSolution').value;
    const dataVolume = document.getElementById('dataVolume').value;
    const dataTeamSize = document.getElementById('dataTeamSize').value;
    const dataQualityIssues = document.getElementById('dataQualityIssues').value;
    
    if (!currentDataSolution || !dataVolume || !dataTeamSize || !dataQualityIssues) {
        alert('Please complete all fields to continue.');
        return false;
    }
    return true;
}

function validateStep3() {
    const useCase = document.getElementById('useCase').value;
    const devTime = document.getElementById('devTime').value;
    
    if (!useCase || !devTime) {
        alert('Please complete all fields to continue.');
        return false;
    }
    return true;
}

// Step navigation
function goToStep(stepNumber) {
    // Update step indicators
    const steps = [step1, step2, step3];
    const stepContents = [step1Content, step2Content, step3Content];
    
    steps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
            step.classList.remove('active');
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Show correct step content
    stepContents.forEach((content, index) => {
        if (index + 1 === stepNumber) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

// Calculate business value
function calculateBusinessValue() {
    if (!validateStep3()) {
        return;
    }
    
    // Get input values
    const companyName = document.getElementById('companyName').value || 'Your Company';
    const industry = document.getElementById('industry').value || 'other';
    const companySize = document.getElementById('companySize').value || 'medium';
    const currentSolution = document.getElementById('currentDataSolution').value;
    const dataVolume = Number(document.getElementById('dataVolume').value) || 10;
    const dataTeamSize = Number(document.getElementById('dataTeamSize').value) || 5;
    const useCase = document.getElementById('useCase').value || 'other';
    const devTime = Number(document.getElementById('devTime').value) || 12;
    const annualRevenue = Number(document.getElementById('annualRevenue').value) || 100;
    const dataQualityIssues = Number(document.getElementById('dataQualityIssues').value) || 20;
    
    // Base calculations
    const industryMultiplier = industryMultipliers[industry];
    const sizeMultiplier = sizeMultipliers[companySize];
    const useCaseFactor = useCaseImpact[useCase];
    
    // Calculate operational efficiency savings
    const avgSalary = 120000; // Assumed average salary for data professionals
    const efficiencyGain = 0.25 * useCaseFactor.efficiency * industryMultiplier;
    const costSavings = dataTeamSize * avgSalary * efficiencyGain;
    
    // Calculate development time reduction
    const devTimeReduction = Math.min(75, 40 * useCaseFactor.efficiency * industryMultiplier);
    
    // Calculate revenue impact
    const revenueIncrease = annualRevenue * 0.005 * useCaseFactor.revenue * sizeMultiplier * industryMultiplier;
    const timeToValue = Math.max(60, 80 - (devTime * 5));
    
    // Calculate risk reduction
    const dataQualityImprovement = Math.min(75, dataQualityIssues * 0.6 * useCaseFactor.risk);
    const riskAvoidance = annualRevenue * 0.002 * useCaseFactor.risk * industryMultiplier;
    
    // Calculate strategic value
    const innovationFactor = dataVolume * 0.02 * industryMultiplier;
    const competitiveAdvantage = Math.min(36, 12 + (devTimeReduction / 2));
    
    // Calculate ROI
    const estimatedAnnualCost = Math.min(annualRevenue * 0.005, 500000) * sizeMultiplier;
    const firstYearBenefit = costSavings + revenueIncrease + riskAvoidance;
    const firstYearROI = (firstYearBenefit / estimatedAnnualCost) * 100;
    const threeYearROI = ((firstYearBenefit * 3.6) / (estimatedAnnualCost * 3)) * 100;
    const paybackPeriod = estimatedAnnualCost / (firstYearBenefit / 12);
    
    // Calculate implementation details
    let implementationTime, resourceRequirements, integrationComplexity;
    
    if (currentSolution === 'snowflake') {
        implementationTime = '4-6 weeks';
        resourceRequirements = 'Minimal (part-time data engineer)';
        integrationComplexity = 'Low (native Snowflake integration)';
    } else if (currentSolution === 'aws' || currentSolution === 'azure' || currentSolution === 'gcp') {
        implementationTime = '6-8 weeks';
        resourceRequirements = 'Moderate (1 data engineer)';
        integrationComplexity = 'Medium (standard connectors available)';
    } else {
        implementationTime = '8-12 weeks';
        resourceRequirements = 'Significant (data engineer + architect)';
        integrationComplexity = 'High (custom integration required)';
    }
    
    // Calculate value over time
    const year1Value = firstYearBenefit;
    const year2Value = firstYearBenefit * 1.4;
    const year3Value = firstYearBenefit * 2.2;
    const totalValue = year1Value + year2Value + year3Value;
    
    // Calculate chart values for visualization
    const efficiencyValue = Math.round((costSavings / totalValue) * 100);
    const revenueValue = Math.round(((revenueIncrease + (year1Value * 0.1)) / totalValue) * 100);
    const riskValue = Math.round((riskAvoidance / totalValue) * 100);
    const strategicValue = 100 - efficiencyValue - revenueValue - riskValue;
    
    // Store results
    calculationResults = {
        companyName,
        industry,
        companySize,
        currentSolution,
        dataVolume,
        dataTeamSize,
        useCase,
        devTime,
        annualRevenue,
        dataQualityIssues,
        costSavings,
        devTimeReduction,
        revenueIncrease,
        timeToValue,
        dataQualityImprovement,
        riskAvoidance,
        innovationFactor,
        competitiveAdvantage,
        firstYearROI,
        threeYearROI,
        paybackPeriod,
        implementationTime,
        resourceRequirements,
        integrationComplexity,
        year1Value,
        year2Value,
        year3Value,
        totalValue,
        efficiencyValue,
        revenueValue,
        riskValue,
        strategicValue
    };
    
    // Update the UI with calculated values
    document.getElementById('companyNameDisplay').textContent = companyName;
    document.getElementById('totalValueDisplay').textContent = formatCurrency(totalValue);
    document.getElementById('costSavingsDisplay').textContent = formatCurrency(costSavings) + '/year';
    document.getElementById('devTimeReductionDisplay').textContent = formatPercent(devTimeReduction) + ' faster';
    document.getElementById('revenueIncreaseDisplay').textContent = formatCurrency(revenueIncrease) + '/year';
    document.getElementById('timeToValueDisplay').textContent = formatPercent(timeToValue) + ' faster';
    document.getElementById('dataQualityDisplay').textContent = formatPercent(dataQualityImprovement) + ' improvement';
    document.getElementById('riskAvoidanceDisplay').textContent = formatCurrency(riskAvoidance) + '/year';
    document.getElementById('innovationDisplay').textContent = Math.round(innovationFactor) + 'x faster model deployment';
    document.getElementById('competitiveDisplay').textContent = Math.round(competitiveAdvantage) + ' month lead over competitors';
    
    // Update ROI information
    document.getElementById('firstYearROIDisplay').textContent = formatPercent(firstYearROI);
    document.getElementById('threeYearROIDisplay').textContent = formatPercent(threeYearROI);
    document.getElementById('paybackPeriodDisplay').textContent = paybackPeriod.toFixed(1) + ' months';
    
    // Update implementation details
    document.getElementById('implementationTimeDisplay').textContent = implementationTime;
    document.getElementById('resourceRequirementsDisplay').textContent = resourceRequirements;
    document.getElementById('integrationComplexityDisplay').textContent = integrationComplexity;
    
    // Update value over time
    document.getElementById('year1ValueDisplay').textContent = formatCurrency(year1Value);
    document.getElementById('year2ValueDisplay').textContent = formatCurrency(year2Value);
    document.getElementById('year3ValueDisplay').textContent = formatCurrency(year3Value);
    
    // Create summary text based on inputs
    let summaryText = `Based on our analysis, ${companyName} could realize significant value by implementing RelationalAI`;
    
    if (currentSolution === 'snowflake') {
        summaryText += ' alongside your existing Snowflake investment';
    }
    
    let useCaseText = 'your selected use case';
    if (useCase && useCase !== 'other') {
        const useCaseSelect = document.getElementById('useCase');
        const selectedOption = useCaseSelect.options[useCaseSelect.selectedIndex];
        useCaseText = selectedOption.text;
    }
    
    summaryText += `. With a focus on ${useCaseText}, you could potentially see a ${formatPercent(firstYearROI)} ROI in the first year, with benefits growing over time.`;
    
    document.getElementById('summaryText').textContent = summaryText;
    
    // Update the chart visualization
    setTimeout(() => {
        document.getElementById('efficiencyBar').style.height = (efficiencyValue * 2) + 'px';
        document.getElementById('revenueBar').style.height = (revenueValue * 2) + 'px';
        document.getElementById('riskBar').style.height = (riskValue * 2) + 'px';
        document.getElementById('strategicBar').style.height = (strategicValue * 2) + 'px';
        
        document.getElementById('efficiencyValue').textContent = formatPercent(efficiencyValue);
        document.getElementById('revenueValue').textContent = formatPercent(revenueValue);
        document.getElementById('riskValue').textContent = formatPercent(riskValue);
        document.getElementById('strategicValue').textContent = formatPercent(strategicValue);
    }, 100);
    
    // Show results, hide form
    inputForm.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    // Reset to first tab
    activateTab('summary');
    
    // Scroll to top to view results
    window.scrollTo(0, 0);
}

// Tab switching
function activateTab(tabId) {
    // Update tab classes
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update content visibility
    tabContents.forEach(content => {
        if (content.id === tabId + 'Tab') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Share results function (basic implementation)
function shareResults() {
    alert('This feature would allow you to share results via email or generate a PDF for download.\n\nIn a full implementation, this would either:\n1. Generate a shareable link\n2. Send an email with results\n3. Export to PDF\n4. Export to PowerPoint');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Step navigation
    step1NextBtn.addEventListener('click', function() {
        if (validateStep1()) {
            goToStep(2);
        }
    });
    
    step2NextBtn.addEventListener('click', function() {
        if (validateStep2()) {
            goToStep(3);
        }
    });
    
    step2BackBtn.addEventListener('click', function() {
        goToStep(1);
    });
    
    step3BackBtn.addEventListener('click', function() {
        goToStep(2);
    });
    
    // Main functionality
    calculateBtn.addEventListener('click', calculateBusinessValue);
    
    backToFormBtn.addEventListener('click', function() {
        resultsContainer.style.display = 'none';
        inputForm.style.display = 'block';
        goToStep(1);
    });
    
    shareResultsBtn.addEventListener('click', shareResults);
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
});
Last edited 6 minutes ago


