import React, { Component } from "react";
import ReactTable from "react-table-6";
import api from "../api";

import styled from "styled-components";

import "react-table-6/react-table.css";

import FoldableTableHOC from "react-table-6/lib/hoc/foldableTable";

import { CSVLink, CSVDownload } from "react-csv";

const FoldableTable = FoldableTableHOC(ReactTable);

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdatePickTransactions extends Component {
  updateUser = event => {
    event.preventDefault();

    window.location.href = `/picktransactions/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeletePickTransactions extends Component {
  deleteUser = event => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the transaction ${this.props.id} permanently?`
      )
    ) {
      api.deletePickTransactionsById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class PickTransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      columns: [],
      isLoading: false
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllPickTransactions().then(stocks => {
      this.setState({
        stocks: stocks.data.data,
        isLoading: false
      });
    });
  };

  render() {
    const { stocks, isLoading } = this.state;
    console.log("TCL: StockList -> render -> stocks", stocks);

    const columns = [
      {
        Header: "Lot #",
        accessor: "STK",
        filterable: true
      },
      {
        Header: "Portfolio",
        accessor: "PORT",
        filterable: true
      },
      {
        Header: "Symbol",
        accessor: "SYM",
        filterable: true
      },
      {
        Header: "Date",
        accessor: "DATE",
        maxWidth: 135,
        filterable: true
      },
      {
        Header: "No of Shares",
        accessor: "SHARES",
        filterable: true
      },
      {
        Header: "Cost Per Share",
        accessor: "COST_PER_SHARE",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },
      {
        Header: "Total Cost",
        accessor: "TOT_COST",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },

      {
        Header: "Current Price",
        accessor: "PRICE",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },
      {
        Header: "Current Value",
        accessor: "VALUE",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },
      {
        Header: "TYPE",
        accessor: "TYPE",
        filterable: true,
        foldable: true
      },
      {
        Header: "Gain/Loss",
        accessor: "REALIZED_GAIN_LOSS",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },

      {
        Header: "Net Proceeds",
        accessor: "NET_PROCEEDS",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true,
        foldable: true
      },

      {
        Header: "Broker",
        accessor: "BROKER",
        filterable: true
      },

      {
        Header: "",
        accessor: "",
        foldable: true,
        maxWidth: 100,
        Cell: function(props) {
          return (
            <span>
              <DeletePickTransactions id={props.original._id} />
            </span>
          );
        }
      },
      {
        Header: "",
        accessor: "",
        foldable: true,
        maxWidth: 100,
        Cell: function(props) {
          return (
            <span>
              <UpdatePickTransactions id={props.original._id} />
            </span>
          );
        }
      }
    ];

    let showTable = true;
    if (!stocks.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <FoldableTable
            ref={r => {
              this.reactTable = r;
            }}
            data={stocks}
            columns={columns}
            loading={isLoading}
            defaultPageSize={20}
            showPageSizeOptions={true}
            minRows={0}
            style={{
              height: "800px"
            }}
          />
        )}
      </Wrapper>
    );
  }
}

export default PickTransactionsList;
