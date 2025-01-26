const axios = require('axios');
const adjectives = ['Red', 'Silent', 'Golden', 'Iron', 'Phantom', 'Shadow', 'Steel', 'Crimson'];
const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Viper', 'Wolf', 'Hawk', 'Serpent', 'Eagle'];

exports.generateRandomName = async () => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: 'Generate only one unique and creative gadget name something like RightNightingale, Silent Kraken, Shadow Wolf, Crimson Serpent ,etc ' }]
          }
        ]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );    
    const word = response.data.candidates[0].content.parts[0].text.replace(/\n/g, '');

    return word || generateFallbackName();
  } catch (error) {
    console.error('Error generating name with Gemini:', error);
    return `Fallback-Name-${Math.floor(1000 + Math.random() * 9000)}`;
  }
};

exports.generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

generateFallbackName=()=>{
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}-${Math.floor(1000 + Math.random() * 9000)}`;

}