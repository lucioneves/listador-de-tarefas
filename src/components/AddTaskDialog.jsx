import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const nodeRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()
  const titleRef = useRef()

  const handleSaveClick = async () => {
    setIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({ inputName: "title", message: "Título é obrigatório" })
    }

    if (!time.trim()) {
      newErrors.push({ inputName: "time", message: "Período é obrigatório" })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "Descrição é obrigatória",
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setIsLoading(false)
    }

    const task = {
      id: uuidv4(),
      title,
      time,
      description,
      status: "not-started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)
      return onSubmitError()
    }
    onSubmitSuccess(task)
    setIsLoading(false)
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

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

              <div className="flex w-[366px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  ref={titleRef}
                  errorMessage={titleError?.message}
                  disabled={isLoading}
                />

                <TimeSelect
                  ref={timeRef}
                  errorMessage={timeError?.message}
                  disabled={isLoading}
                />

                <Input
                  id="description"
                  label="Descrição"
                  size="large"
                  placeholder="Descreva a tarefa"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                  disabled={isLoading}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <LoaderIcon className="animate-spin text-brand-process" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
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
