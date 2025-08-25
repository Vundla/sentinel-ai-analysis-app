// DELETE /reports/:id - Delete a report by ID
exports.deleteReport = async (req, res) => {
  const reportId = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM reports WHERE id = ?', [reportId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error('Error deleting report:', err);
    res.status(500).json({ message: 'Failed to delete report' });
  }
};
// AI analysis for a report
exports.analyzeReport = async (req, res) => {
  const reportId = req.params.id;
  try {
    // 1. Mark as 'analyzing'
    await db.query('UPDATE reports SET status = ? WHERE id = ?', ['analyzing', reportId]);
    // 2. Get report content
    const [rows] = await db.query('SELECT content FROM reports WHERE id = ?', [reportId]);
    if (!rows.length) return res.status(404).json({ message: 'Report not found' });
    const content = rows[0].content;
    // 3. Call OpenAI API for analysis
    const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY;
    let aiFeedback = '';
    if (!openRouterApiKey) {
      aiFeedback = 'AI analysis unavailable: OpenRouter API key not configured.';
    } else {
      try {
        const aiResponse = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [
              { role: 'system', content: 'You are a cyberbullying moderation assistant. Analyze the following report for severity, risks, and action recommendations.' },
              { role: 'user', content }
            ]
          },
          {
            headers: {
              'Authorization': `Bearer ${openRouterApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        aiFeedback = aiResponse.data.choices[0].message.content.trim();
      } catch (aiErr) {
        console.error('OpenRouter AI error:', aiErr.response ? aiErr.response.data : aiErr.message);
        aiFeedback = 'AI analysis failed or quota exceeded. This is a fallback response. Please try again later.';
      }
    }
    // 4. Update report with feedback & status 'reviewed'
    await db.query('UPDATE reports SET status = ?, ai_feedback = ? WHERE id = ?', ['reviewed', aiFeedback, reportId]);
    // 5. Return updated report
    const [updated] = await db.query('SELECT * FROM reports WHERE id = ?', [reportId]);
    res.json(updated[0]);
  } catch (err) {
    console.error('AI Analysis failed:', err.response ? err.response.data : err.message);
    res.status(500).json({ message: 'AI Analysis failed', error: err.message });
  }
};
const db = require('../db');
const axios = require('axios');

// GET /reports - Fetches all reports for the dashboard
exports.getAllReports = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM reports ORDER BY created_at DESC");
    // Calculate analytics for all statuses
    const total = rows.length;
    const newCount = rows.filter(r => r.status === 'new').length;
    const analyzing = rows.filter(r => r.status === 'analyzing').length;
    const pending = rows.filter(r => r.status === 'pending').length;
    const reviewed = rows.filter(r => r.status === 'reviewed').length;
    const actioned = rows.filter(r => r.status === 'actioned').length;
    const analytics = { total, new: newCount, analyzing, pending, reviewed, actioned };
    res.status(200).json({ reports: rows, analytics });
  } catch (error) {
    console.error("💥 DB ERROR fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports." });
  }
};

// POST /reports - Creates a new report
exports.createReport = async (req, res) => {
const { content, status } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Report content cannot be empty." });
  }
  try {
  const query = "INSERT INTO reports (content, status) VALUES (?, ?)";
  const [result] = await db.query(query, [content.trim(), status || 'pending']);
    const [newReport] = await db.query("SELECT * FROM reports WHERE id = ?", [result.insertId]);
    res.status(201).json(newReport[0]);
  } catch (error) {
    console.error("💥 DB ERROR creating report:", error);
    res.status(500).json({ message: "Error saving the report." });
  }
};

// ...existing code...

// POST /reports/ai/suggest - The live AI suggestion feature
exports.getAiSuggestion = async (req, res) => {
  const { content } = req.body;
  if (!process.env.OPEN_ROUTER_API_KEY) {
    return res.status(500).json({ message: "AI API key is not configured." });
  }
  try {
    const aiResponse = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        { role: "system", content: "You are an assistant helping a user write a clear and constructive report about a potential cyberbullying incident. Briefly suggest what extra details they could add to make their report more effective. Be concise and encouraging. For example: 'Consider adding a link to the content' or 'Mentioning the specific time could be helpful.'" },
        { role: "user", content: `Here is the report so far: "${content}"` }
      ]
    }, { headers: { 'Authorization': `Bearer ${process.env.OPEN_ROUTER_API_KEY}` } });
    const suggestionText = aiResponse.data.choices[0].message.content;
    res.status(200).json({ suggestion: suggestionText });
  } catch (error) {
    console.error("💥 AI suggestion error:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "Failed to get AI suggestion." });
  }
};
