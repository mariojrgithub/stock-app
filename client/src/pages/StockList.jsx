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

class UpdateStock extends Component {
  updateUser = event => {
    event.preventDefault();

    window.location.href = `/stocks/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteStock extends Component {
  deleteUser = event => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the stock ${this.props.id} permanently?`
      )
    ) {
      api.deleteStockById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class StockList extends Component {
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

    await api.getAllStocks().then(stocks => {
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
        Header: "Symbol",
        accessor: "symbol",
        filterable: true
      },
      {
        Header: "Close",
        accessor: "close",
        foldable: true,
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Open",
        accessor: "open",
        foldable: true,
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "High",
        accessor: "high",
        foldable: true,
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Low",
        accessor: "low",
        foldable: true,
        Cell: row => <span>$ {row.value}</span>,
        filterable: true
      },
      {
        Header: "Volume",
        accessor: "volume",
        foldable: true,
        filterable: true
      },
      {
        Header: "Date",
        accessor: "date",
        maxWidth: 110,
        foldable: true,
        filterable: true
      },
      {
        Header: "",
        accessor: "",
        maxWidth: 100,
        foldable: true,
        Cell: function(props) {
          return (
            <span>
              <DeleteStock id={props.original._id} />
            </span>
          );
        }
      },
      {
        Header: "",
        accessor: "",
        maxWidth: 100,
        foldable: true,
        Cell: function(props) {
          return (
            <span>
              <UpdateStock id={props.original._id} />
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

export default StockList;
