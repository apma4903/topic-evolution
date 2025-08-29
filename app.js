/**
 * Academic Topic Evolution Analysis - Main Application
 * 
 * Interactive visualization showing the evolution of academic topics
 * over 9 years using Plotly.js for chart rendering.
 * 
 * Features:
 * - Responsive chart design
 * - Interactive hover states
 * - Error handling and loading states
 * - Accessible annotations
 * 
 * @author Chris H. Wiggins
 * @version 1.0.0
 */

// ===== APPLICATION STATE =====

/**
 * Global application state
 */
const AppState = {
    data: null,
    isLoading: true,
    error: null,
    chartInstance: null
};

/**
 * Chart configuration constants
 */
const CHART_CONFIG = {
    colors: [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#FF9FF3', '#54A0FF',
        '#5F27CD', '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24',
        '#0AD3C4', '#FFC312', '#C4E538', '#F79F1F', '#A3CB38'
    ],
    layout: {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: [
            'pan2d', 'lasso2d', 'select2d', 'autoScale2d'
        ]
    }
};

// ===== UTILITY FUNCTIONS =====

/**
 * Safely logs errors to console with context
 * @param {string} context - Context where error occurred
 * @param {Error} error - The error object
 */
function logError(context, error) {
    console.error(`[TopicEvolution] Error in ${context}:`, error);
}

/**
 * Creates a loading state in the chart container
 */
function showLoadingState() {
    const chartElement = document.getElementById('evolution-chart');
    if (chartElement) {
        chartElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; color: #718096;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">Loading visualization...</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem;">Preparing 248 topics across 12 years</div>
                </div>
            </div>
        `;
    }
}

/**
 * Creates an error state in the chart container
 * @param {string} message - Error message to display
 */
function showErrorState(message = 'Failed to load data') {
    const chartElement = document.getElementById('evolution-chart');
    if (chartElement) {
        chartElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; color: #e53e3e;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.1rem; font-weight: 600;">Visualization Error</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem; max-width: 300px;">${message}</div>
                </div>
            </div>
        `;
    }
}

// ===== DATA MANAGEMENT =====

/**
 * Loads topic evolution data from JSON file
 * @returns {Promise<Object|null>} The loaded data or null if failed
 */
async function loadTopicData() {
    try {
        showLoadingState();
        
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!data.years || !data.categories || !Array.isArray(data.years)) {
            throw new Error('Invalid data format: missing required fields');
        }
        
        // Validate data consistency
        const expectedLength = data.years.length;
        for (const [category, values] of Object.entries(data.categories)) {
            if (!Array.isArray(values) || values.length !== expectedLength) {
                throw new Error(`Data inconsistency in category: ${category}`);
            }
        }
        
        AppState.data = data;
        AppState.isLoading = false;
        AppState.error = null;
        
        console.log('[TopicEvolution] Data loaded successfully:', {
            years: data.years.length,
            categories: Object.keys(data.categories).length,
            totalDataPoints: data.years.length * Object.keys(data.categories).length
        });
        
        return data;
        
    } catch (error) {
        AppState.isLoading = false;
        AppState.error = error;
        logError('loadTopicData', error);
        showErrorState(error.message);
        return null;
    }
}

// ===== CHART CREATION =====

/**
 * Creates chart traces for each topic category
 * @param {Object} data - The topic evolution data
 * @returns {Array} Array of Plotly trace objects
 */
function createChartTraces(data) {
    const traces = [];
    let colorIndex = 0;
    
    // Sort categories by total count (descending) for consistent legend order
    const categoryTotals = Object.entries(data.categories).map(([name, values]) => ({
        name,
        values,
        total: values.reduce((sum, val) => sum + val, 0)
    })).sort((a, b) => b.total - a.total);
    
    categoryTotals.forEach(({ name, values }) => {
        const color = CHART_CONFIG.colors[colorIndex % CHART_CONFIG.colors.length];
        const symbol = data.markers && data.markers[name] ? data.markers[name] : 'circle';
        
        traces.push({
            x: data.years,
            y: values,
            mode: 'lines+markers',
            name: name,
            type: 'scatter',
            line: {
                width: 3,
                color: color,
                shape: 'linear'
            },
            marker: {
                size: 10,
                color: color,
                symbol: symbol,
                line: {
                    width: 2,
                    color: '#ffffff'
                }
            },
            hovertemplate: 
                '<b>%{fullData.name}</b><br>' +
                'Year: %{x}<br>' +
                'Topics: %{y}<br>' +
                '<extra></extra>',
            connectgaps: false
        });
        
        colorIndex++;
    });
    
    return traces;
}

/**
 * Creates dynamic annotations based on actual data peaks
 * @param {Object} data - The topic evolution data
 * @returns {Array} Array of annotation objects
 */
