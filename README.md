# Webapp de Caixa de Ferramentas

Este é um webapp que reúne um conjunto de ferramentas de utilidade para processamento de dados do lado do cliente.

**Acesse a versão online:** [https://ihidakleber.github.io/toolbox-app/](https://ihidakleber.github.io/toolbox-app/)


---

## Módulo Inicial: Anonimizador de Texto

O primeiro módulo disponível é um anonimizador de texto que processa e mascara dados sensíveis diretamente no navegador.

### Funcionalidades Atuais

Anonimiza os seguintes dados contidos em um texto:

*   **Nomes Próprios:** Converte `João da Silva` para `J* da S*`. Esta funcionalidade é opcional e pode ser desativada na interface.
*   **CPF e CNPJ:** Detecta múltiplos formatos (com e sem pontuação, incluindo versões apenas com dígitos) e aplica uma máscara de segurança.
*   **E-mails:** Aplica uma máscara que oculta a maior parte do usuário e do provedor (ex: `t*@g*.com`).
*   **Telefones:** Detecta números de telefone (fixo e celular) com diferentes formatações e aplica a máscara `(XX) *****-XXXX`.

### Limitações Conhecidas e Pontos de Atenção

> **IMPORTANTE:** A ferramenta é um auxílio e a **revisão humana do resultado final é essencial**. A versão atual possui as seguintes limitações conhecidas:

*   **Nomes e Palavras Capitalizadas:** A anonimização é intencionalmente rigorosa e pode incluir nomes de empresas ou a primeira palavra de uma frase.
*   **Conflito entre CPF e Celular:** Números de celular com 11 dígitos sem formatação (ex: `11987654321`) podem ser incorretamente anonimizados como um CPF, pois a regra de CPF tem prioridade.
*   **Formatos não Reconhecidos:** CPFs que usam espaços como separador (ex: `111 222 333-44`) não são detectados no momento.
*   **Dados Não Tratados:** A versão atual não anonimiza RGs, CNHs, endereços, CEPs, placas de veículos, dados bancários, endereços de IP, entre outros.

## Tecnologias Utilizadas

*   **HTML5**
*   **Tailwind CSS** (utilizado via CDN)
*   **JavaScript (ES6 Modules)**

## Princípios do Projeto

1.  **Processamento Local (Client-Side):** Nenhum dado inserido no webapp é enviado para servidores externos. Todo o processamento ocorre no navegador do usuário.
2.  **Arquitetura Modular:** O código JavaScript é estruturado em módulos para facilitar a manutenção e a adição de novas ferramentas.
3.  **Publicação via GitHub Pages:** O projeto é hospedado de forma estática, garantindo acesso público e gratuito.

## Como Executar Localmente

1.  Clone o repositório.
2.  Abra o arquivo `index.html` no seu navegador.

Para uma melhor experiência (e para garantir que APIs como a de copiar funcionem), recomenda-se o uso de um servidor local, como a extensão "Live Server" para o Visual Studio Code.

## Como Contribuir

Sugestões e contribuições são bem-vindas. Para reportar bugs ou sugerir novas funcionalidades, por favor, abra uma **Issue** neste repositório. Contribuições que ajudem a resolver as "Limitações Conhecidas" são especialmente apreciadas.