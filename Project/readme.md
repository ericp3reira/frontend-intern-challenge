# Desafio Chaordic - Estagiário Front-End

Aprendi bastante o fazendo o desafio da landing page com um encurtador de links. Foi uma ideia genial.

## Instruções

- Baixe ou clone este repositório;
- No terminal, vá até a pasta onde está o repositório e execute:
  - ``npm start`` para rodar a versão dev, ou
  - ``npm run build`` para produzir e rodar a versão final;
- Vá para http://localhost:8080/ no seu navegador.

## Tecnologias Usadas

Como é um site simples, decidi fazer o desafio sem usar frameworks ou bibliotecas e usando ES6, como um desafio próprio.
Para a versão final foram usadas estas tecnologias:

- HTML5, CSS3 e ES6;
- Flexbox - a responsividade foi feita sem usar media query, apenas usando flexbox e dimensões máximas;
- NPM - para instalação dos pacotes e automação;
- Grunt - para a automação da build final:
  - Babel - para fazer o transpiler do ES6;
  - grunt-cssmin e grunt-htmlmin - minificação do CSS e do HTML;
  - grunt-uglify - minificação do JS, depois de passar pelo Babel;
- Http-server - um servidor simples para poder "chamar" o JSON.