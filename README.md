

## Sobre o Projeto

O Letmeask é um aplicativo que permite a interação entre um palestrante/apresentador, onde seu público pode interagir com o assunto proposto por meio de perguntas realizado direto a ele.

No letmeask o palestrante/apresentador pode gerenciar as perguntas de acordo com o interesse do publico geral ou andamento da palestra, mensurando isso por meio dos likes aplicados à cada pergunta ou destaque aplicado a pergunta. Além disso, a aplicação possui uma interface que apresenta funcionalidades exclusivas do administrador, controladas pela autenticação do Firebase.


## Funcionalidades
- A aplicação apresenta as seguintes funcionalidades:
  - Criar salas para cada assunto.
  - Criar perguntas sobre o assunto.
  - Gerenciamento das perguntas pelo administrador.

## Como executar o projeto

### Pré-requisitos

Primeiramente, deve-se instalar as seguintes ferramentas:
  Git -> (https://git-scm.com)
  Node.js -> (https://nodejs.org/en/)
  
E um IDE de sua preferência, recomento o editor VSCode:
  VSCode -> (https://code.visualstudio.com/)
  
 ## Executando o projeto
 
 Clonando o projeto:
 
 Pela chave SSH:
 $ git clone <git@github.com:matuane/letMeAsk.git>
 
 Pelo link HTTPS:
 $ git clone <https://github.com/matuane/letMeAsk.git>
 
 Em seguida aplique o seguinte comando:
 
 $ cd letMeAsk
 
 Após, instale as dependências:
 $ yarn install
 
 Por fim, inicie a aplicação:
 
$ yarn start

## Observações
O projeto ainda está em desenvolvimento. Dessa forma para acessar a página de admin, deve-se adicionar "/admin" antes da url da sala selecionada, como no exemplo abaixo:
 - URL usuário comum:
  (http://localhost:3000/rooms/-Mv5_762N46TQHIWMlqU)
  ![image](https://user-images.githubusercontent.com/65567865/152603910-903ad896-eeaf-4707-99fd-8d4049a6cfc1.png)
  
- URL administrador:
  (http://localhost:3000/admin/rooms/-Mv5_762N46TQHIWMlqU)
  ![image](https://user-images.githubusercontent.com/65567865/152603997-7131219c-73ab-4da6-9e5e-fcc1f7c5db7e.png)


## 🛠 Tecnologias
O projeto utiliza das seguintes tecnologias:

- [Node.js]->(https://nodejs.org/en/)
- [React.js]->(https://nodejs.org/en/)
- [Typescript]->(https://www.typescriptlang.org/)
- [Material UI]->https://mui.com/pt/
- [Sass]->(https://sass-lang.com/)
- [FireBase]->(https://firebase.google.com/)

## Autor

Feito por [Mateus Antuane Gonçalves](https://github.com/matuane)
 
