
> [!NOTE]
> A configuração atual está focada no processamento de arquivos `.js`.

# Configuração do Webpack com .NET MVC

Este projeto demonstra como integrar o Webpack ao .NET MVC para gerenciar arquivos JavaScript, o objetivo é realizar a transpilação desses arquivos.

---

## Estrutura de Arquivos de Configuração

- `./Components/Webpack.js`
- `./package.json`
- `./webpack.config.js`
- `./webpack.view.config.js`
- `./webpack.controller.config.js`

---

## Configuração de Pastas

Para começar a utilizar o Webpack com seu projeto .NET MVC, siga os passos abaixo:

1. **Crie a estrutura básica de pastas:**
   - Na raiz do projeto, crie uma pasta chamada `Src`.
   - Dentro da pasta `Src`, crie uma subpasta chamada `js`. Esta pasta será usada para organizar os arquivos JavaScript de cada View.

2. **Organize os arquivos por controller:**
   - Cada subpasta dentro de `js` deve corresponder a um controller do projeto.

---
### Exemplo de Estrutura de Pastas
1. **HomeController**
   - ./Controllers/HomeController.cs
   - ./Views/Home/Index.cshtml
   - ./Views/Home/Privacy.cshtml 
2. **Arquivos JavaScript**
   - ./Src/js/*.js ([Arquivos Carregados em Todas as Páginas]())
   - ./Src/js/Home([Nome da View]())/*.js ([Arquivos carregados em todas as Views do controller Home]())
   - ./Src/js/Home([Nome da View]())/Index([Nome da Action]())/*.js ([arquivos carregados apenas na view da action Index]())
   - ./Src/js/Home([Nome da View]())/Privacy([Nome da Action]())/*.js` ([arquivos carregados apenas na view da action]())
---
### Importação dos Scripts nas Views
No seu arquivo "./Views/Shared/_Layout.cshtml" adicione o seguinte código:
```plaintext
<!-- 1 Carrega os arquivos em todas as Views; 2 Carrega os arquivos em todas as View de um mesmo grupo; 3 Carrega os arquivos especificos de cada View --> 
@await Component.InvokeAsync("Webpack", 1) 
@await Component.InvokeAsync("Webpack", 2)
@await Component.InvokeAsync("Webpack", 3)
```

---

## Instalação e Configuração

### Passo 1: Instalar Dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

### Passo 2: Iniciar o Servidor do Webpack

Use o comando abaixo para iniciar o servidor de desenvolvimento do Webpack (Se precisar criar mais arquivos na pasta "./Src" sera necessario parar o servidor npm e iniciar ele novamente):

```bash
npm start
```

---

Com essa configuração, você poderá gerenciar facilmente seus arquivos JavaScript no projeto .NET MVC.
