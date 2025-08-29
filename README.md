# Academic Topic Evolution Analysis

An interactive visualization analyzing 189 academic project topics across 12 years (2013-2024), revealing trends in machine learning, finance, climate science, and other research areas.

## 🎯 Overview

This project analyzes academic research topics from a graduate-level course, tracking how different fields have evolved over time. The visualization reveals key trends including:

- The rise of Machine Learning & AI (48 total topics)
- Steady growth in Finance & Economics (31 total topics)  
- Census 2020's impact on Social & Urban Studies (2019 spike)
- Growing urgency in Climate & Weather research (2023 peak)

## 📊 Key Findings

### Machine Learning & AI Dominance
- **48 topics total** (25% of all research)
- Clear growth trajectory with emergence of LLMs in 2024
- Peak activity in 2018 and sustained high levels through 2024

### Finance & Economics Evolution
- **31 topics total** (16% of all research)
- Notable cryptocurrency emergence in 2017
- Consistent focus on algorithmic trading and portfolio optimization

### Research Response to World Events
- **2019 Census Spike**: 7 topics (30% of year) focused on Census 2020
- **2020 COVID Impact**: Health research surge with pandemic modeling
- **2023 Climate Peak**: 5 topics addressing climate migration and adaptation

## 🔬 Methodology

### Data Source
189 academic project topics from a graduate course spanning 2013-2024, representing student-selected research areas in applied mathematics and computational science.

### Classification System

**Algorithm**: Maximum-overlap keyword matching
- Each topic is evaluated against comprehensive keyword sets for all categories
- Keywords are weighted by specificity (multi-word phrases score higher)
- Topics assigned to category with highest cumulative keyword score
- No "other" category used; 100% classification achieved through iterative refinement

**Keyword Development Process**:
1. Initial keyword sets derived from domain expertise
2. Iterative expansion based on unclassified topics
3. Validation through manual review of edge cases
4. Temporal keyword updates for emerging terms (e.g., "LLM" for 2024)

**Category Definitions**:

1. **Machine Learning & AI**: Neural networks, deep learning, reinforcement learning, computer vision, NLP, transformers, LLMs, recommendation systems, clustering, classification
2. **Finance & Economics**: Portfolio optimization, options pricing, trading algorithms, market analysis, cryptocurrency, blockchain, economic modeling, behavioral finance
3. **Mathematics & Theory**: PDEs, differential equations, numerical methods, probability theory, Markov processes, game theory, optimization theory, spectral methods, mathematical modeling
4. **Social & Urban Studies**: Census analysis, demographic modeling, urban planning, transportation, social network analysis, policy modeling, migration studies
5. **Sports & Gaming**: Sports analytics, game theory applications, ranking systems, strategy optimization, esports, recreational mathematics
6. **Climate & Weather**: Climate modeling, weather prediction, environmental systems, carbon modeling, sustainability, climate migration, extreme weather
7. **Health & Medicine**: Medical diagnosis, epidemiological modeling, drug development, biomedical applications, public health, pandemic modeling
8. **Physics & Quantum**: Quantum computing, physical systems modeling, statistical mechanics, fluid dynamics, quantum algorithms, particle physics
9. **Technology & Computer Science**: Algorithms, data structures, cryptography, software systems, database design, network analysis, cybersecurity
10. **Creative Applications**: Music generation, artistic applications, entertainment technology, creative AI, multimedia systems

**Validation Metrics**:
- Inter-rater reliability through expert review of sample classifications
- Temporal consistency checks across similar topics in different years
- Domain expert validation of category assignments
- Edge case documentation for ambiguous topics

**Notable Classification Decisions**:
- "Deep nets and PDE" → Machine Learning/AI (ML keywords dominated despite PDE content)
- "Using finite elements to model ice flow" → Climate/Weather (application domain priority)
- "Image Processing using PDE based models" → Machine Learning/AI (modern image processing context)

### Limitations
- Single-category assignment may oversimplify interdisciplinary topics
- Keyword-based approach sensitive to terminology choices
- Temporal keyword evolution may create classification inconsistencies
- Small sample size in individual years limits statistical significance

## 🛠 Technical Implementation

### Architecture
- **Frontend**: Vanilla JavaScript with Plotly.js for visualization
- **Styling**: Modern CSS with responsive design and accessibility features
- **Data**: Clean JSON structure with comprehensive metadata

### Features
- Interactive time-series visualization with hover details
- Category-based legend controls for data filtering
- Responsive design optimized for desktop and mobile devices
- Accessible annotations highlighting key research trends
- Error handling and progressive enhancement

### File Structure
```
├── index.html      # Main application structure
├── styles.css      # Complete styling and responsive design
├── app.js          # Chart logic and interactivity  
├── data.json       # Clean topic evolution data
└── README.md       # This documentation
```

## 🚀 Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/apma4903/topic-evolution.git
cd topic-evolution

# Start local server (Python 3)
python -m http.server 8000

# Or use Node.js
npx http-server

# Open http://localhost:8000 in your browser
```

### GitHub Pages
The visualization is automatically deployed at:
**https://apma4903.github.io/topic-evolution**

## 📈 Data Insights

The analysis reveals several key trends in academic research:

1. **Technology Adoption Curves**: Clear S-curves in ML/AI adoption and cryptocurrency research
2. **Event-Driven Research**: Immediate response to societal events (Census 2020, COVID-19)
3. **Emerging Priorities**: Climate research acceleration reflecting global urgency
4. **Methodological Evolution**: From simple statistics to advanced neural architectures

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Chris H. Wiggins**
- GitHub: [@apma4903](https://github.com/apma4903)
- Course: https://www.columbia.edu/~chw2/Courses/APMA4903/4903-instructions.pdf

## 🙏 Acknowledgments

Data source: Academic course project topics (2013-2024)
Visualization: Built with Plotly.js and modern web technologies and GenAI code tools

---

*This project demonstrates the evolution of academic interests over time, revealing how research priorities shift in response to technological advances and global events.*
