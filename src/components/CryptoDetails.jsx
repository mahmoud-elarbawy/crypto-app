import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarOutlined,
  FundOutlined,
  ExclamationOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumbersOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const [data, isFetching] = useGetCryptoDetailsQuery(coinId);
  return (
    <>
      <Row></Row>
    </>
  );
}

export default CryptoDetails;