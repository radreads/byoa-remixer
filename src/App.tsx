import React from 'react'
import ArticleInput from './components/ArticleInput'

function App() {
  const handleSubmit = (text: string) => {
    console.log('Submitted:', text)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remixer</h1>
      <p className="mb-4 font-light">This text should be in Inter font</p>
      <ArticleInput onSubmit={handleSubmit} />
    </div>
  )
}

export default App 