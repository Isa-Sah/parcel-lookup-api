const { RULES, STAGE_ORDER } = require('../lib/rules');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.end();

  const stages = [...new Set(RULES.map(r => r.location))]
    .sort((a, b) => STAGE_ORDER.indexOf(a) - STAGE_ORDER.indexOf(b))
    .map(loc => ({ value: loc, label: RULES.find(r => r.location === loc).location_display }));

  res.json(stages);
};
