import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.json();
  const { name, project_type, description, specifications, required_modules } = body;

  if (!name || !project_type) {
    return new Response(JSON.stringify({ success: false, error: "name and project_type are required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const project = await base44.entities.Project.create({
    name,
    project_type,
    description: description || "",
    status: "Spec",
    specifications: specifications || {},
    features_activated: [],
    version: "1.0.0",
  });

  const moduleAgentMap: Record<string, string> = {
    HR: "Agente RH",
    Accounting: "Agente Contabilidade",
    Tax: "Agente Fiscalidade",
    Audit: "Agente Auditoria",
    Logistics: "Agente Logística",
    Procurement: "Agente Compras",
    Inventory: "Agente Stock",
    Legal: "Agente Jurídico",
    BI: "Agente Inteligência Negócio",
    CRM: "Agente CRM",
    ERP: "Agente ERP",
    Invoicing: "Agente Facturação",
    "E-commerce": "Agente E-commerce",
  };

  const subAgentLogs: any[] = [];
  if (required_modules && Array.isArray(required_modules)) {
    for (const moduleType of required_modules) {
      const agentName = moduleAgentMap[moduleType] || `Agente ${moduleType}`;
      const log = await base44.entities.SubAgentLog.create({
        project_id: project.id,
        agent_name: agentName,
        task_description: `Analisar e estruturar módulo de ${moduleType} para o projecto ${name}`,
        status: "Pending",
      });
      subAgentLogs.push(log);
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        project_type: project.project_type,
        status: project.status,
      },
      sub_agent_logs: subAgentLogs.map((l) => ({
        id: l.id,
        agent_name: l.agent_name,
        status: l.status,
      })),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
