import React from 'react'
import { PageMeta } from 'components/Layout/Page'
import { Link } from 'react-router-dom'
import { Box, Heading, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { TaskBar, Modal, List, Frame, ThemeProvider } from '@react95/core'
import {
  Mspaint,
  Computer,
  Progman21,
  Gcdef100,
  Mailnews15,
  Network2,
  Mshtml32528,
  Lock,
  FileText,
  Wab321017,
} from '@react95/icons'
import { useTranslation } from 'contexts/Localization'
import { AutoRow } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import nftGif from './nft.gif'
import swapGif from './swap.gif'

export default function Roadmap() {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [websiteInfo, toggleWebsiteInfo] = React.useState(false)
  const [nftCreator, toggleNFTCreator] = React.useState(false)
  const [windogeSwap, toggleWindogeSwap] = React.useState(false)
  const [influencers, toggleInfluencers] = React.useState(false)
  const [audits, toggleAudits] = React.useState(false)

  const closeWebsiteInfo = () => toggleWebsiteInfo(false)
  const closeNFTCreator = () => toggleNFTCreator(false)
  const closeWindogeSwap = () => toggleWindogeSwap(false)
  const closeInfluencers = () => toggleInfluencers(false)
  const closeAudits = () => toggleAudits(false)

  const bulletStyle: any = {
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '18px',
  }

  const iconContainerStyle: any = {
    width: '104px',
    textAlign: 'center',
    marginLeft: '16px',
    marginTop: '16px',
    marginBottom: '16px',
    cursor: 'pointer',
  }
  const iconStyle: any = { height: '52px', width: '52px' }
  const modalFrameStyle: any = {
    minWidth: '90%',
    minHeight: '90%',
    backgroundColor: 'white',
    overflowY: 'scroll',
    maxHeight: isMobile ? '430px' : '530px',
    padding: '8px',
  }
  const modalStyle: any = {
    margin: '16px',
    height: '80%',
    width: '80%',
    minWidth: '80%',
    minHeight: isMobile ? '400px' : '600px',
    maxWidth: '400px',
    maxHeight: isMobile ? '500px' : '500px',
  }

  return (
    <>
      <style>
        {` 
          body {
            background-color: #008080;
            background-image: url(https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/61934152bfe13650b9148d21_DesktopBG.jpeg);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
      `}
      </style>
      <ThemeProvider>
        <PageMeta />
        {websiteInfo && (
          <Modal
            defaultPosition={{ x: 8, y: 8 }}
            icon={<Computer variant="16x16_4" />}
            title="Website 2.0"
            closeModal={closeWebsiteInfo}
            buttons={[{ value: 'Ok', onClick: closeWebsiteInfo }]}
            style={modalStyle}
          >
            <Frame style={modalFrameStyle}>
              <Heading scale="xl" mb="16px" mt="16px">
                {t(`Website 2.0`)}
              </Heading>

              <Text fontSize="18px">
                {t(
                  `We're redesigning and rebuilding the Windoge95 website, and this page is your first look at what's coming. Our project is built on nostalgia for a better era of technology, and the website should introduce our token as a blast from the past.`,
                )}
              </Text>

              <img
                src="https://i.pinimg.com/originals/97/35/10/9735102350e3656a972e1f82dfd334a9.gif"
                alt="Start button gif"
                style={{
                  height: '50%',
                  minHeight: '150px',
                  maxHeight: '250px',
                  margin: '16px 0px',
                  borderRadius: '8px',
                }}
              />

              <Text fontSize="18px" mb="32px">
                {t(`Upcoming website features include:`)}
              </Text>
              <ul>
                <li style={bulletStyle}>
                  {t(`WindogeSwap, a fully featured trading platform for freely exchanging WNDG95, DOGE rewards, BNB,
                  NFTs, and more`)}
                </li>
                <li style={bulletStyle}>
                  {t(
                    `NFT Creator, where our community can easily create and mint NFTs on Binance Smart chain within a friendly, MS Paint-style interface`,
                  )}
                </li>
                <li style={bulletStyle}>
                  {t(
                    `Private Arcade, featuring classic games and high score contests with rewards, exclusively available to Windoge95 holders`,
                  )}
                </li>
              </ul>
              <Text fontSize="18px">
                {t(`Click through the rest of the desktop icons to learn more about our upcoming plans!`)}
              </Text>
            </Frame>
          </Modal>
        )}
        {nftCreator && (
          <Modal
            defaultPosition={{ x: 10, y: 10 }}
            icon={<Mspaint variant="16x16_4" />}
            title="NFT Creator"
            closeModal={closeNFTCreator}
            buttons={[{ value: 'Ok', onClick: closeNFTCreator }]}
            style={modalStyle}
          >
            <Frame style={modalFrameStyle}>
              <Heading scale="xl" mb="16px" mt="16px">
                {t(`NFT Creator`)}
              </Heading>

              <Text fontSize="18px" mt="16px" mb="16px">
                {t(
                  `NFTs are a fundamental part of the Windoge95 roadmap. Currently, NFTs are difficult to produce, requiring specialized software and expertise. But NFTs should be fun and easy for anyone to create - as easy as drawing a picture in MS Paint. Enter the Windoge95 NFT creator.`,
                )}
              </Text>
              <AutoRow gap="16px">
                <img
                  style={{
                    minWidth: '250px',
                    maxWidth: '550px',
                    height: '40%',
                    minHeight: '250px',
                    maxHeight: '550px',
                    margin: '16px 0px',
                  }}
                  src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/6193227dc55119ffd6b7cf16_nft.png"
                  alt="nft gif 2"
                />

                <img
                  style={{
                    minWidth: '250px',
                    maxWidth: '550px',
                    height: '40%',
                    minHeight: '250px',
                    maxHeight: '550px',
                    margin: '16px 0px',
                    borderRadius: '8px',
                  }}
                  src={nftGif}
                  alt="nft gif"
                />
              </AutoRow>

              <Text fontSize="18px" mb="32px" mt="24px">
                {t(
                  `One of the core strengths of this token is our community. We want to give you the tools to get creative and contribute to the culture of the coin! We can't wait to see the amazing art the community will create with this tool.`,
                )}
              </Text>
              <Text fontSize="18px">
                {t(
                  `Beyond the creator, we will introduce an exchange where you can browse NFTs that other holders have listed for sale. From the creator to the marketplace, our focus is on delivering value and utility to strengthen the future of the token.`,
                )}
              </Text>
            </Frame>
          </Modal>
        )}

        {windogeSwap && (
          <Modal
            defaultPosition={{ x: 11, y: 11 }}
            icon={<Network2 variant="16x16_4" />}
            title="WindogeSwap"
            closeModal={closeWindogeSwap}
            width="90vw"
            height="90vh"
            style={modalStyle}
            buttons={[{ value: 'Ok', onClick: closeWindogeSwap }]}
          >
            <Frame style={modalFrameStyle}>
              <Heading scale="xl" mb="16px" mt="16px">
                {t(`WindogeSwap`)}
              </Heading>

              <Text fontSize="18px">
                {t(
                  `WindogeSwap is a fully featured trading platform that will enable the free exchange of WNDG95, DOGE rewards, BNB, NFTs, and more.`,
                )}
              </Text>
              <Text fontSize="18px">
                {t(
                  `Our goal is to create a friendly, accessible swap that our community can use to trade crypto and NFTs in a retro environment.`,
                )}
              </Text>

              <Link to="/rewards" target="_blank" rel="noreferrer">
                <Text fontSize="24px" fontWeight="bold" color="#000088">
                  <u>{t(`Go to Rewards Dashboard`)}</u>
                </Text>
              </Link>
              <AutoRow align="flex-start">
                <img
                  style={{
                    width: '40%',
                    minWidth: '250px',
                    maxWidth: '550px',
                    margin: '16px 16px',
                    borderRadius: '8px',
                  }}
                  src="https://uploads-ssl.webflow.com/618355b75eeec9b5cc079e5c/6193e3f60dd5a9efc50ae68e_Frame%2030%201.png"
                  alt="NFT Marketplace"
                />
                <img
                  style={{
                    width: '60%',
                    minWidth: '250px',
                    maxWidth: '550px',
                    margin: '16px 0px',
                    borderRadius: '8px',
                  }}
                  src={swapGif}
                  alt="Swap gif"
                />
              </AutoRow>
            </Frame>
          </Modal>
        )}
        {influencers && (
          <Modal
            defaultPosition={{ x: 12, y: 12 }}
            icon={<Progman21 />}
            title="Influencers"
            closeModal={closeInfluencers}
            width="90vw"
            height="90vh"
            style={modalStyle}
            buttons={[{ value: 'Ok', onClick: closeInfluencers }]}
          >
            <Frame style={modalFrameStyle}>
              <Heading scale="xl" mb="16px" mt="16px">
                {t(`Influencers`)}
              </Heading>

              <Text fontSize="18px">
                {t(
                  `Strategic partnerships with crypto influencers are a critical part of the growth of new tokens. We're actively engaged with with prominent partners in the space, including:`,
                )}
              </Text>
              <ul>
                <li style={bulletStyle}>{t(`Caesar's Calls, voice AMA scheduled for the week of November 15th`)}</li>
                <li style={bulletStyle}>
                  {t(`CryptoKorea, pinned tweet to 40k followers, pinned in Telegrams with 100k total members`)}
                </li>
                <li style={bulletStyle}>{t(`JapaneseCrypto`)}</li>
                <li style={bulletStyle}>{t(`CryptoProfessor`)}</li>
              </ul>

              <Text fontSize="18px">{t(`Next up on our influencer roadmap we're targeting:`)}</Text>

              <ul>
                <li style={bulletStyle}>{t(`SatoshiStreetBets, voice AMA in their Telegram`)}</li>
              </ul>

              <a href="https://t.me/windoge95char" target="_blank" rel="noreferrer">
                <Text fontSize="24px" fontWeight="bold" color="#000088">
                  <u>{t(`Join Our Telegram`)}</u>
                </Text>
              </a>
            </Frame>
          </Modal>
        )}
        {audits && (
          <Modal
            defaultPosition={{ x: 8, y: 8 }}
            icon={<Lock variant="16x16_4" />}
            title="Audits"
            closeModal={closeAudits}
            width="90vw"
            height="90vh"
            style={modalStyle}
            buttons={[{ value: 'Ok', onClick: closeAudits }]}
          >
            <Frame style={modalFrameStyle}>
              <Heading scale="xl" mb="16px" mt="16px">
                {t(`Audits`)}
              </Heading>

              <Text fontSize="18px">
                {t(
                  `We value the trust and confidence of our investors above all else. We have already achieved several audit milestones, and you can view the results here. These audits are conducted by third parties to ensure that our contract code is completely secure and free of any fraud or vulnerabilities.`,
                )}
              </Text>

              <Text fontSize="18px" mt="16px">
                {t(
                  `Read through the audits reports and you will be able to invest in our token with utmost confidence.`,
                )}
              </Text>
              <AutoRow justify="center" align="center">
                <a href="/pdfs/watchtower_audit.pdf" target="_blank">
                  <Box
                    style={{
                      width: '154px',
                      textAlign: 'center',
                      marginLeft: '16px',
                      marginTop: '16px',
                      marginBottom: '16px',
                      cursor: 'pointer',
                    }}
                  >
                    <FileText style={iconStyle} />
                    <Text color="black" fontSize="20px" textAlign="center">
                      {t('Crypto Watchtower')}
                    </Text>
                  </Box>
                </a>
                <a href="/pdfs/mythx_audit.pdf" target="_blank">
                  <Box style={iconContainerStyle}>
                    <FileText style={iconStyle} />
                    <Text color="black" fontSize="20px" textAlign="center">
                      {t('MythX')}
                    </Text>
                  </Box>
                </a>
                <a href="/pdfs/tech_rate_audit.pdf" target="_blank">
                  <Box style={iconContainerStyle}>
                    <FileText style={iconStyle} />
                    <Text color="black" fontSize="20px" textAlign="center">
                      {t('Tech Rate')}
                    </Text>
                  </Box>
                </a>
              </AutoRow>
            </Frame>
          </Modal>
        )}

        <AutoRow align="flex-start">
          <AutoColumn justify="start">
            <Box style={iconContainerStyle} onClick={() => toggleWebsiteInfo(true)}>
              <Computer style={iconStyle} />
              <Text color="white" fontSize="20px" textAlign="center">
                {t('Website 2.0')}
              </Text>
            </Box>
            <Box style={iconContainerStyle} onClick={() => toggleNFTCreator(true)}>
              <Mspaint style={iconStyle} />
              <Text color="white" fontSize="20px" textAlign="center">
                {t('NFT Creator')}
              </Text>
            </Box>
            {/* <a href="#" target="_blank" rel="noreferrer">
              <Box style={iconContainerStyle}>
                <Mshtml32528 style={iconStyle} />
                <Text color="white" fontSize="20px" textAlign="center">
                  {t('Marketing')}
                </Text>
              </Box>
            </a> */}
            <a href="https://www.windoge95.com/games" target="_blank" rel="noreferrer">
              <Box style={iconContainerStyle}>
                <Gcdef100 style={iconStyle} />
                <Text color="white" fontSize="20px" textAlign="center">
                  {t('Arcade')}
                </Text>
              </Box>
            </a>
            <a href="https://www.windoge95.com/merchandise" target="_blank" rel="noreferrer">
              <Box style={iconContainerStyle}>
                <Wab321017 style={iconStyle} />
                <Text color="white" fontSize="20px" textAlign="center">
                  {t('Merchandise')}
                </Text>
              </Box>
            </a>
          </AutoColumn>
          <AutoColumn justify="start" style={{ marginLeft: '16px' }}>
            <Box style={iconContainerStyle} onClick={() => toggleWindogeSwap(true)}>
              <Network2 style={iconStyle} />
              <Text color="white" fontSize="20px" textAlign="center">
                {t('WindogeSwap')}
              </Text>
            </Box>
            <Box style={iconContainerStyle} onClick={() => toggleInfluencers(true)}>
              <Progman21 style={iconStyle} />
              <Text color="white" fontSize="20px" textAlign="center">
                {t('Influencers')}
              </Text>
            </Box>
            <Box style={iconContainerStyle} onClick={() => toggleAudits(true)}>
              <Lock style={iconStyle} />
              <Text color="white" fontSize="20px" textAlign="center">
                {t('Audits')}
              </Text>
            </Box>
            <Link to="/rewards" target="_blank">
              <Box style={iconContainerStyle}>
                <Mailnews15 style={iconStyle} />
                <Text color="white" fontSize="20px" textAlign="center">
                  {t('Rewards')}
                </Text>
              </Box>
            </Link>
          </AutoColumn>
        </AutoRow>

        <TaskBar
          list={
            <List>
              <List.Item icon={<Computer variant="32x32_4" />} onClick={() => toggleWebsiteInfo(true)}>
                Website 2.0
              </List.Item>
              <List.Item icon={<Mspaint variant="32x32_4" />} onClick={() => toggleNFTCreator(true)}>
                NFT Creator
              </List.Item>            
              <a href="https://www.windoge95.com/games" target="_blank" rel="noreferrer">
                <List.Item icon={<Gcdef100 variant="32x32_4" />}>Arcade</List.Item>
              </a>
              <List.Item icon={<Network2 variant="32x32_4" />} onClick={() => toggleWindogeSwap(true)}>
                WindogeSwap
              </List.Item>
              <List.Item icon={<Progman21 variant="32x32_4" />} onClick={() => toggleInfluencers(true)}>
                Influencers
              </List.Item>
              <List.Item icon={<Lock variant="32x32_4" />} onClick={() => toggleAudits(true)}>
                Audits
              </List.Item>
              <a href="/rewards" target="_blank">
                <List.Item icon={<Mailnews15 variant="32x32_4" />}>Rewards</List.Item>
              </a>
              <a href="https://www.windoge95.com/merchandise" target="_blank" rel="noreferrer">
                <List.Item icon={<Wab321017 variant="32x32_4" />}>Merchandise</List.Item>
              </a>
            </List>
          }
        />
      </ThemeProvider>
    </>
  )
}
