import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Windoge95',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Windoge95), NFTs, and more, on a platform you can trust.',
  image: 'https://Windoge95.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')}`,
      }
    case '/rewards':
      return {
        title: `${t('Rewards')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Windoge95')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Windoge95')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Windoge95')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Windoge95')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Windoge95')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Windoge95')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Windoge95')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Windoge95')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Windoge95')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Windoge95')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Windoge95')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Windoge95')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Windoge95')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Windoge95')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Windoge95')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Windoge95')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Windoge95')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Windoge95 Info & Analytics')}`,
        description: 'View statistics for Windoge95 exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Windoge95 Info & Analytics')}`,
        description: 'View statistics for Windoge95 exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Windoge95 Info & Analytics')}`,
        description: 'View statistics for Windoge95 exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Windoge95')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Windoge95')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('Windoge95')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Windoge95')}`,
      }
    default:
      return null
  }
}
