export const taskMutationKeys = {
  add: () => ["add-tasks"],
  update: (taskId) => ["update-tasks", taskId],
  delete: (taskId) => ["delete-tasks", taskId],
}
