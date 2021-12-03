import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import { RouteComponentProps } from 'react-router-dom'
import { Frame, ThemeProvider, TitleBar, Button as MSButton } from '@react95/core'
import Column, { AutoColumn } from 'components/Layout/Column'
import { SwapCallbackError, Wrapper } from 'views/Swap/components/styleds'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import { Box, Text, Heading, useModal } from '@pancakeswap/uikit'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import { GreyCard } from 'components/Card'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import CircleLoader from 'components/Loader/CircleLoader'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { Trade, JSBI, Token, CurrencyAmount } from '@pancakeswap/sdk'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import { useTranslation } from 'contexts/Localization'
import { useCurrency, useAllTokens } from 'hooks/Tokens'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSwapCallback } from 'hooks/useSwapCallback'
import { useSwapState, useDerivedSwapInfo, useSwapActionHandlers } from 'state/swap/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import confirmPriceImpactWithoutFee from 'views/Swap/components/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from 'views/Swap/components/ConfirmSwapModal'
import ImportTokenWarningModal from 'views/Swap/components/ImportTokenWarningModal'
import SwapWarningModal from 'views/Swap/components/SwapWarningModal'
import RewardDashboard from './components/Hero'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

export default function RewardsDashboard({ history }: RouteComponentProps) {
  const { t } = useTranslation()
  const dogecoin = useCurrency('0xba2ae424d960c26247dd6c32edc70b295c744c43')
  const windoge95 = useCurrency('0x956ca51cc658835ca589eba83fe0ae12e5b7e5e5')
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [dogecoin, windoge95]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = {
    ...useAllTokens(),
    '0xba2ae424d960c26247dd6c32edc70b295c744c43': dogecoin,
    '0x956ca51cc658835ca589eba83fe0ae12e5b7e5e5': windoge95,
  }
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  const { account } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const allowedSlippage = 1500

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t])

  // errors

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      return swapCurrency.address === warningTokenData.address
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push('/swap/')} />,
  )

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  const ConvertDogeFrame = () => {
    return (
      <Frame
        style={{
          textAlign: 'center',
          paddingBottom: '8px',
          width: '100%',
          minWidth: '100%',
          marginTop: '8px',
        }}
      >
        <TitleBar
          active
          title="ReinvestingPortal.exe"
          style={{ width: '100%', height: '30px', textAlign: 'left', paddingLeft: '4px' }}
        />
        <AutoColumn gap="lg">
          <Heading scale="xl" padding="16px">
            {t('Reinvesting Portal')}
          </Heading>
          <Heading scale="md" padding="16px">
            {t('Re-invest your DOGE back into Windoge95 (15% slippage)')}
          </Heading>
          <Wrapper id="swap-page">
            <AutoColumn gap="md">
              <CurrencyInputPanel
                label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={!atMaxAmountInput}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                id="swap-currency-input"
                disableCurrencySelect
              />

              <CurrencyInputPanel
                value={formattedAmounts[Field.OUTPUT]}
                onUserInput={handleTypeOutput}
                label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
                showMaxButton={false}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                id="swap-currency-output"
                disableCurrencySelect
              />
            </AutoColumn>
            <Box mt="1rem">
              {swapIsUnsupported ? (
                <MSButton style={{ width: '100%', marginBottom: '4px', fontSize: '22px' }} disabled>
                  {t('Unsupported Asset')}
                </MSButton>
              ) : !account ? (
                <ConnectWalletButton width="100%" />
              ) : showWrap ? (
                <MSButton
                  style={{ width: '100%', fontSize: '22px' }}
                  disabled={Boolean(wrapInputError)}
                  onClick={onWrap}
                >
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
                </MSButton>
              ) : noRoute && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <Text color="textSubtle" mb="4px">
                    {t('Insufficient liquidity for this trade.')}
                  </Text>
                  {singleHopOnly && (
                    <Text color="textSubtle" mb="4px">
                      {t('Try enabling multi-hop trades.')}
                    </Text>
                  )}
                </GreyCard>
              ) : showApproveFlow ? (
                <RowBetween>
                  <MSButton
                    style={{ width: '48%', fontSize: '22px' }}
                    onClick={approveCallback}
                    disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                  >
                    {approval === ApprovalState.PENDING ? (
                      <AutoRow gap="6px" justify="center">
                        {t('Enabling')} <CircleLoader stroke="white" />
                      </AutoRow>
                    ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                      t('Enabled')
                    ) : (
                      t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
                    )}
                  </MSButton>
                  <MSButton
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          txHash: undefined,
                        })
                        onPresentConfirmModal()
                      }
                    }}
                    style={{ width: '48%', fontSize: '22px' }}
                    id="swap-button"
                    disabled={
                      !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? t('Price Impact High')
                      : priceImpactSeverity > 2
                      ? t('Swap Anyway')
                      : t('Swap')}
                  </MSButton>
                </RowBetween>
              ) : (
                <MSButton
                  style={{ width: '100%', fontSize: '22px' }}
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        txHash: undefined,
                      })
                      onPresentConfirmModal()
                    }
                  }}
                  id="swap-button"
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                >
                  {swapInputError ||
                    (priceImpactSeverity > 3 && !isExpertMode
                      ? t('Price Impact Too High')
                      : priceImpactSeverity > 2
                      ? t('Swap Anyway')
                      : t('Swap'))}
                </MSButton>
              )}
              {showApproveFlow && (
                <Column style={{ marginTop: '1rem' }}>
                  <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                </Column>
              )}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
            </Box>
          </Wrapper>
        </AutoColumn>
      </Frame>
    )
  }

  const goHome = () => {
    window.open('https://windoge95.com', '_self')
  }

  return (
    <>
      <style>
        {` 
          body {
            background-color: #008080;
            background-image: url("https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/618c8408b724e8cb5271b734_dogetizer-2021-10-16-11-36-37-1.jpeg"); 
            background-position: left top;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
      `}
      </style>
      <ThemeProvider>
        <PageMeta />
        <StyledHeroSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background="#00000000"
          index={2}
          hasCurvedDivider={false}
        >
          <RewardDashboard />
          <ConvertDogeFrame />
        </StyledHeroSection>
        <AutoRow mb="1rem" style={{ justifyContent: 'center' }}>
          <AutoColumn gap="lg">
            <MSButton onClick={goHome} style={{ fontSize: '28px', marginBottom: '34px' }}>
              Return Home
            </MSButton>
            <img
              alt="windoge-gif-footer"
              src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/618cfdef3579d6100d783a04_ezgif.com-gif-maker%20(5).gif"
              height="250px"
              width="250px"
              style={{ marginTop: '32px' }}
            />
          </AutoColumn>
        </AutoRow>
      </ThemeProvider>
    </>
  )
}
