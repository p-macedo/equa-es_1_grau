// Data limite para aceitar exercícios (formato: 'YYYY-MM-DD HH:MM:SS')
const DEADLINE = '2025-05-02 23:59:59'; // Altere para a data/hora desejada

function parseDateTime(str) {
    // Espera formato 'YYYY-MM-DD HH:MM:SS'
    const [date, time] = str.split(' ');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, min, sec] = time.split(':').map(Number);
    return new Date(year, month - 1, day, hour, min, sec);
}

function showDeadlineModal() {
    // Cria o modal destacado
    const modal = document.createElement('div');
    modal.id = 'deadline-modal';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.background = '#0a0a0a'; // Fundo escuro sólido
    modal.style.zIndex = '99999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    modal.innerHTML = `
        <div style="
            background: #fff;
            border-radius: 1.5rem;
            box-shadow:
                0 0 16px 4px #ff0033,
                0 0 32px 8px #ff0033,
                0 0 8px 2px #ff0033,
                0 8px 32px 0 rgba(255,0,0,0.15);
            padding: 2.5rem 2rem;
            max-width: 420px;
            text-align: center;
            border: 4px solid #ff0033;
            animation: neon-glow 1.5s infinite alternate;
        ">
            <h2 style="font-size:2rem; color:#ff0033; font-weight:bold; margin-bottom:1rem;">
                Prazo Encerrado
            </h2>
            <p style="font-size:1.15rem; color:#222; margin-bottom:2rem;">
                O prazo para realizar os exercícios foi encerrado.<br>
                Não é mais possível acessar ou enviar respostas.<br>
                <span style="color:#ff0033; font-weight:bold;">Consulte seu professor para mais informações.</span>
            </p>
            <button id="deadline-ok-btn" style="
                background: #ff0033;
                color: #fff;
                font-weight: bold;
                font-size: 1.1rem;
                padding: 0.75rem 2.5rem;
                border-radius: 0.75rem;
                border: none;
                cursor: pointer;
                box-shadow: 0 0 12px #ff0033, 0 2px 8px rgba(0,0,0,0.08);
                transition: background 0.2s;
            ">OK</button>
            <style>
                @keyframes neon-glow {
                    0% {
                        box-shadow:
                            0 0 16px 4px #ff0033,
                            0 0 32px 8px #ff0033,
                            0 0 8px 2px #ff0033,
                            0 8px 32px 0 rgba(255,0,0,0.15);
                    }
                    100% {
                        box-shadow:
                            0 0 32px 12px #ff0033,
                            0 0 48px 16px #ff0033,
                            0 0 16px 4px #ff0033,
                            0 8px 32px 0 rgba(255,0,0,0.25);
                    }
                }
            </style>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('deadline-ok-btn').onclick = function () {
        window.close();
        setTimeout(() => { window.location.href = 'about:blank'; }, 300);
    };
}

(function monitorDeadline() {
    const now = new Date();
    const deadline = parseDateTime(DEADLINE);
    if (now > deadline) {
        document.body.innerHTML = '';
        showDeadlineModal();
    }
})();
