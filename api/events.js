const { RULES } = require('../lib/rules');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  const { stage, state } = req.query;
  if (!stage || !state) return res.status(400).json({ error: 'stage and state params required' });

  const events = [...new Set(
    RULES.filter(r => r.location === stage && r.state_display === state).map(r => r.event_display)
  )].sort().map(e => ({ value: e, label: e }));

  res.json(events);
};
