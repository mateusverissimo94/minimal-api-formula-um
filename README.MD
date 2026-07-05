# 🏁 F1 API — Fastify & TypeScript

Uma API RESTful compacta, performática e elegantemente tipada, desenvolvida em **Node.js** utilizando o framework **Fastify** e **TypeScript** para gerenciar escuderias e pilotos do universo da Fórmula 1.

Este projeto foi estruturado seguindo as melhores práticas de desenvolvimento backend, destacando o uso rigoroso de tipos estáticos, tratamento assíncrono de requisições e respostas com status HTTP semânticos — ideal para demonstrar habilidades fundamentais em arquiteturas de APIs para recrutadores e processos seletivos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução assíncrono orientado a eventos.
- **Fastify**: Framework focado em altíssima performance, velocidade e baixo overhead.
- **TypeScript**: Superconjunto JavaScript que adiciona tipagem estática e segurança em tempo de desenvolvimento.
- **@fastify/cors**: Middleware oficial para configuração e proteção de políticas de compartilhamento de recursos de origens diferentes (CORS).

---

## 🧠 Arquitetura e Persistência de Dados

Para manter o foco na agilidade das rotas e na validação de tipos, **esta API não se conecta a um banco de dados externo**. Os dados são mantidos e manipulados diretamente **em memória (In-Memory)** por meio de arrays dinâmicos (`let teams` e `let drivers`).

> **💡 Nota de Engenharia:** A geração de chaves primárias (`id`) adota uma estratégia de auto-incremento resiliente e dinâmica:
>
> ```typescript
> const nextId = teams.length > 0 ? Math.max(...teams.map((t) => t.id)) + 1 : 1;
> ```
>
> Essa abordagem garante a integridade dos dados e previne colisões ou duplicações de IDs, mesmo se o banco em memória sofrer sucessivas deleções (`DELETE`).

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (Versão 18 LTS ou superior recomendada)
- Um gerenciador de pacotes (`npm` ou `yarn`)

### 1. Clonar o Repositório e Instalar as Dependências

```bash
# Clone o projeto
git clone [https://github.com/mateusverissimo94/minimal-api-formula-um.git](https://github.com/mateusverissimo94/minimal-api-formula-um.git)

# Acesse a pasta do projeto
cd nome-do-repositorio
```
