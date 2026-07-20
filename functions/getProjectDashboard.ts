import { createClientFromRequest } from "npm:@base44/sdk@0.8.31";

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id");

  if (!projectId) {
    return new Response(JSON.stringify({ success: false, error: "project_id is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const project = await base44.entities.Project.get(projectId);

  if (!project) {
    return new Response(JSON.stringify({ success: false, error: "Project not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  const subAgentLogs = await base44.entities.SubAgentLog.list({
    filter: { project_id: projectId },
  });

  const moduleTemplates = await base44.entities.ModuleTemplate.list({
    filter: { system_type: project.project_type },
  });

  const totalTasks = subAgentLogs.length;
  const completedTasks = subAgentLogs.filter((l: any) => l.status === "Completed").length;
  const pendingTasks = subAgentLogs.filter((l: any) => l.status === "Pending").length;
  const inProgressTasks = subAgentLogs.filter((l: any) => l.status === "In Progress").length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return new Response(
    JSON.stringify({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        project_type: project.project_type,
        status: project.status,
        description: project.description,
        specifications: project.specifications,
        features_activated: project.features_activated,
        external_link: project.external_link,
        version: project.version,
        created_date: project.created_date,
      },
      progress: {
        total_tasks: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        in_progress: inProgressTasks,
        percentage: progressPercentage,
      },
      sub_agent_logs: subAgentLogs.map((l: any) => ({
        id: l.id,
        agent_name: l.agent_name,
        task_description: l.task_description,
        status: l.status,
        result_summary: l.result_summary,
        completed_at: l.completed_at,
      })),
      module_templates: moduleTemplates.map((t: any) => ({
        id: t.id,
        name: t.name,
        system_type: t.system_type,
        active_features: t.active_features,
      })),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
