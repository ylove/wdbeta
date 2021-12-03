import React from 'react'
import { Flex, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Frame, ThemeProvider, TitleBar, Button } from '@react95/core'
import truncateHash from 'utils/truncateHash'
import useRewardAccount from 'hooks/useRewardAccount'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow } from 'components/Layout/Row'
import { FetchStatus } from 'hooks/useTokenBalance'
import { getWindogeRewardContract } from 'utils/contractHelpers'
import { Contract } from 'ethers'
import useTotalRewardsPaid from 'hooks/useTotalRewardsPaid'

const RewardDashboard = () => {
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const truncatedAddress = truncateHash(account ?? '')
  const rewardAccount = useRewardAccount()
  const totalRewards = useTotalRewardsPaid()

  const totalWalletRewards =
    rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED
      ? 'Loading...'
      : rewardAccount?.fetchStatus === FetchStatus.FAILED
      ? 'Error fetching balance'
      : `${(
          Number.parseInt((rewardAccount?.rewardAccount?.totalDividends || 0).toString()) / 1000000000000000000
        ).toString()} BNB (in DOGE)`

  // const lastClaimTime =
  //   rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED
  //     ? 'Loading...'
  //     : rewardAccount?.fetchStatus === FetchStatus.FAILED
  //     ? 'Error fetching'
  //     : `${
  //         rewardAccount?.rewardAccount?.lastClaimTime.toString() === '0'
  //           ? 'Coming Shortly'
  //           : rewardAccount?.rewardAccount?.lastClaimTime.toString()
  //       }`

  // const nextClaimTime =
  //   rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED
  //     ? 'Loading...'
  //     : rewardAccount?.fetchStatus === FetchStatus.FAILED
  //     ? 'Error fetching'
  //     : `${
  //         rewardAccount?.rewardAccount?.nextClaimTime.toString() === '0'
  //           ? 'Coming Shortly'
  //           : rewardAccount?.rewardAccount?.nextClaimTime.toString()
  //       }`

  const withdrawableDividends =
    rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED
      ? 'Loading...'
      : rewardAccount?.fetchStatus === FetchStatus.FAILED
      ? 'Error fetching'
      : `${(
          Number.parseInt((rewardAccount?.rewardAccount?.withdrawableDividends || 0).toString()) / 1000000000000000000
        ).toString()}`

  const rewardAccountExists = () => {
    return Number.parseInt(rewardAccount?.rewardAccount?.index.toString()) > -1
  }

  const frameStyle = {
    textAlign: 'center',
    paddingBottom: '8px',
    width: '100%',
    minWidth: '325px',
    maxWidth: '425px',
    height: '270px',
    marginTop: '8px',
  } as any

  const WithdrawableFrame = (
    <Frame style={frameStyle}>
      <TitleBar
        active
        title="ATM.exe"
        style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
      />
      <AutoColumn gap="lg">
        <Heading scale="lg" mb="06px" padding="16px">
          {t('Withdrawable Rewards:')}
        </Heading>
        <Heading scale="md" padding="16px">
          {t(
            `${
              rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED ? 'Loading...' : withdrawableDividends
            } BNB (in DOGE)`,
          )}
        </Heading>
        <Button
          onClick={async () => {
            try {
              const contract: Contract = getWindogeRewardContract()
              const signer = contract.connect(library.getSigner())
              await signer.withdrawDividend()
            } catch (e) {
              console.error(e)
            }
          }}
          style={{ margin: '8px', fontSize: '24px' }}
        >
          Withdraw
        </Button>
      </AutoColumn>
    </Frame>
  )

  const HeadlineFrame = (
    <Frame
      style={{
        textAlign: 'center',
        paddingBottom: '8px',
        width: '100%',
        minWidth: '325px',
        maxWidth: '425px',
        minHeight: '270px',
        marginTop: '8px',
      }}
    >
      <TitleBar
        active
        title="HeadlineBanner.exe"
        style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
      />
      <Heading scale="xl" color="secondary" mb="24px" paddingTop="16px">
        {t("You've got mail!")}
      </Heading>
      <Heading scale="md" mb="24px" padding="16px">
        {t(
          account && rewardAccountExists()
            ? 'You have opted in! View your rewards summary below:'
            : 'First connect your wallet, then opt in to collecting passive rewards. We do this so that only real people get reflection rewards, rather than bots!',
        )}
      </Heading>
      {!account ? (
        <Skeleton width={160} height={16} my="4px" />
      ) : (
        <>
          <Heading scale="md" mb="24px" fontSize="10px" padding="16px">
            {t('Connected with %address%', { address: truncatedAddress })}
          </Heading>
        </>
      )}
      {!account && <ConnectWalletButton />}
      {account && !rewardAccountExists() && (
        <Button
          onClick={async () => {
            try {
              const contract: Contract = getWindogeRewardContract()
              const signer = contract.connect(library.getSigner())
              await signer.updateBalance()
            } catch (e) {
              console.error(e)
            }
          }}
          style={{ margin: '8px', fontSize: '16px' }}
        >
          ENABLE MY DOGE REWARDS!!
        </Button>
      )}
    </Frame>
  )

  const CounterFrame = (
    <Frame style={frameStyle}>
      <TitleBar
        active
        title="RewardsCounter.exe"
        style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
      />
      <Heading padding="16px" scale="xl" color="secondary" paddingTop="16px">
        {t('Rewards to date:')}
      </Heading>
      <Heading padding="16px" scale="md" color="secondary">
        {t('(all holders)')}
      </Heading>
      <Text mb="24px" padding="16px">
        {t(`${!totalRewards ? 'Loading...' : totalRewards} BNB (in DOGE)`)}
      </Text>
    </Frame>
  )

  const TotalEarnedFrame = (
    <Frame style={frameStyle}>
      <TitleBar
        active
        title="TotalEarned.exe"
        style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
      />
      <AutoColumn gap="lg">
        <Heading scale="lg" padding="16px">
          {t('Your lifetime rewards earnings:')}
        </Heading>
        <Heading scale="md" padding="16px">
          {rewardAccount?.fetchStatus === FetchStatus.NOT_FETCHED ? 'Loading...' : t(`${totalWalletRewards}`)}
        </Heading>
      </AutoColumn>
    </Frame>
  )

  // const LastPaymentFrame = () => {
  //   const milli = Number.parseInt(lastClaimTime.toString())
  //   const date =
  //     rewardAccount.fetchStatus === FetchStatus.NOT_FETCHED
  //       ? 'Loading...'
  //       : lastClaimTime
  //       ? new Date(milli * 1000).toUTCString()
  //       : 'Loading...'
  //   return (
  //     <Frame style={frameStyle}>
  //       <TitleBar
  //         active
  //         title="LastPayment.exe"
  //         style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
  //       />
  //       <AutoColumn gap="lg">
  //         <Heading scale="lg" padding="16px">
  //           {t('Last Payment:')}
  //         </Heading>
  //         <Heading scale="lg" padding="16px">
  //           {t(`${date}`)}
  //         </Heading>
  //       </AutoColumn>
  //     </Frame>
  //   )
  // }

  // const NextPaymentFrame = () => {
  //   const milli = Number.parseInt(nextClaimTime.toString())
  //   const date =
  //     rewardAccount.fetchStatus === FetchStatus.NOT_FETCHED
  //       ? 'Loading...'
  //       : nextClaimTime
  //       ? new Date(milli * 1000).toUTCString()
  //       : 'Loading...'

  //   return (
  //     <Frame style={frameStyle}>
  //       <TitleBar
  //         active
  //         title="NextPayment.exe"
  //         style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
  //       />
  //       <AutoColumn gap="lg">
  //         <Heading scale="lg" padding="16px">
  //           {t('Next Payment:')}
  //         </Heading>
  //         <Heading scale="lg" padding="16px">
  //           {t(`${date} `)}
  //         </Heading>
  //       </AutoColumn>
  //     </Frame>
  //   )
  // }

  return (
    <>
      <ThemeProvider>
        <Flex flex="1" justifyContent="center" alignItems="center" flexDirection="column" mr="16px">
          <AutoRow mb="1rem" style={{ justifyContent: 'center' }}>
            <AutoColumn gap="lg">
              <img
                alt="windoge-gif"
                src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/618cb271c44a225f74e239d6_tumblr_n8gux98bRT1r6zgh0o1_500%20(1).gif"
                height="150px"
                width="150px"
                style={{ marginLeft: '32px' }}
              />
            </AutoColumn>
          </AutoRow>
        </Flex>
        <Flex flex="1" justifyContent="center" alignItems="center" flexDirection="column" mr="16px">
          <AutoRow mb="1rem" style={{ justifyContent: 'space-evenly' }}>
            <AutoColumn gap="lg">{HeadlineFrame}</AutoColumn>
            <AutoColumn gap="lg">{CounterFrame}</AutoColumn>
          </AutoRow>
        </Flex>

        {account && (
          <Flex
            position="relative"
            flexDirection={['column', 'row', 'row', 'row']}
            alignItems={['flex-end', 'row', 'row', 'center']}
            justifyContent="center"
            mt="16px"
            id="homepage-hero"
          >
            <Flex flex="1" justifyContent="center" alignItems="center" flexDirection="column" mr="16px">
              <AutoRow mb="1rem" style={{ justifyContent: 'space-evenly' }}>
                <AutoColumn gap="lg">{TotalEarnedFrame}</AutoColumn>
                <AutoColumn gap="lg">{WithdrawableFrame}</AutoColumn>
              </AutoRow>
              {/* <AutoRow mb="1rem" style={{ justifyContent: 'space-evenly' }}>
                <AutoColumn gap="lg">{LastPaymentFrame()}</AutoColumn>
                <AutoColumn gap="lg">{NextPaymentFrame()}</AutoColumn>
              </AutoRow> */}
            </Flex>
          </Flex>
        )}
      </ThemeProvider>
    </>
  )
}

export default RewardDashboard
