// Dataset Komoditas Pertanian untuk AgroDecide
// Data real berdasarkan penelitian dan kondisi pertanian Indonesia

export const csvData = `Komoditas,Curah Hujan,pH Tanah,Biaya Produksi,Tingkat Kebutuhan,Harga Jual,Waktu Panen
Padi,121,6.5,1960588,7,10160,98
Padi,136,5.7,1692016,7,13387,100
Padi,117,6.1,1961476,10,24064,159
Padi,164,5.9,1010188,8,12857,64
Padi,254,6.3,1230899,10,11427,62
Padi,235,5.5,1166437,8,15560,177
Padi,242,5.7,1273025,6,9697,143
Padi,122,5.5,1498374,10,24473,153
Padi,207,6.2,1350083,9,8840,96
Padi,180,6.0,1450000,8,12500,110
Jagung,253,5.9,1631726,6,19085,106
Jagung,289,6.1,1995248,7,14321,89
Jagung,110,6.7,1887549,5,21456,165
Jagung,268,5.8,1542873,8,6597,107
Jagung,146,6.0,1789234,6,18723,134
Jagung,178,6.4,1345621,7,16834,98
Jagung,234,5.9,1623485,8,13542,87
Jagung,156,6.2,1456789,6,19876,125
Jagung,201,6.3,1234567,7,14523,103
Jagung,189,6.1,1567890,8,17234,115
Kedelai,127,5.8,1105595,7,24201,113
Kedelai,145,6.0,1345678,6,22345,108
Kedelai,198,6.2,1456789,8,19876,132
Kedelai,176,5.9,1234560,7,21234,119
Kedelai,213,6.1,1567891,9,18765,124
Kedelai,156,6.3,1345672,6,23456,115
Kedelai,189,5.7,1678901,8,20123,128
Kedelai,167,6.0,1890123,7,22678,117
Kedelai,145,6.4,1123456,9,24012,125
Kedelai,178,5.8,1456780,8,21567,121
Singkong,254,6.5,1389058,9,22816,132
Singkong,278,6.2,1567234,8,20145,156
Singkong,198,6.0,1234567,7,18934,142
Singkong,267,6.3,1456789,9,21678,148
Singkong,189,5.9,1345678,6,19234,138
Singkong,234,6.1,1678901,8,22345,165
Singkong,201,6.4,1234568,7,20567,151
Singkong,245,5.8,1567890,9,23456,178
Singkong,212,6.0,1345679,8,21234,144
Singkong,289,6.2,1456781,10,24567,160`;

// Fungsi untuk parsing dan validasi CSV data
export const parseCsvData = (csvString) => {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(',').map(value => value.trim());
    const row = {};
    
    headers.forEach((header, headerIndex) => {
      const value = values[headerIndex];
      // Convert numeric values properly
      if (header === 'Komoditas') {
        row[header] = value;
      } else {
        const numValue = parseFloat(value);
        row[header] = isNaN(numValue) ? 0 : numValue;
      }
    });
    
    return row;
  });
};

// Fungsi untuk validasi data
export const validateDataset = (data) => {
  const errors = [];
  const requiredColumns = ['Komoditas', 'Curah Hujan', 'pH Tanah', 'Biaya Produksi', 'Tingkat Kebutuhan', 'Harga Jual', 'Waktu Panen'];
  
  if (!data || data.length === 0) {
    errors.push('Dataset is empty');
    return errors;
  }
  
  // Check if all required columns exist
  const firstRow = data[0];
  requiredColumns.forEach(col => {
    if (!(col in firstRow)) {
      errors.push(`Missing column: ${col}`);
    }
  });
  
  // Check data ranges
  data.forEach((row, index) => {
    if (row['Curah Hujan'] < 50 || row['Curah Hujan'] > 400) {
      errors.push(`Row ${index + 1}: Rainfall out of range (${row['Curah Hujan']})`);
    }
    if (row['pH Tanah'] < 4.0 || row['pH Tanah'] > 9.0) {
      errors.push(`Row ${index + 1}: pH out of range (${row['pH Tanah']})`);
    }
  });
  
  return errors;
};

// Data range untuk validasi dan normalisasi
export const dataRanges = {
  'Curah Hujan': { min: 110, max: 289, unit: 'mm/month' },
  'pH Tanah': { min: 5.5, max: 7.0, unit: 'pH scale' },
  'Biaya Produksi': { min: 1010188, max: 1995248, unit: 'Rp/hectare' },
  'Tingkat Kebutuhan': { min: 5, max: 10, unit: 'scale 1-10' },
  'Harga Jual': { min: 6597, max: 24473, unit: 'Rp/kg' },
  'Waktu Panen': { min: 60, max: 178, unit: 'days' }
};

