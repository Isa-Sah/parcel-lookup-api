const { RULES } = require('../lib/rules');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  const { stage } = req.query;
  if (!stage) return res.status(400).json({ error: 'stage param required' });

  const states = [...new Set(
    RULES.filter(r => r.location === stage).map(r => r.state_display)
  )].sort().map(s => ({ value: s, label: s }));

  res.json(states);
};
