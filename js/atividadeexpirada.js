// Constantes
const DATA_LIMITE = new Date('2025-05-02T23:59:59');

// Função para verificar se a atividade expirou
export function verificarExpiracao() {
    return new Date() > DATA_LIMITE;
}

// Função para bloquear toda interação com a página
function bloquearInteracao(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// Função principal que exibe o modal bloqueador
export function exibirModalExpiracao() {
    // Remove todo conteúdo existente
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    
    // Adiciona o modal
    document.body.innerHTML = `
        <style>
            #modal-expirado {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                color: white;
                font-family: Arial, sans-serif;
            }
            .modal-conteudo {
                background: #222;
                padding: 30px;
                border-radius: 12px;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 0 30px rgba(255,0,0,0.5);
                border: 2px solid #ff4444;
            }
            #fechar-modal {
                margin-top: 25px;
                padding: 12px 25px;
                background-color: #ff4444;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1.1em;
                transition: background 0.3s;
            }
            #fechar-modal:hover {
                background-color: #ff0000;
            }
        </style>
        <div id="modal-expirado">
            <div class="modal-conteudo">
                <h2 style="color: #ff4444; margin-top: 0;">ATIVIDADE EXPIRADA</h2>
                <p>Esta atividade não está mais disponível para acesso.</p>
                <p style="font-size: 0.9em; color: #aaa;">O sistema será encerrado automaticamente.</p>
                <button id="fechar-modal">ENTENDI</button>
            </div>
        </div>
    `;
    
    // Bloqueia qualquer interação
    document.addEventListener('keydown', bloquearInteracao);
    document.addEventListener('click', bloquearInteracao);
    document.addEventListener('contextmenu', bloquearInteracao);
    
    // Configura o botão para forçar o fechamento
    document.getElementById('fechar-modal').addEventListener('click', () => {
        forcarFechamento();
    });
}

// Função para tentar fechar a janela
function forcarFechamento() {
    try {
        // Tenta fechar a janela (funciona se foi aberta via window.open())
        window.close();
        
        // Fallback: redireciona para about:blank
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 100);
        
        // Último recurso: exige fechamento manual
        setTimeout(() => {
            document.body.innerHTML = `
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        background: #111;
                        color: #f44;
                        font-family: Arial;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        text-align: center;
                    }
                </style>
                <div>
                    <h1>FECHE ESTA JANELA MANUALMENTE</h1>
                    <p style="color: #fff;">A atividade expirou e não pode mais ser acessada.</p>
                </div>
            `;
        }, 200);
    } catch (e) {
        document.body.innerHTML = `
            <style>
                body {
                    margin: 0;
                    padding: 20px;
                    background: #111;
                    color: #f44;
                    font-family: Arial;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
            </style>
            <div>
                <h1>FECHE ESTA JANELA MANUALMENTE</h1>
                <p style="color: #fff;">A atividade expirou e não pode mais ser acessada.</p>
            </div>
        `;
    }
}

// Função principal para iniciar o monitoramento
export function iniciarMonitoramento() {
    if (verificarExpiracao()) {
        exibirModalExpiracao();
    }
    
    // Verifica periodicamente (a cada minuto)
    setInterval(() => {
        if (verificarExpiracao()) {
            exibirModalExpiracao();
        }
    }, 60000);
}