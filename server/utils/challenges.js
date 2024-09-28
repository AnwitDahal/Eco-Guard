const random = require('lodash/random');

module.exports.getLocalFactors=(city) =>{
    return {
      wind_speed: random(0, 10, true),  // Simulate wind speed between 0 and 10 m/s
      industrial_activity: random(0, 1) === 1  // Simulate whether industrial activity is high
    };
  }

module.exports.getPastSuccessfulActions=(city) =>{
    // Simulate getting past successful actions for the city
    return [
      "Reduce diesel vehicle traffic",
      "Increase tree plantation"
    ];
  }

  module.exports.generateChallenges=(predicted_aqi, city) =>{
    const local_factors = this.getLocalFactors(city);
    const past_actions = this.getPastSuccessfulActions(city);
  
    let challenges = [];
    if (predicted_aqi < 101) {
      challenges.push("Encourage public transport usage.");
    } else if (101 <= predicted_aqi && predicted_aqi < 151) {
      challenges.push("Reduce traffic congestion by 10% through carpooling.");
      if (local_factors.wind_speed < 2) {
        challenges.push("Pause construction during peak hours due to stagnant air.");
      }
    } else if (predicted_aqi >= 151) {
      challenges.push("Shut down factories contributing to PM2.5 for 3 days.");
      challenges.push("Increase tree plantation by 5% in pollution hotspots.");
      if (local_factors.industrial_activity) {
        challenges.push("Limit emissions from key industrial sources for the week.");
      }
    }
  
    // Add a random past successful action
    challenges.push(`Reimplement past successful action: ${past_actions[random(0, past_actions.length - 1)]}`);
  
    return challenges;
  }