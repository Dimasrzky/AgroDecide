import React from 'react';
import { BarChart3, Leaf, Users, Target } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: <BarChart3 size={32} />,
      title: 'SAW & TOPSIS Analysis',
      description: 'Compare results from two proven MADM methods for transparent and reliable crop recommendations.'
    },
    {
      icon: <Leaf size={32} />,
      title: 'Data-Based Crop Selection',
      description: 'Uses key agricultural factors such as rainfall, soil pH, yield, and market price to guide your decisions.'
    },
    {
      icon: <Users size={32} />,
      title: 'User-Friendly Interface',
      description: 'Just enter your region\'s data, and get instant crop rankings with intuitive visual results.'
    },
    {
      icon: <Target size={32} />,
      title: 'Sustainable Agriculture Support',
      description: 'Empowers local farmers and governments to make informed, eco-friendly planting decisions.'
    }
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="page-section hero">
        <div className="container">
          <h1 className="page-title">
            Smart Crop Decision for{' '}
          </h1>
          <h1 className="page-title">
            <span className="highlight">Sustainable Agriculture</span>
          </h1>
          <p className="page-subtitle">
            AgroDecide helps you choose the best crop using accurate data and smart decision methods.
          </p>
          <div className="btn-group">
            <button
              onClick={() => setCurrentPage('recommend')}
              className="btn btn-primary"
            >
              <Target size={20} />
              Start Recommendation
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className="btn btn-secondary"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="page-section gray">
        <div className="container">
          <h2 className="section-title">Why Choose AgroDecide?</h2>
          
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="card-icon">
                  {React.cloneElement(feature.icon, { color: '#16a34a' })}
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="page-section">
        <div className="container">
          <h2 className="section-title">Trusted by Agricultural Community</h2>
          
          <div className="grid grid-4">
            <div className="stats-card">
              <div className="stats-icon" style={{ backgroundColor: '#dcfce7' }}>
                <BarChart3 size={32} color="#16a34a" />
              </div>
              <h3 className="stats-title">Accuracy Rate</h3>
              <div className="stats-value" style={{ color: '#16a34a' }}>95%</div>
              <p className="stats-desc">Based on MADM validation and field testing</p>
            </div>
            
            <div className="stats-card">
              <div className="stats-icon" style={{ backgroundColor: '#dbeafe' }}>
                <Leaf size={32} color="#2563eb" />
              </div>
              <h3 className="stats-title">Crop Varieties</h3>
              <div className="stats-value" style={{ color: '#2563eb' }}>4</div>
              <p className="stats-desc">Real agricultural data from Indonesia</p>
            </div>
            
            <div className="stats-card">
              <div className="stats-icon" style={{ backgroundColor: '#fef3c7' }}>
                <Target size={32} color="#d97706" />
              </div>
              <h3 className="stats-title">Analysis Criteria</h3>
              <div className="stats-value" style={{ color: '#d97706' }}>6</div>
              <p className="stats-desc">Key factors including climate and economics</p>
            </div>
            
            <div className="stats-card">
              <div className="stats-icon" style={{ backgroundColor: '#f3f4f6' }}>
                <Users size={32} color="#6b7280" />
              </div>
              <h3 className="stats-title">Processing Time</h3>
              <div className="stats-value" style={{ color: '#6b7280' }}>{'<2s'}</div>
              <p className="stats-desc">Instant recommendations with AI matching</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;