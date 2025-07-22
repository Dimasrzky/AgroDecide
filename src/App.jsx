import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RecommendPage from './components/RecommendPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { csvData } from './data/cropData'; // Import CSV data
import './App.css';

const AgroDecide = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cropData, setCropData] = useState([]);
  const [formData, setFormData] = useState({
    rainfall: '',
    soilPH: '',
    productionCost: '',
    marketDemand: '',
    sellingPrice: '',
    harvestDuration: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Parse CSV data
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
        return obj;
      }, {});
    });
    setCropData(data);
  }, []);

  // MADM calculations
  const normalizeData = (data, criteria) => {
    const normalized = [];
    const maxValues = {};
    const minValues = {};

    criteria.forEach(criterion => {
      maxValues[criterion] = Math.max(...data.map(item => item[criterion]));
      minValues[criterion] = Math.min(...data.map(item => item[criterion]));
    });

    data.forEach(item => {
      const normalizedItem = { ...item };
      criteria.forEach(criterion => {
        const value = item[criterion];
        const max = maxValues[criterion];
        const min = minValues[criterion];
        
        if (['TingkatKebutuhan', 'HargaJual'].includes(criterion)) {
          normalizedItem[criterion] = (value - min) / (max - min);
        } else {
          normalizedItem[criterion] = (max - value) / (max - min);
        }
      });
      normalized.push(normalizedItem);
    });

    return normalized;
  };

  const calculateSAW = (data) => {
    const criteria = ['CurahHujan', 'pHTanah', 'BiayaProduksi', 'TingkatKebutuhan', 'HargaJual', 'WaktuPanen'];
    const weights = [0.2, 0.15, 0.25, 0.15, 0.15, 0.1];
    
    const normalized = normalizeData(data, criteria);
    
    const results = normalized.map(item => {
      let score = 0;
      criteria.forEach((criterion, index) => {
        score += item[criterion] * weights[index];
      });
      return { ...item, sawScore: score };
    });

    return results.sort((a, b) => b.sawScore - a.sawScore);
  };

  const calculateTOPSIS = (data) => {
    const criteria = ['CurahHujan', 'pHTanah', 'BiayaProduksi', 'TingkatKebutuhan', 'HargaJual', 'WaktuPanen'];
    const weights = [0.2, 0.15, 0.25, 0.15, 0.15, 0.1];
    
    const normalized = normalizeData(data, criteria);
    
    const idealSolution = {};
    const negativeIdealSolution = {};
    
    criteria.forEach(criterion => {
      const values = normalized.map(item => item[criterion]);
      idealSolution[criterion] = Math.max(...values);
      negativeIdealSolution[criterion] = Math.min(...values);
    });

    const results = normalized.map(item => {
      let distanceToIdeal = 0;
      let distanceToNegativeIdeal = 0;
      
      criteria.forEach((criterion, index) => {
        const weightedValue = item[criterion] * weights[index];
        const idealValue = idealSolution[criterion] * weights[index];
        const negativeIdealValue = negativeIdealSolution[criterion] * weights[index];
        
        distanceToIdeal += Math.pow(weightedValue - idealValue, 2);
        distanceToNegativeIdeal += Math.pow(weightedValue - negativeIdealValue, 2);
      });
      
      distanceToIdeal = Math.sqrt(distanceToIdeal);
      distanceToNegativeIdeal = Math.sqrt(distanceToNegativeIdeal);
      
      const topsisScore = distanceToNegativeIdeal / (distanceToIdeal + distanceToNegativeIdeal);
      
      return { ...item, topsisScore };
    });

    return results.sort((a, b) => b.topsisScore - a.topsisScore);
  };

  const filterDataByInput = (data, input) => {
    // Pastikan input valid dan data tersedia
    if (!data || data.length === 0) return [];
    
    return data.filter(item => {
      try {
        const rainfall = parseFloat(input.rainfall);
        const soilPH = parseFloat(input.soilPH);
        const productionCost = parseFloat(input.productionCost);
        const marketDemand = parseFloat(input.marketDemand);
        const sellingPrice = parseFloat(input.sellingPrice);
        const harvestDuration = parseFloat(input.harvestDuration);
        
        // Validasi input
        if (isNaN(rainfall) || isNaN(soilPH) || isNaN(productionCost) || 
            isNaN(marketDemand) || isNaN(sellingPrice) || isNaN(harvestDuration)) {
          return false;
        }
        
        // Filter dengan tolerance yang lebih besar agar ada hasil
        const rainfallMatch = Math.abs(item.CurahHujan - rainfall) <= 100; // Diperbesar dari 50
        const pHMatch = Math.abs(item.pHTanah - soilPH) <= 2; // Diperbesar dari 1
        const costMatch = item.BiayaProduksi <= productionCost * 2; // Diperbesar dari 1.2
        const demandMatch = item.TingkatKebutuhan >= marketDemand - 3; // Diperbesar dari -2
        const priceMatch = item.HargaJual >= sellingPrice * 0.5; // Diperkecil dari 0.8
        const harvestMatch = item.WaktuPanen <= harvestDuration * 3; // Diperbesar dari 1.5
        
        return rainfallMatch && pHMatch && costMatch && demandMatch && priceMatch && harvestMatch;
      } catch (error) {
        console.error('Error filtering data:', error);
        return false;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData); // Debug log
    
    // Validasi form data
    const requiredFields = ['rainfall', 'soilPH', 'productionCost', 'marketDemand', 'sellingPrice', 'harvestDuration'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field] === '');
    
    if (missingFields.length > 0) {
      alert(`Please fill in all fields: ${missingFields.join(', ')}`);
      return;
    }
    
    setLoading(true);
    console.log('Starting calculation with crop data:', cropData.length, 'items'); // Debug log
    
    setTimeout(() => {
      try {
        // Filter data based on user input
        const filteredData = filterDataByInput(cropData, formData);
        console.log('Filtered data:', filteredData.length, 'items'); // Debug log
        
        if (filteredData.length === 0) {
          // Jika tidak ada hasil, gunakan semua data dan beri peringatan
          console.log('No filtered results, using all data');
          const allData = cropData.slice(0, 10); // Ambil 10 data pertama
          const sawResults = calculateSAW(allData);
          const topsisResults = calculateTOPSIS(allData);
          
          const combinedResults = sawResults.map((sawItem) => {
            const topsisItem = topsisResults.find(item => item.Komoditas === sawItem.Komoditas);
            return {
              ...sawItem,
              topsisScore: topsisItem ? topsisItem.topsisScore : 0,
              combinedScore: (sawItem.sawScore + (topsisItem ? topsisItem.topsisScore : 0)) / 2
            };
          });
          
          setRecommendations(combinedResults.slice(0, 5));
          alert('No exact matches found. Showing general recommendations based on your criteria.');
        } else {
          // Calculate recommendations using both methods
          const sawResults = calculateSAW(filteredData);
          const topsisResults = calculateTOPSIS(filteredData);
          
          const combinedResults = sawResults.map((sawItem) => {
            const topsisItem = topsisResults.find(item => item.Komoditas === sawItem.Komoditas);
            return {
              ...sawItem,
              topsisScore: topsisItem ? topsisItem.topsisScore : 0,
              combinedScore: (sawItem.sawScore + (topsisItem ? topsisItem.topsisScore : 0)) / 2
            };
          });
          
          setRecommendations(combinedResults.slice(0, 5));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in calculation:', error);
        setLoading(false);
        alert('An error occurred during calculation. Please try again.');
      }
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && (
        <HomePage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'recommend' && (
        <RecommendPage
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
          recommendations={recommendations}
        />
      )}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}

      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: '#333',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          maxWidth: '300px',
          zIndex: 9999
        }}>
          <div><strong>Debug Info:</strong></div>
          <div>Crop Data Loaded: {cropData.length} items</div>
          <div>Current Page: {currentPage}</div>
          <div>Form Data: {JSON.stringify(formData, null, 2)}</div>
          <div>Recommendations: {recommendations.length} items</div>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default AgroDecide;