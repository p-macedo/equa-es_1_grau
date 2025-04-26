// Função para enviar mensagens ao Telegram
export async function sendToTelegram(botToken, chatId, message) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('Erro ao enviar para o Telegram:', data);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
    }
}
