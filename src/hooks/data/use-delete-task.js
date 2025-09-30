import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deletTask", taskId],
    mutationFn: async () => {
      const { deletedTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      )
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })
    },
  })
}
