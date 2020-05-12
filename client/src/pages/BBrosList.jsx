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
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/bbros/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteBBros extends Component {
  deleteUser = (event) => {
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
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllBBros().then((stocks) => {
      this.setState({
        stocks: stocks.data.data,
        isLoading: false,
      });
    });
  };

  download() {
    const currentRecords = this.selectTable.wrappedInstance.state.sortedData;
    const columns = this.selectTable.props.columns;

    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        record_to_download[columns[colIndex].Header] =
          currentRecords[index][columns[colIndex].accessor];
      }
      data_to_download.push(record_to_download);
    }
    let json = JSON.stringify(data_to_download);
    let arrData = JSON.parse(json);
    alert("Starting Download");

    var CSV = "";

    //This condition will generate the Label/Header
    {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "MyReport_";

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // return arrData;
  }

  render() {
    const { stocks, isLoading } = this.state;
    console.log("TCL: StockList -> render -> stocks", stocks);

    const columns = [
      {
        Header: "Portfolio",
        accessor: "PORTFOLIO",
        filterable: true,
      },
      {
        Header: "Stock Name",
        accessor: "STOCK_NAME",
        minWidth: 200,
        filterable: true,
      },
      {
        Header: "Symbol",
        accessor: "SYMBOL",
        filterable: true,
      },
      {
        Header: "Purchase Date",
        accessor: "PURCHASE_DATE",
        minWidth: 110,
        filterable: true,
      },

      {
        Header: "No of Shares",
        accessor: "NO_OF_SHARES",
        filterable: true,
      },
      {
        Header: "Cost Per Share",
        accessor: "UNIT_COST",
        Cell: (row) => <span>$ {row.value}</span>,
        filterable: true,
      },
      {
        Header: "Total Cost",
        accessor: "TOTAL_AMOUNT",
        Cell: (row) => <span>$ {row.value}</span>,
        filterable: true,
      },

      {
        Header: "Current Price",
        accessor: "PRICE",
        Cell: (row) => <span>$ {row.value}</span>,
        filterable: true,
      },
      {
        Header: "Current Value",
        accessor: "VALUE",
        minWidth: 110,
        Cell: (row) => <span>$ {row.value}</span>,
        filterable: true,
      },
      {
        Header: "Gain/Loss",
        accessor: "GAIN_LOSS",
        Cell: (row) => <span>$ {row.value}</span>,
        filterable: true,
      },
      {
        Header: "Percent Return",
        accessor: "PERCENT_RETURN",
        Cell: (row) => <span>{row.value} %</span>,
        filterable: true,
      },
      {
        Header: "Report Date",
        accessor: "REPORT_DATE",
        minWidth: 110,
        filterable: true,
      },
      {
        Header: "Broker",
        accessor: "BROKER",
        filterable: true,
      },

      {
        Header: "",
        accessor: "",
        foldable: true,
        maxWidth: 100,
        Cell: function (props) {
          return (
            <span>
              <DeleteBBros id={props.original._id} />
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "",
        foldable: true,
        maxWidth: 100,
        Cell: function (props) {
          return (
            <span>
              <UpdateBBros id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!stocks.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <FoldableTable
            ref={(r) => {
              this.selectTable = r;
            }}
            data={stocks}
            columns={columns}
            loading={isLoading}
            defaultPageSize={20}
            showPageSizeOptions={true}
            minRows={0}
            style={{
              height: "800px",
            }}
          />
        )}

        {
          <div>
            <button
              onClick={() => {
                this.download();
                console.log("CSV Downloaded");
              }}
            >
              Download
            </button>
          </div>
        }
      </Wrapper>
    );
  }
}

export default BBrosList;
