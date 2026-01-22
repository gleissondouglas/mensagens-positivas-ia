import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("frontend"));
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


// =========================
// Gemini config
// =========================
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Garante que a chave existe logo ao iniciar (falha rápida e clara)
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY não encontrada. Verifique seu arquivo .env na raiz do projeto."
  );
}

/**
 * Chama a Gemini API e retorna somente o texto final.
 * - Lança erro com status (quando possível) para o catch tratar.
 */
async function generateWithGemini(prompt) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  // Se o Gemini responder com erro (ex: 429), capturamos o corpo para debugar
  if (!response.ok) {
    const errText = await response.text();
    const error = new Error(`Gemini API error: ${response.status} - ${errText}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  // Extrai o texto gerado (pode vir em múltiplas parts)
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .join("")
    ?.trim();

  return text;
}

// =========================
// Routes
// =========================
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/generate", async (req, res) => {
  try {
    const { name, word1, word2, word3 } = req.body;

    // Validação básica (erro do cliente)
    if (!name || !word1 || !word2 || !word3) {
      return res.status(400).json({
        error: "Envie name, word1, word2 e word3 no body (JSON).",
      });
    }

    // Prompt: claro, previsível, texto puro
    const prompt = `
Crie uma mensagem positiva e curta em português para a pessoa chamada "${name}".
Ela enviou as palavras: "${word1}", "${word2}", "${word3}".
Regras:
- 3 a 6 linhas no máximo
- tom motivacional e gentil
- cite as 3 palavras naturalmente como parte da mensagem
- responda em texto puro (sem formatação, sem negrito, sem listas)
- não use emojis
- não cite religião e não cite política
`.trim();

    const message = await generateWithGemini(prompt);

    // Se o serviço externo respondeu sem texto (raro, mas possível)
    if (!message) {
      return res.status(502).json({
        error: "A IA não retornou mensagem. Tente novamente.",
      });
    }

    return res.json({
      name,
      words: [word1, word2, word3],
      message,
    });
  } catch (error) {
    console.error(error);

    const status = error?.status || 500;

    // Rate limit / quota do free tier
    if (status === 429) {
      return res.status(429).json({
        error:
          "Limite de uso da IA atingido (free tier). Tente novamente mais tarde.",
        details: error?.message,
      });
    }

    // Permissão / key inválida / bloqueio
    if (status === 401 || status === 403) {
      return res.status(status).json({
        error:
          "Erro de autenticação/permissão na IA. Verifique sua GEMINI_API_KEY e configurações.",
        details: error?.message,
      });
    }

    return res.status(500).json({
      error: "Erro interno no servidor ao processar /generate.",
      details: error?.message ?? "Erro desconhecido",
    });
  }
});

// =========================
// Start server
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
