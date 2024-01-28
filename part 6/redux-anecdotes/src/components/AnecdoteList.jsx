import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    return [...state.anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()));
  })
  
  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(showNotification(`you voted '${anecdote}'`))
    setTimeout(()=> {  
      dispatch(removeNotification())
    }, 5000) 
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
 
  )
}

export default AnecdoteList