import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getWindogeRewardContract } from 'utils/contractHelpers'
import useRefresh from './useRefresh'
import { FetchStatus } from './useTokenBalance'

type UseRewardAccountState = {
  rewardAccount: RewardAccount
  fetchStatus: FetchStatus
}

type RewardAccount = {
  address: string;
  index: number;
  iterationsUntilProcessed: BigNumber;
  withdrawableDividends: BigNumber;
  totalDividends: BigNumber;
  lastClaimTime: BigNumber;
  nextClaimTime: BigNumber;
  secondsUntilAutoClaimAvailable: BigNumber;
}

const useRewardAccount = () => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [rewardAccount, setRewardAccount] = useState<UseRewardAccountState>({
    rewardAccount: null,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const getRewardAccount = async () => {
      const contract = getWindogeRewardContract()
      try {
        const res = await contract.getAccount(account)
        setRewardAccount({ rewardAccount: res, fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setRewardAccount((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      getRewardAccount()
    }
  }, [account, fastRefresh, SUCCESS, FAILED])

  return rewardAccount
}

export default useRewardAccount
