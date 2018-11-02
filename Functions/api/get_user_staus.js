import api from '../../constants/api'

function get_user_log() {
  var url = api.get_user_log

  var params = {
    id: '0001',
  };

  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

  return new Promise((resolve, reject) => {
    fetch(api.get_user_log,searchParams, {
      method: 'GET',
    }).then(res => res.json())
    .then(response =>
    {
      console.log('Get user log :', JSON.stringify(response))
      resolve(response)
    })
    .catch(error => console.error('Error Get user status:', error));
  })
}
module.exports = get_user_log