import { categories, resetCategories } from '../constants/categories'
import { useTransaction } from '../contexts/TransactionContext'

export default function useTransactions(type) {
  const { transactions } = useTransaction()  
  resetCategories()
  const selectedCategories = transactions.filter(t => t.type === type)
  const total = selectedCategories.reduce((acc, curr) => acc += (parseFloat(curr.amount) || 0), 0)

  selectedCategories.forEach(t => {
    const category = categories[type].find(c => c.type === t.category)
    
    if(category) category.amount +=(parseFloat(t.amount) || 0)
  })

  const filteredCategories = categories[type].filter(c => c.amount > 0)
  const chartData = {
    datasets: [{
      data: filteredCategories.map(c => c.amount),
      backgroundColor: filteredCategories.map(c => c.color)
    }],
    labels: filteredCategories.map(c => c.type)
  }

  return { filteredCategories, total, chartData }
}
