import { initialApp } from './app'

initialApp().then((app) => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`App listening on port ${process.env.APP_PORT}`)
  })
})
