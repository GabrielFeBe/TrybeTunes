# TybeTunes

## Descrição

O **TrybeTunes** é um site de preview de músicas, permitindo aos usuários pesquisar álbuns, visualizar suas músicas associadas e favoritar aquelas que mais gostam. Além disso, o site conta com três páginas principais: Favorites, Search e Profile. A primeira página é dedicada ao login ou registro, proporcionando aos usuários uma experiência personalizada.

## Funcionalidades Principais

1. **Login e Registro:**

   - Os usuários podem realizar o login com suas credenciais existentes ou se registrar para obter uma nova conta.

2. **Páginas Principais:**

   - **Favorites:** Lista de músicas favoritas do usuário, permitindo fácil acesso e gerenciamento.
   - **Search:** Página para pesquisar álbuns e visualizar suas respectivas músicas.
   - **Profile:** Exibição das informações do perfil do usuário.

3. **Favoritar Músicas:**

   - Os usuários podem favoritar ou desfavoritar músicas. Músicas favoritas são exibidas na página Favorites.

4. **Redux para Gerenciamento de Estado:**

   - Utiliza Redux para otimizar a experiência do usuário, garantindo que as requisições de perfil e músicas favoritas sejam feitas apenas uma vez.

5. **Back-End:**

   - Um servidor back-end está integrado para armazenar informações de perfil e músicas favoritas.

6. **Estilização com Sass:**
   - O projeto utiliza Sass para uma estilização eficiente e modular.

## Instalação

1.  **Pré-requisitos:**

    - Certifique-se de ter o Node.js instalado.
    - Clone o repositório: `git clone git@github.com:GabrielFeBe/TrybeTunes.git`

2.  **Instalação de Dependências:**
    ```bash
    cd TrybeTunes
    npm install
    ```
3.  **Configuração do Back-End:**
    - Esse repositorio vai ter as especificações para o front-end, para o back-end, acesse o repositorio [TrybeTunes-Back-End](https://github.com/GabrielFeBe/TrybeTunes-BE) e siga as instruções de instalação.
    - Mesmo assim você tem que configurar o font-end para que ele acesse o url do back-end, o arquivo com essa configuração é o `src/services/variables.js`, nele você vai encontrar uma variavel chamada `apiEndPoint`, nela você deve colocar o url do seu back-end.
4.  **Execução do Projeto:**
    ```bash
    npm start
    ```
    - O site estará disponível em `http://localhost:3000`

## Tecnologias Utilizadas

- React.js
- Redux
- Sass

## Limitações do Projeto

- Eu não quis me aprofundar muito, já que ele usa tecnologias depreciadas, logo um usuario só consegue ver seu proprio perfil, não tem como ver o perfil de outros usuarios, e não tem como ver as musicas favoritas de outros usuarios.
