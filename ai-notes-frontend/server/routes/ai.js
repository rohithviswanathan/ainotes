import express from "express";
import { summarize } from "../services/aiService.js";

const router = express.Router();

/*
POST /ai/summarize

Body:
{
  "text": "Your note content..."
}
*/
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    const summary = await summarize(text);

    return res.json({
      summary,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      error: "Failed to summarize note",
    });
  }
});

export default router;