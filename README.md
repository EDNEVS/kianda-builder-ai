# KIANDA BUILDER AI

> **"Uma única plataforma para criar, integrar, automatizar e transformar qualquer ideia em realidade digital."**

Plataforma universal de desenvolvimento inteligente que funciona como um "Sistema Operativo de Desenvolvimento". Construído sobre Base44.

## 📋 O que está incluído

### Entidades (Base de Dados)
- **Project** — Regista todos os projectos criados
- **ModuleTemplate** — Templates reutilizáveis de sistemas empresariais
- **SubAgentLog** — Rastreia tarefas delegadas aos agentes especializados

### Funções Backend
- **createProject** — Cria projecto + inicializa agentes automaticamente
- **getProjectDashboard** — Visão completa do projecto com progresso
- **processFileImport** — Importação universal de ficheiros (PDF, Excel, imagens, código)

### Templates Pré-configurados
- RH (Folha Salarial, Férias, Contratos, Recrutamento)
- Contabilidade (Balancetes, Razão, Diário, Demonstrações)
- Facturação (Facturas, Recibos, Notas de Crédito)
- CRM (Clientes, Pipeline, Oportunidades)
- Stock (Inventário, Entradas/Saídas, Alertas)

## 🏗️ Stack
- Runtime: Deno (serverless)
- SDK: @base44/sdk@0.8.31
- Database: MongoDB (via Base44 entities)
- Browser: Browserbase (automação e scraping)
- AI: Image generation, Whisper (speech-to-text)

## 📄 Documentação
Ver `docs/TECHNICAL_DOCUMENTATION.md` para documentação técnica completa.

## ⚠️ Limitações
- Apps móveis nativas (Flutter) → PWA em vez disso
- Vídeos realistas → Imagens e infografias
- Importações externas (WordPress/Wix) → Scraping + reconstrução nativa

## 👤 Owner
**Ednevs** — Africa/Luanda (UTC+1)

---
*By EDNEVS · 2026*
