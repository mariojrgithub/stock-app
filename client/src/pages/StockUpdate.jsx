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

class StockUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      symbol: "",
      open: "",
      high: "",
      low: "",
      volume: "",
      close: "",
      date: "",
      NOTE: ""
    };
  }

  handleChangeInputSymbol = async event => {
    const symbol = event.target.value;
    this.setState({ symbol });
  };

  handleChangeInputOpen = async event => {
    const open = event.target.value;
    this.setState({ open });
  };

  handleChangeInputHigh = async event => {
    const high = event.target.value;
    this.setState({ high });
  };

  handleChangeInputLow = async event => {
    const low = event.target.value;
    this.setState({ low });
  };

  handleChangeInputVolume = async event => {
    const volume = event.target.value;
    this.setState({ volume });
  };

  handleChangeInputClose = async event => {
    const close = event.target.value;
    this.setState({ close });
  };

  handleChangeInputDate = async event => {
    const date = event.target.value;
    this.setState({ date });
  };

  handleChangeInputNote = async event => {
    const NOTE = event.target.value;
    this.setState({ NOTE });
  };

  handleUpdateStock = async () => {
    const {
      id,
      symbol,
      open,
      high,
      low,
      volume,
      close,
      date,
      NOTE
    } = this.state;
    const payload = {
      symbol,
      open,
      high,
      low,
      volume,
      close,
      date,
      NOTE
    };

    await api.updateStockById(id, payload).then(res => {
      window.alert(`Stock updated successfully!`);
      this.setState({
        symbol: "",
        open: "",
        high: "",
        low: "",
        volume: "",
        close: "",
        date: "",
        NOTE: ""
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const stocks = await api.getStockById(id);

    this.setState({
      symbol: stocks.data.data.symbol,
      open: stocks.data.data.open,
      high: stocks.data.data.high,
      low: stocks.data.data.low,
      volume: stocks.data.data.volume,
      close: stocks.data.data.close,
      date: stocks.data.data.date,
      NOTE: stocks.data.data.NOTE
    });
  };

  render() {
    const { symbol, open, high, low, volume, close, date, NOTE } = this.state;
    return (
      <Wrapper>
        <Title>Update Stock</Title>

        <Label>Symbol: </Label>
        <InputText
          type="text"
          value={symbol}
          onChange={this.handleChangeInputSymbol}
        />

        <Label>Close: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={close}
          onChange={this.handleChangeInputClose}
        />

        <Label>Open: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={open}
          onChange={this.handleChangeInputOpen}
        />

        <Label>High: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={high}
          onChange={this.handleChangeInputHigh}
        />

        <Label>Low: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={low}
          onChange={this.handleChangeInputLow}
        />

        <Label>Volume: </Label>
        <InputText
          type="number"
          lang="en-US"
          value={volume}
          onChange={this.handleChangeInputVolume}
        />

        <Label>Date: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={date}
          onChange={this.handleChangeInputDate}
        />

        <Label>NOTE: </Label>
        <InputText
          type="text"
          lang="en-US"
          value={NOTE}
          onChange={this.handleChangeInputNote}
        />

        <Button onClick={this.handleUpdateStock}>Update Stock</Button>
        <CancelButton href={"/stocks/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default StockUpdate;
