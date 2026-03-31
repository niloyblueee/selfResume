import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const readJsonBody = (req) =>
  new Promise((resolveBody, rejectBody) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1e6) {
        rejectBody(new Error('Payload too large'))
      }
    })

    req.on('end', () => {
      try {
        resolveBody(body ? JSON.parse(body) : {})
      } catch {
        rejectBody(new Error('Invalid JSON payload'))
      }
    })

    req.on('error', (error) => rejectBody(error))
  })

const createTelegramHandler = ({ botToken, chatId }) => async (req, res, next) => {
  if (req.url !== '/api/send-telegram') {
    next()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, message: 'Method not allowed' }))
    return
  }

  if (!botToken || !chatId) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        ok: false,
        message: 'Telegram environment variables are missing.',
      }),
    )
    return
  }

  try {
    const payload = await readJsonBody(req)
    const { name, email, whatsapp, comments } = payload

    if (!name || !email) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: false, message: 'Name and email are required.' }))
      return
    }

    const message = [
      'New collaboration form submission',
      `Name: ${name}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp || 'N/A'}`,
      `Project Details: ${comments || 'N/A'}`,
      `Submitted At: ${new Date().toISOString()}`,
    ].join('\n')

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    const telegramResult = await telegramResponse.json()

    if (!telegramResponse.ok || !telegramResult.ok) {
      throw new Error(telegramResult.description || 'Telegram API request failed.')
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true, message: 'Sent to Telegram.' }))
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        ok: false,
        message: error.message || 'Failed to send Telegram message.',
      }),
    )
  }
}

const telegramPlugin = (options) => ({
  name: 'telegram-form-endpoint',
  configureServer(server) {
    server.middlewares.use(createTelegramHandler(options))
  },
  configurePreviewServer(server) {
    server.middlewares.use(createTelegramHandler(options))
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      telegramPlugin({
        botToken: env.TELEGRAM_BOT_TOKEN,
        chatId: env.TELEGRAM_CHAT_ID,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
