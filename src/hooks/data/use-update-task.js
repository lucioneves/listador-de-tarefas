import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import api from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        time: data?.time?.trim(),
        description: data?.description?.trim(),
        status: data?.status,
      })

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updateTask)
    },
  })
}
