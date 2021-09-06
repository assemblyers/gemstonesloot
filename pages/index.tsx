// Imports
import Layout from "@components/Layout"; // Layout wrapper
import { defaultBags } from "@utils/constants"; // Bags to render
import { abis } from "@utils/abis"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles
import CryptoJS from 'crypto-js'
// Types
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
const web3 = new Web3("https://mainnet.infura.io/v3/30fdcb87e22b4454bb20338fc4fe86cf");

export default function Home(): ReactElement {
  // Quicklinks to render
  const quicklinks: Record<string, string>[] = [
    { name: "OpenSea", url: "https://opensea.io/collection/gemstonesloot" },
    // { name: "Synthetic Loot", url: "/synthloot" },
    // {
    //   name: "Twitter",
    //   url: "https://twitter.com/emloot",
    // },
    // {
    //   name: "Discord",
    //   url: "https://discord.gg/5w6zcJ4v",
    // },
    {
      name: "Contract",
      url: "https://etherscan.io/address/0x9ca9a5bc258fbfe4fad17ab9ad369ce889df9dba",
    }
  ];

  /**
   * Selects 3 random bags from defaultBags
   * @returns {Record<string, string>[]} randomized bags
   */
  const getRandomThreeBags = () => {
    const shuffled = defaultBags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const loot = useMemo(() => {
    return new web3.eth.Contract(abis.emloot, "0x9ca9a5bc258fbfe4fad17ab9ad369ce889df9dba")
  }, [])

  const [searchAns, setSearchAns] = useState<{ [key: string]: any }[]>([]);
  const [search, setSearch] = useState('');

  const doSearch = useCallback(async (searchs: number[]) => {
    let ans = []
    for (let id of searchs) {
      let txt = await loot.methods.tokenURI(id).call()
      let decode_txt = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(txt.slice(29)))
      let data = JSON.parse(decode_txt)
      let owner = null
      try {
        owner = await loot.methods.ownerOf(id).call()
      } catch { }
      data["id"] = id
      data["owner"] = owner
      ans.push(data)
    }

    setSearchAns(ans)
  }, [])

  const searchChange = useCallback((e) => {
    let val = e.target.value
    setSearch(val)
    let ids = val.split(" ")
    let ans = []
    for (let id of ids) {
      try {
        id = parseInt(id)
        if (id > 0 && id <= 8000) {
          ans.push(id)
        }
      }
      catch {
      }
    }
    if (ans.length !== 0) {
      // setSearch(ans)
      doSearch(ans)
    }


  }, [])

  const random = useCallback(() => {
    let max = 7777
    let randomArr = [
      Math.floor(Math.random() * max) + 1, Math.floor(Math.random() * max) + 1, Math.floor(Math.random() * max) + 1
    ]
    setSearch(randomArr.join(' '))
    doSearch(randomArr)
    return
  }, [])

  useEffect(() => {
    random()
  }, [])

  return (
    <Layout>
      <div>
        <div className={styles.home__cta}>
          {/* CTA title */}
          <h1>Gemstones Loot</h1>

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
            A derivative of &nbsp; <a href="https://www.lootproject.com" target="_blank" rel="noreferrer">Loot project</a>.
          </p>
        </div>


        {/* <div className={styles.home__feature}>
          <span>Example Persons:</span>
          <span>

            <input style={{ width: 300 }} placeholder="Search token IDs, split by space" onChange={searchChange} value={search}></input>
            <button style={{ marginLeft: 10 }} onClick={random}>Random</button>
          </span>

          {searchAns.map((item, i) => (
            // For each loot bag, render item and link to OpenSea
            <a
              href={item.owner ?
                `https://opensea.io/assets/0x4335541d17f6344c29f2412e520ed71639150ead/${item.id}`
                :
                'https://etherscan.io/address/0x4335541D17f6344C29f2412E520Ed71639150EaD#writeContract'}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className={styles.home__bag}
            >
              <div style={{
                position: "relative",
                "height": 400,
                "paddingTop": 35
              }}>
                <span style={{ position: "absolute", left: 10, top: 10 }}>{item.name}</span>
                <span style={{ position: "absolute", right: 10, top: 5 }}>
                  {item.owner ? 'Buy 💰' : item.id <= 7777 ? 'Claim 🎁' : "It's Reserved 😂"}
                </span>

                <div className={styles.home__bag_attributes}>
                  <ul style={{ paddingTop: 20 }}>
                    {item.attributes.map((attr: { [key: string]: string }, i: number) => (
                      <li key={i}>
                        <span>{attr.value}</span> <span style={{ float: "right" }}>{attr.trait_type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </a>
          ))}
        </div> */}

      </div>
    </Layout >
  );
}
