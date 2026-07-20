import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.json();
  const { project_id, file_type, file_name, parsed_content, import_type } = body;

  if (!project_id || !import_type) {
    return new Response(
      JSON.stringify({ success: false, error: "project_id and import_type are required" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }

  const result: any = {
    success: true,
    file_name: file_name || "unknown",
    file_type: file_type || "unknown",
    import_type,
    extracted: {},
  };

  function inferFieldType(value: any): string {
    if (value === null || value === undefined) return "null";
    if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
    if (typeof value === "boolean") return "boolean";
    if (typeof value === "string") {
      if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "date";
      if (/^\d+:\d+/.test(value)) return "time";
      if (/^[^@]+@[^.]+\..+/.test(value)) return "email";
      return "string";
    }
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    return "string";
  }

  if (import_type === "data_model") {
    if (parsed_content && typeof parsed_content === "object") {
      const entities: any[] = [];
      if (Array.isArray(parsed_content) && parsed_content.length > 0) {
        const sample = parsed_content[0];
        const fields = Object.keys(sample).map((key) => ({
          name: key,
          type: typeof sample[key],
          inferred_type: inferFieldType(sample[key]),
        }));
        entities.push({
          name: file_name?.replace(/\.[^.]+$/, "") || "ImportedEntity",
          fields,
          record_count: parsed_content.length,
        });
      } else if (parsed_content.entities) {
        entities.push(...parsed_content.entities);
      } else {
        const fields = Object.keys(parsed_content).map((key) => ({
          name: key,
          type: typeof parsed_content[key],
          inferred_type: inferFieldType(parsed_content[key]),
        }));
        entities.push({
          name: file_name?.replace(/\.[^.]+$/, "") || "ImportedEntity",
          fields,
        });
      }
      result.extracted.entities = entities;
    }
  } else if (import_type === "document") {
    result.extracted.structure = {
      type: file_type,
      has_tables: parsed_content?.tables?.length > 0,
      has_images: parsed_content?.images?.length > 0,
      sections: parsed_content?.sections || [],
      preserved: true,
    };
    result.message = "Documento importado com preservação de formato. Pronto para exportação fiel.";
  } else if (import_type === "interface") {
    result.extracted.components = parsed_content?.components || [];
    result.extracted.colors = parsed_content?.colors || [];
    result.extracted.fonts = parsed_content?.fonts || [];
    result.extracted.layout = parsed_content?.layout || "unknown";
    result.message = "Interface analisada. Componentes prontos para replicação.";
  } else if (import_type === "code") {
    result.extracted.language = parsed_content?.language || "unknown";
    result.extracted.dependencies = parsed_content?.dependencies || [];
    result.extracted.structures = parsed_content?.structures || [];
    result.message = "Código analisado. Estrutura pronta para integração.";
  }

  await base44.entities.SubAgentLog.create({
    project_id,
    agent_name: "Agente Importação Universal",
    task_description: `Importar ficheiro ${file_name || "desconhecido"} (${file_type}) como ${import_type}`,
    status: "Completed",
    result_summary: result.message || `Importação de ${import_type} concluída`,
    completed_at: new Date().toISOString(),
  });

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});
