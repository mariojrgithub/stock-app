import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
  className: "collpase navbar-collapse"
})``;

const List = styled.div.attrs({
  className: "navbar-nav mr-auto"
})``;

const Item = styled.div.attrs({
  className: "collpase navbar-collapse"
})``;

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/" className="navbar-brand">
          BartBros Database
        </Link>
        <Collapse>
          <List>
            <Item>
              <Link to="/bbros/list" className="nav-link">
                List of all PORTFOLIO Entries
              </Link>
            </Item>
            <Item>
              <Link to="/bbros/create" className="nav-link">
                Create PORTFOLIO Entry
              </Link>
            </Item>
            <Item>
              <Link to="/stocks/list" className="nav-link">
                STOCK History
              </Link>
            </Item>
            <Item>
              <Link to="/pickfiles/list" className="nav-link">
                List of all FILES
              </Link>
            </Item>
            <Item>
              <Link to="/pickfiles/create" className="nav-link">
                Create FILE
              </Link>
            </Item>
            <Item>
              <Link to="/picktransactions/list" className="nav-link">
                List of all TRANSACTIONS
              </Link>
            </Item>
            <Item>
              <Link to="/picktransactions/create" className="nav-link">
                Create TRANSACTION
              </Link>
            </Item>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
