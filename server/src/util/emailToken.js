const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// createTokenEmail(name,phone,email,role);

module.exports = {
  createTokenEmail: (
    id,
    name,
    phone,
    email,
    role
  ) => {

    const secret = process.env.JWT_SECRET;

    const tokenAccept = jwt.sign({ numero_contrato: id, name, phone, email, role, response: 'yes' }, process.env.JWT_SECRET, {
      expiresIn: 3600 * 168 // 7 days
    });

    const tokenReject = jwt.sign({ numero_contrato: id, name, phone, email, role, response: 'not' }, process.env.JWT_SECRET, {
      expiresIn: 3600 * 168 // 7 days
    });

    let URL_WEB_PAGE = process.env.URL_WEB_PAGE
    //URL_WEB_PAGE = 'http://localhost:3000'
    //URL_WEB_PAGE = 'http://arriendosconinsa.co'

    const [headerAccept, payloadAccept, signAccept] = tokenAccept.split('.');
    const [headerReject, payloadReject, signReject] = tokenReject.split('.');
    const urlAccept = `${URL_WEB_PAGE}/response?header=${headerAccept}&payload=${payloadAccept}&sign=${signAccept}`
    const urlReject = `${URL_WEB_PAGE}/response?header=${headerReject}&payload=${payloadReject}&sign=${signReject}`

    return {
      secret,
      tokenAccept,
      tokenReject,
      urlAccept,
      urlReject
    }
  },
  getDataTokenEmail: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return null;
    }
  }

}