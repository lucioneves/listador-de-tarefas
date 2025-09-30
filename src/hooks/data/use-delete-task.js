import { useMutation, useQueryClient } from "@tanstack/react-query"

import api from "../../lib/axios"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deletTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: () => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId)
      })
    },
  })
}
