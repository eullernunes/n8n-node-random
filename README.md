# n8n Random Node (Custom Connector)

Este projeto implementa um **conector customizado para o n8n** chamado **Random**, que utiliza a [API do Random.org](https://www.random.org/) para gerar números aleatórios entre um valor mínimo e máximo definidos pelo usuário.

---

##  Pré-requisitos

Antes de iniciar, instale em sua máquina:

- [Docker + Docker Compose](https://docs.n8n.io/hosting/installation/docker/)
- (Opcional) [Node.js 22 (LTS)](https://nodejs.org/) — apenas se quiser compilar o custom node fora do container.
- (Opcional) [WSL 2 (Windows Subsystem for Linux)](https://learn.microsoft.com/pt-br/windows/wsl/install) — caso esteja rodando em Windows

---


##  Configurar o ambiente

Crie um arquivo `.env` na raiz do projeto, voce pode utilizar esse exemplo:
https://github.com/n8n-io/n8n-hosting/blob/main/docker-compose/withPostgres/.env



##  Instalar as dependências

```bash
cd custom-nodes/n8n-nodes-random
rm -rf node_modules package-lock.json dist
docker run --rm -v "$PWD":/app -w /app node:22 bash -lc "npm install && npm run build"
```

Isso gera os arquivos em `dist/`.

##  Executar o serviço localmente

Na raiz do projeto, suba o ambiente:

```bash
docker compose up -d 
```

- O **n8n** ficará disponível em [http://localhost:5678](http://localhost:5678).  
- O **Postgres** será usado como banco de dados persistente.


Para parar os serviços:

```bash
docker compose down
```

##  Executar os testes

1. Acesse o editor em [http://localhost:5678](http://localhost:5678).  
2. Crie um novo workflow.  
3. Adicione o node **Random**.  
4. Configure os parâmetros:  
   - **Min**: valor inteiro mínimo  
   - **Max**: valor inteiro máximo  
5. Clique em **Execute Node**.  



## ℹ️ Informações adicionais

- n8n: v1.85.4  
- Postgres: v16  
- Node.js: v22 (LTS)  