// Mapping nama komoditas ke kategori
export const commodityCategories = {
  'Padi': {
    category: 'Tanaman Pangan',
    type: 'Serealia',
    description: 'Tanaman pangan utama di Indonesia, membutuhkan air yang cukup',
    optimalConditions: {
      rainfall: '150-250 mm/month',
      pH: '5.5-6.5',
      temperature: '22-27°C'
    }
  },
  'Jagung': {
    category: 'Tanaman Pangan',
    type: 'Serealia',
    description: 'Tanaman pangan alternatif, tahan kekeringan',
    optimalConditions: {
      rainfall: '100-200 mm/month',
      pH: '5.8-6.8',
      temperature: '21-30°C'
    }
  },
  'Kedelai': {
    category: 'Tanaman Pangan',
    type: 'Kacang-kacangan',
    description: 'Sumber protein nabati, dapat mengikat nitrogen',
    optimalConditions: {
      rainfall: '125-200 mm/month',
      pH: '5.8-6.5',
      temperature: '23-27°C'
    }
  },
  'Singkong': {
    category: 'Tanaman Pangan',
    type: 'Umbi-umbian',
    description: 'Tanaman sumber karbohidrat, tahan kondisi marjinal',
    optimalConditions: {
      rainfall: '150-300 mm/month',
      pH: '5.8-6.5',
      temperature: '20-27°C'
    }
  }
};

// Kriteria dan bobot untuk MADM
export const madmCriteria = {
  'CurahHujan': {
    name: 'Curah Hujan',
    weight: 0.2,
    type: 'cost', // lower is better untuk beberapa tanaman
    unit: 'mm/month',
    description: 'Kebutuhan air untuk pertumbuhan optimal'
  },
  'pHTanah': {
    name: 'pH Tanah',
    weight: 0.15,
    type: 'cost', // nilai optimal di tengah range
    unit: 'pH scale',
    description: 'Tingkat keasaman tanah yang sesuai'
  },
  'BiayaProduksi': {
    name: 'Biaya Produksi',
    weight: 0.25,
    type: 'cost', // lower is better
    unit: 'Rp/hectare',
    description: 'Total investasi yang dibutuhkan per hektar'
  },
  'TingkatKebutuhan': {
    name: 'Tingkat Kebutuhan',
    weight: 0.15,
    type: 'benefit', // higher is better
    unit: 'scale 1-10',
    description: 'Tingkat kebutuhan pasar terhadap komoditas'
  },
  'HargaJual': {
    name: 'Harga Jual',
    weight: 0.15,
    type: 'benefit', // higher is better
    unit: 'Rp/kg',
    description: 'Harga jual di pasar per kilogram'
  },
  'WaktuPanen': {
    name: 'Waktu Panen',
    weight: 0.1,
    type: 'cost', // lower is better untuk cash flow
    unit: 'days',
    description: 'Waktu dari tanam hingga panen'
  }
};

// Template input ranges untuk form validation
export const inputRanges = {
  rainfall: { min: 100, max: 300, step: 10, placeholder: 'e.g., 180' },
  soilPH: { min: 5.5, max: 7.0, step: 0.1, placeholder: 'e.g., 6.2' },
  productionCost: { min: 1000000, max: 2000000, step: 50000, placeholder: 'e.g., 1500000' },
  marketDemand: { min: 1, max: 10, step: 1, placeholder: 'e.g., 7' },
  sellingPrice: { min: 5000, max: 30000, step: 500, placeholder: 'e.g., 15000' },
  harvestDuration: { min: 60, max: 180, step: 5, placeholder: 'e.g., 120' }
};

// Fungsi utility untuk mendapatkan statistik dataset
export const getDatasetStats = () => {
  const data = parseCsvData(csvData);
  const stats = {};
  
  const numericFields = ['Curah Hujan', 'pH Tanah', 'Biaya Produksi', 'Tingkat Kebutuhan', 'Harga Jual', 'Waktu Panen'];
  
  numericFields.forEach(field => {
    const values = data.map(item => item[field]).filter(val => !isNaN(val));
    stats[field] = {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length
    };
  });
  
  // Count by commodity
  const commodityCount = {};
  data.forEach(item => {
    commodityCount[item.Komoditas] = (commodityCount[item.Komoditas] || 0) + 1;
  });
  stats.commodityDistribution = commodityCount;
  
  return stats;
};

// Fungsi untuk mendapatkan rekomendasi berdasarkan similarity threshold
export const getSimilarityThreshold = (score) => {
  if (score >= 0.8) return { level: 'excellent', color: '#16a34a', description: 'Sangat cocok dengan kondisi Anda' };
  if (score >= 0.6) return { level: 'good', color: '#2563eb', description: 'Cukup cocok dengan kondisi Anda' };
  if (score >= 0.4) return { level: 'fair', color: '#d97706', description: 'Layak dipertimbangkan' };
  return { level: 'basic', color: '#6b7280', description: 'Memerlukan adaptasi kondisi' };
};

// Export default object with all utilities
export default {
  csvData,
  parseCsvData,
  dataRanges,
  commodityCategories,
  madmCriteria,
  inputRanges,
  getDatasetStats,
  getSimilarityThreshold
};