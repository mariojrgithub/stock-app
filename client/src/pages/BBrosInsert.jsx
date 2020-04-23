import React, { Component } from "react";
import api from "../api";
import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control"
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

class BBrosInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      PORTFOLIO: "",
      STOCK_NAME: "",
      PURCHASE_DATE: "YYYY-MM-DD",
      SYMBOL: "",
      NO_OF_SHARES: "",
      UNIT_COST: "",
      TOTAL_AMOUNT: "",
      PRICE: "",
      VALUE: "",
      GAIN_LOSS: "",
      PERCENT_RETURN: "",
      REPORT_DATE: "YYYY-MM-DD",
      BROKER: "",
      COMMENT1: "",
      COMMENT2: "",
      COMMENT3: ""
    };
  }

  handleChangeInputPortfolio = async event => {
    const PORTFOLIO = event.target.value;
    this.setState({ PORTFOLIO });
  };

  handleChangeInputStockName = async event => {
    const STOCK_NAME = event.target.value;
    this.setState({ STOCK_NAME });
  };

  handleChangeInputPurchaseDate = async event => {
    const PURCHASE_DATE = event.target.value;
    this.setState({ PURCHASE_DATE });
  };

  handleChangeInputSymbol = async event => {
    const SYMBOL = event.target.value;
    this.setState({ SYMBOL });
  };

  handleChangeInputNoOfShares = async event => {
    const NO_OF_SHARES = event.target.value;
    this.setState({ NO_OF_SHARES });
  };

  handleChangeInputUnitCost = async event => {
    const UNIT_COST = event.target.value;
    this.setState({ UNIT_COST });
  };

  handleChangeInputTotalAmount = async event => {
    const TOTAL_AMOUNT = event.target.value;
    this.setState({ TOTAL_AMOUNT });
  };

  handleChangeInputPrice = async event => {
    const PRICE = event.target.value;
    this.setState({ PRICE });
  };

  handleChangeInputValue = async event => {
    const VALUE = event.target.value;
    this.setState({ VALUE });
  };

  handleChangeInputGainLoss = async event => {
    const GAIN_LOSS = event.target.value;
    this.setState({ GAIN_LOSS });
  };

  handleChangeInputPercentReturn = async event => {
    const PERCENT_RETURN = event.target.value;
    this.setState({ PERCENT_RETURN });
  };
  handleChangeInputDate = async event => {
    const REPORT_DATE = event.target.value;
    this.setState({ REPORT_DATE });
  };

  handleChangeInputBroker = async event => {
    const BROKER = event.target.value;
    this.setState({ BROKER });
  };

  handleChangeInputComment1 = async event => {
    const COMMENT1 = event.target.value;
    this.setState({ COMMENT1 });
  };
  handleChangeInputComment2 = async event => {
    const COMMENT2 = event.target.value;
    this.setState({ COMMENT2 });
  };
  handleChangeInputComment3 = async event => {
    const COMMENT3 = event.target.value;
    this.setState({ COMMENT3 });
  };

  handleIncludeBBros = async () => {
    const {
      PORTFOLIO,
      STOCK_NAME,
      PURCHASE_DATE,
      SYMBOL,
      NO_OF_SHARES,
      UNIT_COST,
      TOTAL_AMOUNT,
      PRICE,
      VALUE,
      GAIN_LOSS,
      PERCENT_RETURN,
      REPORT_DATE,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    const payload = {
      PORTFOLIO,
      STOCK_NAME,
      PURCHASE_DATE,
      SYMBOL,
      NO_OF_SHARES,
      UNIT_COST,
      TOTAL_AMOUNT,
      PRICE,
      VALUE,
      GAIN_LOSS,
      PERCENT_RETURN,
      REPORT_DATE,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    };

    await api.insertBBros(payload).then(res => {
      window.alert(`Entry inserted successfully!`);
      this.setState({
        PORTFOLIO: "",
        STOCK_NAME: "",
        PURCHASE_DATE: "YYYY-MM-DD",
        SYMBOL: "",
        NO_OF_SHARES: "",
        UNIT_COST: "",
        TOTAL_AMOUNT: "",
        PRICE: "",
        VALUE: "",
        GAIN_LOSS: "",
        PERCENT_RETURN: "",
        REPORT_DATE: "YYYY-MM-DD",
        BROKER: "",
        COMMENT1: "",
        COMMENT2: "",
        COMMENT3: ""
      });
    });
  };

  render() {
    const {
      PORTFOLIO,
      STOCK_NAME,
      PURCHASE_DATE,
      SYMBOL,
      NO_OF_SHARES,
      UNIT_COST,
      TOTAL_AMOUNT,
      PRICE,
      VALUE,
      GAIN_LOSS,
      PERCENT_RETURN,
      REPORT_DATE,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    return (
      <Wrapper>
        <Title>Create New Entry</Title>

        <Label>Portfolio: </Label>
        <InputText
          type="text"
          value={PORTFOLIO}
          onChange={this.handleChangeInputPortfolio}
        />

        <Label>Stock Name: </Label>
        <InputText
          type="text"
          value={STOCK_NAME}
          onChange={this.handleChangeInputStockName}
        />

        <Label>Purchase Date: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={PURCHASE_DATE}
          onChange={this.handleChangeInputPurchaseDate}
        />

        <Label>Symbol: </Label>
        <InputText
          type="text"
          value={SYMBOL}
          onChange={this.handleChangeInputSymbol}
        />

        <Label>No of Shares: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={NO_OF_SHARES}
          onChange={this.handleChangeInputNoOfShares}
        />

        <Label>Cost Per Share: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={UNIT_COST}
          onChange={this.handleChangeInputUnitCost}
        />

        {/* <Label>Total Cost: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={TOTAL_AMOUNT}
          onChange={this.handleChangeInputTotalAmount}
        /> */}

        <Label>Current Price: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={PRICE}
          onChange={this.handleChangeInputPrice}
        />

        {/* <Label>Current Value: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={VALUE}
          onChange={this.handleChangeInputValue}
        />

        <Label>Gain/Loss: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={GAIN_LOSS}
          onChange={this.handleChangeInputGainLoss}
        />

        <Label>Percent Return: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={PERCENT_RETURN}
          onChange={this.handleChangeInputPercentReturn}
        /> */}

        <Label>Report Date: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={REPORT_DATE}
          onChange={this.handleChangeInputDate}
        />

        <Label>Broker: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={BROKER}
          onChange={this.handleChangeInputBroker}
        />

        <Label>COMMENT1: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT1}
          onChange={this.handleChangeInputComment1}
        />
        <Label>COMMENT2: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT2}
          onChange={this.handleChangeInputComment2}
        />
        <Label>COMMENT3: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={COMMENT3}
          onChange={this.handleChangeInputComment3}
        />

        <Button onClick={this.handleIncludeBBros}>Add Entry</Button>
        <CancelButton href={"/bbros/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default BBrosInsert;
