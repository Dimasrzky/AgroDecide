import React from 'react';
import { BarChart3, Leaf, Target, Clock, Droplets, FlaskConical, DollarSign, TrendingUp, Banknote, Star } from 'lucide-react';

const RecommendPage = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  loading, 
  recommendations,
  dataLoading 
}) => {
  const stats = [
    { 
      icon: <BarChart3 size={24} />, 
      title: 'Accuracy Rate', 
      value: '95%', 
      desc: 'Based on MADM methods and similarity matching.',
      bgColor: '#dbeafe',
      textColor: '#2563eb'
    },
    { 
      icon: <Leaf size={24} />, 
      title: 'Dataset Records', 
      value: '40', 
      desc: 'Real crop varieties from agricultural data.',
      bgColor: '#dcfce7',
      textColor: '#16a34a'
    },
    { 
      icon: <Target size={24} />, 
      title: 'Similarity Matching', 
      value: 'AI', 
      desc: 'Intelligent matching with user conditions',
      bgColor: '#f3f4f6',
      textColor: '#6b7280'
    },
    { 
      icon: <Clock size={24} />, 
      title: 'Processing Time', 
      value: '<2s', 
      desc: 'Fast recommendation with detailed analysis.',
      bgColor: '#fef3c7',
      textColor: '#d97706'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Input Agricultural Conditions',
      description: 'Enter your region\'s specific data including climate, soil, and economic factors.'
    },
    {
      step: '02',
      title: 'Similarity Analysis',
      description: 'AI matches your conditions with real agricultural dataset using advanced algorithms.'
    },
    {
      step: '03',
      title: 'MADM Processing',
      description: 'SAW & TOPSIS methods analyze and rank suitable crops based on multiple criteria.'
    },
    {
      step: '04',
      title: 'Get Smart Recommendations',
      description: 'Receive ranked crop suggestions with detailed scores and agricultural insights.'
    }
  ];

  const formFields = [
    { name: 'rainfall', label: 'Rainfall (mm/month)', type: 'number', placeholder: 'e.g., 150-250', min: 100, max: 300 },
    { name: 'marketDemand', label: 'Market Demand Level (1-10)', type: 'number', min: 1, max: 10, placeholder: 'e.g., 7' },
    { name: 'soilPH', label: 'Soil pH Level (5.5-7.0)', type: 'number', min: 5.5, max: 7.0, step: 0.1, placeholder: 'e.g., 6.2' },
    { name: 'sellingPrice', label: 'Target Selling Price (Rp/kg)', type: 'number', placeholder: 'e.g., 15000', min: 5000, max: 30000 },
    { name: 'productionCost', label: 'Production Budget (Rp/hectare)', type: 'number', placeholder: 'e.g., 1500000', min: 1000000, max: 2000000 },
    { name: 'harvestDuration', label: 'Harvest Duration (days)', type: 'number', placeholder: 'e.g., 120', min: 60, max: 180 }
  ];

  const criteria = [
    { 
      icon: <Droplets size={20} color="#3b82f6" />, 
      title: 'Rainfall Pattern', 
      desc: 'Monthly rainfall requirements for optimal crop growth and yield' 
    },
    { 
      icon: <FlaskConical size={20} color="#f97316" />, 
      title: 'Soil pH Level', 
      desc: 'Soil acidity level - most crops thrive in pH 6.0-7.0 range' 
    },
    { 
      icon: <DollarSign size={20} color="#ef4444" />, 
      title: 'Production Cost', 
      desc: 'Total investment needed per hectare including seeds, fertilizers, labor' 
    },
    { 
      icon: <TrendingUp size={20} color="#16a34a" />, 
      title: 'Market Demand', 
      desc: 'Current market demand and consumption trends for the crop' 
    },
    { 
      icon: <Banknote size={20} color="#8b5cf6" />, 
      title: 'Market Price', 
      desc: 'Current and projected selling price per kilogram in local markets' 
    },
    { 
      icon: <Clock size={20} color="#eab308" />, 
      title: 'Growth Cycle', 
      desc: 'Time from planting to harvest - affects cash flow and planning' 
    }
  ];

  const getSimilarityBadge = (score) => {
    if (score >= 0.8) return { text: 'Excellent Match', color: 'text-green-700 bg-green-100' };
    if (score >= 0.6) return { text: 'Good Match', color: 'text-blue-700 bg-blue-100' };
    if (score >= 0.4) return { text: 'Fair Match', color: 'text-yellow-700 bg-yellow-100' };
    return { text: 'Basic Match', color: 'text-gray-700 bg-gray-100' };
  };

  // Show loading state if data is still loading
  if (dataLoading) {
    return (
      <div className="page">
        <section className="page-section">
          <div className="container">
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #f3f4f6',
                borderTop: '4px solid #16a34a',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px auto'
              }}></div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                Loading Agricultural Database...
              </h2>
              <p style={{ color: '#6b7280', fontSize: '16px' }}>
                Preparing crop recommendation system with real agricultural data
              </p>
            </div>
          </div>
        </section>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Header Section */}
      <section className="page-section gray">
        <div className="container">
          <h1 className="page-title">Smart Crop Recommendation System</h1>
          <p className="page-subtitle">
            Get personalized crop recommendations based on your specific agricultural conditions using AI-powered similarity matching and multi-criteria decision analysis.
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-4" style={{ marginBottom: '40px' }}>
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div 
                  className="stats-icon" 
                  style={{ backgroundColor: stat.bgColor }}
                >
                  {React.cloneElement(stat.icon, { color: stat.textColor })}
                </div>
                <h3 className="stats-title">{stat.title}</h3>
                <div 
                  className="stats-value" 
                  style={{ color: stat.textColor }}
                >
                  {stat.value}
                </div>
                <p className="stats-desc">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div>
            <h2 className="section-subtitle">How Our AI System Works</h2>
            <div className="steps">
              {steps.map((item, index) => (
                <div key={index}>
                  <div className="step-number">
                    {item.step}
                  </div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="page-section">
        <div className="container">
          <div className="grid grid-2">
            {/* Form */}
            <div className="card">
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                Enter Your Agricultural Conditions
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' }}>
                Provide accurate information about your farming conditions to get the most relevant crop recommendations tailored to your situation.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-form">
                  {formFields.map((field) => (
                    <div key={field.name} className="form-group">
                      <label className="form-label">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        className="form-input"
                        required
                      />
                    </div>
                  ))}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-full"
                  style={{ marginTop: '20px' }}
                >
                  {loading ? 'Analyzing Conditions...' : 'Get Smart Recommendations'}
                </button>
              </form>
            </div>

            {/* Criteria Explanation */}
            <div className="card" style={{ height: 'fit-content' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Analysis Criteria
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
                Our AI system evaluates these key factors to match your conditions with the most suitable crops from our agricultural database.
              </p>
              
              <div>
                {criteria.map((item, index) => (
                  <div key={index} className="criteria-item">
                    <div className="criteria-icon">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="criteria-title">{item.title}</h4>
                      <p className="criteria-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {recommendations.length > 0 && (
            <div className="card" style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                🌾 Personalized Crop Recommendations
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                Based on your agricultural conditions, here are the most suitable crops ranked by compatibility and MADM analysis.
              </p>
              
              <div className="grid grid-results">
                {recommendations.map((crop, index) => {
                  const similarityBadge = getSimilarityBadge(crop.similarityScore || 0);
                  return (
                    <div key={`${crop.Komoditas}-${index}`} className="result-card">
                      <div className="result-header">
                        <div>
                          <h3 className="result-title">{crop.Komoditas}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <span className="result-rank">#{index + 1}</span>
                            {crop.similarityScore && (
                              <span className={`similarity-badge ${similarityBadge.color}`}>
                                <Star size={12} />
                                {similarityBadge.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="result-scores">
                        {crop.similarityScore && (
                          <div className="result-score">
                            <span className="result-score-label">Condition Match:</span>
                            <span className="result-score-value" style={{ color: '#16a34a', fontWeight: '600' }}>
                              {(crop.similarityScore * 100).toFixed(1)}%
                            </span>
                          </div>
                        )}
                        <div className="result-score">
                          <span className="result-score-label">SAW Score:</span>
                          <span className="result-score-value">
                            {(crop.sawScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="result-score">
                          <span className="result-score-label">TOPSIS Score:</span>
                          <span className="result-score-value">
                            {(crop.topsisScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="result-score">
                          <span className="result-score-label">Final Score:</span>
                          <span className="result-score-value combined">
                            {(crop.combinedScore * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="result-details">
                        <div className="result-detail">
                          <span>Production Cost:</span>
                          <span>Rp {crop['Biaya Produksi']?.toLocaleString() || 'N/A'}</span>
                        </div>
                        <div className="result-detail">
                          <span>Market Price:</span>
                          <span>Rp {crop['Harga Jual']?.toLocaleString() || 'N/A'}/kg</span>
                        </div>
                        <div className="result-detail">
                          <span>Growth Period:</span>
                          <span>{crop['Waktu Panen'] || 'N/A'} days</span>
                        </div>
                        <div className="result-detail">
                          <span>Market Demand:</span>
                          <span>{crop['Tingkat Kebutuhan'] || 'N/A'}/10</span>
                        </div>
                        <div className="result-detail">
                          <span>Rainfall Need:</span>
                          <span>{crop['Curah Hujan'] || 'N/A'} mm/month</span>
                        </div>
                        <div className="result-detail">
                          <span>Optimal pH:</span>
                          <span>{crop['pH Tanah'] || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="analysis-summary">
                <h3 className="analysis-title">📊 Analysis Summary</h3>
                <p className="analysis-text">
                  Our AI system first matches your conditions with our agricultural database using similarity analysis. 
                  Then, SAW (Simple Additive Weighting) and TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) 
                  methods evaluate each matched crop across multiple criteria. The final recommendations combine condition matching 
                  with multi-criteria decision analysis for optimal crop selection.
                </p>
                
                {recommendations.length > 0 && recommendations[0].similarityScore && (
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #dcfce7' }}>
                    <p style={{ fontSize: '14px', color: '#166534', margin: '0' }}>
                      <strong>Best Match:</strong> {recommendations[0].Komoditas} with {(recommendations[0].similarityScore * 100).toFixed(1)}% 
                      condition compatibility and {(recommendations[0].combinedScore * 100).toFixed(1)}% overall suitability score.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecommendPage;