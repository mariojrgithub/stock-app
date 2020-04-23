import React, { Component } from "react";
import ReactTable from "react-table-6";
import api from "../api";

import styled from "styled-components";

import "react-table-6/react-table.css";

import FoldableTableHOC from "react-table-6/lib/hoc/foldableTable";

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

class UpdateBBros extends Component {
  updateUser = event => {
    event.preventDefault();

    window.location.href = `/bbros/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteBBros extends Component {
  deleteUser = event => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the entry ${this.props.id} permanently?`
      )
    ) {
      api.deleteBBrosById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class BBrosList extends Component {
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

    await api.getAllBBros().then(stocks => {
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
        Header: "Portfolio",
        accessor: "PORTFOLIO",
        filterable: true
      },
      {
        Header: "Stock Name",
        accessor: "STOCK_NAME",
        minWidth: 200,
        filterable: true
      },
      {
        Header: "Symbol",
        accessor: "SYMBOL",
        filterable: true
      },
      {
        Header: "Purchase Date",
        accessor: "PURCHASE_DATE",
        minWidth: 110,
        filterable: true
      },

      {
        Header: "No of Shares",
        accessor: "NO_OF_SHARES",
        filterable: true
      },
      {
        Header: "Cost Per Share",
        accessor: "UNIT_COST",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Total Cost",
        accessor: "TOTAL_AMOUNT",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },

      {
        Header: "Current Price",
        accessor: "PRICE",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Current Value",
        accessor: "VALUE",
        minWidth: 110,
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Gain/Loss",
        accessor: "GAIN_LOSS",
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Percent Return",
        accessor: "PERCENT_RETURN",
        Cell: row => <span>{row.value} %</span>,
        filterable: true
      },
      {
        Header: "Report Date",
        accessor: "REPORT_DATE",
        minWidth: 110,
        filterable: true
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
              <DeleteBBros id={props.original._id} />
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
              <UpdateBBros id={props.original._id} />
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

export default BBrosList;
