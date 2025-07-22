import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RecommendPage from './components/RecommendPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { csvData, validateDataset } from './data/cropData'; // Import CSV data and validation
import './App.css';

const AgroDecide = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cropData, setCropData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
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
    // Parse CSV data directly from imported data
    const loadData = () => {
      try {
        console.log('Loading CSV data from cropData.js...');
        
        // Parse CSV menggunakan split sederhana
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          const row = {};
          headers.forEach((header, index) => {
            const value = values[index];
            // Convert numeric values
            if (header === 'Komoditas') {
              row[header] = value;
            } else {
              row[header] = parseFloat(value) || 0;
            }
          });
          return row;
        });
        
        console.log('CSV data loaded successfully:', parsedData.length, 'records');
        console.log('Sample record:', parsedData[0]);
        
        // Validate dataset
        const validationErrors = validateDataset(parsedData);
        if (validationErrors.length > 0) {
          console.warn('Dataset validation warnings:', validationErrors);
        } else {
          console.log('✅ Dataset validation passed');
        }
        
        // Log unique commodities for verification
        const commodities = [...new Set(parsedData.map(item => item.Komoditas))];
        console.log('Available commodities:', commodities);
        
        setCropData(parsedData);
        setDataLoading(false);
      } catch (error) {
        console.error('Error parsing CSV data:', error);
        
        // Create minimal fallback data for demonstration
        const fallbackData = [
          { Komoditas: 'Padi', 'Curah Hujan': 180, 'pH Tanah': 6.0, 'Biaya Produksi': 1500000, 'Tingkat Kebutuhan': 8, 'Harga Jual': 12000, 'Waktu Panen': 110 },
          { Komoditas: 'Jagung', 'Curah Hujan': 150, 'pH Tanah': 6.2, 'Biaya Produksi': 1400000, 'Tingkat Kebutuhan': 7, 'Harga Jual': 15000, 'Waktu Panen': 95 },
          { Komoditas: 'Kedelai', 'Curah Hujan': 140, 'pH Tanah': 6.1, 'Biaya Produksi': 1200000, 'Tingkat Kebutuhan': 6, 'Harga Jual': 20000, 'Waktu Panen': 105 }
        ];
        
        console.log('Using fallback data:', fallbackData.length, 'records');
        setCropData(fallbackData);
        setDataLoading(false);
        
        // Show user-friendly error message
        setTimeout(() => {
          alert('Dataset loaded with limited sample data. The system is still functional for demonstration purposes.');
        }, 1000);
      }
    };
    
    loadData();
  }, []);

  // Fungsi untuk menghitung similarity score antara input user dan data komoditas
  const calculateSimilarity = (item, input) => {
    const rainfall = parseFloat(input.rainfall);
    const soilPH = parseFloat(input.soilPH);
    const productionCost = parseFloat(input.productionCost);
    const marketDemand = parseFloat(input.marketDemand);
    const sellingPrice = parseFloat(input.sellingPrice);
    const harvestDuration = parseFloat(input.harvestDuration);

    // Normalisasi berdasarkan range dataset yang ada
    const ranges = {
      rainfall: { min: 110, max: 289 },
      pH: { min: 5.5, max: 7.0 },
      cost: { min: 1010188, max: 1995248 },
      demand: { min: 5, max: 10 },
      price: { min: 6597, max: 24473 },
      harvest: { min: 60, max: 178 }
    };

    // Fungsi untuk menghitung similarity (semakin kecil perbedaan, semakin tinggi similarity)
    const getSimilarityScore = (userVal, itemVal, range) => {
      const normalizedDiff = Math.abs(userVal - itemVal) / (range.max - range.min);
      return 1 - normalizedDiff; // Similarity score 0-1, 1 = sama persis
    };

    // Hitung similarity untuk setiap kriteria dengan bobot
    const similarities = {
      rainfall: getSimilarityScore(rainfall, item['Curah Hujan'], ranges.rainfall) * 0.2,
      pH: getSimilarityScore(soilPH, item['pH Tanah'], ranges.pH) * 0.15,
      cost: getSimilarityScore(productionCost, item['Biaya Produksi'], ranges.cost) * 0.25,
      demand: getSimilarityScore(marketDemand, item['Tingkat Kebutuhan'], ranges.demand) * 0.15,
      price: getSimilarityScore(sellingPrice, item['Harga Jual'], ranges.price) * 0.15,
      harvest: getSimilarityScore(harvestDuration, item['Waktu Panen'], ranges.harvest) * 0.1
    };

    // Total similarity score
    return Object.values(similarities).reduce((sum, score) => sum + score, 0);
  };

  const filterAndRankByInput = (data, input) => {
    if (!data || data.length === 0) return [];
    
    try {
      // Hitung similarity untuk semua komoditas
      const dataWithSimilarity = data.map(item => ({
        ...item,
        similarityScore: calculateSimilarity(item, input)
      }));

      // Sort by similarity score (tertinggi dulu)
      dataWithSimilarity.sort((a, b) => b.similarityScore - a.similarityScore);

      // Ambil top matches (minimal similarity 0.3 atau top 15 jika semua di bawah threshold)
      const threshold = 0.3;
      const topMatches = dataWithSimilarity.filter(item => item.similarityScore >= threshold);
      
      if (topMatches.length === 0) {
        // Jika tidak ada yang memenuhi threshold, ambil 15 teratas
        return dataWithSimilarity.slice(0, 15);
      }

      return topMatches.slice(0, 20); // Maksimal 20 matches terbaik
    } catch (error) {
      console.error('Error in filtering and ranking:', error);
      return data.slice(0, 10); // Fallback ke 10 data pertama
    }
  };

  // MADM calculations
  const normalizeData = (data, criteria) => {
    const normalized = [];
    const maxValues = {};
    const minValues = {};

    // Mapping kolom ke nama yang sesuai dengan dataset
    const columnMapping = {
      'CurahHujan': 'Curah Hujan',
      'pHTanah': 'pH Tanah', 
      'BiayaProduksi': 'Biaya Produksi',
      'TingkatKebutuhan': 'Tingkat Kebutuhan',
      'HargaJual': 'Harga Jual',
      'WaktuPanen': 'Waktu Panen'
    };

    criteria.forEach(criterion => {
      const mappedCriterion = columnMapping[criterion] || criterion;
      maxValues[criterion] = Math.max(...data.map(item => item[mappedCriterion] || 0));
      minValues[criterion] = Math.min(...data.map(item => item[mappedCriterion] || 0));
    });

    data.forEach(item => {
      const normalizedItem = { ...item };
      criteria.forEach(criterion => {
        const mappedCriterion = columnMapping[criterion] || criterion;
        const value = item[mappedCriterion] || 0;
        const max = maxValues[criterion];
        const min = minValues[criterion];
        
        if (max === min) {
          normalizedItem[criterion] = 1; // Avoid division by zero
        } else {
          // Benefit criteria (higher is better): TingkatKebutuhan, HargaJual
          if (['TingkatKebutuhan', 'HargaJual'].includes(criterion)) {
            normalizedItem[criterion] = (value - min) / (max - min);
          } else {
            // Cost criteria (lower is better): CurahHujan, BiayaProduksi, WaktuPanen, pHTanah
            normalizedItem[criterion] = (max - value) / (max - min);
          }
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
        // Filter dan rank data berdasarkan similarity dengan input user
        const rankedData = filterAndRankByInput(cropData, formData);
        console.log('Ranked data:', rankedData.length, 'items'); // Debug log
        console.log('Top 3 similarity scores:', rankedData.slice(0, 3).map(item => ({
          komoditas: item.Komoditas, 
          similarity: item.similarityScore?.toFixed(3)
        })));
        
        if (rankedData.length === 0) {
          // Fallback jika ada error
          console.log('No ranked results, using fallback');
          const fallbackData = cropData.slice(0, 10);
          const sawResults = calculateSAW(fallbackData);
          const topsisResults = calculateTOPSIS(fallbackData);
          
          const combinedResults = sawResults.map((sawItem) => {
            const topsisItem = topsisResults.find(item => item.Komoditas === sawItem.Komoditas);
            return {
              ...sawItem,
              topsisScore: topsisItem ? topsisItem.topsisScore : 0,
              combinedScore: (sawItem.sawScore + (topsisItem ? topsisItem.topsisScore : 0)) / 2,
              similarityScore: 0.5 // Default similarity
            };
          });
          
          setRecommendations(combinedResults.slice(0, 5));
          alert('Using fallback recommendations. Please check your input values.');
        } else {
          // Calculate SAW dan TOPSIS untuk data yang sudah di-rank
          const sawResults = calculateSAW(rankedData);
          const topsisResults = calculateTOPSIS(rankedData);
          
          const combinedResults = sawResults.map((sawItem) => {
            const topsisItem = topsisResults.find(item => item.Komoditas === sawItem.Komoditas);
            const originalItem = rankedData.find(item => item.Komoditas === sawItem.Komoditas);
            
            return {
              ...sawItem,
              topsisScore: topsisItem ? topsisItem.topsisScore : 0,
              similarityScore: originalItem ? originalItem.similarityScore : 0,
              combinedScore: (sawItem.sawScore + (topsisItem ? topsisItem.topsisScore : 0)) / 2
            };
          });
          
          // Sort berdasarkan combined score
          combinedResults.sort((a, b) => b.combinedScore - a.combinedScore);
          
          setRecommendations(combinedResults.slice(0, 5));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in calculation:', error);
        setLoading(false);
        alert('An error occurred during calculation. Please try again.');
      }
    }, 1500);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
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
          zIndex: 9999,
          maxHeight: '200px',
          overflow: 'auto'
        }}>
        </div>
      )}

      {/* Additional CSS untuk similarity badges */}
      <style>{`
        .text-green-700 { color: #15803d !important; }
        .bg-green-100 { background-color: #dcfce7 !important; }
        .text-blue-700 { color: #1d4ed8 !important; }
        .bg-blue-100 { background-color: #dbeafe !important; }
        .text-yellow-700 { color: #a16207 !important; }
        .bg-yellow-100 { background-color: #fef3c7 !important; }
        .text-gray-700 { color: #374151 !important; }
        .bg-gray-100 { background-color: #f3f4f6 !important; }
        
        .similarity-badge {
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 12px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        
        @media (max-width: 768px) {
          .result-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          .result-header > div:first-child {
            width: 100% !important;
            margin-bottom: 8px !important;
          }
          
          .similarity-badge {
            margin-top: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default AgroDecide;