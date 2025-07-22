import React from 'react';
import { BarChart3, Target, Brain, Database, Calculator, Zap } from 'lucide-react';

const AboutPage = () => {
  const methodologies = [
    {
      icon: <Calculator size={24} />,
      title: 'SAW (Simple Additive Weighting)',
      description: 'A straightforward MADM method that calculates weighted scores for each criterion. Each alternative gets a score based on normalized criteria values multiplied by their respective weights.',
      benefits: ['Easy to understand', 'Transparent calculation', 'Quick processing', 'Reliable results']
    },
    {
      icon: <Target size={24} />,
      title: 'TOPSIS Method',
      description: 'Advanced MADM technique that considers both positive and negative ideal solutions. It ranks alternatives based on their relative closeness to the ideal solution.',
      benefits: ['Considers ideal scenarios', 'Handles conflicting criteria', 'More sophisticated analysis', 'Robust decision making']
    }
  ];

  const features = [
    {
      icon: <Brain size={24} />,
      title: 'AI Similarity Matching',
      description: 'Our intelligent algorithm matches your specific agricultural conditions with the most similar cases in our database, ensuring personalized recommendations.',
      color: '#8b5cf6'
    },
    {
      icon: <Database size={24} />,
      title: 'Real Agricultural Data',
      description: 'Built on 40+ real crop varieties with actual data from Indonesian agricultural conditions, ensuring practical and applicable recommendations.',
      color: '#06b6d4'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Multi-Criteria Analysis',
      description: 'Evaluates 6 key agricultural factors: rainfall, soil pH, production cost, market demand, selling price, and harvest duration.',
      color: '#10b981'
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Processing',
      description: 'Get comprehensive crop recommendations in less than 2 seconds with our optimized algorithms and efficient data processing.',
      color: '#f59e0b'
    }
  ];

  return (
    <div className="page">
      <section className="page-section">
        <div className="container">
          <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
              About AgroDecide
            </h1>
            
            <div style={{ lineHeight: '1.6', color: '#6b7280', textAlign: 'center', marginBottom: '40px' }}>
              <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                AgroDecide is an intelligent crop recommendation system designed to help farmers and agricultural 
                stakeholders make informed decisions about crop selection using advanced Multi-Attribute 
                Decision Making (MADM) methods combined with AI-powered similarity matching.
              </p>
            </div>
            
            {/* Key Features */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Key Features
              </h2>
              
              <div className="grid grid-2" style={{ gap: '30px' }}>
                {features.map((feature, index) => (
                  <div key={index} style={{
                    padding: '24px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    backgroundColor: '#ffffff'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      backgroundColor: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      {React.cloneElement(feature.icon, { color: feature.color })}
                    </div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '8px'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodologies */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Our MADM Methodologies
              </h2>
              <p style={{ 
                textAlign: 'center', 
                color: '#6b7280', 
                marginBottom: '30px', 
                fontSize: '16px' 
              }}>
                We employ two proven Multi-Attribute Decision Making methods for comprehensive and reliable analysis
              </p>
              
              <div className="grid grid-2" style={{ gap: '30px' }}>
                {methodologies.map((method, index) => (
                  <div key={index} className="card" style={{ height: 'fit-content' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      backgroundColor: '#f0fdf4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      {React.cloneElement(method.icon, { color: '#16a34a' })}
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '12px'
                    }}>
                      {method.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      {method.description}
                    </p>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#16a34a' }}>
                        Benefits:
                      </h4>
                      <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {method.benefits.map((benefit, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agricultural Impact */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Agricultural Impact
              </h2>
              
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #dcfce7'
              }}>
                <p style={{ marginBottom: '16px', fontSize: '16px', color: '#166534', lineHeight: '1.6' }}>
                  Our system helps farmers optimize crop selection based on local conditions, market demands, and 
                  economic factors. By providing data-driven recommendations, AgroDecide contributes to:
                </p>
                
                <div className="grid grid-2" style={{ gap: '20px', marginTop: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                      🌱 Sustainable Agriculture
                    </h4>
                    <p style={{ fontSize: '14px', color: '#15803d', marginBottom: '12px' }}>
                      Promoting environmentally friendly farming practices through informed crop selection
                    </p>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                      📈 Improved Productivity
                    </h4>
                    <p style={{ fontSize: '14px', color: '#15803d', marginBottom: '12px' }}>
                      Optimizing yield potential by matching crops to suitable growing conditions
                    </p>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                      💰 Economic Efficiency
                    </h4>
                    <p style={{ fontSize: '14px', color: '#15803d', marginBottom: '12px' }}>
                      Reducing production costs and maximizing profitability through smart decisions
                    </p>
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>
                      🎯 Risk Management
                    </h4>
                    <p style={{ fontSize: '14px', color: '#15803d', marginBottom: '12px' }}>
                      Minimizing agricultural risks through data-driven crop selection strategies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Technology Behind AgroDecide
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6', textAlign: 'center' }}>
                Built with modern web technologies and agricultural expertise, our platform combines React.js 
                frontend with intelligent algorithms to deliver fast, accurate, and user-friendly crop recommendations. 
                The system processes real agricultural data from Indonesian farming conditions to ensure practical 
                and locally relevant suggestions for farmers and agricultural stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;