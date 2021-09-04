// Imports
import Link from "next/link"; // Routing
import Layout from "@components/Layout"; // Layout wrapper
import styles from "@styles/pages/FAQ.module.scss"; // Page styles

// Types
import type { ReactElement } from "react";

// FAQ page
export default function FAQ(): ReactElement {
  return (
    <Layout>
      <div className={styles.faq}>
        <h2>Frequently Asked Questions</h2>

        {/* What is emLoot ? */}
        <div className={styles.faq__item}>
          <h3>What is emLoot?</h3>
          <p>
            emLoot is a collection of 8,000 unique NFT tokens that use emojis to represent your lifestyle in the metaverse.
            See <Link href="https://www.lootproject.com">Loot project</Link> for more information.
          </p>
          <p>
            Just like Loot, emLoot is an unaudited project. Bags #1 to #7777 are claimable by
            anyone and #7778 to #8000 are currently reserved for the contract
            deployer.
          </p>
        </div>

        {/* Why is loot special? */}
        <div className={styles.faq__item}>
          <h3>How to get emLoot?</h3>
          <p>
            You can mint emLoot straight out of the <Link href="https://etherscan.io/address/0x4335541d17f6344c29f2412e520ed71639150ead#writeContract">contract on Etherscan</Link>.
          </p>
          <p>
            Just go to [Write Contract] tab on ehterscan and find [claim] method.
            Connect your wallet and enter your lucky number in the [tokenId] field.
            Then hit [Write].
          </p>
          <p>
            Feel free to sell your tokens on <Link href="https://opensea.io/">OpenSea</Link>.
          </p>
        </div>

      </div>
    </Layout>
  );
}
