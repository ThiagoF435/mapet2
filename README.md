<h1>Instalação e execução</h1>

<b>Requisitos</b>
<ul>
<li>Node</li>
<li>GIT</li>
<li>XAMPP</li>
</ul>

Para conferir se o Node e o git estão instalados na sua máquina basta executar os seguintes comandos no CMD:

```
node --version
git --version
```

O resultados devem ser algo parecido com "v12.14.1" para o Node e "git version 2.25.1.windows.1" para o git

<h2>Instalar o Node</h2>
Caso não tenha o Node instalado, basta baixa-lo nesse site: https://nodejs.org/en/

<h2>Instalar o GIT</h2>
Caso não tenha o GIT instalado, basta seguir as instruções desse site: https://dicasdeprogramacao.com.br/como-instalar-o-git-no-windows/ 

<h2>Instalar o XAMPP</h2>
Caso não tenha o XAMPP instalado, basta baixa-lo nesse site: https://www.apachefriends.org/pt_br/index.html

<h2>Configurando o ambiente de trabalho</h2>

<h3>GIT</h3>
Faça a configuração da sua conta GIT utilizando os seguintes comandos:

```
git config --global user.name "Seu Nome Aqui"
git config --global user.email "Seu Email Aqui"
```

Com o GIT instalado e configurado, basta criar criar uma pasta e acessar ela através do CMD, para acessar uma pasta via CMD basta verificar se esta no disco desejado,
caso não esteja digite a letra do disco seguido de dois pontos. Por exemplo "D:" e pressione enter. E para acessar a pasta digite "cd "caminho da pasta" e pressione enter.
Dentro da pasta, execute o seguinte comando:

```
git clone https://gitlab.com/mapet1/mapet.git
```

<h3>Node Modules</h3>
Após isso o projeto inteiro já será baixado em uma pasta com o nome "mapet". Entre na pasta através do CMD, e execute o seguinte comando:

```
npm install
```

Esse comando instala todas as bibliotecas necessárias para executar o projeto.

<h3>MySQL</h3>
Ainda é preciso configurar e ligar o banco de dados, para isso  vá até o local onde o XAMPP foi instalado, normalmente "C:\xampp", execute 
o painel de controle "xampp-control" e clique no botão "Start" referente ao MySQL. Depois abra um CMD, e dentro da basta xampp navegue pelas
pastas mysql e depois bin. Dentro da basta bin execute o seguinte comando: 

```
mysql -u root
```

Esse comando ira acessar o MySQL através do CMD. Depois vá até a pasta do projeto, na pasta config > database > terá um arquivo txt chamado scrip.
Basta copiar todo o conteúdo do arquivo e executar no MySQL. Com isso você terá criado o banco de dados e todas as tabelas do projeto. É necessário
fazer isso após uma vez. Tendo isso feito você pode popular as tabelas através do site, ou do próprio CMD.

É necessário ligar o MySQL através do painel de controle <b>toda vez</b> que quiser abrir o projeto.

<h3>Executando o projeto</h3>
Finalmnente para executar o projeto, abra o CMD e navegue até a pasta "mapet" do projeto e digite o seguinte comando:

``` 
npm start
```

Uma mensagem de confirmação vai aparecer dizendo que o servidor esta online, agora para acessar o site basta ir no navegador e digitar "localhost".

<h1>Estrutura do projeto</h1>

O projeto esta estruturado seguindo os padrões MVC, dentro da pasta app tem as pastas controllers, models, public, routes e views. 

<ul>
<li>controllers: Contém os arquivos responsáveis por fazer a transição dos dados do frontend para o banco de dados</li>
<li>models: Contém os arquivos com as classes de acesso ao banco de dados, essas classes representam as entidades do projeto e executam os comandos MySQL</li>
<li>public: Contém todos os arquivos de frontend do projeto</li>
<li>routes: Contém todos os arquivos responsáveis por criar e executar as rotas do site</li>
<li>views: Contém todas as páginas do site</li>
</ul>

Ao criar ou editar qualquer arquivo, deve ser respeitado os padrões já presentes no projeto, como a organização das pastas e dos códigos.

<h1>Utilizando o GIT<h1>

Para atualizar sua versão local com a versão do github, primeiro garanta que esta na branch desejada. Para fazer isso acesse a pasta do projeto
pelo cmd e digite o comando:

```
git switch test 

ou

git switch master
```

Lembrando que a branch de desenvolvimento é a test, a master é para entrega final das sprints. Então prvavelmente você deverá usar a branch test para atualizar
seus arquivos locais. E pra fazer isso digite o comando:

```
git pull
```

Ao concluir alguma tarefa do projeto, é necessário enviar os arquivos que foram atualizados para a nuvem. Para isso basta executar os seguintes comandos:

```
git add .
git commit -m "O que esta sendo atualizado, por exemplo: Finalizado páginas de cadastro, listagem, e edição do usuário"
git push -u origin test
```

O comando "git add ." adiciona todos os arquivos que sofreram alteração para o commit, o comando "git commit" explica o que esta sendo enviado/atualizado. E o git
push envia os dados para a nuvem. Lembrem sempre de enviarem os arquivos para a branch "test". Para isso basta utilizar o comando acima "git push -u origin test".
<b>Não utilizar o comando</b> "git push -u origin master" pois ele vai enviar as alterações para a versão final do projeto. A versão final só deve ser alterada
a cada sprint. Ela será utilizada para a entrega semanal do projeto.

<h1>Sprint 5</h1>

O que foi feito pela equipe backend para a Sprint 5
- Corrigiu cadastro e edição dos animais (pets)
- Corrigiu cadastro e edição da agenda 
- Colocado link pro dono, pet e veterinário na agenda e no histórico
- Mudanças em todo o banco de nome e sobrenome para apenas nome
- Edição das datas, agora são exibidas de forma mais simples e agradável (mas ainda em inglês)
- Corrigido crash do site ao tentar deletar dados conectados
- É possível visualizar todas as consultas de determinado pet em sua página de visualizar
- Página de listar, visualizar e pesquisar o histórico. Não foi feito editar ou deletar pois não seria certo poder editar ou deletar históricos, por serem documentos

Anotações para discutir com o Fernando na entrega da Sprint 5
- Sobre mudar a linguagem da data, pois é um sistema limitado do próprio HTML que não tem suporte para o português

O que precisa ser arrumado pela equipe front para a sprint 5
- Padronizar todas as tabelas de listar como esta na tabela agenda/histórico
- Alinhar a página editar dos animais (pets)
- Alinhar a página cadastrar dos funcionários 
- Aumentar a combobox do dono na página de cadastro do animal (pet)

