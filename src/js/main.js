// Importa a função principal do nosso módulo de anonimização
import { anonymizeText } from './modules/anonymizer.js';

// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELEÇÃO DOS ELEMENTOS DO HTML
    const inputTextarea = document.getElementById('input-text');
    const outputTextarea = document.getElementById('output-text');
    const anonymizeBtn = document.getElementById('anonymize-btn');
    const copyBtn = document.getElementById('copy-btn');
    const toggleNamesCheckbox = document.getElementById('toggle-names');

    // 2. FUNÇÃO COORDENADORA DA ANONIMIZAÇÃO
    const handleAnonymize = () => {
        const originalText = inputTextarea.value;

        if (originalText.trim() === '') {
            outputTextarea.value = 'Por favor, insira um texto para anonimizar.';
            return;
        }

        // Verifica o estado do checkbox para decidir se anonimiza nomes
        const options = {
            anonymizeNames: toggleNamesCheckbox.checked
        };
        
        // Chama a função importada do módulo, passando o texto e as opções
        const anonymizedResult = anonymizeText(originalText, options);

        // Exibe o resultado na área de saída
        outputTextarea.value = anonymizedResult;
    };

    // 3. FUNÇÃO PARA COPIAR O RESULTADO (sem alterações na lógica)
    const handleCopy = () => {
        const textToCopy = outputTextarea.value;
        if (textToCopy.trim() === '' || textToCopy === 'Por favor, insira um texto para anonimizar.') {
            return;
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                const originalBtnText = copyBtn.innerText;
                copyBtn.innerText = 'Copiado!';
                copyBtn.classList.add('bg-green-600');
                setTimeout(() => {
                    copyBtn.innerText = originalBtnText;
                    copyBtn.classList.remove('bg-green-600');
                }, 2000);
            })
            .catch(err => {
                console.error('Falha ao copiar o texto: ', err);
                alert('Não foi possível copiar o texto.');
            });
    };

    // 4. ADICIONANDO OS "OUVINTES" DE EVENTOS
    anonymizeBtn.addEventListener('click', handleAnonymize);
    copyBtn.addEventListener('click', handleCopy);
});