function createDynamicAnnotations(data) {
    const annotations = [];
    
    // Find the value for each category at specific years
    function getCategoryValue(categoryName, year) {
        if (!data.categories[categoryName]) return 0;
        const yearIndex = data.years.indexOf(year);
        return yearIndex >= 0 ? data.categories[categoryName][yearIndex] : 0;
    }
    
    // Machine Learning & AI peak in 2024
    const mlValue2024 = getCategoryValue('Machine Learning & AI', 2024);
    if (mlValue2024 > 0) {
        annotations.push({
            x: 2024,
            y: mlValue2024,
            text: "LLMs<br>Emerge",
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 2,
            arrowcolor: '#FF6B6B',
            ax: 0,
            ay: -40,
            font: { 
                size: 11, 
                color: '#1a202c',
                family: '-apple-system, BlinkMacSystemFont, sans-serif'
            },
            bgcolor: "rgba(255,255,255,0.9)",
            bordercolor: "#FF6B6B",
            borderwidth: 1,
            borderpad: 4
        });
    }
    
    // Social Sciences peak in 2019 (Census)
    const socialValue2019 = getCategoryValue('Social Sciences & Demographics', 2019);
    if (socialValue2019 > 0) {
        annotations.push({
            x: 2019,
            y: socialValue2019,
            text: "Census<br>Focus",
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 2,
            arrowcolor: '#ed8936',
            ax: 0,
            ay: -40,
            font: { 
                size: 11, 
                color: '#1a202c',
                family: '-apple-system, BlinkMacSystemFont, sans-serif'
            },
            bgcolor: "rgba(255,255,255,0.9)",
            bordercolor: "#ed8936",
            borderwidth: 1,
            borderpad: 4
        });
    }
    
    // COVID impact in 2020 - look for Pandemic category
    const covidValue2020 = getCategoryValue('Pandemic & Public Health', 2020);
    if (covidValue2020 > 0) {
        annotations.push({
            x: 2020,
            y: covidValue2020,
            text: "COVID-19<br>Impact",
            showarrow: true,
            arrowhead: 2,
            arrowsize: 1,
            arrowwidth: 2,
            arrowcolor: '#48bb78',
            ax: 0,
            ay: -40,
            font: { 
                size: 11, 
                color: '#1a202c',
                family: '-apple-system, BlinkMacSystemFont, sans-serif'
            },
            bgcolor: "rgba(255,255,255,0.9)",
            bordercolor: "#48bb78",
            borderwidth: 1,
            borderpad: 4
        });
    }
    
    return annotations;
}

/**
 * Creates the chart layout configuration
 * @param {Object} data - The topic evolution data  
 * @returns {Object} Plotly layout object
 */
function createChartLayout(data) {
    return {
        title: {
            text: 'Academic Topic Evolution (2013-2024)',
            font: { 
                family: '-apple-system, BlinkMacSystemFont, sans-serif',
                size: 20,
                color: '#1a202c'
            },
            x: 0.5,
            xanchor: 'center'
        },
        xaxis: {
            title: {
                text: 'Year',
                font: { size: 14, color: '#4a5568' }
            },
            tickmode: 'array',
            tickvals: data.years,
            ticktext: data.years.map(year => year.toString()),
            gridcolor: '#e2e8f0',
            gridwidth: 1,
            linecolor: '#cbd5e0',
            linewidth: 2,
            tickfont: { color: '#4a5568' }
        },
        yaxis: {
            title: {
                text: 'Number of Topics',
                font: { size: 14, color: '#4a5568' }
            },
            gridcolor: '#e2e8f0',
            gridwidth: 1,
            linecolor: '#cbd5e0',
            linewidth: 2,
            tickfont: { color: '#4a5568' },
            rangemode: 'tozero'
        },
        plot_bgcolor: '#ffffff',
        paper_bgcolor: '#ffffff',
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: '#1a202c',
            bordercolor: '#4a5568',
            font: { color: '#ffffff', size: 12 }
        },
        legend: {
            orientation: 'v',
            yanchor: 'top',
            y: 1,
            xanchor: 'left',
            x: 1.02,
            font: { 
                size: 11,
                color: '#4a5568'
            },
            bgcolor: 'rgba(255,255,255,0.8)',
            bordercolor: '#e2e8f0',
            borderwidth: 1
        },
        margin: { 
            l: 80, 
            r: 140, 
            t: 80, 
            b: 80 
        },
        annotations: createDynamicAnnotations(data)
    };
}

/**
 * Renders the main evolution chart
 * @param {Object} data - The topic evolution data
 */
async function renderChart(data) {
    try {
        const traces = createChartTraces(data);
        const layout = createChartLayout(data);
        
        // Create the chart
        AppState.chartInstance = await Plotly.newPlot(
            'evolution-chart',
            traces,
            layout,
            CHART_CONFIG.layout
        );
        
        console.log('[TopicEvolution] Chart rendered successfully');
        
        // Add resize handler for responsiveness
        window.addEventListener('resize', debounce(() => {
            if (AppState.chartInstance) {
                Plotly.Plots.resize('evolution-chart');
            }
        }, 250));
        
    } catch (error) {
        logError('renderChart', error);
        showErrorState('Failed to render chart visualization');
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== APPLICATION INITIALIZATION =====

/**
 * Initializes the application
 */
async function initializeApp() {
    console.log('[TopicEvolution] Initializing application...');
    
    try {
        // Load and validate data
        const data = await loadTopicData();
        if (!data) {
            throw new Error('Failed to load required data');
        }
        
        // Render the visualization
        await renderChart(data);
        
        console.log('[TopicEvolution] Application initialized successfully');
        
    } catch (error) {
        logError('initializeApp', error);
        showErrorState('Application failed to initialize');
    }
}

// ===== EVENT LISTENERS =====

/**
 * DOM Content Loaded handler
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('[TopicEvolution] DOM loaded, starting initialization...');
    initializeApp();
});

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    logError('Global', event.error);
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    logError('Promise', event.reason);
    event.preventDefault();
});