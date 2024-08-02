import React, { useState, useEffect } from 'react';

const CoinChangeVisualizerSetExpansion = () => {
  const [coinInput, setCoinInput] = useState('1 2 5');
  const [coins, setCoins] = useState([1, 2, 5]);
  const [amount, setAmount] = useState(11);
  const [dpGrid, setDpGrid] = useState([]);
  const [coinUsage, setCoinUsage] = useState([]);
  const [showCoinUsage, setShowCoinUsage] = useState(false);

  const coinChange = (coins, amount) => {
    const dp = Array(coins.length).fill().map(() => Array(amount + 1).fill(Infinity));
    const usage = Array(coins.length).fill().map(() => Array(amount + 1).fill(null));
    
    // Initialize first row
    for (let i = 0; i <= amount; i++) {
      if (i % coins[0] === 0) {
        dp[0][i] = Math.floor(i / coins[0]);
        usage[0][i] = coins.map((_, index) => index === 0 ? dp[0][i] : 0);
      }
    }

    // Fill the dp table
    for (let i = 1; i < coins.length; i++) {
      for (let j = 0; j <= amount; j++) {
        if (coins[i] > j) {
          dp[i][j] = dp[i-1][j];
          usage[i][j] = usage[i-1][j];
        } else {
          if (dp[i-1][j] <= 1 + dp[i][j - coins[i]]) {
            dp[i][j] = dp[i-1][j];
            usage[i][j] = usage[i-1][j];
          } else {
            dp[i][j] = 1 + dp[i][j - coins[i]];
            usage[i][j] = [...(usage[i][j - coins[i]] || [])];
            usage[i][j][i] = (usage[i][j][i] || 0) + 1;
          }
        }
      }
    }

    setDpGrid(dp);
    setCoinUsage(usage);
    return dp[coins.length - 1][amount] === Infinity ? -1 : dp[coins.length - 1][amount];
  };

  const handleUpdateCoins = () => {
    const newCoins = coinInput.split(/\s+/).map(Number).filter(Boolean);
    setCoins(newCoins);
  };

  useEffect(() => {
    coinChange(coins, amount);
  }, [coins, amount]);

  const renderCoinUsage = (usage) => {
    if (!usage) return null;
    return (
      <div className="text-xs flex flex-wrap justify-center mt-1">
        {usage.map((count, index) => 
          count > 0 ? (
            <span key={index} className="mr-1">
              <span className="inline-flex items-center justify-center w-4 h-4 bg-yellow-400 text-black rounded-full text-xs">
                {coins[index]}
              </span>
              <span className="ml-1">x{count}</span>
            </span>
          ) : null
        )}
      </div>
    );
  };

  return (
    <div className="font-sans max-w-full mx-auto p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-4">2D Grid Coin Change Visualizer-Coin Set Expansion(Row-wise DP)</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Coins (space-separated):</label>
        <div className="flex">
          <input 
            type="text" 
            value={coinInput} 
            onChange={(e) => setCoinInput(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Enter coins (e.g., 1 2 5)"
          />
          <button onClick={handleUpdateCoins} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-r">Update</button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full p-2 border rounded"
          min="0"
        />
      </div>

      <div className="mb-4">
        <button 
          onClick={() => setShowCoinUsage(!showCoinUsage)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          {showCoinUsage ? 'Hide' : 'Show'} Coin Usage
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border p-2 w-20">Coin/Amount</th>
              {[...Array(amount + 1).keys()].map(i => (
                <th key={i} className="border p-2">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpGrid.map((row, i) => (
              <tr key={i}>
                <td className="border p-2 font-bold bg-yellow-400 text-center w-20">{ "{"+coins.slice(0,i+1).join(", ")+"}"}</td>
                {row.map((cell, j) => (
                  <td key={j} className={`border p-2 ${cell === Infinity ? 'bg-red-200' : 'bg-green-200'}`}>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-lg font-bold">{cell === Infinity ? '∞' : cell}</div>
                      {showCoinUsage && renderCoinUsage(coinUsage[i][j])}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center text-xl font-bold">
        Minimum coins needed: {dpGrid[coins.length - 1]?.[amount] === Infinity ? 'Not possible' : dpGrid[coins.length - 1]?.[amount]}
      </div>
    </div>
  );
};

export default CoinChangeVisualizerSetExpansion;