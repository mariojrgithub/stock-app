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

class UpdatePickFile extends Component {
  updateUser = event => {
    event.preventDefault();

    window.location.href = `/pickfiles/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeletePickFile extends Component {
  deleteUser = event => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the file ${this.props.id} permanently?`
      )
    ) {
      api.deletePickFileById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class PickFileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      filtered: [],
      columns: [],
      isLoading: false
    };
  }

  onFilteredChangeCustom = (value, accessor) => {
    let filtered = this.state.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value });
    }

    this.setState({ filtered: filtered });
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllPickFiles().then(stocks => {
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
        Header: "CAB-DRWR",
        accessor: "CAB_DRWR",
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
        Header: "ENTITY",
        accessor: "ENTITY",
        filterable: true,
        foldable: true
      },
      {
        Header: "DESCRIPTION",
        accessor: d => d.DESCRIPTION,
        minWidth: 400,
        filterable: true,
        foldable: true
      },
      {
        Header: "ID#",
        accessor: "ID_NUMB",
        filterable: true,
        foldable: true
      },
      {
        Header: "DATE",
        accessor: "DATE",
        filterable: true,
        maxWidth: 110,
        foldable: true
      },
      {
        Header: "",
        accessor: "",
        foldable: true,
        maxWidth: 100,
        Cell: function(props) {
          return (
            <span>
              <DeletePickFile id={props.original._id} />
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
              <UpdatePickFile id={props.original._id} />
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
            filterable
            filtered={this.state.filtered}
            onFilteredChange={(filtered, column, value) => {
              this.onFilteredChangeCustom(value, column.id || column.accessor);
            }}
            defaultFilterMethod={(filter, row, column) => {
              const id = filter.pivotId || filter.id;
              if (typeof filter.value === "object") {
                return row[id] !== undefined
                  ? filter.value.indexOf(row[id]) > -1
                  : true;
              } else {
                return row[id] !== undefined
                  ? String(row[id]).indexOf(filter.value) > -1
                  : true;
              }
            }}
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

export default PickFileList;
