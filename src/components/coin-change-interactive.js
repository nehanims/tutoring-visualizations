import React, { useState, useEffect } from 'react';
//import { Button } from '@/components/ui/button';

const CoinChangeVisualizer = () => {
  const [coinInput, setCoinInput] = useState('1 2 5');
  const [coins, setCoins] = useState([1, 2, 5]);
  const [amount, setAmount] = useState(11);
  const [dpGrid, setDpGrid] = useState([]);

  const coinChange = (coins, amount) => {
    const dp = Array(coins.length).fill().map(() => Array(amount + 1).fill(Infinity));
    
    // Initialize first row
    for (let i = 0; i <= amount; i++) {
      dp[0][i] = i % coins[0] === 0 ? Math.floor(i / coins[0]) : Infinity;
    }

    // Fill the dp table
    for (let i = 1; i < coins.length; i++) {
      for (let j = 0; j <= amount; j++) {
        if (coins[i] > j) {
          dp[i][j] = dp[i-1][j];
        } else {
          dp[i][j] = Math.min(dp[i-1][j], 1 + dp[i][j - coins[i]]);
        }
      }
    }

    setDpGrid(dp);
    return dp[coins.length - 1][amount] === Infinity ? -1 : dp[coins.length - 1][amount];
  };

  const handleUpdateCoins = () => {
    const newCoins = coinInput.split(/\s+/).map(Number).filter(Boolean);
    setCoins(newCoins);
  };

  useEffect(() => {
    coinChange(coins, amount);
  }, [coins, amount]);

  return (
    <div className="font-sans max-w-full mx-auto p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-4">2D Grid Coin Change Visualizer</h1>
      
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
          <button onClick={handleUpdateCoins} className="btn btn-blue border rounded-1">Update</button>
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

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Coin/Amount</th>
              {[...Array(amount + 1).keys()].map(i => (
                <th key={i} className="border p-2">{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dpGrid.map((row, i) => (
              <tr key={i}>
                <td className="border p-2 font-bold">{coins[i]}</td>
                {row.map((cell, j) => (
                  <td key={j} className={`border p-2 ${cell === Infinity ? 'bg-red-200' : 'bg-green-200'}`}>
                    {cell === Infinity ? '∞' : cell}
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

export default CoinChangeVisualizer;
