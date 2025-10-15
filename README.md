# ⚡ Plataforma EnergyFlow

Plataforma web de **monitoramento e gerenciamento energético** com foco em **eficiência energética**.  
O principal objetivo é permitir o **monitoramento em tempo real** do consumo de energia, ajudando usuários e empresas a otimizar o uso e reduzir custos.

---

## 🗂 Estrutura do Repositório

- **database/** 
  - `logico.png` → Modelo lógico do banco de dados  
  - `script.sql` → Script SQL com os `CREATE` e `INSERT` 

- **modeling/**  
  - `bpmn.png` → Modelagem de processos BPMN   
  - `caso_de_uso.png` → Diagrama de casos de uso  

- **website/**  
  - Arquivos `.html` → Páginas
  - **src/**  
    - **javascript/** → Scripts JS do site  
    - **php/** → Arquivos PHP do site  
    - **styles/** → Arquivos CSS do site  

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript**  
- **PHP**  
- **MySQL** (via **XAMPP** para ambiente local)

---

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/queren-alves/energyflow.git
   ```

2. **Instale e inicie o XAMPP:**
   - Inicie o **Apache** e o **MySQL** pelo painel do XAMPP.  
   - Coloque a pasta do projeto dentro do diretório `htdocs` do XAMPP.  
     Exemplo:  
     ```
     C:\xampp\htdocs\energyflow
     ```

3. **Crie o banco de dados:**
   - Acesse o **phpMyAdmin** em [http://localhost/phpmyadmin](http://localhost/phpmyadmin)  
   - Crie um banco de dados chamado `energyflow`  
   - Importe o arquivo SQL do projeto: [testes/energyflow.sql](./testes/energyflow.sql)


4. **Execute o projeto:**
   - No navegador, acesse:
     ```
     http://localhost/energyflow/website/index.html
     ```

---

## 🔋 Funcionalidades

- ✅ Cadastro de usuários  
- ✅ Autenticação de login  
- 🚧 Monitoramento energético em tempo real *(em desenvolvimento)*  
- 🚧 Painel de controle com estatísticas e alertas *(em breve)*  

---

## 🖼️ Prévia do Projeto

> Hero da Landing Page:

![Tela inicial do EnergyFlow](https://i.imgur.com/BpMhuWG.gif)

---

## 👤 Desenvolvedores
André Valério, Geovana Ogawa , João Rafael, Nádia Nayara, Quéren Alves e Victor Henrique.
