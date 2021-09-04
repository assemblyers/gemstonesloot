// Imports
import Layout from "@components/Layout"; // Layout wrapper
import { defaultBags } from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles
import Link from "next/dist/client/link";

// Types
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  // Quicklinks to render
  const quicklinks: Record<string, string>[] = [
    { name: "OpenSea", url: "https://opensea.io/collection/emloot" },
    // { name: "Synthetic Loot", url: "/synthloot" },
    {
      name: "Twitter",
      url: "https://twitter.com/emloot",
    },
    {
      name: "Discord",
      url: "https://discord.gg/5w6zcJ4v",
    },
    {
      name: "Contract",
      url: "https://etherscan.io/address/0x4335541d17f6344c29f2412e520ed71639150ead",
    },
    {
      name: "Github",
      url: "https://github.com/EmojiLoot/contracts",
    },
  ];

  /**
   * Selects 3 random bags from defaultBags
   * @returns {Record<string, string>[]} randomized bags
   */
  const getRandomThreeBags = () => {
    const shuffled = defaultBags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <Layout>
      <div>
        <div className={styles.home__cta}>
          {/* CTA title */}
          <h1>😂 Emoji Loot 🎉</h1>

          {/* Quicklinks */}
          <ul>
            {quicklinks.map(({ name, url }, i) => {
              return (
                <li key={i}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Description */}
          <p>
            A derivative of  <a href="https://www.lootproject.com" target="_blank">Loot project</a>.
            <br /> Emojis are more abstract but more expressive.
            <br /> Find an emLoot to represent your lifestyle in the upcoming metaverse.
          </p>
        </div>

        {/* Rendering sample loot bags
        <div className={styles.home__feature}>
          <span>Example Bags:</span>
          {getRandomThreeBags().map(({ id, attributes }, i) => (
            // For each loot bag, render item and link to OpenSea
            <a
              href={`https://opensea.io/assets/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className={styles.home__bag}
            >
              <div className={styles.home__bag_attributes}>
                <span>#{id}</span>
                <ul>
                  {attributes.map((attribute, i) => (
                    <li key={i}>
                      <span>{attribute}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div> */}

      </div>
    </Layout>
  );
}
