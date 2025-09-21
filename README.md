# 🌐 Serverless Framework 

## 📋 Descrição do Projeto

Implementação de arquitetura **Serverless** utilizando o **Serverless Framework** para orquestração de funções **AWS Lambda**, expostas via **API Gateway**.

A arquitetura é complementada por **Redis** para cache de respostas e pelo **LocalStack**, que provê a simulação local dos serviços AWS.

* **📊 API IBGE**: Consulta dados de municípios brasileiros via API pública do IBGE
* **📮 API ViaCEP**: Consulta endereços a partir de CEPs via API pública do ViaCEP


## ☁️ Serviços AWS LocalStack
* **Amazon API Gateway** → Gerencia a exposição de endpoints REST
* **AWS Lambda (Node.js)** → Executa a lógica de integração com serviços externos
* **Amazon CloudWatch** → Registro e monitoramento de logs de execução

## 🏗️ Arquitetura

![Diagrama de Arquitetura](/assets/localstack.excalidraw.png)
*Arquitetura serverless com API Gateway, Lambda Functions, Redis, Docker e LocalStack*

## 🛠️ Tecnologias Utilizadas

* **Serverless Framework** → Gerenciamento de funções e recursos
* **LocalStack** → Simulação de serviços AWS
* **Redis** → Cache de dados em memória
* **Docker** → Orquestração de containers


## 🚀 Execução

### Deploy AWS LocalStack
1. **Iniciar LocalStack e Redis:**
   ```bash
   docker-compose up -d
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Deploy das funções no LocalStack:**
   ```bash
   npx serverless deploy --stage local
   ```

### Execução Local (Serverless Offline)

1. **Iniciar Redis**

   ```bash
   docker-compose up redis -d
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Executar localmente o API Gateway e as Lambdas**

   ```bash
   npm run dev:gateway
   ```

## 📡 LocalStack: Endpoints Disponíveis

* **GET** `http://localhost:4566/restapis/{api_gateway_id}/local/_user_request_/ibge/{cidade}/{uf}`
* **GET** `http://localhost:4566/restapis/{api_gateway_id}/local/_user_request_/cep/{cep}`


## ⚙️ Configuração

### Variáveis de Ambiente: Disponíveis em (`.env.example`)

```
VIACEP_API=https://viacep.com.br/ws
IBGE_API=https://servicodados.ibge.gov.br/api/v1
MODE=#deploy ou development
REDIS_HOST=redis://redis:6379
```

## 🎯 Funcionalidades

### API IBGE

* Consulta dados de municípios brasileiros
* Implementa cache em Redis
* Parâmetros: `{cidade}`, `{uf}`

### API ViaCEP

* Consulta endereços por CEP
* Implementa cache em Redis
* Parâmetro: `{cep}`
