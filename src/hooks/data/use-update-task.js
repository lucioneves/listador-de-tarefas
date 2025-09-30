import { useMutation, useQueryClient } from "@tanstack/react-query"

import api from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (newtask) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, {
        title: newtask.title.trim(),
        time: newtask.time.trim(),
        description: newtask.description.trim(),
      })

      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
      queryClient.setQueryData(["task", taskId], updateTask)
    },
  })
}
