import api from '../../constants/api'

function post_m_attendance() {
  var url = api.post_attendance

  var params = {
    user_id: '0001',
    location_id: '0001',
    clocked_by: 'wifi',
    remark: '0001',
    clock_event: '1'
  };

  const searchParams = Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: searchParams, // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }).then(res => res.json())
    .then(response =>
    {
      console.log('Success POST by Btn Attendance:', JSON.stringify(response))
      resolve(response)
    })
    .catch(error => console.error('Error:', error));
  })
}
module.exports = post_m_attendance