/**
 * Generates a random mission success probability percentage
 * @returns {number} Random percentage between 70-99 (inclusive)
 */
const generateSuccessProbability = () => {
    // Generate random percentage with IMF's minimum success threshold of 70%
    const MIN_PROBABILITY = 70;
    const MAX_PROBABILITY = 99;
    
    return Math.floor(
      Math.random() * (MAX_PROBABILITY - MIN_PROBABILITY + 1) + MIN_PROBABILITY
    );
  };
  
  module.exports = generateSuccessProbability;