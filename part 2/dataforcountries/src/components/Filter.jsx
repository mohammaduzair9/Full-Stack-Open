const Filter = ({ value, handleFilter }) => {

  return (
    <div>
      find countries <input value={value} onChange={handleFilter} />
    </div>
  )
}

export default Filter