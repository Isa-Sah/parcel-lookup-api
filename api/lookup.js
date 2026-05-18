const { RULES } = require('../lib/rules');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  const { stage, state, event } = req.query;
  if (!stage || !state || !event) {
    return res.status(400).json({ error: 'stage, state, and event params are all required' });
  }

  const matches = RULES.filter(r =>
    r.location === stage &&
    r.state_display === state &&
    r.event_display === event
  );

  res.json(matches);
};
