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
            <button className="btn btn-secondary">
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
    </div>
  );
};

export default HomePage;