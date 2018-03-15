const app = require('express')()
const https = require('https')
const PORT = process.env.PORT

app
.get('/', (req, res) => {
  const rawLang = req.header('accept-language')
  const rawAgent = req.header('user-agent')
  let ip_address = ''

  const language = rawLang.substring(0, rawLang.indexOf(','))
  const user_agent = rawAgent.substring(
    rawAgent.indexOf('(') + 1,
    rawAgent.indexOf(')')
  )

  https.get({
    host: 'api.ipify.org'
  }, res => {
    res
    .on('data', d => {
      ip_address += d
    })
    .on('end', done)
  })

  function done () {
    res.json({
      ip_address: ip_address || 'Unable to get ip address',
      language,
      user_agent
    })
  }
})
.listen(PORT, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Listening on port %s', PORT)
})