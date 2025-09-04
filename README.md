---

# Webapp de Caixa de Ferramentas

Este é um webapp que reúne um conjunto de ferramentas de utilidade para processamento de dados do lado do cliente.

**Acesse a versão online:** [https://SEU-USUARIO.github.io/toolbox-app/](https://SEU-USUARIO.github.io/toolbox-app/)
*(Substitua `SEU-USUARIO` e `toolbox-app` pelo seu usuário e nome do repositório no GitHub).*

---

## Módulo Inicial: Anonimizador de Texto

O primeiro módulo disponível é um anonimizador de texto que processa e mascara dados sensíveis diretamente no navegador.

### Funcionalidades

Anonimiza os seguintes dados contidos em um texto:

*   **Nomes Próprios:** Converte `João da Silva` para `J* da S*`. Esta funcionalidade é opcional e pode ser desativada na interface.
*   **CPF e CNPJ:** Detecta múltiplos formatos (com ou sem pontuação) e aplica uma máscara de segurança que preserva parte da informação para referência (ex: `***.456.789-**`).
*   **E-mails:** Aplica uma máscara que oculta a maior parte do usuário e do provedor, mantendo a extensão do domínio (ex: `t*@g*.com`).

## Tecnologias Utilizadas

*   **HTML5**
*   **Tailwind CSS** (utilizado via CDN para prototipagem rápida)
*   **JavaScript (ES6 Modules)**

## Princípios do Projeto

1.  **Processamento Local (Client-Side):** Nenhum dado inserido no webapp é enviado para servidores externos. Todo o processamento ocorre no navegador do usuário, garantindo a privacidade e a segurança das informações.
2.  **Arquitetura Modular:** O código JavaScript é estruturado em módulos independentes (localizados em `src/js/modules/`) para facilitar a manutenção e a futura adição de novas ferramentas.
3.  **Publicação via GitHub Pages:** O projeto é hospedado de forma estática, garantindo acesso público e gratuito.

## Como Executar Localmente

Não há dependências ou processos de build complexos. Para executar o projeto em sua máquina local:

1.  Clone o repositório:
    ```bash
    git clone https://github.com/SEU-USUARIO/toolbox-app.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd toolbox-app
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador.

Para uma melhor experiência de desenvolvimento, recomenda-se o uso de um servidor local, como a extensão "Live Server" para o Visual Studio Code.

## Estrutura de Arquivos

```
/
├── index.html          # Arquivo principal da interface do usuário (UI)
├── README.md           # Documentação do projeto
└── src/
    └── js/
        ├── modules/
        │   └── anonymizer.js # Lógica de negócio do módulo anonimizador
        └── main.js           # Script principal que coordena a UI e os módulos
```

## Como Contribuir

Contribuições são bem-vindas. Para sugestões de novas ferramentas ou para reportar bugs, por favor, abra uma **Issue** neste repositório.