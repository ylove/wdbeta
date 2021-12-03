import { BigNumber } from '@ethersproject/bignumber'
import { useWindogeRewardContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalRewardsPaid(): number | undefined {
  const contract = useWindogeRewardContract();
  const totalRewards: BigNumber = useSingleCallResult(contract, 'totalDividendsDistributed')?.result?.[0]
  return (Number.parseInt((totalRewards || 0)?.toString()) * 0.000000000000000001)
}

export default useTotalRewardsPaid
