/**
 * @license ELC Chat Bot Widget v1.6
 * (c) 2026 Selena Ehagaraz. All rights reserved.
 * Modification and redistribution without permission are strictly prohibited.
 */


(function () {
    // Dominios permitidos
    const dominiosPermitidos = ['www.elcingles.com', 'www.englishlanguagecenter.com', 'localhost'];
    const dominioActual = window.location.hostname;

    // Verificar si el dominio actual está autorizado
    const esValido = dominiosPermitidos.some(d => dominioActual.endsWith(d));

    if (!esValido) {
        console.warn('Licencia no válida para este dominio.');
        return; // Detiene la ejecución por completo

        // 1. Inyectar Estilos CSS
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        .elc-widget-wrapper * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .elc-widget-wrapper {
            --primary-blue: #7cb0e8;
            --primary-blue-hover: #5a99e0;
            --primary-blue-dark: #2c5898;
            --chat-bg-phone: #3a4a58;
            --user-msg-bg: #1d9bf0;
            --bot-msg-bg: #e2e8f0;
            --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-family: var(--font-main);
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 999999;
        }
        .elc-chat-trigger {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1d9bf0, #2c5898);
            color: #ffffff;
            border: none;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        }
        .elc-chat-trigger:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .elc-chat-trigger svg {
            width: 28px;
            height: 28px;
            fill: #ffffff;
            transition: transform 0.3s ease;
        }
        .elc-chat-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 14px;
            height: 14px;
            background: #22c55e;
            border: 2px solid #ffffff;
            border-radius: 50%;
        }
        .elc-chat-window {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 380px;
            height: 580px;
            background: var(--chat-bg-phone);
            border-radius: 28px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: bottom right;
        }
        .elc-widget-wrapper.active .elc-chat-window {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }
        .elc-widget-wrapper.active .elc-chat-trigger {
            transform: rotate(90deg);
            background: #0f172a;
        }
        .elc-chat-window .chat-header {
            background: rgba(30, 41, 59, 0.95);
            padding: 18px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            color: #ffffff;
        }
        .elc-chat-window .header-user-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .elc-chat-window .avatar {
            width: 36px;
            height: 36px;
            background: var(--primary-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 0.85rem;
            color: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .elc-chat-window .chat-header-info h4 {
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 2px;
            color: #ffffff;
        }
        .elc-chat-window .chat-header-info p {
            font-size: 0.72rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .elc-chat-window .online-dot {
            width: 7px;
            height: 7px;
            background: #22c55e;
            border-radius: 50%;
            display: inline-block;
        }
        .elc-chat-window .close-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 1.4rem;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
            transition: color 0.2s ease;
        }
        .elc-chat-window .close-btn:hover {
            color: #ffffff;
        }
        .elc-chat-window .chat-body {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
        }
        .elc-chat-window .chat-body::-webkit-scrollbar {
            width: 4px;
        }
        .elc-chat-window .chat-body::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
        .elc-chat-window .message-bubble {
            max-width: 88%;
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 0.84rem;
            line-height: 1.4;
            word-wrap: break-word;
        }
        .elc-chat-window .message-bubble.user {
            align-self: flex-end;
            background: var(--user-msg-bg);
            color: #ffffff;
            border-bottom-right-radius: 3px;
        }
        .elc-chat-window .message-bubble.bot {
            align-self: flex-start;
            background: var(--bot-msg-bg);
            color: #0f172a;
            border-bottom-left-radius: 3px;
        }
        .elc-chat-window .options-container {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 100%;
            margin-top: 4px;
        }
        .elc-chat-window .option-btn {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid var(--primary-blue);
            color: var(--primary-blue-dark);
            padding: 9px 12px;
            border-radius: 12px;
            font-family: var(--font-main);
            font-size: 0.8rem;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .elc-chat-window .option-btn:hover {
            background: var(--primary-blue);
            color: #ffffff;
            transform: translateX(3px);
        }
        .elc-chat-window .typing-indicator {
            align-self: flex-start;
            background: var(--bot-msg-bg);
            padding: 10px 14px;
            border-radius: 16px;
            border-bottom-left-radius: 3px;
            display: none;
            gap: 4px;
            align-items: center;
            margin: 0 16px 8px 16px;
        }
        .elc-chat-window .typing-indicator.active {
            display: flex;
        }
        .elc-chat-window .dot {
            width: 5px;
            height: 5px;
            background: #64748b;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .elc-chat-window .dot:nth-child(1) { animation-delay: -0.32s; }
        .elc-chat-window .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        .elc-chat-window .chat-footer {
            padding: 10px 14px;
            background: rgba(30, 41, 59, 0.95);
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 0.7rem;
            color: #94a3b8;
            text-align: center;
        }
        @media (max-width: 480px) {
            .elc-widget-wrapper { bottom: 15px; right: 15px; }
            .elc-chat-window { width: calc(100vw - 30px); height: 75vh; }
        }
    `;
        document.head.appendChild(styleTag);

        // 2. Inyectar Estructura HTML en el DOM
        const containerDiv = document.createElement('div');
        containerDiv.className = 'elc-widget-wrapper';
        containerDiv.id = 'elcWidget';
        containerDiv.innerHTML = `
        <button class="elc-chat-trigger" id="elcTrigger" aria-label="Abrir Preguntas Frecuentes">
            <span class="elc-chat-badge"></span>
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path>
            </svg>
        </button>
        <div class="elc-chat-window">
            <div class="chat-header">
                <div class="header-user-info">
                    <div class="avatar">ELC</div>
                    <div class="chat-header-info">
                        <h4>English Language Center</h4>
                        <p><span class="online-dot"></span> Asistente Virtual</p>
                    </div>
                </div>
                <button class="close-btn" id="elcCloseBtn">×</button>
            </div>
            <div class="chat-body" id="elcChatBody"></div>
            <div class="typing-indicator" id="elcTypingIndicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="chat-footer">
                English Language Center • Consultas
            </div>
        </div>
    `;
        document.body.appendChild(containerDiv);

        // 3. Lógica del Bot y Árbol de Preguntas
        const elcFaqTree = {
            main: {
                message: "👋 ¡Hola! Bienvenido a English Language Center. ¿Sobre qué tema te gustaría consultar?",
                options: [
                    { label: "⏱️ Tiempos y Edad para aprender", target: "cat_tiempos" },
                    { label: "🏫 Por qué elegir ELC y Beneficios", target: "cat_elc" },
                    { label: "💻 Clases Virtuales y Plataforma", target: "cat_virtual" },
                    { label: "🏢 Instalaciones y Comodidades", target: "q6" }
                ]
            },
            cat_tiempos: {
                message: "Perfecto. Selecciona la pregunta específica sobre edades o duración del aprendizaje:",
                options: [
                    { label: "1. ¿Cuántos años lleva aprender inglés?", target: "q1" },
                    { label: "2. ¿A qué edad conviene mandar a un niño?", target: "q2" },
                    { label: "3. ¿Los adultos pueden aprender de cero?", target: "q3" },
                    { label: "⬅️ Volver al menú principal", target: "main" }
                ]
            },
            cat_elc: {
                message: "Te contamos lo que nos distingue. ¿Qué consulta deseas hacer?",
                options: [
                    { label: "4. ¿Por qué debo elegir ELC para mi hijo/a?", target: "q4" },
                    { label: "5. ¿Por qué ir a ELC puede ser mejor que otros centros?", target: "q5" },
                    { label: "⬅️ Volver al menú principal", target: "main" }
                ]
            },
            cat_virtual: {
                message: "Sobre nuestra modalidad online y herramientas digitales:",
                options: [
                    { label: "7. ¿Por qué elegir ELC para aprender virtual?", target: "q7" },
                    { label: "8. ¿La plataforma virtual es también para clases presenciales?", target: "q8" },
                    { label: "⬅️ Volver al menú principal", target: "main" }
                ]
            },
            q1: { question: "¿Cuántos años lleva aprender inglés?", answer: "Aprender inglés y dominarlo como una segunda lengua, con el rango de bilingüe, no tiene un plazo exacto...", parent: "cat_tiempos" },
            q2: { question: "¿A qué edad conviene empezar a mandar a un niño?", answer: "Siempre es buen momento para aprender otro idioma! A más corta edad, incorporan la lengua con mayor naturalidad...", parent: "cat_tiempos" },
            q3: { question: "¿Los adultos pueden aprender de cero?", answer: "Por supuesto que sí, sólo es cuestión de manejar la ansiedad de ver frutos mágicos...", parent: "cat_tiempos" },
            q4: { question: "¿Por qué debo elegir ELC para mi hijo/a?", answer: "ELC no sólo les dará el manejo de la lengua inglesa para poder abrir muchas puertas...", parent: "cat_elc" },
            q5: { question: "¿Por qué ir a ELC puede ser mejor que otros centros?", answer: "Porque el personal docente está sumamente capacitado...", parent: "cat_elc" },
            q6: { question: "¿Qué comodidades brinda ELC?", answer: "Si se trata de clases presenciales, ELC cuenta con 5 amplias aulas...", parent: "main" },
            q7: { question: "¿Por qué elegir ELC para aprender inglés de forma virtual?", answer: "La experiencia de enseñar de forma presencial por más de 25 años...", parent: "cat_virtual" },
            q8: { question: "¿La plataforma virtual es también para los que toman clases presenciales?", answer: "La plataforma está diseñada tanto para quienes tomen el curso 100% virtual...", parent: "cat_virtual" }
        };

        const widgetWrapper = document.getElementById('elcWidget');
        const triggerBtn = document.getElementById('elcTrigger');
        const closeBtn = document.getElementById('elcCloseBtn');
        const chatBody = document.getElementById('elcChatBody');
        const typingIndicator = document.getElementById('elcTypingIndicator');
        let isTyping = false;
        let isInitialized = false;

        function toggleELCChat() {
            widgetWrapper.classList.toggle('active');
            if (!isInitialized) {
                initChat();
                isInitialized = true;
            }
        }

        triggerBtn.onclick = toggleELCChat;
        closeBtn.onclick = toggleELCChat;

        function initChat() {
            chatBody.innerHTML = '';
            showCategory('main');
        }

        function showCategory(catKey) {
            const node = elcFaqTree[catKey];
            appendMessage(node.message, 'bot');
            renderOptions(node.options);
        }

        function handleOptionClick(option) {
            if (isTyping) return;
            document.querySelectorAll('#elcChatBody .options-container').forEach(el => el.remove());
            appendMessage(option.label, 'user');

            isTyping = true;
            typingIndicator.classList.add('active');
            scrollToBottom();

            setTimeout(() => {
                typingIndicator.classList.remove('active');
                isTyping = false;
                const targetNode = elcFaqTree[option.target];

                if (targetNode.answer) {
                    appendMessage(targetNode.answer, 'bot');
                    renderOptions([
                        { label: "↩️ Otras preguntas de este tema", target: targetNode.parent },
                        { label: "🏠 Volver al Menú Principal", target: "main" }
                    ]);
                } else {
                    showCategory(option.target);
                }
                scrollToBottom();
            }, 600);
        }

        function renderOptions(optionsList) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';

            optionsList.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<span>${opt.label}</span><span style="font-size: 0.7rem;">➔</span>`;
                btn.onclick = () => handleOptionClick(opt);
                optionsContainer.appendChild(btn);
            });

            chatBody.appendChild(optionsContainer);
            scrollToBottom();
        }

        function appendMessage(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${sender}`;
            bubble.innerHTML = text;
            chatBody.appendChild(bubble);
            scrollToBottom();
        }

        function scrollToBottom() {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
})();