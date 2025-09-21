# 🌐 Serverless Framework

## 📋 Descrição do Projeto

Implementação de API Gateway utilizando **Serverless Framework** para orquestração de duas funções Lambda para consulta de dados externos

- **🌍 API IBGE**: Consulta dados de municípios da API do IBGE
- **📮 API ViaCEP**: Consulta informações de endereços a partir de CEPs

## 🏗️ Arquitetura

![Diagrama de Arquitetura](/assets/localstack.excalidraw.png)
*Diagrama da arquitetura serverless com API Gateway, Lambda Functions, Redis, Docker e LocalStack*

## 🛠️ Tecnologias Utilizadas

- **Serverless Framework**: Framework para deploy e gestão de funções serverless
- **LocalStack**: Simulação local dos serviços AWS
- **Redis**: Cache em memória para otimização de performance
- **Docker**: Containerização do ambiente

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

### Execução Local
1. **Iniciar Redis:**
   ```bash
   docker-compose up redis -d
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Execução local do API Gateway e Funções Lambda:**
   ```bash
   npm run dev:gateway
   ```


### LocalStack: Endpoints Disponíveis

- **GET** `http://localhost:4566/restapis/{api_gateway_id}/local/_user_request_/ibge/{cidade}/{uf}`
- **GET** `http://localhost:4566/restapis/{api_gateway_id}/local/_user_request_/cep/{cep}`

## ⚙️ Configuração

### Variáveis de Ambiente

As funções esperam as variáveis de ambiente declaradas no arquivo `.env.example`:

```
VIACEP_API=
IBGE_API=
MODE=
REDIS_HOST=
```

## 🎯 Funcionalidades

### API IBGE
- Consulta dados de municípios brasileiros
- Cache de resultados em Redis
- Parâmetros: `{cidade}` e `{uf}`

### API ViaCEP
- Consulta endereços por CEP
- Cache de resultados em Redis
- Parâmetro: `{cep}`
