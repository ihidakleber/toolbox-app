/**
 * Remove pontuações de uma string de documento (CPF/CNPJ).
 * @param {string} doc - A string do documento.
 * @returns {string} - O documento contendo apenas dígitos.
 */
const cleanDocument = (doc) => doc.replace(/[.\-/]/g, '');

/**
 * Anonimiza CPFs em um texto, lidando com vários formatos.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com CPFs mascarados.
 */
function _anonymizeCpf(text) {
    // Regex para encontrar sequências que parecem CPFs (11 dígitos com pontuação opcional)
    const cpfRegex = /\b\d{3}[.]?\d{3}[.]?\d{3}[-]?\d{2}\b/g;
    return text.replace(cpfRegex, (match) => {
        const cleaned = cleanDocument(match);
        if (cleaned.length === 11) {
            return `***.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-**`;
        }
        return match; // Se não for um CPF válido, retorna o original
    });
}

/**
 * Anonimiza CNPJs em um texto, lidando com vários formatos.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com CNPJs mascarados.
 */
function _anonymizeCnpj(text) {
    // Regex para encontrar sequências que parecem CNPJs (14 dígitos com pontuação opcional)
    const cnpjRegex = /\b\d{2}[.]?\d{3}[.]?\d{3}[\/]?\d{4}[-]?\d{2}\b/g;
    return text.replace(cnpjRegex, (match) => {
        const cleaned = cleanDocument(match);
        if (cleaned.length === 14) {
            return `**.***.${cleaned.substring(5, 8)}/${cleaned.substring(8, 12)}-**`;
        }
        return match; // Se não for um CNPJ válido, retorna o original
    });
}

/**
 * Anonimiza endereços de e-mail em um texto.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com e-mails mascarados.
 */
function _anonymizeEmail(text) {
    // Regex para encontrar padrões de e-mail
    const emailRegex = /([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\.([a-zA-Z0-9_.-]+)/gi;
    return text.replace(emailRegex, (match, user, domain, extension) => {
        const maskedUser = user.charAt(0) + '*';
        const maskedDomain = domain.charAt(0) + '*';
        return `${maskedUser}@${maskedDomain}.${extension}`;
    });
}

/**
 * Anonimiza nomes próprios em um texto.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com nomes mascarados no formato J*.
 */
function _anonymizeNames(text) {
    // Lista de palavras a ignorar (nomes comuns que podem ser substantivos, etc.)
    const whitelist = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Doutor", "Dra"];
    // Regex para encontrar palavras que começam com maiúscula
    const nameRegex = /\b[A-ZÀ-ÿ][a-zà-ÿ']+\b/g;

    return text.replace(nameRegex, (match) => {
        if (whitelist.includes(match)) {
            return match; // Não anonimiza se estiver na lista
        }
        return `${match.charAt(0)}*`;
    });
}

/**
 * Função principal exportada. Executa todas as anonimizações.
 * @param {string} text - O texto original.
 * @param {object} options - As opções de anonimização.
 * @param {boolean} options.anonymizeNames - Se deve ou não anonimizar nomes.
 * @returns {string} - O texto completamente anonimizado.
 */
export function anonymizeText(text, options) {
    let processedText = text;

    processedText = _anonymizeCpf(processedText);
    processedText = _anonymizeCnpj(processedText);
    processedText = _anonymizeEmail(processedText);
    
    if (options.anonymizeNames) {
        processedText = _anonymizeNames(processedText);
    }
    
    return processedText;
}