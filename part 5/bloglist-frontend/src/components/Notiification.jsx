import PropTypes from 'prop-types'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
  if (success === true) {
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }
  else{
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Notification