export interface AnalysisResult {
  totalStudents: number;
  averagePerformance: number;
  atRiskStudents: number;
  skillCoverage: number;
  performanceDistribution: {
    labels: string[];
    data: number[];
  };
  performanceTrend: {
    labels: string[];
    data: number[];
  };
  riskDistribution: number[];
  topPerformers: number;
  needsAttention: number;
  improvementRate: number;
  performanceInsight: string;
}

export const analyzeData = (data: any[]): AnalysisResult => {
  if (!data || data.length === 0) {
    return {
      totalStudents: 0,
      averagePerformance: 0,
      atRiskStudents: 0,
      skillCoverage: 0,
      performanceDistribution: { labels: [], data: [] },
      performanceTrend: { labels: [], data: [] },
      riskDistribution: [0, 0, 0],
      topPerformers: 0,
      needsAttention: 0,
      improvementRate: 0,
      performanceInsight: "No data available for analysis"
    };
  }

  const totalStudents = data.length;
  
  // Find numeric columns that might represent scores/grades
  const numericColumns = Object.keys(data[0]).filter(key => {
    const sample = data[0][key];
    return typeof sample === 'number' || (!isNaN(parseFloat(sample)) && isFinite(sample));
  });

  // Calculate performance metrics
  const scores: number[] = [];
  data.forEach(row => {
    let totalScore = 0;
    let validScores = 0;
    
    numericColumns.forEach(col => {
      const value = parseFloat(row[col]);
      if (!isNaN(value) && isFinite(value)) {
        totalScore += value;
        validScores++;
      }
    });
    
    if (validScores > 0) {
      scores.push(totalScore / validScores);
    }
  });

  const averagePerformance = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) / 100;
  
  // Risk assessment
  const riskThresholds = {
    high: averagePerformance * 0.7,
    medium: averagePerformance * 0.85
  };

  let lowRisk = 0, mediumRisk = 0, highRisk = 0;
  
  const enhancedData = data.map((row, index) => {
    const score = scores[index] || 0;
    let riskLevel = 'low';
    
    if (score < riskThresholds.high) {
      riskLevel = 'high';
      highRisk++;
    } else if (score < riskThresholds.medium) {
      riskLevel = 'medium';
      mediumRisk++;
    } else {
      lowRisk++;
    }
    
    return { ...row, riskLevel, overallScore: score };
  });

  // Update the original data with risk levels
  data.forEach((row, index) => {
    row.riskLevel = enhancedData[index].riskLevel;
    row.overallScore = enhancedData[index].overallScore;
  });

  // Performance distribution
  const performanceBins = ['0-40', '41-60', '61-80', '81-100'];
  const distribution = [0, 0, 0, 0];
  
  scores.forEach(score => {
    if (score <= 40) distribution[0]++;
    else if (score <= 60) distribution[1]++;
    else if (score <= 80) distribution[2]++;
    else distribution[3]++;
  });

  // Generate trend data (simulated monthly progression)
  const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const trendData = trendLabels.map((_, index) => {
    return Math.round((averagePerformance + (Math.random() - 0.5) * 10) * 100) / 100;
  });

  // Calculate additional metrics
  const topPerformers = Math.round((scores.filter(s => s > averagePerformance * 1.2).length / totalStudents) * 100);
  const needsAttention = Math.round(((mediumRisk + highRisk) / totalStudents) * 100);
  const improvementRate = Math.round(75 + Math.random() * 20); // Simulated improvement rate

  // Generate insight
  let performanceInsight = "";
  if (averagePerformance > 80) {
    performanceInsight = "Overall performance is excellent with most students exceeding expectations.";
  } else if (averagePerformance > 60) {
    performanceInsight = "Performance is satisfactory with opportunities for targeted improvements.";
  } else {
    performanceInsight = "Performance indicates need for comprehensive intervention strategies.";
  }

  return {
    totalStudents,
    averagePerformance,
    atRiskStudents: highRisk,
    skillCoverage: Math.round(70 + Math.random() * 25), // Simulated skill coverage
    performanceDistribution: {
      labels: performanceBins,
      data: distribution
    },
    performanceTrend: {
      labels: trendLabels,
      data: trendData
    },
    riskDistribution: [lowRisk, mediumRisk, highRisk],
    topPerformers,
    needsAttention,
    improvementRate,
    performanceInsight
  };
};