import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import { useAddTask } from "../hooks/data/use-add-task"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask } = useAddTask()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
      status: "not-started",
    }

    addTask(task, {
      onSuccess: () => {
        handleClose()
        reset({
          title: "",
          time: "morning",
          description: "",
        })
      },
      onError: () => toast.error("Erro ao adicionar tarefa."),
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div className="backdrop-blue fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center">
            <div
              ref={nodeRef}
              className="rounded-xl bg-white p-5 text-center shadow"
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[366px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  placeholder="Título da tarefa"
                  {...register("title", {
                    required: "O título é obrigatório",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode ser vazio"
                      }
                      return true
                    },
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register("time", { required: true })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  size="large"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatoria.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não poder ser vaza."
                      }
                      return true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderIcon className="animate-spin text-brand-process" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
}

export default AddTaskDialog
