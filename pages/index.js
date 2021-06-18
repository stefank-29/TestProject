import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
// const ws = require('ws');

const TableStyles = styled.div`
    display: grid;
    background-color: white;
    grid-template-columns: minmax(70px, 100px) 2fr 3fr 3fr 3fr;
    border-top: 1px solid var(--darkblue);
    border-right: 1px solid var(--darkblue);
    margin: 5rem 0;

    .cell {
        position: relative;
        overflow: hidden;
        padding: 2rem 2rem;
        border-left: 1px solid var(--darkblue);
        border-bottom: 1px solid var(--darkblue);
        &.header {
            font-size: 1.7rem;
            font-weight: bold;
        }
        span {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    .cell-enter {
        transition: all 2s;
        &.cell-enter-active {
            background-color: lightblue;
        }
    }

    .cell-exit {
        transform: translateY(0);
        transition: all 2s;
        position: absolute;
        left: 2rem;
        &.cell-exit-active {
            transform: translateY(-100%);
        }
    }
`;

export default function Home() {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        let pairs = ['tBTCUSD', 'tBTCEUR', 'tETHUSD', 'tETHEUR', 'tEOSUSD'];
        let connections = [];

        pairs.forEach((pair) => {
            let wss = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
            connections.push(wss);
            let msg = JSON.stringify({
                event: 'subscribe',
                channel: 'ticker',
                symbol: pair,
            });

            wss.onmessage = (msg) => {
                let response = JSON.parse(msg.data);
                console.log(response);
                if (response.event === 'info') {
                    return;
                }
                if (response.event === 'subscribed') {
                    setCurrencies((currencies) => [
                        ...currencies,
                        { symbol: response.symbol, chanId: response.chanId },
                    ]);
                } else {
                    let details = response[1];
                    if (response[1] == 'hb') return;
                    setCurrencies((currencies) =>
                        [...currencies].map((curr) => {
                            if (curr?.chanId === response[0]) {
                                return {
                                    ...curr,
                                    daily: details[5],
                                    volume: details[7],
                                    lastPrice: details[6],
                                };
                            } else {
                                return curr;
                            }
                        })
                    );
                }
            };

            wss.onopen = () => {
                wss.send(msg);
            };
        });
        return () => {
            for (let i = 0; i < connections.length; i++) {
                connections[i].close();
            }
        };
    }, []);

    // if (currencies.length < 5) return <p>Loading...</p>;
    return (
        <div>
            <Head>
                <title>TeleTrader</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>REALTIME MARKETS OVERVIEW</h1>
            {currencies.length == 5 ? (
                <TableStyles>
                    <span className="cell header">#</span>
                    <span className="cell header">Symbol</span>
                    <span className="cell header">Daily change</span>
                    <span className="cell header">Volume</span>
                    <span className="cell header">Last price</span>
                    {currencies.map((curr, index) => (
                        <Fragment key={index}>
                            <span className="cell">{index + 1}</span>
                            <span className="cell">{curr.symbol.slice(1)}</span>
                            <TransitionGroup component="span" className="cell">
                                <CSSTransition
                                    key={curr.daily}
                                    timeout={{ enter: 2000, exit: 2000 }}
                                    classNames="cell"
                                >
                                    <span className="cell-value">{`${(
                                        curr?.daily * 100
                                    ).toFixed(2)}%`}</span>
                                </CSSTransition>
                            </TransitionGroup>
                            <TransitionGroup component="span" className="cell">
                                <CSSTransition
                                    key={curr.volume}
                                    timeout={{ enter: 2000, exit: 2000 }}
                                    classNames="cell"
                                >
                                    <span className="cell-value">
                                        {curr.volume}
                                    </span>
                                </CSSTransition>
                            </TransitionGroup>
                            <TransitionGroup component="span" className="cell">
                                <CSSTransition
                                    key={curr.lastPrice}
                                    timeout={{ enter: 2000, exit: 2000 }}
                                    classNames="cell"
                                >
                                    <span className="cell-value">
                                        {' '}
                                        {+curr?.lastPrice?.toFixed(2)}
                                    </span>
                                </CSSTransition>
                            </TransitionGroup>
                        </Fragment>
                    ))}
                </TableStyles>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}
