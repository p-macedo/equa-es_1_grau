function showFocusModal() {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: #fff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 500px;
        width: 90%;
        animation: scaleUp 0.3s ease-in-out;
    `;

    const modalText = document.createElement('p');
    modalText.style.cssText = `
        margin-bottom: 20px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
    `;
    modalText.innerHTML = `
        <span style="color: red; font-size: 24px;">⚠️ Atenção!</span><br><br>
        Esta página está em modo foco.<br><br>
        Recarregar a página, abrir novas abas ou pressionar as teclas <strong>F5</strong> e <strong>F12</strong> bloqueará a página e ela será fechada.<br><br>
        Clique em <strong>OK</strong> para continuar.
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.cssText = `
        background-color: #e3342f;
        color: #fff;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    `;

    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = '#cc1f1a';
    });

    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = '#e3342f';
    });

    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    modalContent.appendChild(modalText);
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes scaleUp {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(styleSheet);
}

function disableAllFields() {
    document.querySelectorAll('input, select, textarea, button').forEach(field => {
        field.disabled = true;
    });
}

// Event listeners for focus mode
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        window.close();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || event.key === "F5") {
        event.preventDefault();
        disableAllFields();
    }
});

window.addEventListener("blur", () => {
    window.close();
});

// Show modal when page loads
document.addEventListener('DOMContentLoaded', showFocusModal);