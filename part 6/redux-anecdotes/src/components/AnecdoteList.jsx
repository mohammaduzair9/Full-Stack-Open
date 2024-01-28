import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    return state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()));
  })
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id));
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
 
  )
}

export default AnecdoteForm