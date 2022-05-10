import { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Comentar</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          ref={commentEl}
          placeholder="Adicione seu comentário..."
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          ref={nameEl}
          type="text"
          placeholder="Nome"
          name="name"
        />
        <input
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          ref={emailEl}
          type="email"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div className="">
          <input
            type="checkbox"
            ref={storeDataEl}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Salvar meus dados para comentários futuros.
          </label>
        </div>
      </div>
      {error && (
        <p className="rounded-lg bg-red-100 p-4 text-center text-xs text-red-500">
          Todos os campos precisam ser preenchidos!
        </p>
      )}
      <div className="mt-8 flex items-center justify-between">
        <button
          className="inline-block cursor-pointer rounded-full bg-blue-500 px-6 py-2 text-lg text-white transition duration-200 ease-linear hover:bg-blue-600"
          type="button"
          onClick={handleCommentSubmission}
        >
          Publicar
        </button>
        {showSuccessMessage && (
          <span className="mt-3 rounded-lg border border-green-200 bg-green-100 p-3 text-xs font-semibold text-green-500">
            Comentário enviado para análise!
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
