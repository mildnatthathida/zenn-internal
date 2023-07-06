const express = require('express')
const axios = require('axios')
const router = express.Router()
const { Auth } = require('../../Middleware/index')

const ssoURL = 'https://account.brainergy.io/api'
const zennServiceUrl = 'https://zennapi.brainergy.io'

const loginSSO = async () => {
  try {
    const response = await axios.post(
      `${ssoURL}/signin`,
      {
        username: 'admin_zenn',
        password: 'P@ssw0rd@124'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  } catch (err) {
    throw 'SSO Authentication error.'
  }
}

const accessRequest = async (token) => {
  try {
    const response = await axios.post(
      `${ssoURL}/access/req`,
      {
        service: 'ZENN_SERVICE'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-SSO-Token': token
        }
      }
    )
    return response
  } catch (err) {
    throw 'SSO Access Request error.'
  }
}

const DigitalSignaturePdfFromZennService = async (base64Pdf, token) => {
  try {
    const response = await axios.post(
      `${zennServiceUrl}/api/sign/create-not-zenn`,
      {
        pdf_base64: base64Pdf,
        file_name: 'file-not-zenn',
        doc_closed: false,
        doc_password: '',
        return_pdf: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      }
    )
    return response
  } catch (err) {
    throw 'sign/create-not-zenn error'
  }
}

const DigitalSignaturePdf = async (req, res) => {
  const { base64 } = req.body
  try {
    const resLoginSSO = await loginSSO(req, res)
    const resAccessRequest = await accessRequest(resLoginSSO.data?.result?.token)
    const response = await DigitalSignaturePdfFromZennService(base64, resAccessRequest?.data?.result)
    if (response?.data?.code == '200') {
      res.send(response?.data?.result.base64)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

router.post('', Auth, DigitalSignaturePdf)

module.exports = router
