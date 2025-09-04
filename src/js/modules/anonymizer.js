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
    const cpfRegex = /\b(?:\d{3}[.]?\d{3}[.]?\d{3}-?\d{2}|\d{11})\b/g;
    return text.replace(cpfRegex, (match) => {
        const cleaned = cleanDocument(match);
        if (cleaned.length === 11) {
            return `***.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-**`;
        }
        return match;
    });
}

/**
 * Anonimiza CNPJs em um texto, lidando com vários formatos.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com CNPJs mascarados.
 */
function _anonymizeCnpj(text) {
    const cnpjRegex = /\b(?:\d{2}[.]?\d{3}[.]?\d{3}\/?\d{4}-?\d{2}|\d{14})\b/g;
    return text.replace(cnpjRegex, (match) => {
        const cleaned = cleanDocument(match);
        if (cleaned.length === 14) {
            return `**.***.${cleaned.substring(5, 8)}/${cleaned.substring(8, 12)}-**`;
        }
        return match;
    });
}

/**
 * Anonimiza endereços de e-mail em um texto.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com e-mails mascarados.
 */
function _anonymizeEmail(text) {
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
    const whitelist = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", "Doutor", "Dra"];
    const nameRegex = /(?<=^|\s|["'(\-.,;¿¡])([A-ZÀ-ÿ][a-zà-ÿ']+)(?=$|\s|["')\-\].,;!?])/gu;

    return text.replace(nameRegex, (match, word) => {
        if (whitelist.includes(word)) {
            return word;
        }
        return `${word.charAt(0)}*`;
    });
}

/**
 * Anonimiza números de telefone em um texto.
 * @param {string} text - O texto de entrada.
 * @returns {string} - O texto com telefones mascarados.
 */
function _anonymizePhone(text) {
    const phoneRegex = /\b(?:\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}\b/g;
    
    return text.replace(phoneRegex, (match) => {
        const cleaned = match.replace(/\D/g, '');
        if (cleaned.length === 10 || cleaned.length === 11) {
            const ddd = cleaned.substring(0, 2);
            const lastFour = cleaned.substring(cleaned.length - 4);
            return `(${ddd}) *****-${lastFour}`;
        }
        return match;
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
    processedText = _anonymizePhone(processedText);
    
    if (options.anonymizeNames) {
        processedText = _anonymizeNames(processedText);
    }
    
    return processedText;
}