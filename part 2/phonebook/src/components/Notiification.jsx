const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }
    
  if (success === 1) {
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
  
export default Notification