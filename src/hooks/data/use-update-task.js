import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (newtask) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: newtask.title.trim(),
          time: newtask.time.trim(),
          description: newtask.description.trim(),
        }
      )

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
