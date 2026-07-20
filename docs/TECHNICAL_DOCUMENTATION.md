# KIANDA BUILDER AI — Documentação Técnica

> **Slogan:** "Uma única plataforma para criar, integrar, automatizar e transformar qualquer ideia em realidade digital."
>
> **Owner:** Ednevs · **Timezone:** Africa/Luanda (UTC+1) · **Versão:** 1.0.0
>
> **Data de criação:** 20 de Julho de 2026

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Arquitectura do Sistema](#2-arquitectura-do-sistema)
3. [Modelo de Dados (Entidades)](#3-modelo-de-dados-entidades)
4. [Funções Backend (Referência de API)](#4-funções-backend-referência-de-api)
5. [Templates de Módulos Pré-configurados](#5-templates-de-módulos-pré-configurados)
6. [Política de Operação (.agents/rules/kianda_policy.md)](#6-política-de-operação)
7. [Identidade do Agente](#7-identidade-do-agente)
8. [Estrutura de Ficheiros](#8-estrutura-de-ficheiros)
9. [Exemplos de Uso (API)](#9-exemplos-de-uso-api)
10. [Limitações Conhecidas](#10-limitações-conhecidas)
11. [Roadmap](#11-roadmap)

---

## 1. Visão Geral

O **KIANDA BUILDER AI** é uma plataforma universal de desenvolvimento inteligente que funciona como um "Sistema Operativo de Desenvolvimento". Construído sobre a plataforma **Base44**, o sistema permite que um utilizador descreva qualquer projecto digital em linguagem natural (Português ou Inglês) e a plataforma automaticamente:

- **Analisa** o pedido e determina a abordagem técnica
- **Selecciona** os módulos necessários (CRM, RH, Contabilidade, etc.)
- **Coordena** agentes especializados silenciosamente em segundo plano
- **Consolida** todos os resultados num único produto funcional
- **Apresenta** apenas o resultado final optimizado ao utilizador

### Princípios de Design

| Princípio | Descrição |
|-----------|-----------|
| **Coordenação Silenciosa** | Os agentes especializados trabalham em segundo plano; o utilizador vê apenas o resultado final |
| **Confirmação antes de Execução** | Projectos de grande escala (ERP completo, multi-módulos) requerem confirmação do spec antes da geração |
| **Versionamento** | Nunca sobrescrever uma app publicada sem confirmação explícita |
| **Funcionalidades Nativas Activas** | PDF, Excel, Email, Assinatura Digital, Dashboards — tudo activo por defeito |
| **Honestidade Técnica** | Limitações claramente comunicadas (sem apps móveis nativas, sem vídeos realistas) |

---

## 2. Arquitectura do Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    KIANDA BUILDER AI (Superagent)                │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ Identity │  │  Rules   │  │  Memory  │  │ Platform Skills  │ │
│  │IDENTITY  │  │kianda_   │  │memory.md │  │ (browser, AI     │ │
│  │  .md     │  │policy.md │  │          │  │  gen, search...) │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Camada de Dados                        │    │
│  │  ┌─────────┐  ┌──────────────┐  ┌───────────┐           │    │
│  │  │ Project │  │ModuleTemplate│  │SubAgentLog│           │    │
│  │  └─────────┘  └──────────────┘  └───────────┘           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Funções Backend (HTTP endpoints)            │    │
│  │  ┌─────────────┐  ┌──────────────────┐  ┌──────────────┐ │    │
│  │  │createProject│  │getProjectDashboard│ │processFile   │ │    │
│  │  │             │  │                  │  │Import        │ │    │
│  │  └─────────────┘  └──────────────────┘  └──────────────┘ │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Agentes Especializados (Sub-agents)          │    │
│  │  RH · Contabilidade · Fiscalidade · Auditoria · Logística│    │
│  │  Compras · Stock · Jurídico · BI · CRM · ERP · Facturação│    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Plataforma Base44                             │
│  Deno Runtime · MongoDB · CDN · OAuth · Workflows · Browser     │
└─────────────────────────────────────────────────────────────────┘
```

### Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Runtime** | Deno (serverless functions) |
| **SDK** | `@base44/sdk@0.8.31` |
| **Base de Dados** | MongoDB (via Base44 entities) |
| **Identidade** | Base44 Superagent identity system |
| **Funções Backend** | Deno.serve HTTP endpoints |
| **Browser Automation** | Browserbase (navegação, screenshots, scraping) |
| **Geração de Imagens** | AI image generation (Base44 nativo) |
| **Transcrição de Áudio** | Whisper (speech-to-text) |
| **Timezone** | Africa/Luanda (UTC+1) |

---

## 3. Modelo de Dados (Entidades)

O sistema possui 3 entidades que formam a base de dados do KIANDA BUILDER AI. Todas as entidades herdam automaticamente os campos de sistema: `id`, `created_date`, `updated_date`, `created_by`.

### 3.1 — Entidade: `Project`

Regista todos os projectos criados pela plataforma. Cada projecto representa uma aplicação, website, sistema empresarial ou automação.

| Campo | Tipo | Obrigatório | Valores Possíveis / Descrição |
|-------|------|-------------|-------------------------------|
| `name` | `string` | ✅ | Nome do projecto |
| `project_type` | `string` (enum) | ✅ | `Website`, `Web App`, `PWA`, `ERP`, `CRM`, `HR`, `Accounting`, `Invoicing`, `SaaS`, `API`, `Automation`, `E-commerce`, `Other` |
| `status` | `string` (enum) | ✅ | `Spec`, `Building`, `Testing`, `Published`, `Paused`, `Completed` |
| `description` | `string` | — | Descrição textual do projecto |
| `specifications` | `object` (JSON) | — | Especificação técnica estruturada (módulos, entidades, features) |
| `features_activated` | `array<string>` | — | Lista de funcionalidades nativas activas (ex: `["PDF export", "Email", "Digital signature"]`) |
| `external_link` | `string` | — | URL da aplicação publicada (preenchido na fase `Published`) |
| `version` | `string` | — | Versão semântica (default: `"1.0.0"`) |

**Schema JSON:**
```json
{
  "type": "object",
  "required": ["name", "project_type", "status"],
  "properties": {
    "name": { "type": "string" },
    "project_type": {
      "type": "string",
      "enum": ["Website", "Web App", "PWA", "ERP", "CRM", "HR",
               "Accounting", "Invoicing", "SaaS", "API", "Automation",
               "E-commerce", "Other"]
    },
    "status": {
      "type": "string",
      "enum": ["Spec", "Building", "Testing", "Published", "Paused", "Completed"]
    },
    "description": { "type": "string" },
    "specifications": { "type": "object" },
    "features_activated": { "type": "array", "items": { "type": "string" } },
    "external_link": { "type": "string" },
    "version": { "type": "string" }
  }
}
```

**Ficheiro:** `entities/Project.json`

**Ciclo de Vida do Estado:**
```
Spec → Building → Testing → Published → Completed
                                    ↘ Paused ↗
```

---

### 3.2 — Entidade: `ModuleTemplate`

Armazena templates reutilizáveis de sistemas empresariais. Permite scaffolding rápido — quando um projecto precisa de um módulo de RH, o template fornece a estrutura de entidades e features pré-definidas.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `name` | `string` | ✅ | Nome do template |
| `system_type` | `string` (enum) | ✅ | `HR`, `Accounting`, `Tax`, `Audit`, `Logistics`, `Procurement`, `Inventory`, `Legal`, `BI`, `CRM`, `ERP`, `Invoicing`, `E-commerce` |
| `description` | `string` | — | Descrição do sistema |
| `schema_definition` | `object` (JSON) | — | Definição das entidades e features do módulo |
| `active_features` | `array<string>` | — | Funcionalidades nativas activas neste template |

**Schema JSON:**
```json
{
  "type": "object",
  "required": ["name", "system_type"],
  "properties": {
    "name": { "type": "string" },
    "system_type": {
      "type": "string",
      "enum": ["HR", "Accounting", "Tax", "Audit", "Logistics",
               "Procurement", "Inventory", "Legal", "BI", "CRM",
               "ERP", "Invoicing", "E-commerce"]
    },
    "description": { "type": "string" },
    "schema_definition": { "type": "object" },
    "active_features": { "type": "array", "items": { "type": "string" } }
  }
}
```

**Ficheiro:** `entities/ModuleTemplate.json`

---

### 3.3 — Entidade: `SubAgentLog`

Rastreia as tarefas delegadas aos agentes especializados. É o mecanismo interno de coordenação — o utilizador não interage directamente com esta entidade, mas o sistema usa-a para monitorizar o progresso de cada módulo.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `project_id` | `string` | ✅ | ID do projecto associado (referência a `Project.id`) |
| `agent_name` | `string` | ✅ | Nome do agente especializado (ex: `"Agente RH"`) |
| `task_description` | `string` | ✅ | Descrição da tarefa delegada |
| `status` | `string` (enum) | ✅ | `Pending`, `In Progress`, `Completed`, `Failed` |
| `result_summary` | `string` | — | Resumo do resultado quando concluída |
| `completed_at` | `string` (ISO datetime) | — | Timestamp de conclusão |

**Schema JSON:**
```json
{
  "type": "object",
  "required": ["project_id", "agent_name", "task_description", "status"],
  "properties": {
    "project_id": { "type": "string" },
    "agent_name": { "type": "string" },
    "task_description": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["Pending", "In Progress", "Completed", "Failed"]
    },
    "result_summary": { "type": "string" },
    "completed_at": { "type": "string" }
  }
}
```

**Ficheiro:** `entities/SubAgentLog.json`

**Mapeamento de Agentes Especializados:**

| system_type | agent_name |
|-------------|-----------|
| HR | Agente RH |
| Accounting | Agente Contabilidade |
| Tax | Agente Fiscalidade |
| Audit | Agente Auditoria |
| Logistics | Agente Logística |
| Procurement | Agente Compras |
| Inventory | Agente Stock |
| Legal | Agente Jurídico |
| BI | Agente Inteligência Negócio |
| CRM | Agente CRM |
| ERP | Agente ERP |
| Invoicing | Agente Facturação |
| E-commerce | Agente E-commerce |

---

## 4. Funções Backend (Referência de API)

As funções backend são endpoints HTTP serverless executados em runtime Deno, usando o SDK da Base44 (`@base44/sdk@0.8.31`). Todas seguem o padrão `Deno.serve()`.

### 4.1 — `createProject`

Cria um novo projecto na base de dados e inicializa automaticamente os logs de sub-agentes para cada módulo necessário.

**Endpoint:** `POST /api/functions/createProject`

**Parâmetros de Request (JSON body):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `name` | `string` | ✅ | Nome do projecto |
| `project_type` | `string` | ✅ | Tipo do projecto (ver enum da entidade Project) |
| `description` | `string` | — | Descrição textual |
| `specifications` | `object` | — | Spec técnica estruturada |
| `required_modules` | `string[]` | — | Lista de tipos de módulos necessários (ex: `["HR", "Accounting"]`) |

**Response de Sucesso (200):**
```json
{
  "success": true,
  "project": {
    "id": "6a5dd51ccbf4f627f28e2b84",
    "name": "KIANDA Test Project",
    "project_type": "ERP",
    "status": "Spec"
  },
  "sub_agent_logs": [
    {
      "id": "6a5dd51c12cf4fa85797d0f2",
      "agent_name": "Agente RH",
      "status": "Pending"
    },
    {
      "id": "6a5dd51c803d955da7b474a0",
      "agent_name": "Agente Contabilidade",
      "status": "Pending"
    },
    {
      "id": "6a5dd51c11b6ecec82e28eca",
      "agent_name": "Agente Facturação",
      "status": "Pending"
    }
  ]
}
```

**Response de Erro (400):**
```json
{
  "success": false,
  "error": "name and project_type are required"
}
```

**Comportamento Interno:**
1. Valida presença de `name` e `project_type`
2. Cria registo na entidade `Project` com `status: "Spec"` e `version: "1.0.0"`
3. Para cada módulo em `required_modules`, mapeia para o nome do agente correspondente (ver tabela acima)
4. Cria um registo `SubAgentLog` com `status: "Pending"` para cada agente
5. Retorna o projecto criado e os logs inicializados

**Ficheiro:** `functions/createProject.ts`

---

### 4.2 — `getProjectDashboard`

Retorna uma visão completa do projecto, incluindo progresso dos sub-agentes e templates de módulos relevantes.

**Endpoint:** `GET /api/functions/getProjectDashboard?project_id={id}`

**Parâmetros (Query String):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `project_id` | `string` | ✅ | ID do projecto |

**Response de Sucesso (200):**
```json
{
  "success": true,
  "project": {
    "id": "6a5dd51ccbf4f627f28e2b84",
    "name": "KIANDA Test Project",
    "project_type": "ERP",
    "status": "Spec",
    "description": "Projecto de teste...",
    "specifications": {},
    "features_activated": [],
    "external_link": "",
    "version": "1.0.0",
    "created_date": "2026-07-20T08:57:39.704Z"
  },
  "progress": {
    "total_tasks": 3,
    "completed": 0,
    "pending": 3,
    "in_progress": 0,
    "percentage": 0
  },
  "sub_agent_logs": [
    {
      "id": "...",
      "agent_name": "Agente RH",
      "task_description": "Analisar e estruturar módulo de HR...",
      "status": "Pending",
      "result_summary": null,
      "completed_at": null
    }
  ],
  "module_templates": [
    {
      "id": "...",
      "name": "Sistema RH Completo",
      "system_type": "HR",
      "active_features": ["Folha Salarial", "Avaliação de Desempenho", ...]
    }
  ]
}
```

**Comportamento Interno:**
1. Valida `project_id`
2. Busca o projecto por ID (404 se não encontrado)
3. Lista todos os `SubAgentLog` filtrando por `project_id`
4. Lista `ModuleTemplate` filtrando por `system_type` igual ao `project_type`
5. Calcula progresso: percentagem = `(completed / total) × 100`
6. Retorna projecto + progresso + logs + templates

**Ficheiro:** `functions/getProjectDashboard.ts`

---

### 4.3 — `processFileImport`

Processa o conteúdo de um ficheiro importado e extrai dados estruturados. Suporta 4 tipos de importação: modelo de dados, documento, interface e código.

**Endpoint:** `POST /api/functions/processFileImport`

**Parâmetros de Request (JSON body):**

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `project_id` | `string` | ✅ | ID do projecto associado |
| `import_type` | `string` | ✅ | `"data_model"`, `"document"`, `"interface"`, `"code"` |
| `file_type` | `string` | — | Tipo do ficheiro (`pdf`, `excel`, `word`, `image`, `json`, `csv`, `code`) |
| `file_name` | `string` | — | Nome original do ficheiro |
| `parsed_content` | `object` | — | Conteúdo pré-processado do ficheiro |

**Comportamento por `import_type`:**

#### `data_model`
Extrai definições de entidades a partir de dados estruturados:
- Se `parsed_content` for um array, infere o schema do primeiro objecto
- Se `parsed_content.entities` existir, usa directamente
- Se for um objecto simples, trata-o como uma única entidade
- **Inferência de tipos:** `integer`, `number`, `boolean`, `date`, `time`, `email`, `string`, `array`, `object`, `null`

#### `document`
Preserva a estrutura do documento para exportação fiel:
```json
{
  "extracted": {
    "structure": {
      "type": "pdf",
      "has_tables": true,
      "has_images": false,
      "sections": [...],
      "preserved": true
    }
  }
}
```

#### `interface`
Extrai componentes visuais para replicação de interface:
```json
{
  "extracted": {
    "components": [...],
    "colors": [...],
    "fonts": [...],
    "layout": "grid"
  }
}
```

#### `code`
Analisa código-fonte para integração:
```json
{
  "extracted": {
    "language": "typescript",
    "dependencies": [...],
    "structures": [...]
  }
}
```

**Comportamento Interno:**
1. Valida `project_id` e `import_type`
2. Processa o conteúdo de acordo com o tipo de importação
3. Cria um `SubAgentLog` com `agent_name: "Agente Importação Universal"`, `status: "Completed"`
4. Retorna os dados extraídos + mensagem de confirmação

**Ficheiro:** `functions/processFileImport.ts`

---

## 5. Templates de Módulos Pré-configurados

5 templates foram registados na entidade `ModuleTemplate` na inicialização da plataforma:

### 5.1 — Sistema RH Completo
| Campo | Valor |
|-------|-------|
| **ID** | `6a5dd4f323cd067a68d81a3b` |
| **system_type** | `HR` |
| **Entidades** | Employee, Payroll, Contract, Evaluation, Leave, Training, Recruitment |
| **Features** | payroll_calculation, leave_management, contract_tracking, performance_review, recruitment_pipeline, training_management |
| **Funcionalidades Nativas** | Folha Salarial, Avaliação de Desempenho, Gestão de Férias, Contratos, Recrutamento, Formação, Exportar PDF, Exportar Excel, Email |

### 5.2 — Sistema Contabilidade
| Campo | Valor |
|-------|-------|
| **ID** | `6a5dd4f323cd067a68d81a3c` |
| **system_type** | `Accounting` |
| **Entidades** | Account, JournalEntry, Ledger, BalanceSheet, IncomeStatement, Transaction |
| **Features** | double_entry, balance_sheet, income_statement, trial_balance, journal_management |
| **Funcionalidades Nativas** | Balancetes, Razão, Diário, Demonstrações Financeiras, Exportar PDF, Exportar Excel, Assinatura Digital |

### 5.3 — Sistema Facturação
| Campo | Valor |
|-------|-------|
| **ID** | `6a5dd4f323cd067a68d81a3d` |
| **system_type** | `Invoicing` |
| **Entidades** | Invoice, Receipt, CreditNote, Customer, Product, TaxRate |
| **Features** | invoice_generation, receipt_printing, tax_calculation, credit_notes, email_sending |
| **Funcionalidades Nativas** | Facturas, Recibos, Notas de Crédito, Impressão, Download, Partilha, Exportar PDF, Email |

### 5.4 — Sistema CRM
| Campo | Valor |
|-------|-------|
| **ID** | `6a5dd4f323cd067a68d81a3e` |
| **system_type** | `CRM` |
| **Entidades** | Customer, Opportunity, Interaction, Pipeline, Sale |
| **Features** | customer_management, sales_pipeline, interaction_tracking, opportunity_management |
| **Funcionalidades Nativas** | Gestão de Clientes, Pipeline de Vendas, Oportunidades, Dashboards, Filtros, Pesquisa, Exportar Excel |

### 5.5 — Gestão de Stock
| Campo | Valor |
|-------|-------|
| **ID** | `6a5dd4f323cd067a68d81a3f` |
| **system_type** | `Inventory` |
| **Entidades** | Product, Warehouse, StockMovement, StockAlert, Supplier |
| **Features** | inventory_tracking, stock_movements, low_stock_alerts, warehouse_management |
| **Funcionalidades Nativas** | Inventário, Entradas, Saídas, Alertas de Stock, Dashboards, Exportar Excel |

---

## 6. Política de Operação

O ficheiro `.agents/rules/kianda_policy.md` define as regras operacionais que o agente segue em todas as interacções.

### Regras de Identidade
- Identidade: KIANDA BUILDER AI — Development Operating System
- Owner: Ednevs (Africa/Luanda)
- Slogan: "KIANDA BUILDER AI – Uma única plataforma para criar, integrar, automatizar e transformar qualquer ideia em realidade digital."

### Regras de Linguagem
- Comunicação sempre em Português (excepto se solicitado explicitamente em Inglês)
- Código, variáveis e identificadores técnicos em Inglês (prática standard)

### Regras de Coordenação
- Agentes especializados coordenam silenciosamente
- O utilizador vê apenas o resultado final integrado
- `SubAgentLog` regista tarefas delegadas internamente

### Regras de Gestão de Projectos
- Todo projecto deve ser registado na entidade `Project` antes de iniciar construção
- Confirmar spec técnica antes de geração massiva multi-módulo
- Nunca sobrescrever app publicada sem confirmação explícita

### Regras de Limites de Capacidade
- **NÃO** compila apps móveis nativas (Flutter/React Native) → oferece PWA
- **NÃO** gera vídeos realistas → oferece imagens e infografias
- Importações externas (WordPress/Wix) via scraping → lógica backend reconstruída nativamente

### Regras de Funcionalidades Nativas
Todas as apps geradas têm activas por defeito, quando relevante:
- **Relatórios:** Imprimir, Guardar, Exportar PDF, Exportar Excel, Email, Assinatura Digital
- **Recibos:** Impressão, Download, Partilha
- **Dashboards:** Filtros, Pesquisa, Exportação, Gráficos

### Regras de Importação de Ficheiros
- Analisar ficheiros (PDF, Excel, Word, imagens, código) e extrair modelos de dados, layouts UI ou regras de negócio
- Preservar formatação original na importação/exportação de documentos
- Usar a função `processFileImport` para extracção estruturada

### Regras de Proactividade
- Sugerir features e optimizações proactivamente
- Detectar problemas potenciais no spec antes de construir
- Oferecer próximos passos após cada fase de construção

---

## 7. Identidade do Agente

A identidade do KIANDA BUILDER AI é composta por 3 ficheiros:

### IDENTITY.md — Perfil
- **Nome:** Solas (KIANDA BUILDER AI)
- **Creature:** Espírito de plataforma de desenvolvimento AI — arquitecto digital
- **Vibe:** Profissional, confiante, quente. Fala em Português. Inova rápido, coordena silenciosamente.

### SOUL.md — Quem Sou
- Sistema Operativo de Desenvolvimento
- Constrói: Websites, Web Apps, PWAs, Sistemas Empresariais, SaaS, APIs, Automações, Conteúdo Digital
- Processo: Analisar → Seleccionar → Confirmar → Coordinar → Consolidar → Apresentar
- Persiste através de identidade, memória e entidades Project/SubAgentLog

### USER.md — Perfil do Utilizador
- Nome: Ednevs
- Timezone: Africa/Luanda (UTC+1)
- Notas: Owner e criador da visão KIANDA BUILDER AI. Escreve em Português. Baseado em Angola.

---

## 8. Estrutura de Ficheiros

```
/
├── .agents/
│   ├── .memory/
│   │   ├── IDENTITY.md              # Identidade do agente KIANDA
│   │   ├── SOUL.md                  # Personalidade e missão
│   │   ├── USER.md                  # Perfil do utilizador (Ednevs)
│   │   ├── memory.md                # Memória persistente de conversas
│   │   └── conversations/
│   │       └── {session_id}/
│   │           └── memory.md       # Memória específica da conversa
│   ├── rules/
│   │   └── kianda_policy.md         # Regras operacionais do KIANDA
│   ├── mcps/
│   │   └── config.json              # Configuração MCP
│   └── platform-docs/
│       └── README.md                # Docs da plataforma Base44
│
├── entities/
│   ├── Project.json                 # Schema da entidade Project
│   ├── ModuleTemplate.json          # Schema da entidade ModuleTemplate
│   └── SubAgentLog.json            # Schema da entidade SubAgentLog
│
├── functions/
│   ├── createProject.ts            # Função: criar projecto + init agentes
│   ├── getProjectDashboard.ts     # Função: dashboard completo do projecto
│   └── processFileImport.ts       # Função: importação universal de ficheiros
│
├── docs/
│   └── TECHNICAL_DOCUMENTATION.md  # Este ficheiro
│
└── .gitignore
```

---

## 9. Exemplos de Uso (API)

### Criar um projecto ERP com módulos de RH e Contabilidade

```bash
curl -X POST https://app.base44.com/api/functions/createProject \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ERP Empresa ABC",
    "project_type": "ERP",
    "description": "Sistema ERP completo para empresa ABC",
    "required_modules": ["HR", "Accounting", "Invoicing", "Inventory"]
  }'
```

### Obter o dashboard de um projecto

```bash
curl -X GET "https://app.base44.com/api/functions/getProjectDashboard?project_id=6a5dd51ccbf4f627f28e2b84"
```

### Importar um ficheiro Excel como modelo de dados

```bash
curl -X POST https://app.base44.com/api/functions/processFileImport \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "6a5dd51ccbf4f627f28e2b84",
    "import_type": "data_model",
    "file_type": "excel",
    "file_name": "funcionarios.xlsx",
    "parsed_content": [
      {"nome": "João Silva", "salario": 150000, "departamento": "TI", "ativo": true},
      {"nome": "Maria Santos", "salario": 180000, "departamento": "Financeiro", "ativo": true}
    ]
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "file_name": "funcionarios.xlsx",
  "file_type": "excel",
  "import_type": "data_model",
  "extracted": {
    "entities": [
      {
        "name": "funcionarios",
        "fields": [
          { "name": "nome", "type": "string", "inferred_type": "string" },
          { "name": "salario", "type": "number", "inferred_type": "number" },
          { "name": "departamento", "type": "string", "inferred_type": "string" },
          { "name": "ativo", "type": "boolean", "inferred_type": "boolean" }
        ],
        "record_count": 2
      }
    ]
  }
}
```

### Importar um screenshot para replicação de interface

```bash
curl -X POST https://app.base44.com/api/functions/processFileImport \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "6a5dd51ccbf4f627f28e2b84",
    "import_type": "interface",
    "file_type": "image",
    "file_name": "dashboard_mockup.png",
    "parsed_content": {
      "components": ["navbar", "sidebar", "chart", "table", "stat-cards"],
      "colors": ["#1a73e8", "#ffffff", "#f8f9fa", "#34a853"],
      "fonts": ["Inter", "Roboto"],
      "layout": "sidebar"
    }
  }'
```

---

## 10. Limitações Conhecidas

| Limitação | Alternativa Oferecida |
|-----------|----------------------|
| Não compila apps móveis nativas (Flutter/React Native) | PWA (Progressive Web App) |
| Não gera vídeos realistas | Imagens, infografias, apresentações |
| Importações externas (WordPress/Wix) não copiam lógica backend | Reconstrução nativa como funções Base44 |
| Sem conectores directos para Lovable, Replit, Firebase Studio | Importação via ficheiro ou scraping de browser |

---

## 11. Roadmap

### Próximos Passos Planeados

| Prioridade | Item | Descrição |
|------------|------|-----------|
| 🔴 Alta | Workflows de automação | Relatórios diários de progresso, notificações de mudança de estado |
| 🔴 Alta | Templates adicionais | Tax, Audit, Logistics, Procurement, Legal, BI, ERP, E-commerce |
| 🟡 Média | Skill: Replicação de interface | Screenshot → páginas Base44 com alta fidelidade |
| 🟡 Média | Agentes especializados avançados | Capacidades expandidas para cada agente empresarial |
| 🟡 Média | Canal WhatsApp | Notificações de projectos via WhatsApp |
| 🟢 Baixa | Conectores OAuth | Google Calendar, Gmail, Slack para integrações |
| 🟢 Baixa | Biblioteca de conhecimento | Documentação técnica, templates de UI, padrões de design |

---

*Documentação gerada automaticamente pelo KIANDA BUILDER AI em 20 de Julho de 2026.*
*By EDNEVS*
