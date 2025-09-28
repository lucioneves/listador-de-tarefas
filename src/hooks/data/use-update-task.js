import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (newtask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newtask.title.trim(),
          time: newtask.time.trim(),
          description: newtask.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updateTask = await response.json()
      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
    },
  })
}
