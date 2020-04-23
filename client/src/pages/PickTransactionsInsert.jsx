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

class PickTransactionsInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      STK: "",
      PORT: "",
      SYM: "",
      DATE: "YYYY-MM-DD",
      SHARES: "",
      TOT_COST: "",
      COST_PER_SHARE: "",
      PRICE: "",
      VALUE: "",
      TYPE: "PURCHASE / SALE",
      REALIZED_GAIN_LOSS: "",
      NET_PROCEEDS: "",
      BROKER: "",
      COMMENT1: "",
      COMMENT2: "",
      COMMENT3: ""
    };
  }

  handleChangeInputStk = async event => {
    const STK = event.target.value;
    this.setState({ STK });
  };

  handleChangeInputPort = async event => {
    const PORT = event.target.value;
    this.setState({ PORT });
  };

  handleChangeInputSym = async event => {
    const SYM = event.target.value;
    this.setState({ SYM });
  };

  handleChangeInputDate = async event => {
    const DATE = event.target.value;
    this.setState({ DATE });
  };

  handleChangeInputShares = async event => {
    const SHARES = event.target.value;
    this.setState({ SHARES });
  };

  handleChangeInputTotalCost = async event => {
    const TOT_COST = event.target.value;
    this.setState({ TOT_COST });
  };

  handleChangeInputCostPerShare = async event => {
    const COST_PER_SHARE = event.target.value;
    this.setState({ COST_PER_SHARE });
  };

  handleChangeInputPrice = async event => {
    const PRICE = event.target.value;
    this.setState({ PRICE });
  };

  handleChangeInputValue = async event => {
    const VALUE = event.target.value;
    this.setState({ VALUE });
  };

  handleChangeInputType = async event => {
    const TYPE = event.target.value;
    this.setState({ TYPE });
  };

  handleChangeInputRealGainLoss = async event => {
    const REALIZED_GAIN_LOSS = event.target.value;
    this.setState({ REALIZED_GAIN_LOSS });
  };

  handleChangeInputNetProceeds = async event => {
    const NET_PROCEEDS = event.target.value;
    this.setState({ NET_PROCEEDS });
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

  handleIncludePickTransactions = async () => {
    const {
      STK,
      PORT,
      SYM,
      DATE,
      SHARES,
      TOT_COST,
      COST_PER_SHARE,
      PRICE,
      VALUE,
      TYPE,
      REALIZED_GAIN_LOSS,
      NET_PROCEEDS,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    const payload = {
      STK,
      PORT,
      SYM,
      DATE,
      SHARES,
      TOT_COST,
      COST_PER_SHARE,
      PRICE,
      VALUE,
      TYPE,
      REALIZED_GAIN_LOSS,
      NET_PROCEEDS,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    };

    await api.insertPickTransactions(payload).then(res => {
      window.alert(`Transaction inserted successfully!`);
      this.setState({
        STK: "",
        PORT: "",
        SYM: "",
        DATE: "",
        SHARES: "",
        TOT_COST: "",
        COST_PER_SHARE: "",
        PRICE: "",
        VALUE: "",
        TYPE: "",
        REALIZED_GAIN_LOSS: "",
        NET_PROCEEDS: "",
        BROKER: "",
        COMMENT1: "",
        COMMENT2: "",
        COMMENT3: ""
      });
    });
  };

  render() {
    const {
      STK,
      PORT,
      SYM,
      DATE,
      SHARES,
      TOT_COST,
      COST_PER_SHARE,
      PRICE,
      VALUE,
      TYPE,
      REALIZED_GAIN_LOSS,
      NET_PROCEEDS,
      BROKER,
      COMMENT1,
      COMMENT2,
      COMMENT3
    } = this.state;
    return (
      <Wrapper>
        <Title>Create New Transaction</Title>

        <Label>Lot #: </Label>
        <InputText
          type="text"
          value={STK}
          onChange={this.handleChangeInputStk}
        />

        <Label>Portfolio: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={PORT}
          onChange={this.handleChangeInputPort}
        />

        <Label>Symbol: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={SYM}
          onChange={this.handleChangeInputSym}
        />

        <Label>Date: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={DATE}
          onChange={this.handleChangeInputDate}
        />

        <Label>No of Shares: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={SHARES}
          onChange={this.handleChangeInputShares}
        />

        <Label>Cost Per Share: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={COST_PER_SHARE}
          onChange={this.handleChangeInputCostPerShare}
        />

        <Label>Total Cost: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={TOT_COST}
          onChange={this.handleChangeInputTotalCost}
        />

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
        /> */}

        <Label>TYPE: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={TYPE}
          onChange={this.handleChangeInputType}
        />

        <Label>Gain/Loss: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={REALIZED_GAIN_LOSS}
          onChange={this.handleChangeInputRealGainLoss}
        />

        <Label>Net Proceeds: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={NET_PROCEEDS}
          onChange={this.handleChangeInputNetProceeds}
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

        <Button onClick={this.handleIncludePickTransactions}>
          Add Transaction
        </Button>
        <CancelButton href={"/picktransactions/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default PickTransactionsInsert;
