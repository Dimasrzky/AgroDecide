import React from 'react';
import { BarChart3, Leaf, Target, Clock, Droplets, FlaskConical, DollarSign, TrendingUp, Banknote } from 'lucide-react';

const RecommendPage = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  loading, 
  recommendations 
}) => {
  const stats = [
    { 
      icon: <BarChart3 size={24} />, 
      title: 'Accuracy Rate', 
      value: '95%', 
      desc: 'Based on MADM methods and real-world data.',
      bgColor: '#dbeafe',
      textColor: '#2563eb'
    },
    { 
      icon: <Leaf size={24} />, 
      title: 'Commodities Compared', 
      value: '40', 
      desc: 'Variety of regional food crops analyzed.',
      bgColor: '#dcfce7',
      textColor: '#16a34a'
    },
    { 
      icon: <Target size={24} />, 
      title: 'Key Factors Analyzed', 
      value: '6', 
      desc: 'Includes rainfall, soil pH, production cost, and more',
      bgColor: '#f3f4f6',
      textColor: '#6b7280'
    },
    { 
      icon: <Clock size={24} />, 
      title: 'Recommendation Time', 
      value: '<1s', 
      desc: 'Instant, ranked crop results for your region.',
      bgColor: '#fef3c7',
      textColor: '#d97706'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Enter Region Data',
      description: 'Input rainfall, soil pH, and crop data from your location.'
    },
    {
      step: '02',
      title: 'Dual MADM Analysis',
      description: 'System applies SAW and TOPSIS to your data for reliable evaluation.'
    },
    {
      step: '03',
      title: 'Get Crop Rankings',
      description: 'Instantly see which crops are most suitable and profitable to plant.'
    }
  ];

  const formFields = [
    { name: 'rainfall', label: 'Rainfall (mm/month)', type: 'number', placeholder: 'Enter average rainfall' },
    { name: 'marketDemand', label: 'Market Demand (1-10)', type: 'number', min: 1, max: 10, placeholder: 'Enter consumption level' },
    { name: 'soilPH', label: 'Soil pH (0-14)', type: 'number', min: 0, max: 14, step: 0.1, placeholder: 'Enter soil pH' },
    { name: 'sellingPrice', label: 'Selling Price (Rp/kg)', type: 'number', placeholder: 'Enter market price' },
    { name: 'productionCost', label: 'Production Cost (Rp/hectare)', type: 'number', placeholder: 'Enter production cost per crop' },
    { name: 'harvestDuration', label: 'Harvest Duration (days)', type: 'number', placeholder: 'Enter estimated harvest time' }
  ];

  const criteria = [
    { 
      icon: <Droplets size={20} color="#3b82f6" />, 
      title: 'Rainfall', 
      desc: 'Monthly average rainfall needed for optimal crop growth' 
    },
    { 
      icon: <FlaskConical size={20} color="#f97316" />, 
      title: 'Soil pH', 
      desc: 'Acidity level of soil, ideal range for most crops is 6.5-7.5' 
    },
    { 
      icon: <DollarSign size={20} color="#ef4444" />, 
      title: 'Production Cost', 
      desc: 'Estimated cost per hectare to grow the crop' 
    },
    { 
      icon: <TrendingUp size={20} color="#16a34a" />, 
      title: 'Market Demand', 
      desc: 'The level of local consumption or demand for the crop' 
    },
    { 
      icon: <Banknote size={20} color="#8b5cf6" />, 
      title: 'Selling Price', 
      desc: 'Average market price per kilogram' 
    },
    { 
      icon: <Clock size={20} color="#eab308" />, 
      title: 'Harvest Duration', 
      desc: 'Estimated time from planting to harvest in days' 
    }
  ];

  return (
    <div className="page">
      {/* Header Section */}
      <section className="page-section gray">
        <div className="container">
          <h1 className="page-title">Intelligent Crop Recommendation</h1>
          <p className="page-subtitle">
            Make smart crop choices using data from your region. Our system analyzes key agricultural factors to give you optimal planting suggestions.
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
            <h2 className="section-subtitle">How It Works</h2>
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
                Enter Regional & Crop Information
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' }}>
                Fill in your regional farming information below for an accurate crop recommendation. 
                All data is processed securely and intelligently.
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
                  {loading ? 'Processing...' : 'Get Recommendation'}
                </button>
              </form>
            </div>

            {/* Criteria Explanation */}
            <div className="card" style={{ height: 'fit-content' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                Criteria Explanation
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
                These criteria are used by the system to evaluate and rank the most suitable crops for your region.
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
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                Recommended Crops for Your Region
              </h2>
              
              <div className="grid grid-results">
                {recommendations.map((crop, index) => (
                  <div key={crop.Komoditas} className="result-card">
                    <div className="result-header">
                      <h3 className="result-title">{crop.Komoditas}</h3>
                      <span className="result-rank">#{index + 1}</span>
                    </div>
                    
                    <div className="result-scores">
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
                        <span className="result-score-label">Combined Score:</span>
                        <span className="result-score-value combined">
                          {(crop.combinedScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="result-details">
                      <div className="result-detail">
                        <span>Production Cost:</span>
                        <span>Rp {crop['BiayaProduksi'].toLocaleString()}</span>
                      </div>
                      <div className="result-detail">
                        <span>Selling Price:</span>
                        <span>Rp {crop['HargaJual'].toLocaleString()}/kg</span>
                      </div>
                      <div className="result-detail">
                        <span>Harvest Time:</span>
                        <span>{crop['WaktuPanen']} days</span>
                      </div>
                      <div className="result-detail">
                        <span>Market Demand:</span>
                        <span>{crop['TingkatKebutuhan']}/10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="analysis-summary">
                <h3 className="analysis-title">Analysis Summary</h3>
                <p className="analysis-text">
                  The recommendations above are calculated using both SAW (Simple Additive Weighting) and TOPSIS 
                  (Technique for Order Preference by Similarity to Ideal Solution) methods. The combined score 
                  represents the average of both methods for more reliable results.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecommendPage;