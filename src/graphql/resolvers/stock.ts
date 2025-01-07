const StockResolvers = {
  Query: {
    getStockData: () => ({
      symbol: 'AAPL',
      price: 120.0,
    }),
  },
}

export default StockResolvers
