import app from './app'

try {
  const port = process.env.PORT

  app.listen(port, () => console.log(`Application running on port ${port}`))
} catch (error) {
  console.error('Unable to start the server!', error)
}