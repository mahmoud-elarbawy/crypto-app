import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 50;

  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);

  // const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  const [cryptos, setCryptos] = useState([]);

  const [search, setSearch] = useState("");

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const filterHandler = (coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase());

  useEffect(() => {
    // setCryptos(cryptoList?.data?.coins);
    // const filteredData = cryptoList?.data?.coins.filter((coin) =>
    //   coin.name.toLowerCase().includes(search.toLowerCase())
    // );
    const filterData = cryptoList?.data?.coins.filter(filterHandler);
    setCryptos(filterData);
  }, [cryptoList, search, setSearch]);

  if (isFetching) return "Loading ...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={changeHandler} />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            small={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily change: {millify(currency.change)}%</p>
                <p>{currency.uuid }</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
