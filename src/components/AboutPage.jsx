import React from 'react';

const AboutPage = () => {
  return (
    <div className="page">
      <section className="page-section">
        <div className="container">
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
              About AgroDecide
            </h1>
            
            <div style={{ lineHeight: '1.6', color: '#6b7280' }}>
              <p style={{ marginBottom: '20px', fontSize: '16px' }}>
                AgroDecide is an intelligent crop recommendation system designed to help farmers and agricultural 
                stakeholders make informed decisions about crop selection. Our system utilizes advanced Multi-Attribute 
                Decision Making (MADM) methods to analyze various agricultural factors and provide optimal crop recommendations.
              </p>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginTop: '32px', 
                marginBottom: '16px' 
              }}>
                Our Methodology
              </h2>
              <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                We employ two proven MADM methods for comprehensive analysis:
              </p>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px', fontSize: '16px' }}>
                <li style={{ marginBottom: '8px' }}>
                  <strong>SAW (Simple Additive Weighting):</strong> A straightforward method that calculates weighted scores for each criterion
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>TOPSIS (Technique for Order Preference by Similarity to Ideal Solution):</strong> An advanced method that considers both positive and negative ideal solutions
                </li>
              </ul>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginTop: '32px', 
                marginBottom: '16px' 
              }}>
                Key Features
              </h2>
              <ul style={{ paddingLeft: '24px', marginBottom: '24px', fontSize: '16px' }}>
                <li style={{ marginBottom: '8px' }}>Analysis of 40+ regional crop varieties</li>
                <li style={{ marginBottom: '8px' }}>Consideration of 6 key agricultural factors</li>
                <li style={{ marginBottom: '8px' }}>Real-time recommendation processing</li>
                <li style={{ marginBottom: '8px' }}>User-friendly interface for easy data input</li>
                <li style={{ marginBottom: '8px' }}>Transparent scoring methodology</li>
              </ul>
              
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                color: '#111827', 
                marginTop: '32px', 
                marginBottom: '16px' 
              }}>
                Agricultural Impact
              </h2>
              <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                Our system helps farmers optimize crop selection based on local conditions, market demands, and 
                economic factors. By providing data-driven recommendations, AgroDecide contributes to sustainable 
                agriculture practices and improved farm productivity.
              </p>
              
              <p style={{ fontSize: '16px' }}>
                The platform is designed to be accessible to farmers of all technical backgrounds, with a simple 
                interface that transforms complex agricultural data into actionable insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;